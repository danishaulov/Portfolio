"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Search,
  CornerDownLeft,
  Sun,
  Moon,
  Download,
  Mail,
  Github,
  Linkedin,
  Home,
  User,
  Layers,
  Briefcase,
  FolderGit2,
  Send,
  type LucideIcon,
} from "lucide-react";
import { EASE } from "@/lib/motion";
import { getLenis, SCROLL_OFFSET } from "@/lib/smoothScroll";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { useLang } from "@/lib/i18n/LanguageProvider";

const EMAIL = "danielshaulov4@gmail.com";

type Cmd = {
  id: string;
  label: string;
  group: string;
  icon: LucideIcon;
  keywords?: string;
  run: () => void;
};

/**
 * ⌘K / Ctrl-K command palette: fuzzy-ish search over navigation + actions
 * (jump to section, toggle theme, download CV, copy email, open profiles).
 * Renders only while open, so it adds no idle runtime cost.
 */
export default function CommandPalette() {
  const { t } = useLang();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [sel, setSel] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useFocusTrap(open, dialogRef);

  // Global hotkey.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("cmdk:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("cmdk:open", onOpen);
    };
  }, []);

  // Scroll lock (ref-counted, shared with the other overlays) + focus while open.
  // A body flag lets ContactModal's Escape handler defer to the palette when both
  // are open, so Escape dismisses only the topmost overlay.
  useEffect(() => {
    if (!open) return;
    lockScroll();
    document.body.dataset.cmdkOpen = "1";
    setQuery("");
    setSel(0);
    setCopied(false);
    const id = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => {
      window.clearTimeout(id);
      unlockScroll();
      delete document.body.dataset.cmdkOpen;
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    // Closing unlocks scroll on the next tick (open-effect cleanup). Start Lenis
    // now and drive the scroll on the next frame with force:true — a stopped/locked
    // Lenis silently ignores scrollTo otherwise, which is why clicking a result
    // used to do nothing.
    const l = getLenis();
    l?.start();
    requestAnimationFrame(() => {
      if (href === "#") {
        if (l) l.scrollTo(0, { duration: 1.1, force: true });
        else window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const el = document.querySelector(href);
      if (!el) return;
      if (l) l.scrollTo(el as HTMLElement, { offset: SCROLL_OFFSET, duration: 1.1, force: true });
      else el.scrollIntoView({ behavior: "smooth" });
    });
  };

  const download = (href: string) => {
    const a = document.createElement("a");
    a.href = href;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setOpen(false);
  };

  const commands: Cmd[] = useMemo(() => {
    const isDark = theme === "dark";
    return [
      { id: "home", label: t.misc.home, group: t.cmdk.navigate, icon: Home, run: () => go("#") },
      { id: "about", label: t.nav.about, group: t.cmdk.navigate, icon: User, run: () => go("#about") },
      { id: "whatido", label: t.nav.whatIDo, group: t.cmdk.navigate, icon: Layers, run: () => go("#what-i-do") },
      { id: "exp", label: t.nav.experience, group: t.cmdk.navigate, icon: Briefcase, run: () => go("#experience") },
      { id: "work", label: t.nav.work, group: t.cmdk.navigate, icon: FolderGit2, run: () => go("#work") },
      { id: "connect", label: t.nav.connect, group: t.cmdk.navigate, icon: Send, run: () => go("#connect") },
      {
        id: "theme",
        label: t.cmdk.toggleTheme,
        group: t.cmdk.actions,
        icon: isDark ? Sun : Moon,
        keywords: "dark light mode",
        run: () => {
          setTheme(isDark ? "light" : "dark");
          setOpen(false);
        },
      },
      {
        id: "copy",
        label: t.cmdk.copyEmail,
        group: t.cmdk.actions,
        icon: Mail,
        keywords: "email contact " + EMAIL,
        run: () => {
          navigator.clipboard?.writeText(EMAIL).catch(() => {});
          setCopied(true);
          window.setTimeout(() => setOpen(false), 700);
        },
      },
      { id: "cv", label: t.cmdk.downloadCv, group: t.cmdk.actions, icon: Download, keywords: "resume", run: () => download("/Daniel%20Shaulov%20-%20Resume.pdf") },
      { id: "gh", label: t.cmdk.github, group: t.cmdk.actions, icon: Github, run: () => { window.open("https://github.com/danishaulov", "_blank"); setOpen(false); } },
      { id: "li", label: t.cmdk.linkedin, group: t.cmdk.actions, icon: Linkedin, run: () => { window.open("https://www.linkedin.com/in/danielshaulov/", "_blank"); setOpen(false); } },
    ];
  }, [t, theme, setTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || (c.keywords ?? "").toLowerCase().includes(q)
    );
  }, [query, commands]);

  // Keep selection in range and scrolled into view.
  useEffect(() => {
    setSel((s) => Math.min(s, Math.max(0, filtered.length - 1)));
  }, [filtered.length]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => (s + 1) % Math.max(1, filtered.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => (s - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[sel]?.run();
    }
  };

  // Render grouped, but keep a flat index for keyboard selection.
  let flatIndex = -1;
  const groups = [t.cmdk.navigate, t.cmdk.actions];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-start justify-center px-4 pt-[18vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-black/[0.08] dark:border-white/[0.1]
                       bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl
                       shadow-[0_30px_80px_-20px_rgba(15,23,42,0.45)]"
          >
            {/* Search row */}
            <div className="flex items-center gap-3 px-4 border-b border-black/[0.06] dark:border-white/[0.08]">
              <Search size={17} className="text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder={t.cmdk.placeholder}
                role="combobox"
                aria-expanded
                aria-controls="cmdk-list"
                aria-autocomplete="list"
                aria-activedescendant={filtered.length ? filtered[sel]?.id : undefined}
                aria-label={t.cmdk.placeholder}
                className="w-full bg-transparent py-4 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
              />
              <kbd className="hidden sm:block text-[10px] font-medium text-slate-400 border border-black/[0.1] dark:border-white/[0.12] rounded px-1.5 py-0.5">
                ESC
              </kbd>
            </div>

            {/* SR-only live region announcing result count / empty state */}
            <p className="sr-only" aria-live="polite">
              {filtered.length ? `${filtered.length} results` : t.cmdk.empty}
            </p>

            {/* Results */}
            <div
              ref={listRef}
              id="cmdk-list"
              role="listbox"
              aria-label={t.cmdk.placeholder}
              className="max-h-[52vh] overflow-y-auto p-2"
            >
              {filtered.length === 0 && (
                <p className="px-3 py-8 text-center text-[13px] text-slate-400">{t.cmdk.empty}</p>
              )}

              {groups.map((group) => {
                const inGroup = filtered.filter((c) => c.group === group);
                if (inGroup.length === 0) return null;
                return (
                  <div key={group} className="mb-1">
                    <p className="px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                      {group}
                    </p>
                    {inGroup.map((c) => {
                      flatIndex += 1;
                      const idx = flatIndex;
                      const isSel = idx === sel;
                      const Icon = c.icon;
                      const justCopied = c.id === "copy" && copied;
                      return (
                        <button
                          key={c.id}
                          id={c.id}
                          role="option"
                          aria-selected={isSel}
                          type="button"
                          onMouseEnter={() => setSel(idx)}
                          onClick={() => c.run()}
                          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-start text-[14px] transition-colors duration-100 ${
                            isSel
                              ? "bg-blue-500/12 text-blue-700 dark:text-blue-300"
                              : "text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          <Icon size={16} className="shrink-0 opacity-80" />
                          <span className="flex-1">{justCopied ? t.cmdk.emailCopied : c.label}</span>
                          {isSel && <CornerDownLeft size={14} className="opacity-50" />}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

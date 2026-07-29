"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { useActiveSection } from "@/lib/useActiveSection";
import { EASE } from "@/lib/motion";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";

const LINK_KEYS = [
  { key: "about",      href: "#about",      id: "about"      },
  { key: "whatIDo",    href: "#what-i-do",  id: "what-i-do"  },
  { key: "experience", href: "#experience", id: "experience" },
  { key: "work",       href: "#work",       id: "work"       },
  { key: "connect",    href: "#connect",    id: "connect"    },
] as const;

const SECTION_IDS = LINK_KEYS.map((l) => l.id);

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const { t } = useLang();
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
  }, []);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  useEffect(() => {
    if (!open) return;
    lockScroll();
    return () => unlockScroll();
  }, [open]);

  const linkSlideX = -24;

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.72, ease: EASE }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || open
            ? "bg-white/95 dark:bg-neutral-950/90 backdrop-blur-xl border-b border-black/[0.08] dark:border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="#"
            onClick={() => setOpen(false)}
            className="text-[15px] font-semibold text-slate-900 dark:text-white/90 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 tracking-tight shrink-0"
          >
            {t.nav.logo}
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {LINK_KEYS.map((l) => {
              const isActive = active === l.id;
              return (
                <a
                  key={l.key}
                  href={l.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative text-[13px] tracking-wide transition-colors duration-200 py-1 ${
                    isActive
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {t.nav[l.key]}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-blue-500 dark:bg-blue-400"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right: availability + toggles + hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <span className="relative flex h-[7px] w-[7px]">
                <span className="sm:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-55" />
                <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-emerald-400" />
              </span>
              <span className="text-[12px] text-emerald-600 dark:text-emerald-400/80 font-medium hidden sm:block">
                {t.nav.available}
              </span>
            </div>

            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("cmdk:open"))}
              aria-label="Open command palette"
              className="hidden lg:inline-flex items-center gap-1.5 h-8 ps-2.5 pe-2 rounded-lg border border-black/[0.1] dark:border-white/[0.1] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-blue-500/40 hover:bg-blue-500/[0.05] transition-all duration-200"
            >
              <Search size={13} strokeWidth={2} />
              <kbd className="text-[11px] font-medium tracking-wide">{isMac ? "⌘" : "Ctrl"} K</kbd>
            </button>

            <ThemeToggle />

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-all duration-200"
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="x"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.16 }}
                  >
                    <X size={18} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.16 }}
                  >
                    <Menu size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 bg-white dark:bg-neutral-950 backdrop-blur-2xl flex flex-col pt-20 px-6 pb-10 md:hidden"
          >
            <nav className="flex flex-col">
              {LINK_KEYS.map((l, i) => (
                <motion.a
                  key={l.key}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: linkSlideX }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.05, duration: 0.32, ease: EASE }}
                  className="text-[2.2rem] font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 py-4 border-b border-black/[0.06] dark:border-white/[0.05] transition-colors duration-200 tracking-tight"
                >
                  {t.nav[l.key]}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.38, duration: 0.32 }}
              className="mt-auto"
            >
              <p className="text-[10px] text-slate-500 dark:text-slate-400 tracking-[0.22em] uppercase mb-4">
                {t.nav.getInTouch}
              </p>
              <a
                href="mailto:danielshaulov4@gmail.com"
                className="block text-[15px] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 mb-2"
              >
                danielshaulov4@gmail.com
              </a>
              <a
                href="https://github.com/danishaulov"
                target="_blank"
                rel="noreferrer"
                className="block text-[15px] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                github.com/danishaulov
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

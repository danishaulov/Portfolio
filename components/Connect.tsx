"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Linkedin, Mail, LucideIcon } from "lucide-react";
import ContactModal from "./ContactModal";
import Magnetic from "@/components/Magnetic";
import { EASE, VIEWPORT_ONCE } from "@/lib/motion";
import SectionLabel from "@/components/SectionLabel";
import { useLang } from "@/lib/i18n/LanguageProvider";

type LinkConfig = { Icon: LucideIcon; key: "linkedinLabel" | "githubLabel"; display: string; href: string };

const linkConfig: LinkConfig[] = [
  {
    Icon: Linkedin,
    key: "linkedinLabel",
    display: "danielshaulov",
    href: "https://www.linkedin.com/in/danielshaulov/",
  },
  {
    Icon: Github,
    key: "githubLabel",
    display: "danishaulov",
    href: "https://github.com/danishaulov",
  },
];

export default function Connect() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, VIEWPORT_ONCE);
  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useLang();

  return (
    <>
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <section
        id="connect"
        ref={ref}
        className="py-28 sm:py-36 px-5 sm:px-6 border-t border-black/[0.07] dark:border-white/[0.05]"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="block text-[11px] font-semibold text-blue-600 dark:text-blue-400 tracking-[0.24em] uppercase mb-6"
          >
            <SectionLabel index="05">{t.connect.eyebrow}</SectionLabel>
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.78, delay: 0.06, ease: EASE }}
            className="text-4xl sm:text-5xl lg:text-[3.8rem] font-bold tracking-tighter mb-5
                       text-sheen text-transparent bg-clip-text
                       bg-gradient-to-r from-slate-900 via-blue-700 to-slate-900
                       dark:from-white dark:via-blue-300 dark:to-white"
          >
            {t.connect.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.14 }}
            className="text-[17px] text-slate-600 dark:text-slate-400 font-light max-w-[420px] mx-auto mb-14 leading-relaxed"
          >
            {t.connect.body}
          </motion.p>

          {/* Contact cards */}
          <div className="flex justify-center flex-wrap gap-3 sm:gap-4">
            {/* Email — opens modal */}
            <Magnetic strength={0.25}>
              <motion.button
                type="button"
                onClick={() => setModalOpen(true)}
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.2 }}
                whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
                className="group flex items-center gap-3 sm:gap-3.5 px-5 sm:px-6 py-4 rounded-2xl bg-black/[0.04] dark:bg-white/[0.03] border border-black/[0.1] dark:border-white/[0.08] hover:border-blue-500/35 hover:bg-blue-500/[0.06] transition-colors duration-300"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-all duration-200">
                  <Mail size={16} strokeWidth={1.5} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-start">
                  <p className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold tracking-[0.16em] uppercase">
                    {t.connect.emailLabel}
                  </p>
                  <p className="text-[13px] text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-200">
                    danielshaulov4@gmail.com
                  </p>
                </div>
              </motion.button>
            </Magnetic>

            {/* LinkedIn & GitHub */}
            {linkConfig.map((c, i) => (
              <Magnetic key={c.key} strength={0.25}>
                <motion.a
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 22 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: 0.3 + i * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
                  className="group flex items-center gap-3 sm:gap-3.5 px-5 sm:px-6 py-4 rounded-2xl bg-black/[0.04] dark:bg-white/[0.03] border border-black/[0.1] dark:border-white/[0.08] hover:border-blue-500/35 hover:bg-blue-500/[0.06] transition-colors duration-300"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-all duration-200">
                    <c.Icon size={16} strokeWidth={1.5} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-start">
                    <p className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold tracking-[0.16em] uppercase">
                      {t.connect[c.key]}
                    </p>
                    <p className="text-[13px] text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-200">
                      {c.display}
                    </p>
                  </div>
                </motion.a>
              </Magnetic>
            ))}
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="mt-20 pt-7 border-t border-black/[0.06] dark:border-white/[0.04]"
          >
            <p className="text-[11px] text-slate-600 dark:text-slate-400 font-mono">
              © {new Date().getFullYear()} Daniel Shaulov · {t.connect.builtWith}
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}

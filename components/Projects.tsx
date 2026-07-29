"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Github } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import { EASE, SPRING_SNAPPY } from "@/lib/motion";
import SectionLabel from "@/components/SectionLabel";
import { useLang } from "@/lib/i18n/LanguageProvider";

const PER_PAGE = 4;

type Config = { id: string; title: string; tags: string[]; href: string; repo: string; groups: string[]; metric: string };

const projectConfig: Config[] = [
  {
    id: "01",
    title: "🚀 MyAnalyst",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "ECharts", "Web Worker"],
    href: "https://myanalyst.net",
    repo: "https://github.com/danishaulov/MyAnalyst",
    groups: ["analytics", "web"],
    metric: "In-browser engine · CSV → dashboard in seconds",
  },
  {
    id: "08",
    title: "🔮 Churn Prediction Engine",
    tags: ["Python", "PostgreSQL", "scikit-learn", "FastAPI", "Power BI", "SQL"],
    href: "https://github.com/danishaulov/churn-prediction-engine",
    repo: "https://github.com/danishaulov/churn-prediction-engine",
    groups: ["analytics", "finance"],
    metric: "ROC-AUC 0.907 · ~NT$13.8M/mo at risk",
  },
  {
    id: "02",
    title: "📈 Ethereum Macro Analysis",
    tags: ["Python", "Jupyter Notebook", "Pandas", "Statistical tests"],
    href: "https://github.com/danishaulov/Ethereum-Macro-Analysis",
    repo: "https://github.com/danishaulov/Ethereum-Macro-Analysis",
    groups: ["finance"],
    metric: "1 significant leading indicator · 5-yr validation",
  },
  {
    id: "03",
    title: "🛒 Craftiverse Customer Behaviour",
    tags: ["PowerBI", "Python", "SQL", "DAX", "TMDL"],
    href: "https://github.com/danishaulov/CustomerBehaviour",
    repo: "https://github.com/danishaulov/CustomerBehaviour",
    groups: ["analytics"],
    metric: "36 months of logs · live economy dashboard",
  },
  {
    id: "04",
    title: "🚔 L.A. Crime Rate",
    tags: ["PowerBI", "Power Query", "DAX", "Python"],
    href: "https://github.com/danishaulov/LA-Crime-Rate-PowerBI",
    repo: "https://github.com/danishaulov/LA-Crime-Rate-PowerBI",
    groups: ["analytics"],
    metric: "~853K incidents · 7-page report",
  },
  {
    id: "05",
    title: "📊 TickerIO",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "TradingView", "SSE", "Gemini AI"],
    href: "https://ticker-io.vercel.app",
    repo: "https://github.com/danishaulov/TickerIO",
    groups: ["finance", "web"],
    metric: "Live SSE prices · any ticker on one page",
  },
  {
    id: "06",
    title: "🚗 Car Company",
    tags: ["Power BI", "DAX", "TMDL", "Power Query"],
    href: "https://github.com/danishaulov/Car-Company",
    repo: "https://github.com/danishaulov/Car-Company",
    groups: ["analytics", "finance"],
    metric: "₪2bn revenue · 20.5% margin · Win-Back what-if",
  },
  {
    id: "07",
    title: "🌐 Developer Portfolio",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    href: "https://github.com/danishaulov/Portfolio",
    repo: "https://github.com/danishaulov/Portfolio",
    groups: ["web"],
    metric: "Next.js · TypeScript · Framer Motion",
  },
];

const FILTERS = ["all", "analytics", "finance", "web"] as const;

const pageVariants: Variants = {
  enter: (dir: number) => ({ x: dir >= 0 ? 60 : -60, opacity: 0 }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: EASE, staggerChildren: 0.09, delayChildren: 0.04 },
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? -60 : 60,
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  }),
};

const cardVariants: Variants = {
  enter: { opacity: 0, y: 28 },
  center: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, staggerChildren: 0.05, delayChildren: 0.18 } },
  exit: { opacity: 0, y: 0, transition: { duration: 0.2 } },
};

const tagsWrap: Variants = {
  enter: {},
  center: { transition: { staggerChildren: 0.05, delayChildren: 0.22 } },
};

const tagItem: Variants = {
  enter: { opacity: 0, scale: 0.8 },
  center: { opacity: 1, scale: 1, transition: SPRING_SNAPPY },
  exit: { opacity: 0 },
};

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLang();

  if (process.env.NODE_ENV !== "production" && projectConfig.length !== t.projects.items.length) {
    throw new Error("Projects: projectConfig length must match dictionary items");
  }

  const allProjects = t.projects.items.map((it, i) => ({ ...projectConfig[i], ...it }));

  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const projects =
    filter === "all" ? allProjects : allProjects.filter((p) => p.groups.includes(filter));
  const totalPages = Math.max(1, Math.ceil(projects.length / PER_PAGE));

  const selectFilter = (key: (typeof FILTERS)[number]) => {
    if (key === filter) return;
    setDirection(0);
    setPage(0);
    setFilter(key);
  };

  const paginate = (dir: number) => {
    setDirection(dir);
    setPage((p) => (p + dir + totalPages) % totalPages);
  };
  const goTo = (target: number) => {
    if (target === page) return;
    setDirection(target > page ? 1 : -1);
    setPage(target);
  };

  const pageItems = projects.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
  const hasPager = totalPages > 1;

  const ArrowBtn = ({ dir, children }: { dir: number; children: React.ReactNode }) => (
    <motion.button
      type="button"
      onClick={() => paginate(dir)}
      aria-label={dir > 0 ? "Next projects" : "Previous projects"}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      whileTap={{ scale: 0.9 }}
      className="shrink-0 self-center w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.09] dark:border-white/[0.09] text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-300 hover:border-blue-400/55 hover:bg-blue-500/[0.07] hover:shadow-[0_0_30px_rgba(59,130,246,0.18)] transition-all duration-300"
    >
      {children}
    </motion.button>
  );

  return (
    <section id="work" ref={ref} className="py-28 sm:py-36 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="block text-[11px] font-semibold text-blue-600 dark:text-blue-400 tracking-[0.24em] uppercase mb-5"
        >
          <SectionLabel index="04">{t.projects.eyebrow}</SectionLabel>
        </motion.span>

        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.06 }}
            className="text-3xl sm:text-[2.6rem] font-bold tracking-tight text-slate-900 dark:text-white"
          >
            {t.projects.title}
          </motion.h2>

          <motion.a
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.14 }}
            href="https://github.com/danishaulov"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-[13px] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
          >
            <Github size={14} strokeWidth={1.5} />
            {t.projects.githubProfile}
          </motion.a>
        </div>

        {/* Category filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {FILTERS.map((key) => {
            const isActive = filter === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => selectFilter(key)}
                aria-pressed={isActive}
                className={`relative px-4 py-1.5 rounded-full text-[12.5px] font-medium border transition-colors duration-200 ${
                  isActive
                    ? "text-white border-transparent"
                    : "text-slate-600 dark:text-slate-400 border-black/[0.1] dark:border-white/[0.1] hover:text-slate-900 dark:hover:text-white hover:border-blue-400/45"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="project-filter-pill"
                    className="absolute inset-0 rounded-full bg-blue-600"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{t.projects.filters[key]}</span>
              </button>
            );
          })}
        </motion.div>

        <div className="flex items-stretch gap-2 sm:gap-4">
          {hasPager && (
            <ArrowBtn dir={-1}>
              <ChevronLeft size={20} strokeWidth={1.75} />
            </ArrowBtn>
          )}

          <div className="flex-1 min-w-0 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={`${filter}-${page}`}
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate={inView ? "center" : "enter"}
                exit="exit"
                className="grid sm:grid-cols-2 gap-4 sm:gap-5"
              >
                {pageItems.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={cardVariants}
                    whileHover={{ y: -6, transition: { duration: 0.22, ease: "easeOut" } }}
                    style={{ perspective: 1000 }}
                  >
                  <TiltCard className="group relative block h-full p-6 sm:p-9 rounded-2xl bg-black/[0.04] dark:bg-white/[0.025] border border-black/[0.09] dark:border-white/[0.07] hover:border-blue-400/55 hover:bg-black/[0.06] dark:hover:bg-white/[0.04] hover:shadow-[0_0_50px_rgba(59,130,246,0.13),0_0_1px_rgba(59,130,246,0.25)] transition-all duration-300 overflow-hidden">
                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-blue-500/[0.12] via-transparent to-transparent rounded-2xl" />

                    {/* Primary stretched link → live site / project */}
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} — opens in new tab`}
                      data-cursor={`${t.projects.view} ↗`}
                      className="absolute inset-0 z-10"
                    />

                    <div className="relative z-20 pointer-events-none">
                      <div className="flex items-start justify-between mb-6 gap-4">
                        <div>
                          <p className="text-[10px] font-semibold text-blue-600/70 dark:text-blue-400/70 tracking-[0.22em] uppercase mb-2">
                            <span className="font-mono">{project.id}</span>
                            <span aria-hidden className="mx-1.5 opacity-40">/</span>
                            {project.category}
                          </p>
                          <h3 className="text-[19px] sm:text-[20px] font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-200 leading-tight">
                            {project.title}
                          </h3>
                        </div>
                        {/* Source on GitHub - clickable above the stretched link */}
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${project.title} source on GitHub — opens in new tab`}
                          title="Source on GitHub"
                          className="pointer-events-auto relative z-30 w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 hover:bg-blue-500/20 hover:border-blue-400/40 transition-all duration-200"
                        >
                          <Github size={15} strokeWidth={2} className="text-blue-600 dark:text-blue-400" />
                        </a>
                      </div>

                      <p className="font-mono tabular-nums text-[12px] text-blue-700/90 dark:text-blue-300/90 border-s-2 border-blue-500/40 ps-3 mb-5">
                        {project.metric}
                      </p>

                      <p className="text-slate-600 dark:text-slate-400 text-[14px] leading-[1.88] mb-6">
                        {project.description}
                      </p>

                      <motion.div variants={tagsWrap} className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <motion.span
                            key={tag}
                            variants={tagItem}
                            className="px-2.5 py-1 rounded-md bg-blue-500/[0.09] border border-blue-500/[0.18] text-[11px] text-blue-700/80 dark:text-blue-300/80 font-medium"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>
                  </TiltCard>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {hasPager && (
            <ArrowBtn dir={1}>
              <ChevronRight size={20} strokeWidth={1.75} />
            </ArrowBtn>
          )}
        </div>

        {hasPager && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="flex items-center justify-center gap-2.5 mt-10"
          >
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to page ${i + 1}`}
                aria-current={i === page}
                className="group flex h-6 min-w-[24px] items-center justify-center"
              >
                <span
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === page
                      ? "w-7 bg-blue-500"
                      : "w-2 bg-slate-400/40 dark:bg-white/20 group-hover:bg-slate-400/70 dark:group-hover:bg-white/40"
                  }`}
                />
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

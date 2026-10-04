"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  ArrowUpRight,
  ArrowDown,
  Download,
  Mail,
  Menu,
  X,
  Plus,
  Check,
  Copy,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import WorkShowcase from "./WorkShowcase";
import { projects, strengths, experience } from "@/lib/portfolio";
const ContactModal = dynamic(() => import("./ContactModal"));
const filters = ["All work", "Finance", "Data", "Tools & apps"] as const;
const nav = [
  ["about", "About"],
  ["what-i-do", "Strengths"],
  ["work", "Selected work"],
  ["experience", "Background"],
];
const email = "danielshaulov4@gmail.com";

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [filter, setFilter] = useState<string>("All work");
  const [showAll, setShowAll] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();
  const closeContact = useCallback(() => setContactOpen(false), []);
  useEffect(() => () => clearTimeout(copyTimer.current), []);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setCopyError(false);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyError(true);
    }
  };
  const filteredProjects =
    filter === "All work"
      ? projects
      : projects.filter((p) => p.category === filter);
  const visibleProjects =
    filter === "All work" && !showAll
      ? filteredProjects.slice(0, 4)
      : filteredProjects;
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="shell header-inner">
          <a
            className="wordmark"
            href="#home"
            aria-label="Daniel Shaulov, home"
          >
            ds<span>.</span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {nav.map(([id, label]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <ThemeToggle />
            <a className="nav-contact" href="#connect">
              Let’s talk <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <button
              ref={menuButton}
              className="menu-button"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav
            id="mobile-navigation"
            className="mobile-nav shell"
            aria-label="Mobile navigation"
          >
            {[...nav, ["connect", "Contact"]].map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
          </nav>
        )}
      </header>
      <main id="main" tabIndex={-1}>
        <section id="home" className="hero shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="intro">
              <span className="status-dot" /> Accounting student. Technical by
              nature.
            </p>
            <h1 id="hero-title">
              Daniel
              <br />
              Shaulov<span className="name-period">.</span>
            </h1>
            <p className="hero-statement">
              Accounting &amp;
              <br />
              financial analysis.
            </p>
            <p className="hero-description">
              Accounting student at the Open University of Israel. I combine
              Excel, SQL, Python and Power BI with a focus on accurate reporting
              and understanding the business behind the figures.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#work">
                Explore my work <ArrowDown size={17} aria-hidden="true" />
              </a>
              <a className="text-link" href="#connect">
                Get in touch <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
          <figure className="portrait-composition">
            <div className="portrait-frame">
              <Image
                src="/portrait.jpg"
                alt="Daniel Shaulov"
                fill
                priority
                sizes="(max-width: 600px) 90vw, 44vw"
              />
            </div>
            <figcaption>
              <span>Daniel Shaulov</span>
              <span>Accounting student & independent builder</span>
            </figcaption>
          </figure>
          <div className="profile-summary">
            <div>
              <span>Career focus</span>
              <strong>Assistant Controller</strong>
            </div>
            <div>
              <span>Education</span>
              <strong>Accounting · Open University</strong>
            </div>
            <div>
              <span>Technical toolkit</span>
              <strong>Excel / SQL / Python / Power BI</strong>
            </div>
          </div>
        </section>
        <section id="about" className="section shell about-grid">
          <div>
            <p className="section-kicker">A little context</p>
            <h2>
              The next chapter
              <br />
              is accounting.
            </h2>
          </div>
          <div className="about-copy">
            <p className="lead">
              I’ve moved from Economics & Management into accounting at the Open
              University. The thread running through both is the same:
              understanding how a business works through its numbers.
            </p>
            <p>
              Alongside my studies, I build data projects and software. That
              means getting close to the source data, working through
              inconsistencies and turning the result into something another
              person can understand.
            </p>
            <p>
              My goal is an Assistant Controller role. I want to contribute to
              reliable reporting, reconciliations and financial analysis, while
              developing the accounting knowledge the work demands.
            </p>
            <div className="study-note">
              <span className="study-symbol" aria-hidden="true">
                ↳
              </span>
              <div>
                <strong>Accounting / Open University of Israel</strong>
                <p>
                  Degree in progress. Building on economics, management and
                  independent technical work.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="what-i-do" className="strengths-section">
          <div className="shell section">
            <div className="section-heading">
              <div>
                <p className="section-kicker">What I bring</p>
                <h2>
                  More ways to
                  <br />
                  understand the numbers.
                </h2>
              </div>
              <p>
                Accounting gives the work its context.
                <br />
                These are the skills I bring to it.
              </p>
            </div>
            <div className="strengths-ledger">
              {strengths.map((s) => (
                <article key={s.title} className="strength-row">
                  <h3>{s.title}</h3>
                  <span>{s.tools}</span>
                  <p>{s.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="work" className="section shell">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Selected work</p>
              <h2>
                The work behind
                <br />
                the words.
              </h2>
            </div>
            <p>
              Independent projects in financial analysis,
              <br />
              data quality and building useful tools.
            </p>
          </div>
          <WorkShowcase />
          <div className="project-toolbar">
            <div className="filters" role="group" aria-label="Filter projects">
              {filters.map((f) => (
                <button
                  key={f}
                  aria-pressed={f === filter}
                  onClick={() => {
                    setFilter(f);
                    setShowAll(false);
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
            <span className="project-count" aria-live="polite">
              {visibleProjects.length} of {filteredProjects.length} projects
            </span>
          </div>
          <div className="project-list" id="project-index">
            {visibleProjects.map((p) => (
              <article className="project-row" key={p.title}>
                <div className="project-title">
                  <p>{p.category}</p>
                  <h3>
                    <a href={p.href} target="_blank" rel="noreferrer">
                      {p.title}
                      <ArrowUpRight size={20} aria-hidden="true" />
                    </a>
                  </h3>
                  <span>{p.tools}</span>
                </div>
                <div className="project-body">
                  <p>{p.description}</p>
                  <details>
                    <summary>
                      Why it matters for accounting{" "}
                      <Plus size={15} aria-hidden="true" />
                    </summary>
                    <div className="project-detail">
                      <p>
                        <strong>{p.relevance}</strong>
                      </p>
                      <p>{p.details}</p>
                      {p.note && <p className="project-note">{p.note}</p>}
                      {p.repo && (
                        <a
                          className="text-link"
                          href={p.repo}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View source on GitHub{" "}
                          <ArrowUpRight size={14} aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </details>
                </div>
              </article>
            ))}
          </div>
          {filter === "All work" && (
            <button
              className="show-projects"
              aria-expanded={showAll}
              aria-controls="project-index"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show selected projects" : "Show all 8 projects"}
              <Plus size={16} aria-hidden="true" />
            </button>
          )}
          <a
            className="text-link github-link"
            href="https://github.com/danishaulov"
            target="_blank"
            rel="noreferrer"
          >
            More on GitHub <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </section>
        <section id="experience" className="background-section">
          <div className="section shell background-grid">
            <div className="background-intro">
              <p className="section-kicker">Background</p>
              <h2>
                Responsibility,
                <br />
                in practice.
              </h2>
              <p>
                Different settings. The same expectation: be prepared, work
                carefully and follow through.
              </p>
              <div className="languages">
                <h3>Languages I work in</h3>
                <p>
                  <strong>Hebrew</strong>
                  <span>Native</span>
                </p>
                <p>
                  <strong>English</strong>
                  <span>Professional</span>
                </p>
                <p>
                  <strong>Russian</strong>
                  <span>High proficiency</span>
                </p>
              </div>
            </div>
            <div className="experience-list">
              {experience.map((e) => (
                <article key={e.title}>
                  <span className="experience-date">{e.period}</span>
                  <h3>{e.title}</h3>
                  <span className="experience-place">{e.place}</span>
                  <p>{e.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="connect" className="section shell contact-section">
          <div>
            <p className="section-kicker">For finance teams</p>
            <h2>
              Let’s start
              <br />a conversation.
            </h2>
            <p>
              Hiring for your finance team? I’m interested in opportunities on
              the path to an Assistant Controller role, where accounting and
              analytical skills can grow together.
            </p>
            <button
              className="button primary"
              onClick={() => setContactOpen(true)}
            >
              Send me a message <Mail size={17} aria-hidden="true" />
            </button>
          </div>
          <div className="contact-links">
            <div className="email-row">
              <a href={`mailto:${email}`}>{email}</a>
              <button onClick={copyEmail} aria-label="Copy email address">
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
            <span className="copy-status" role="status">
              {copied
                ? "Email copied"
                : copyError
                  ? "Please select and copy the email address above."
                  : ""}
            </span>
            <a
              href="https://www.linkedin.com/in/danielshaulov/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <ArrowUpRight size={20} aria-hidden="true" />
            </a>
            <a
              href="https://github.com/danishaulov"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <ArrowUpRight size={20} aria-hidden="true" />
            </a>
            <a
              className="cv-link"
              href="/Daniel%20Shaulov%20-%20Resume.pdf"
              download
            >
              <span>Download CV</span>
              <Download size={20} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <footer className="shell site-footer">
        <a className="wordmark" href="#home" aria-label="Back to top">
          ds<span>.</span>
        </a>
        <p>© {new Date().getFullYear()} Daniel Shaulov</p>
        <a href="#home">
          Back to top <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </footer>
      {contactOpen && (
        <ContactModal isOpen={contactOpen} onClose={closeContact} />
      )}
    </>
  );
}

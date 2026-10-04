"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Expand } from "lucide-react";
const reports = [
  {
    label: "Sales & profitability",
    title: "What drives the margin?",
    project: "Car Company",
    image: "/projects/car-company.png",
    alt: "Car Company Power BI report: sales, realised profit, margin, monthly revenue and profit by vehicle model",
    description:
      "A financial view of a fictional car importer, connecting individual sales to revenue, cost and realised profit.",
    question: "Which products sell, and which actually contribute to profit?",
    method:
      "Four Excel workbooks, a connected data model and explicit DAX measures for revenue and margin.",
    relevance:
      "A foundation for management reporting: clear definitions, traceable calculations and a view of the drivers behind the total.",
    scope: "5,000 sales / 5 report pages",
    note: "Independent project. All data is synthetic.",
    href: "https://github.com/danishaulov/Car-Company",
  },
  {
    label: "Revenue opportunities",
    title: "Where is revenue being lost?",
    project: "Car Company",
    image: "/projects/revenue-opportunities.png",
    alt: "Car Company Power BI revenue opportunities page with lost pipeline categories and a win-back scenario",
    description:
      "A closer look at lost sales, discounting and the assumptions behind a potential revenue recovery.",
    question: "How much of the lost pipeline could realistically be recovered?",
    method:
      "Lost leads grouped by cause, price-realisation measures and an adjustable win-back scenario.",
    relevance:
      "Separating observed results from assumptions, and making a scenario easy to question before it informs a decision.",
    scope: "2,159 lost leads / scenario analysis",
    note: "Independent project. All data is synthetic.",
    href: "https://github.com/danishaulov/Car-Company",
  },
  {
    label: "Recurring revenue",
    title: "How resilient is the revenue?",
    project: "Churn Prediction Engine",
    image: "/projects/churn.png",
    alt: "Churn Prediction Engine executive summary showing subscription revenue, customer metrics and estimated revenue at risk",
    description:
      "A subscription analytics pipeline that connects transaction history, recurring revenue and customer retention.",
    question:
      "What does customer behaviour tell us about the recurring revenue base?",
    method:
      "PostgreSQL and Python transform approximately 23 million KKBox transactions into revenue metrics and churn estimates.",
    relevance:
      "Working at transaction level while keeping a clear distinction between historical performance and modelled risk.",
    scope: "~23M transactions / 4 report pages",
    note: "Public dataset. Risk figures are model estimates.",
    href: "https://github.com/danishaulov/churn-prediction-engine",
  },
];
export default function WorkShowcase() {
  const [selected, setSelected] = useState(0);
  const report = reports[selected];
  return (
    <div className="work-showcase">
      <div
        className="showcase-selector"
        role="group"
        aria-label="Choose a report"
      >
        {reports.map((item, i) => (
          <button
            key={item.label}
            aria-pressed={i === selected}
            onClick={() => setSelected(i)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <article className="showcase-panel">
        <div className="showcase-heading">
          <div>
            <p>{report.project}</p>
            <h3>{report.title}</h3>
          </div>
          <a
            className="button paper-button"
            href={report.href}
            target="_blank"
            rel="noreferrer"
          >
            Explore project <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <p className="showcase-description">{report.description}</p>
        <a
          className="showcase-image"
          href={report.image}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open full-size ${report.label} report`}
        >
          <Image
            key={report.image}
            src={report.image}
            alt={report.alt}
            width={1600}
            height={900}
            sizes="(max-width: 600px) 90vw, 1000px"
          />
          <span>
            <Expand size={16} aria-hidden="true" /> View full report
          </span>
        </a>
        <div className="showcase-caption">
          <span>{report.scope}</span>
          <span>{report.note}</span>
        </div>
        <div className="case-study">
          <div>
            <h4>The question</h4>
            <p>{report.question}</p>
          </div>
          <div>
            <h4>The work</h4>
            <p>{report.method}</p>
          </div>
          <div>
            <h4>The finance connection</h4>
            <p>{report.relevance}</p>
          </div>
        </div>
      </article>
    </div>
  );
}

export const projects = [
  {
    title: "Car Company",
    category: "Finance",
    tools: "Power BI / DAX / Power Query",
    description:
      "A five-page report connecting sales, margins, inventory and lost opportunities for a fictional car importer.",
    relevance:
      "Making financial performance traceable, from the source workbook to the final measure.",
    href: "https://github.com/danishaulov/Car-Company",
    note: "Self-generated, synthetic data",
    details:
      "Built from four Excel workbooks covering 5,000 sales, 2,159 lost leads and 60 staff. Includes a win-back scenario to explore recoverable revenue. The report is stored in PBIP/TMDL format so changes to the model can be reviewed.",
  },
  {
    title: "Churn Prediction Engine",
    category: "Finance",
    tools: "Python / PostgreSQL / Power BI",
    description:
      "A subscription revenue study built on approximately 23 million KKBox transactions, from data cleaning to a four-page report.",
    relevance:
      "Understanding recurring revenue and the assumptions behind a risk estimate.",
    href: "https://github.com/danishaulov/churn-prediction-engine",
    note: "Public dataset / independent project",
    details:
      "SQL calculates MRR, ARPU and customer lifetime value. A Random Forest model estimates churn risk, and a FastAPI layer serves the results. Revenue-at-risk figures are model estimates, not realised savings.",
  },
  {
    title: "MyAnalyst",
    category: "Tools & apps",
    tools: "TypeScript / ECharts / Web Workers",
    description:
      "An analysis workspace that turns uploaded files into dashboards, statistical summaries and explorable reports.",
    relevance:
      "Reducing repetitive preparation while keeping the underlying data available for review.",
    href: "https://myanalyst.net",
    repo: "https://github.com/danishaulov/MyAnalyst",
    details:
      "Supports CSV, Excel, JSON and SQLite inputs. Combines data cleaning, charts, forecasting and plain-language questions in a browser-based workspace.",
  },
  {
    title: "Ethereum Macro Analysis",
    category: "Finance",
    tools: "Python / Pandas / Statistics",
    description:
      "Research into the relationship between Ethereum prices and macroeconomic indicators using multivariate regression.",
    relevance:
      "Testing a financial hypothesis and explaining the limits of the evidence.",
    href: "https://github.com/danishaulov/Ethereum-Macro-Analysis",
    details:
      "Explores Fed decisions, the dollar index, Nasdaq and Bitcoin dominance alongside on-chain data. A research project, not an investment recommendation.",
  },
  {
    title: "Craftiverse Customer Behaviour",
    category: "Data",
    tools: "Power BI / SQL / Python",
    description:
      "An analysis of 36 months of player transaction logs, looking at retention, economy leaks and customer segments.",
    relevance:
      "Following transaction patterns to find exceptions and understand behaviour.",
    href: "https://github.com/danishaulov/CustomerBehaviour",
    details:
      "Connects transaction-level analysis with an interactive Power BI dashboard for examining the game economy and player cohorts.",
  },
  {
    title: "L.A. Crime Rate",
    category: "Data",
    tools: "Power Query / DAX / Python",
    description:
      "A seven-page report built from approximately 853,000 incidents, with repeatable cleaning and validation steps.",
    relevance: "Checking source quality before trusting a report.",
    href: "https://github.com/danishaulov/LA-Crime-Rate-PowerBI",
    details:
      "Power Query handles header repair, date parsing and sentinel values. Python validation checks for schema changes before refresh; DAX measures cover trends and reporting lag.",
  },
  {
    title: "TickerIO",
    category: "Tools & apps",
    tools: "Next.js / TypeScript / SSE",
    description:
      "A market dashboard bringing price charts, timeframe performance and news summaries into one place.",
    relevance:
      "Presenting financial information clearly and defining what each metric measures.",
    href: "https://ticker-io.vercel.app",
    repo: "https://github.com/danishaulov/TickerIO",
    details:
      "Supports stocks, crypto and forex. Anchored timeframes distinguish a move since the week's open from a rolling seven-day change.",
  },
  {
    title: "Personal website",
    category: "Tools & apps",
    tools: "Next.js / TypeScript / CSS",
    description:
      "The site you are reading. A home for my accounting studies, technical projects and professional background.",
    relevance:
      "Writing clearly, organising information and taking a project from idea to delivery.",
    href: "https://github.com/danishaulov/Portfolio",
    details:
      "Responsive layouts, light and dark themes, accessible navigation and a contact form. Built with the help of AI coding tools, with content and results reviewed.",
  },
];
export const strengths = [
  {
    title: "Excel beyond the basics",
    tools: "Excel & Power Query",
    body: "PivotTables, lookups and structured data preparation. Useful foundations for comparing records, checking totals and investigating differences.",
  },
  {
    title: "Repeatable data checks",
    tools: "SQL & Python",
    body: "Querying transaction data, cleaning messy exports and building repeatable checks. Skills I can bring to reconciliations, exception checks and recurring reporting.",
  },
  {
    title: "Reporting with context",
    tools: "Power BI & DAX",
    body: "Turning a data model into understandable measures and reports. Connecting revenue, margins and operational drivers without losing the context.",
  },
  {
    title: "Responsibility & follow-through",
    tools: "Discipline & communication",
    body: "Military service, security work and coordinating programmes taught me to follow procedures, stay composed and take responsibility for the details.",
  },
];
export const experience = [
  {
    period: "2023–present",
    title: "Shift Supervisor, Security & Access Control",
    place: "Team 3",
    body: "Coordinate shift schedules and coverage, support the team and maintain access-control records. Work that depends on attention, consistent procedures and reliable handovers alongside my studies.",
  },
  {
    period: "2022–present",
    title: "Freelance Analyst & Developer",
    place: "Independent",
    body: "Data pipelines, Power BI dashboards, responsive websites and game-server plugins. Working from a client's question through to something they can use.",
  },
  {
    period: "2022–2023",
    title: "Military Prep Coordinator",
    place: "Midor Ledor Association",
    body: "Coordinated preparation programmes for combat-unit candidates, balancing logistics, parallel schedules and one-to-one mentorship.",
  },
  {
    period: "2020–2022",
    title: "Combat Soldier",
    place: "IDF / Nahal Brigade",
    body: "Operational service in the Nahal Brigade, including Operation Guardian of the Walls. A grounding in teamwork, responsibility and staying composed under pressure.",
  },
];

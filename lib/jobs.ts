// Shared job-post types, constants and helpers.
// `JobFormData` is the exact shape the New Job page collects; `JobPost`
// extends it with the extra columns the Manage Jobs table needs.

export const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"] as const
export type JobType = (typeof JOB_TYPES)[number]

export const CATEGORIES = [
  "Engineering & Tech",
  "Design & Creative",
  "Marketing",
  "Product",
  "Sales & Business",
  "Customer Support",
  "Finance & Legal",
  "Operations",
]

export const SALARY_FREQUENCIES = ["per hour", "per month", "per year"]

export type JobFormData = {
  title: string
  company: string
  category: string
  jobType: JobType
  isRemote: boolean
  location: string
  deadline: string
  minSalary: string
  maxSalary: string
  salaryFrequency: string
  responsibilities: string
  requirements: string
}

export const INITIAL_JOB_FORM: JobFormData = {
  title: "",
  company: "",
  category: CATEGORIES[0],
  jobType: "Full-time",
  isRemote: false,
  location: "",
  deadline: "",
  minSalary: "",
  maxSalary: "",
  salaryFrequency: SALARY_FREQUENCIES[0],
  responsibilities: "",
  requirements: "",
}

// ── Table row shape (JobFormData + dashboard-only columns) ───────────────────

export type JobPostStatus = "Active" | "Expired"

export type JobPost = JobFormData & {
  id: string
  applicants: number
  status: JobPostStatus
  /** Relative label shown under the deadline, e.g. "Posted 4d ago". */
  postedLabel: string
}

// Dummy data straight from the "Manage Job Posts" Figma screen —
// every row is a real JobFormData plus the table-only fields.
export const DUMMY_JOB_POSTS: JobPost[] = [
  {
    id: "job-1",
    title: "Frontend Developer",
    company: "HirePulse Network",
    category: "Engineering & Tech",
    jobType: "Full-time",
    isRemote: true,
    location: "New York, USA",
    deadline: "2025-05-30",
    minSalary: "25",
    maxSalary: "40",
    salaryFrequency: "per hour",
    responsibilities:
      "Craft responsive, micro-interaction rich products alongside designers and backend engineers.",
    requirements: "3+ years of React, TypeScript and modern state architectures.",
    applicants: 34,
    status: "Active",
    postedLabel: "Posted 4d ago",
  },
  {
    id: "job-2",
    title: "Senior Product Designer",
    company: "HirePulse Labs",
    category: "Design & Creative",
    jobType: "Full-time",
    isRemote: false,
    location: "London, UK (Hybrid)",
    deadline: "2025-06-14",
    minSalary: "90000",
    maxSalary: "115000",
    salaryFrequency: "per year",
    responsibilities:
      "Own end-to-end product design for our core platform experience.",
    requirements: "Strong portfolio of complex, data-heavy product interfaces.",
    applicants: 19,
    status: "Active",
    postedLabel: "Posted 1w ago",
  },
  {
    id: "job-3",
    title: "DevOps Specialist",
    company: "HirePulse Platform",
    category: "Engineering & Tech",
    jobType: "Full-time",
    isRemote: false,
    location: "Berlin, Germany",
    deadline: "2025-06-30",
    minSalary: "95000",
    maxSalary: "120000",
    salaryFrequency: "per year",
    responsibilities: "Keep our infrastructure monitoring tooling reliable and fast.",
    requirements: "Deep experience with Kubernetes, Terraform and observability stacks.",
    applicants: 12,
    status: "Active",
    postedLabel: "Posted 2w ago",
  },
  {
    id: "job-4",
    title: "Product Marketing Lead",
    company: "HirePulse Network",
    category: "Marketing",
    jobType: "Full-time",
    isRemote: true,
    location: "EU/US",
    deadline: "2025-07-15",
    minSalary: "80000",
    maxSalary: "105000",
    salaryFrequency: "per year",
    responsibilities: "Position and launch our infrastructure products across regions.",
    requirements: "5+ years in B2B SaaS product marketing.",
    applicants: 27,
    status: "Active",
    postedLabel: "Posted 5d ago",
  },
  {
    id: "job-5",
    title: "QA Automation Engineer",
    company: "HirePulse Platform",
    category: "Engineering & Tech",
    jobType: "Part-time",
    isRemote: false,
    location: "Dublin, Ireland (Hybrid)",
    deadline: "2025-05-01",
    minSalary: "35",
    maxSalary: "50",
    salaryFrequency: "per hour",
    responsibilities: "Automate regression suites for the web platform.",
    requirements: "Playwright or Cypress experience in a CI environment.",
    applicants: 8,
    status: "Expired",
    postedLabel: "Closed",
  },
]

// ── Display helpers (shared by the table and future preview panel) ───────────

function formatAmount(value: string) {
  const n = Number(value)
  if (!Number.isFinite(n) || n <= 0) return ""
  return n >= 1000 ? `€${Math.round(n / 1000)}k` : `€${n}`
}

export function formatCompensation(job: Pick<JobFormData, "minSalary" | "maxSalary" | "salaryFrequency">) {
  const from = formatAmount(job.minSalary)
  const to = formatAmount(job.maxSalary)
  if (!from && !to) return "—"
  const range = from && to ? `${from} – ${to}` : (from || to)
  const unit = job.salaryFrequency === "per hour" ? "hr" : job.salaryFrequency === "per month" ? "mo" : "yr"
  return `${range} / ${unit}`
}

export function formatLocation(job: Pick<JobFormData, "isRemote" | "location">) {
  return job.isRemote ? `Remote (${job.location})` : job.location
}

export function formatDeadline(iso: string) {
  if (!iso) return "—"
  const date = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

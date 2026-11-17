// Single shared home for the app's domain types and their option lists.
// Pages, components, server actions and the data layer all import from here —
// never redeclare a type locally.

import type { LucideIcon } from "lucide-react"

// ── Jobs ─────────────────────────────────────────────────────────────────────

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

export type JobPostStatus = "Active" | "Expired"

/** Exactly what the New Job form collects — and what we store in MongoDB. */
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

/** A saved job document from the Atlas `Adminloop.jobs` collection. */
export type JobRecord = JobFormData & {
  /** MongoDB ObjectId as a plain string. */
  _id: string
  /** ISO timestamp of when the job was published, when available. */
  createdAt: string | null
  applicants?: number
}

/** Display row for the Manage Jobs table (JobRecord + computed fields). */
export type JobPost = Omit<JobRecord, "applicants"> & {
  applicants: number
  status: JobPostStatus
  /** Relative label under the deadline, e.g. "Posted 4d ago". */
  postedLabel: string
}

// ── Navigation ───────────────────────────────────────────────────────────────

export type UserRole = "seeker" | "recruiter" | "admin"

export type MenuItem = {
  id: string
  name: string
  url: string
  icon: LucideIcon
}

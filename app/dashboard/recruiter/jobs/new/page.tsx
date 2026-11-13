"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

// ── Form data ────────────────────────────────────────────────────────────────
// One flat object, one state — the whole form is collected into this single
// shape and handed to the backend when the integration is wired up.

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"] as const
const CATEGORIES = [
  "Engineering & Tech",
  "Design & Creative",
  "Marketing",
  "Product",
  "Sales & Business",
  "Customer Support",
  "Finance & Legal",
  "Operations",
]
const SALARY_FREQUENCIES = ["per hour", "per month", "per year"]

type JobFormData = {
  title: string
  company: string
  category: string
  jobType: (typeof JOB_TYPES)[number]
  isRemote: boolean
  location: string
  deadline: string
  minSalary: string
  maxSalary: string
  salaryFrequency: string
  responsibilities: string
  requirements: string
}

const INITIAL_JOB_FORM: JobFormData = {
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

// ── Small building blocks ────────────────────────────────────────────────────

const fieldClass =
  "h-9 rounded-lg border-white/10 bg-white/5 text-white placeholder:text-neutral-500 focus-visible:border-brand-hover/60 focus-visible:ring-brand/25 dark:bg-white/5"

function SectionHeading({ index, title }: { index: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-sm font-semibold text-brand">
        {index}
      </span>
      <h2 className="text-base font-semibold text-white">{title}</h2>
    </div>
  )
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string
  htmlFor: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor} className="text-neutral-300">
        {label}
        {required && <span className="text-brand">*</span>}
      </Label>
      {children}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function NewJobPage() {
  const [form, setForm] = React.useState<JobFormData>(INITIAL_JOB_FORM)
  const [collected, setCollected] = React.useState<JobFormData | null>(null)

  // Single generic updater — every field does update("name", value)
  const update = <K extends keyof JobFormData>(key: K, value: JobFormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Integration point → POST `form` to the jobs API when the backend is ready
    console.log("[new job] form data:", form)
    setCollected(form)
  }

  return (
    <main className="min-h-svh bg-[#101010] px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        {/* Header — breadcrumb, title and the publish action (as in the design) */}
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <nav className="flex items-center gap-1 text-sm text-neutral-400">
              <Link
                href="/dashboard/recruiter/jobs"
                className="transition-colors hover:text-white"
              >
                Manage Jobs
              </Link>
              <ChevronRight className="size-3.5 text-neutral-600" />
              <span className="text-neutral-300">Create New Listing</span>
            </nav>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Post a New Job
            </h1>
            <p className="text-sm text-neutral-400">
              Fill in the position specifications to attract qualified talent
              across our network.
            </p>
          </div>
          <Button
            type="submit"
            form="new-job-form"
            className="h-10 bg-brand px-5 text-brand-foreground hover:bg-brand-hover"
          >
            Publish Job
          </Button>
        </header>

        <form
          id="new-job-form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          {/* 1. Basic Information */}
          <section className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#151515] p-6">
            <SectionHeading index={1} title="Basic Information" />

            <Field label="Job Title" htmlFor="title" required>
              <Input
                id="title"
                type="text"
                required
                placeholder="Frontend Developer"
                className={fieldClass}
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Company Name" htmlFor="company" required>
                <Input
                  id="company"
                  type="text"
                  required
                  placeholder="HirePulse Network"
                  className={fieldClass}
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                />
              </Field>

              <Field label="Job Category" htmlFor="category" required>
                <Select
                  value={form.category}
                  onValueChange={(value) => update("category", value ?? form.category)}
                >
                  <SelectTrigger
                    id="category"
                    className={cn("w-full", fieldClass)}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <Field label="Job Type" htmlFor="job-type" required>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {JOB_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    aria-pressed={form.jobType === type}
                    onClick={() => update("jobType", type)}
                    className={cn(
                      "flex h-9 cursor-pointer items-center justify-center rounded-lg border px-3 text-sm font-medium transition-colors outline-none focus-visible:border-ring",
                      form.jobType === type
                        ? "border-brand-hover/60 bg-brand/15 text-white"
                        : "border-white/10 bg-white/5 text-neutral-400 hover:text-neutral-200"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </Field>
          </section>

          {/* 2. Location, Compensation & Timeline */}
          <section className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#151515] p-6">
            <SectionHeading index={2} title="Location, Compensation & Timeline" />

            {/* Remote work toggle */}
            <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-white">
                  Remote Work Allowed
                </span>
                <span className="text-xs text-neutral-500">
                  Enable worldwide or distributed candidate applications
                </span>
              </div>
              <Switch
                checked={form.isRemote}
                onCheckedChange={(checked) => update("isRemote", checked)}
                aria-label="Remote work allowed"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Job Location" htmlFor="location" required>
                <Input
                  id="location"
                  type="text"
                  required
                  placeholder="New York, USA"
                  className={fieldClass}
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                />
              </Field>

              <Field label="Application Deadline" htmlFor="deadline">
                <Input
                  id="deadline"
                  type="date"
                  className={cn(fieldClass, "[color-scheme:dark]")}
                  value={form.deadline}
                  onChange={(e) => update("deadline", e.target.value)}
                />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <Field label="Min Salary / Rate" htmlFor="min-salary">
                <Input
                  id="min-salary"
                  type="number"
                  min="0"
                  placeholder="20"
                  className={fieldClass}
                  value={form.minSalary}
                  onChange={(e) => update("minSalary", e.target.value)}
                />
              </Field>

              <Field label="Max Salary / Rate" htmlFor="max-salary">
                <Input
                  id="max-salary"
                  type="number"
                  min="0"
                  placeholder="50"
                  className={fieldClass}
                  value={form.maxSalary}
                  onChange={(e) => update("maxSalary", e.target.value)}
                />
              </Field>

              <Field label="Frequency" htmlFor="salary-frequency">
                <Select
                  value={form.salaryFrequency}
                  onValueChange={(value) => update("salaryFrequency", value ?? form.salaryFrequency)}
                >
                  <SelectTrigger
                    id="salary-frequency"
                    className={cn("w-full", fieldClass)}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SALARY_FREQUENCIES.map((frequency) => (
                      <SelectItem key={frequency} value={frequency}>
                        {frequency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </section>

          {/* 3. Responsibilities & Requirements */}
          <section className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#151515] p-6">
            <SectionHeading index={3} title="Responsibilities & Requirements" />

            <Field label="Key Responsibilities" htmlFor="responsibilities" required>
              <Textarea
                id="responsibilities"
                required
                rows={4}
                placeholder="Describe the day-to-day work, separated by new lines or bullets…"
                className="min-h-28 rounded-lg border-white/10 bg-white/5 text-white placeholder:text-neutral-500 focus-visible:border-brand-hover/60 focus-visible:ring-brand/25 dark:bg-white/5"
                value={form.responsibilities}
                onChange={(e) => update("responsibilities", e.target.value)}
              />
            </Field>

            <Field label="Qualifications & Requirements" htmlFor="requirements" required>
              <Textarea
                id="requirements"
                required
                rows={4}
                placeholder={"• 3+ years of experience with React\n• Solid understanding of DOM performance"}
                className="min-h-28 rounded-lg border-white/10 bg-white/5 text-white placeholder:text-neutral-500 focus-visible:border-brand-hover/60 focus-visible:ring-brand/25 dark:bg-white/5"
                value={form.requirements}
                onChange={(e) => update("requirements", e.target.value)}
              />
            </Field>
          </section>

          {collected && (
            <p
              role="status"
              className="text-xs text-emerald-400"
            >
              ✓ Job post data captured — ready to wire into the backend.
            </p>
          )}
        </form>
      </div>
    </main>
  )
}

"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { createJob } from "@/lib/actions/jobs"
import { inputFieldClass, textareaFieldClass, brandButtonClass } from "@/lib/styles"
import { FormField } from "@/app/components/FormField"
import { PageShell } from "@/app/components/PageShell"
import { PageHeader } from "@/app/components/PageHeader"
import { SectionCard, SectionHeading } from "@/app/components/SectionCard"
import {
  CATEGORIES,
  INITIAL_JOB_FORM,
  JOB_TYPES,
  SALARY_FREQUENCIES,
  type JobFormData,
} from "@/lib/jobs"

// ── Page ─────────────────────────────────────────────────────────────────────

export default function NewJobPage() {
  const [form, setForm] = React.useState<JobFormData>(INITIAL_JOB_FORM)
  const [collected, setCollected] = React.useState<JobFormData | null>(null)
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  // Single generic updater — every field does update("name", value)
  const update = <K extends keyof JobFormData>(key: K, value: JobFormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      // Collect the whole form as one object and hand it to the backend
      await createJob(form)
      setCollected(form)
    } catch {
      setError("Could not publish the job post. Is the backend running?")
    } finally {
      setSubmitting(false)
    }
  }


  return (
    <PageShell>
      <PageHeader
        crumbs={[
          { label: "Manage Jobs", href: "/dashboard/recruiter/jobs" },
          { label: "Create New Listing" },
        ]}
        title="Post a New Job"
        description="Fill in the position specifications to attract qualified talent across our network."
        action={
          <Button
            type="submit"
            form="new-job-form"
            disabled={submitting}
            className={brandButtonClass}
          >
            {submitting ? "Publishing…" : "Publish Job"}
          </Button>
        }
      />

        <form
          id="new-job-form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          {/* 1. Basic Information */}
          <SectionCard>
            <SectionHeading index={1} title="Basic Information" />

            <FormField label="Job Title" htmlFor="title" required>
              <Input
                id="title"
                type="text"
                required
                placeholder="Frontend Developer"
                className={inputFieldClass}
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
              />
            </FormField>

            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label="Company Name" htmlFor="company" required>
                <Input
                  id="company"
                  type="text"
                  required
                  placeholder="HirePulse Network"
                  className={inputFieldClass}
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                />
              </FormField>

              <FormField label="Job Category" htmlFor="category" required>
                <Select
                  value={form.category}
                  onValueChange={(value) => update("category", value ?? form.category)}
                >
                  <SelectTrigger
                    id="category"
                    className={cn("w-full", inputFieldClass)}
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
              </FormField>
            </div>

            <FormField label="Job Type" htmlFor="job-type" required>
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
            </FormField>
          </SectionCard>

          {/* 2. Location, Compensation & Timeline */}
          <SectionCard>
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
              <FormField label="Job Location" htmlFor="location" required>
                <Input
                  id="location"
                  type="text"
                  required
                  placeholder="New York, USA"
                  className={inputFieldClass}
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                />
              </FormField>

              <FormField label="Application Deadline" htmlFor="deadline">
                <Input
                  id="deadline"
                  type="date"
                  className={cn(inputFieldClass, "[color-scheme:dark]")}
                  value={form.deadline}
                  onChange={(e) => update("deadline", e.target.value)}
                />
              </FormField>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <FormField label="Min Salary / Rate" htmlFor="min-salary">
                <Input
                  id="min-salary"
                  type="number"
                  min="0"
                  placeholder="20"
                  className={inputFieldClass}
                  value={form.minSalary}
                  onChange={(e) => update("minSalary", e.target.value)}
                />
              </FormField>

              <FormField label="Max Salary / Rate" htmlFor="max-salary">
                <Input
                  id="max-salary"
                  type="number"
                  min="0"
                  placeholder="50"
                  className={inputFieldClass}
                  value={form.maxSalary}
                  onChange={(e) => update("maxSalary", e.target.value)}
                />
              </FormField>

              <FormField label="Frequency" htmlFor="salary-frequency">
                <Select
                  value={form.salaryFrequency}
                  onValueChange={(value) => update("salaryFrequency", value ?? form.salaryFrequency)}
                >
                  <SelectTrigger
                    id="salary-frequency"
                    className={cn("w-full", inputFieldClass)}
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
              </FormField>
            </div>
          </SectionCard>

          {/* 3. Responsibilities & Requirements */}
          <SectionCard>
            <SectionHeading index={3} title="Responsibilities & Requirements" />

            <FormField label="Key Responsibilities" htmlFor="responsibilities" required>
              <Textarea
                id="responsibilities"
                required
                rows={4}
                placeholder="Describe the day-to-day work, separated by new lines or bullets…"
                className={textareaFieldClass}
                value={form.responsibilities}
                onChange={(e) => update("responsibilities", e.target.value)}
              />
            </FormField>

            <FormField label="Qualifications & Requirements" htmlFor="requirements" required>
              <Textarea
                id="requirements"
                required
                rows={4}
                placeholder={"• 3+ years of experience with React\n• Solid understanding of DOM performance"}
                className={textareaFieldClass}
                value={form.requirements}
                onChange={(e) => update("requirements", e.target.value)}
              />
            </FormField>
          </SectionCard>

          {collected && (
            <p
              role="status"
              className="text-xs text-emerald-400"
            >
              ✓ Job post published.
            </p>
          )}
          {error && (
            <p role="alert" className="text-xs text-[#f87171]">
              {error}
            </p>
          )}
        </form>
    </PageShell>
  )
}

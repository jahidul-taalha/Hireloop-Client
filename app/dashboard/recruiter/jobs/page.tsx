
import Link from "next/link"
import {
  Briefcase,
  ChevronRight,
  Copy,
  MapPin,
  Plus,
  SquarePen,
  Trash2,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import {
  DUMMY_JOB_POSTS,
  formatCompensation,
  formatDeadline,
  formatLocation,
  type JobPost,
} from "@/lib/jobs"
import { getJobs } from "@/lib/api/jobs"


// ── Small building blocks ────────────────────────────────────────────────────

const pillClass =
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"

function StatusPill({ status }: { status: JobPost["status"] }) {
  return (
    <span
      className={cn(
        pillClass,
        status === "Active"
          ? "bg-emerald-500/10 text-emerald-400"
          : "bg-white/5 text-neutral-400"
      )}
    >
      {status}
    </span>
  )
}

function TypePill({ type }: { type: JobPost["jobType"] }) {
  return (
    <span className={cn(pillClass, "border border-white/10 bg-white/5 text-neutral-300")}>
      {type}
    </span>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async  function ManageJobsPage() {
    const jobs: JobPost[] = await getJobs();
    


  const deleteJob = (id: string) =>
    setJobs((prev) => prev.filter((job) => job.id !== id))

  return (
    <main className="min-h-svh bg-[#101010] px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        {/* Header — breadcrumb, title and the create action (as in the design) */}
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
              <span className="text-neutral-300">Job Listings &amp; Postings</span>
            </nav>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Manage Job Posts
            </h1>
            <p className="text-sm text-neutral-400">
              Review live listings, monitor applicants, and update job details
              across your organization.
            </p>
          </div>
          <Button
            render={<Link href="/dashboard/recruiter/jobs/new" />}
            className="h-10 bg-brand px-5 text-brand-foreground hover:bg-brand-hover"
          >
            <Plus data-icon="inline-start" className="size-4" />
            New Job Post
          </Button>
        </header>

        {/* Postings table — scrolls horizontally on narrow screens */}
        <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#151515]">
          <Table className="min-w-[960px]">
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="h-11 px-4 text-xs font-medium tracking-wider text-neutral-500 uppercase">
                  Job Title &amp; Dept
                </TableHead>
                <TableHead className="h-11 px-4 text-xs font-medium tracking-wider text-neutral-500 uppercase">
                  Company &amp; Location
                </TableHead>
                <TableHead className="h-11 px-4 text-xs font-medium tracking-wider text-neutral-500 uppercase">
                  Type
                </TableHead>
                <TableHead className="h-11 px-4 text-xs font-medium tracking-wider text-neutral-500 uppercase">
                  Compensation
                </TableHead>
                <TableHead className="h-11 px-4 text-xs font-medium tracking-wider text-neutral-500 uppercase">
                  Applicants
                </TableHead>
                <TableHead className="h-11 px-4 text-xs font-medium tracking-wider text-neutral-500 uppercase">
                  Status
                </TableHead>
                <TableHead className="h-11 px-4 text-xs font-medium tracking-wider text-neutral-500 uppercase">
                  Deadline
                </TableHead>
                <TableHead className="h-11 px-4 text-right text-xs font-medium tracking-wider text-neutral-500 uppercase">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job._id} className="border-white/10 hover:bg-white/[0.02]">
                  {/* Job Title & Dept */}
                  <TableCell className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand">
                        <Briefcase className="size-4" />
                      </span>
                      <div className="flex min-w-0 flex-col">
                        <span className="truncate text-sm font-medium text-white">
                          {job.title}
                        </span>
                        <span className="truncate text-xs text-neutral-500">
                          {job.category}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Company & Location */}
                  <TableCell className="px-4 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm text-neutral-200">{job.company}</span>
                      <span className="flex items-center gap-1.5 text-xs text-neutral-500">
                        <MapPin className="size-3.5 shrink-0" />
                        {formatLocation(job)}
                      </span>
                    </div>
                  </TableCell>

                  {/* Type */}
                  <TableCell className="px-4 py-4">
                    <TypePill type={job.jobType} />
                  </TableCell>

                  {/* Compensation */}
                  <TableCell className="px-4 py-4">
                    <span className="text-sm font-medium text-neutral-200">
                      {formatCompensation(job)}
                    </span>
                  </TableCell>

                  {/* Applicants */}
                  <TableCell className="px-4 py-4">
                    <span className="flex items-center gap-1.5 text-sm text-neutral-300">
                      <Users className="size-4 text-neutral-500" />
                      {job.applicants} Candidates
                    </span>
                  </TableCell>

                  {/* Status */}
                  <TableCell className="px-4 py-4">
                    <StatusPill status={job.status} />
                  </TableCell>

                  {/* Deadline */}
                  <TableCell className="px-4 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm text-neutral-200">
                        {formatDeadline(job.deadline)}
                      </span>
                      <span className="text-xs text-neutral-500">{job.postedLabel}</span>
                    </div>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="px-4 py-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-white/10 bg-white/5 text-neutral-200 hover:bg-white/10 hover:text-white"
                      >
                        <SquarePen className="size-3.5" />
                        Update
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Duplicate ${job.title}`}
                        title="Duplicate"
                        className="text-neutral-400 hover:bg-white/10 hover:text-white"
                      >
                        <Copy className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Delete ${job.title}`}
                        title="Delete"
                        onClick={() => deleteJob(job.id)}
                        className="text-neutral-400 hover:bg-destructive/15 hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {jobs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="px-4 py-12 text-center text-sm text-neutral-500">
                    No job posts yet — create your first listing.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </section>
      </div>
    </main>
  )
}

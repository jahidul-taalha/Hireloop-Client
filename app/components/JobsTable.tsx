"use client"

import {
  Briefcase,
  Copy,
  MapPin,
  SquarePen,
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
import { DeleteJobDialog } from "@/app/components/DeleteJobDialog"
import { StatusPill, TypePill } from "@/app/components/Pill"
import { cn } from "@/lib/utils"
import { cardClass } from "@/lib/styles"
import {
  formatCompensation,
  formatDeadline,
  formatLocation,
  toJobPost,
} from "@/lib/jobs"
import type { JobRecord } from "@/lib/types"

const headClass = "h-11 px-4 text-xs font-medium tracking-wider text-neutral-500 uppercase"
const cellClass = "px-4 py-4"

/** The "Manage Job Posts" table — reusable, scrolls horizontally on narrow screens. */
export function JobsTable({ jobs }: { jobs: JobRecord[] }) {
  const rows = jobs.map(toJobPost)

  return (
    <section className={cn(cardClass, "overflow-hidden")}>
      <Table className="min-w-[960px]">
        <TableHeader>
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className={headClass}>Job Title &amp; Dept</TableHead>
            <TableHead className={headClass}>Company &amp; Location</TableHead>
            <TableHead className={headClass}>Type</TableHead>
            <TableHead className={headClass}>Compensation</TableHead>
            <TableHead className={headClass}>Applicants</TableHead>
            <TableHead className={headClass}>Status</TableHead>
            <TableHead className={headClass}>Deadline</TableHead>
            <TableHead className={cn(headClass, "text-right")}>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((job) => (
            <TableRow key={job._id} className="border-white/10 hover:bg-white/[0.02]">
              {/* Job Title & Dept */}
              <TableCell className={cellClass}>
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
              <TableCell className={cellClass}>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm text-neutral-200">{job.company}</span>
                  <span className="flex items-center gap-1.5 text-xs text-neutral-500">
                    <MapPin className="size-3.5 shrink-0" />
                    {formatLocation(job)}
                  </span>
                </div>
              </TableCell>

              {/* Type */}
              <TableCell className={cellClass}>
                <TypePill type={job.jobType} />
              </TableCell>

              {/* Compensation */}
              <TableCell className={cellClass}>
                <span className="text-sm font-medium text-neutral-200">
                  {formatCompensation(job)}
                </span>
              </TableCell>

              {/* Applicants */}
              <TableCell className={cellClass}>
                <span className="flex items-center gap-1.5 text-sm text-neutral-300">
                  <Users className="size-4 text-neutral-500" />
                  {job.applicants} Candidates
                </span>
              </TableCell>

              {/* Status */}
              <TableCell className={cellClass}>
                <StatusPill status={job.status} />
              </TableCell>

              {/* Deadline */}
              <TableCell className={cellClass}>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm text-neutral-200">
                    {formatDeadline(job.deadline)}
                  </span>
                  <span className="text-xs text-neutral-500">{job.postedLabel}</span>
                </div>
              </TableCell>

              {/* Actions */}
              <TableCell className={cellClass}>
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
                  <DeleteJobDialog job={{ _id: job._id, title: job.title }} />
                </div>
              </TableCell>
            </TableRow>
          ))}

          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="px-4 py-12 text-center text-sm text-neutral-500">
                No job posts yet — create your first listing.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  )
}

import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { brandButtonClass } from "@/lib/styles"
import { getJobs } from "@/lib/api/jobs"
import { PageShell } from "@/app/components/PageShell"
import { PageHeader } from "@/app/components/PageHeader"
import { JobsTable } from "@/app/components/JobsTable"

// Server component — jobs are read straight from the database.
export default async function ManageJobsPage() {
  const jobs = await getJobs()

  return (
    <PageShell wide>
      <PageHeader
        crumbs={[
          { label: "Manage Jobs", href: "/dashboard/recruiter/jobs" },
          { label: "Job Listings & Postings" },
        ]}
        title="Manage Job Posts"
        description="Review live listings, monitor applicants, and update job details across your organization."
        action={
          <Button
            render={<Link href="/dashboard/recruiter/jobs/new" />}
            className={brandButtonClass}
          >
            <Plus data-icon="inline-start" className="size-4" />
            New Job Post
          </Button>
        }
      />

      <JobsTable jobs={jobs} />
    </PageShell>
  )
}

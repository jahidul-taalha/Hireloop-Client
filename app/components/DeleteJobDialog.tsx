"use client"

import { Trash2Icon } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { cn } from "@/lib/utils"
import { deleteJob } from "@/lib/actions/jobs"
import type { JobRecord } from "@/lib/types"

/** Trash button that asks for confirmation, then deletes via the server action. */
export function DeleteJobDialog({
    job,
    className,
}: {
    job: Pick<JobRecord, "_id" | "title">
    /** Extra classes for the trigger button (defaults to the table ghost style). */
    className?: string
}) {
    const [open, setOpen] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        setDeleting(true)
        try {
            const res = await deleteJob(job._id)

            if (res.deletedCount) {
                setOpen(false)
                toast.add({
                    type: "success",
                    title: "Job post deleted",
                    description: `"${job.title}" was permanently removed from your listings.`,
                })
                router.refresh()
            }
        } finally {
            setDeleting(false)
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger
                render={
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Delete ${job.title}`}
                        title="Delete"
                        className={cn(
                            "text-neutral-400 hover:bg-destructive/15 hover:text-destructive",
                            className
                        )}
                    >
                        <Trash2Icon className="size-4" />
                    </Button>
                }
            />
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete job post?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete &quot;{job.title}&quot; and remove it from
                        your job listings. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={deleting}
                    >
                        {deleting ? "Deleting…" : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

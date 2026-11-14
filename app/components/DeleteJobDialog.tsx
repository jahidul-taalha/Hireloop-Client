'use client'

import { Trash2Icon } from "lucide-react"

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
import { useState } from "react";
import { deleteJob } from "@/lib/actions/jobs";
import { toast } from "@/components/ui/toast"

import { useRouter } from 'next/navigation'

export function DeleteJobDialog({ job }: { job: jobRow }) {
    const [open, setopen] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        const res = await deleteJob(job._id);

        if (res.deletedCount) {
            setopen(false);
            toast.add({
                title: "Event created",
                description: "Sunday, December 3 at 9:00 AM",
            })
            router.refresh();
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setopen}>
            <AlertDialogTrigger
                render={<Button variant="destructive"><Trash2Icon /></Button>}
            />
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete chat?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete this chat conversation. View{" "}
                        <a href="#">Settings</a> delete any memories saved during this chat.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={handleDelete}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

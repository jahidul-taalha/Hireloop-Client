import { db } from "@/lib/db"
import type { JobRecord } from "@/lib/types"

// Reads job posts straight from the Atlas `Adminloop.jobs` collection —
// the same DB the createJob server action writes to (there is no separate
// backend server).

export async function getJobs(): Promise<JobRecord[]> {
  try {
    const docs = await db
      .collection("jobs")
      .find()
      .sort({ createdAt: -1 })
      .toArray()

    return docs.map((doc) => {
      const { _id, createdAt, ...rest } = doc as unknown as {
        _id: { toString(): string }
        createdAt?: Date | string
      } & Record<string, unknown>

      return {
        ...(rest as Omit<JobRecord, "_id" | "createdAt">),
        _id: _id.toString(),
        createdAt:
          createdAt instanceof Date ? createdAt.toISOString() : (createdAt ?? null),
      }
    })
  } catch (error) {
    // Keep the dashboard rendering even if the database is unreachable.
    console.error("[getJobs] failed to read jobs from the database:", error)
    return []
  }
}

"use server";

import { ObjectId } from "mongodb";
import { db } from "@/lib/db";
import { type JobFormData } from "@/lib/jobs";

// All job persistence goes straight into the Atlas `Adminloop.jobs`
// collection — the same connection better-auth uses.

/** Publishes a job post from the New Job form. */
export async function createJob(data: JobFormData) {
  const result = await db.collection("jobs").insertOne({
    ...data,
    createdAt: new Date(),
  });

  if (!result.acknowledged) {
    throw new Error("Insert was not acknowledged by MongoDB");
  }

  return { success: true, id: result.insertedId.toString() };
}

/** Permanently removes a job post by its MongoDB id. */
export async function deleteJob(jobId: string) {
  if (!ObjectId.isValid(jobId)) {
    return { deletedCount: 0 };
  }

  const result = await db.collection("jobs").deleteOne({
    _id: new ObjectId(jobId),
  });

  return { deletedCount: result.deletedCount };
}

"use server";

import { db } from "@/lib/db";
import { type JobFormData } from "@/lib/jobs";

// Saves the job post straight into the Atlas `Adminloop.jobs` collection.
// (There is no separate backend server — the Next app talks to MongoDB directly,
// the same connection better-auth uses for the account/session/user collections.)
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

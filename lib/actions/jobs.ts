import { JobFormData } from "@/app/dashboard/recruiter/jobs/new/page";


Const BASE_URL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:5000";

export const createJob = async (data : JobFormData) => {
  const response = await fetch(`${BASE_URL}/api/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
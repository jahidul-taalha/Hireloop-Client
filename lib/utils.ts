export { cn } from "cn"

// Role → dashboard home routes (public pages per Project requirements)
export type UserRole = "seeker" | "recruiter" | "admin"

const DASHBOARD_HOME: Record<UserRole, string> = {
  seeker: "/dashboard/seeker",
  recruiter: "/dashboard/recruiter",
  admin: "/dashboard/admin",
}

export function dashboardHome(role: string | null | undefined): string {
  if (role === "recruiter" || role === "admin" || role === "seeker") {
    return DASHBOARD_HOME[role]
  }
  return DASHBOARD_HOME.seeker
}

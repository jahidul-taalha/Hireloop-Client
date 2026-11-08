"use client"

import { useRouter } from "next/navigation"

import { authClient } from "@/lib/auth-client"
import { AuthForm, type AuthFormData } from "@/components/auth-form"
import { dashboardHome } from "@/lib/utils"

export function SignUpForm() {
  const router = useRouter()

  return (
    <AuthForm
      mode="sign-up"
      onSubmit={async (data: AuthFormData) => {
        // Note: no callbackURL — it would hijack navigation back to "/" and
        // override the role-based redirect below
        const { data: result, error } = await authClient.signUp.email({
          name: data.name ?? "", // required - the user's name
          email: data.email, // required
          password: data.password, // required, 8-128 characters
          // Persisted via better-auth `user.additionalFields` in lib/auth.ts
          // (defaultValue: "seeker" when not provided)
          role: data.role ?? "seeker",
        })
        if (error) {
          throw new Error(
            error.message || "Unable to create your account. Try again."
          )
        }
        // A session cookie is set by sign-up — land on the role's dashboard
        const role = result?.user?.role
        router.replace(dashboardHome(role))
        router.refresh()
      }}
    />
  )
}

"use client"

import { useRouter } from "next/navigation"

import { authClient } from "@/lib/auth-client"
import { AuthForm, type AuthFormData } from "@/components/auth-form"
import { dashboardHome } from "@/lib/utils"

export function SignInForm() {
  const router = useRouter()

  return (
    <AuthForm
      mode="sign-in"
      onSubmit={async (data: AuthFormData) => {
        // Note: no callbackURL — it would hijack navigation back to "/" and
        // override the role-based redirect below
        const { data: result, error } = await authClient.signIn.email({
          email: data.email,
          password: data.password,
          rememberMe: data.remember ?? false,
        })
        if (error) {
          throw new Error(error.message || "Unable to sign in. Try again.")
        }
        // Route each role to its dashboard (Seeker / Recruiter / Admin)
        const role = result?.user?.role
        router.replace(dashboardHome(role))
        router.refresh()
      }}
    />
  )
}

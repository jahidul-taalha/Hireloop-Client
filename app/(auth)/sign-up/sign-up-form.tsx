"use client"

import { useRouter } from "next/navigation"

import { authClient } from "@/lib/auth-client"
import { AuthForm, type AuthFormData } from "@/components/auth-form"

export function SignUpForm() {
  const router = useRouter()

  return (
    <AuthForm
      mode="sign-up"
      onSubmit={async (data: AuthFormData) => {
        const { error } = await authClient.signUp.email({
          name: data.name ?? "", 
          email: data.email, 
          password: data.password, 
          callbackURL: "/",
          // Persisted via better-auth `user.additionalFields` in lib/auth.ts
          // (defaultValue: "seeker" when not provided)
          role: data.role ?? "seeker",
        })
        if (error) {
          throw new Error(
            error.message || "Unable to create your account. Try again."
          )
        }
        // Account created — go home
        router.push("/")
      }}
    />
  )
}

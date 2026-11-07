"use client"

import { useRouter } from "next/navigation"

import { authClient } from "@/lib/auth-client"
import { AuthForm, type AuthFormData } from "@/components/auth-form"

export function SignInForm() {
  const router = useRouter()

  return (
    <AuthForm
      mode="sign-in"
      onSubmit={async (data: AuthFormData) => {
        const { error } = await authClient.signIn.email({
          email: data.email,
          password: data.password,
          rememberMe: data.remember ?? false,
          callbackURL: "/",
        })
        if (error) {
          throw new Error(error.message || "Unable to sign in. Try again.")
        }
        // Signed in — go home
        router.push("/")
      }}
    />
  )
}

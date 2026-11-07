import type { Metadata } from "next"

import { AuthCard } from "@/components/auth-card"
import { SignInForm } from "./sign-in-form"

export const metadata: Metadata = {
  title: "Sign In — HireLoop",
}

export default function SignInPage() {
  return (
    <AuthCard mode="sign-in">
      <SignInForm />
    </AuthCard>
  )
}

import type { Metadata } from "next"

import { AuthCard } from "@/components/auth-card"
import { SignUpForm } from "./sign-up-form"

export const metadata: Metadata = {
  title: "Sign Up — HireLoop",
}

export default function SignUpPage() {
  return (
    <AuthCard mode="sign-up">
      <SignUpForm />
    </AuthCard>
  )
}

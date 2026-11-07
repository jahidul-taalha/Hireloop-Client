"use client"

import * as React from "react"
import Link from "next/link"
import { Building2, Eye, EyeOff, UserRound } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export type AuthMode = "sign-in" | "sign-up"

export const fieldClass =
  "h-10 rounded-lg border-white/10 bg-white/5 text-white placeholder:text-neutral-500 focus-visible:border-brand-hover/60 focus-visible:ring-brand/25 dark:bg-white/5"

// The collected shape (integration point — wire this into better-auth later)
export type AuthRole = "seeker" | "recruiter"

export type AuthPayload =
  | { mode: "sign-in"; email: string; password: string; remember: "on" | null }
  | {
      mode: "sign-up"
      role: AuthRole
      name: string
      email: string
      password: string
    }

const roleOptions = [
  {
    value: "seeker" as AuthRole,
    label: "Job Seeker",
    icon: UserRound,
    hint: "I'm looking for a job",
  },
  {
    value: "recruiter" as AuthRole,
    label: "Recruiter",
    icon: Building2,
    hint: "I'm hiring for a company",
  },
]

const roleToggle =
  "flex cursor-pointer flex-col items-start gap-0.5 rounded-lg border px-3 py-2 text-left transition-colors outline-none focus-visible:border-ring"

export function AuthForm({ mode }: { mode: AuthMode }) {
  const [showPassword, setShowPassword] = React.useState(false)
  const [role, setRole] = React.useState<AuthRole>("seeker")
  const [error, setError] = React.useState<string | null>(null)
  const [collected, setCollected] = React.useState<AuthPayload | null>(null)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    if (mode === "sign-up") {
      const { password, confirmPassword } = data as {
        password: string
        confirmPassword: string
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.")
        setCollected(null)
        return
      }
    }

    setError(null)

    const payload =
      mode === "sign-in"
        ? {
            mode,
            email: data.email as string,
            password: data.password as string,
            remember: (data.remember as "on") ?? null,
          }
        : {
            mode,
            role,
            name: data.name as string,
            email: data.email as string,
            password: data.password as string,
          }

    // TODO: replace with better-auth client, e.g.:
    // authClient.signUp.email({ name, email, password }, { ... })
    // then persist `role` on your user record (metadata / DB column)
    console.log(`[auth] ${mode} form data:`, payload)
    setCollected(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {mode === "sign-up" && (
        <fieldset className="flex flex-col gap-1.5">
          <legend className="mb-1.5 text-sm font-medium text-neutral-300">
            I am joining as
          </legend>
          <div className="grid grid-cols-2 gap-2">
            {roleOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={role === option.value}
                onClick={() => setRole(option.value)}
                className={cn(
                  roleToggle,
                  role === option.value
                    ? "border-brand-hover/60 bg-brand/15 text-white"
                    : "border-white/10 bg-white/5 text-neutral-400 hover:text-neutral-200"
                )}
              >
                <span className="flex items-center gap-1.5">
                  <option.icon
                    className={cn(
                      "size-4",
                      role === option.value ? "text-brand" : "text-neutral-500"
                    )}
                  />
                  <span className="text-sm font-medium">{option.label}</span>
                </span>
                <span className="text-xs text-neutral-500">{option.hint}</span>
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {mode === "sign-up" && (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name" className="text-neutral-300">
            Full name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Cooper"
            className={fieldClass}
          />
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email" className="text-neutral-300">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password" className="text-neutral-300">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            minLength={mode === "sign-up" ? 8 : undefined}
            autoComplete={
              mode === "sign-up" ? "new-password" : "current-password"
            }
            placeholder={mode === "sign-up" ? "8+ characters" : "••••••••"}
            className={cn(fieldClass, "pr-9")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex w-9 cursor-pointer items-center justify-center text-neutral-400 transition-colors hover:text-white"
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
      </div>

      {mode === "sign-up" && (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="confirmPassword" className="text-neutral-300">
            Confirm password
          </Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="new-password"
            placeholder="Re-enter password"
            className={fieldClass}
          />
        </div>
      )}

      {mode === "sign-in" && (
        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-300 select-none">
            <input
              type="checkbox"
              name="remember"
              value="on"
              className="size-4 accent-[#7c5cfc]"
            />
            Remember me
          </label>
          <Link
            href="/forgot-password"
            className="text-sm text-neutral-400 transition-colors hover:text-white"
          >
            Forgot password?
          </Link>
        </div>
      )}

      {mode === "sign-up" && (
        <p className="text-xs leading-relaxed text-neutral-500">
          By creating an account you agree to HireLoop&apos;s Terms of Service
          and Privacy Policy.
        </p>
      )}

      <Button
        type="submit"
        className="mt-1 h-10 w-full bg-brand text-brand-foreground hover:bg-brand-hover"
      >
        {mode === "sign-in" ? "Sign In" : "Create Account"}
      </Button>

      {error && (
        <p role="alert" className="text-xs text-[#f87171]">
          {error}
        </p>
      )}
      {collected && !error && (
        <p role="status" className="text-xs text-emerald-400">
          ✓ {mode === "sign-in" ? "Sign-in" : "Sign-up"} data captured — ready
          to wire into auth.
        </p>
      )}

      {mode === "sign-in" ? (
        <p className="text-center text-sm text-neutral-400">
          New to HireLoop?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-brand transition-colors hover:text-brand-hover"
          >
            Create an account
          </Link>
        </p>
      ) : (
        <p className="text-center text-sm text-neutral-400">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-brand transition-colors hover:text-brand-hover"
          >
            Sign In
          </Link>
        </p>
      )}
    </form>
  )
}

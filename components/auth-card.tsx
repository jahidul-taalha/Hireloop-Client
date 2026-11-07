import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

const modes = [
  { mode: "sign-in", label: "Sign In", href: "/sign-in" },
  { mode: "sign-up", label: "Sign Up", href: "/sign-up" },
] as const

export function AuthCard({
  mode,
  children,
}: {
  mode: "sign-in" | "sign-up"
  children: React.ReactNode
}) {
  return (
    <main className="relative isolate flex min-h-svh flex-col overflow-hidden bg-[#101010]">
      {/* Faint violet glow from the top, consistent with the landing page */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(ellipse_55%_55%_at_50%_0%,rgba(93,63,211,0.16),transparent_72%)]"
      />

      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Link href="/" aria-label="HireLoop home">
            <Image
              src="/logo.png"
              alt="HireLoop"
              width={128}
              height={32}
              priority
              className="h-8 w-auto"
            />
          </Link>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#151515] p-8 shadow-2xl shadow-black/40">
          {/* Toggle between the two pages */}
          <div className="mb-7 grid grid-cols-2 gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
            {modes.map((tab) => (
              <Link
                key={tab.mode}
                href={tab.href}
                aria-current={mode === tab.mode ? "page" : undefined}
                className={cn(
                  "flex h-9 items-center justify-center rounded-full text-sm font-medium transition-colors outline-none",
                  mode === tab.mode
                    ? "bg-brand text-white"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                {tab.label}
              </Link>
            ))}
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-white">
            {mode === "sign-in" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1.5 text-sm text-neutral-400">
            {mode === "sign-in"
              ? "Sign in to continue your job hunt."
              : "Join thousands of job seekers and recruiters."}
          </p>

          <div className="mt-6">{children}</div>
        </div>
      </div>
    </main>
  )
}

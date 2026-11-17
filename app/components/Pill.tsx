import { cn } from "@/lib/utils"

const pillBase = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"

const pillVariants = {
  /** Green "Active"-style pill. */
  active: "bg-emerald-500/10 text-emerald-400",
  /** Grayed-out "Expired"-style pill. */
  muted: "bg-white/5 text-neutral-400",
  /** Bordered neutral pill (job types etc.). */
  outline: "border border-white/10 bg-white/5 text-neutral-300",
} as const

type PillVariant = keyof typeof pillVariants

/** Small rounded status/tag pill used across the dashboard tables. */
export function Pill({
  variant = "outline",
  className,
  children,
}: {
  variant?: PillVariant
  className?: string
  children: React.ReactNode
}) {
  return <span className={cn(pillBase, pillVariants[variant], className)}>{children}</span>
}

/** Status column pill — Active / Expired. */
export function StatusPill({ status }: { status: string }) {
  return <Pill variant={status === "Active" ? "active" : "muted"}>{status}</Pill>
}

/** Job-type pill (Full-time, Part-time, …). */
export function TypePill({ type }: { type: string }) {
  return <Pill variant="outline">{type}</Pill>
}

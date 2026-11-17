import { cn } from "@/lib/utils"

/** Dark page wrapper with a centered content column (max-w-5xl by default). */
export function PageShell({
  wide = false,
  className,
  children,
}: {
  /** Use `wide` for content-heavy pages like tables. */
  wide?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <main className="min-h-svh bg-[#101010] px-6 py-8">
      <div
        className={cn(
          "mx-auto flex flex-col gap-8",
          wide ? "max-w-7xl" : "max-w-5xl",
          className
        )}
      >
        {children}
      </div>
    </main>
  )
}

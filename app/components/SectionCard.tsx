import { cn } from "@/lib/utils"
import { cardClass } from "@/lib/styles"

/** Numbered dark section card used to group form sections (as in the design). */
export function SectionCard({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <section className={cn(cardClass, "flex flex-col gap-5 p-6", className)}>
      {children}
    </section>
  )
}

/** Numbered heading inside a SectionCard. */
export function SectionHeading({ index, title }: { index: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-sm font-semibold text-brand">
        {index}
      </span>
      <h2 className="text-base font-semibold text-white">{title}</h2>
    </div>
  )
}

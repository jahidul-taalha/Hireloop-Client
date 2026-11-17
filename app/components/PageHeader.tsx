import { Fragment } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export type Crumb = {
  label: string
  href?: string
}

/**
 * Dashboard page header: breadcrumb trail, title, description and an
 * optional action slot on the right — as in the Figma dashboard screens.
 */
export function PageHeader({
  crumbs,
  title,
  description,
  action,
}: {
  crumbs: Crumb[]
  title: string
  description?: string
  action?: React.ReactNode
}) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex flex-col gap-1.5">
        <nav className="flex items-center gap-1 text-sm text-neutral-400">
          {crumbs.map((crumb, index) => (
            <Fragment key={`${crumb.label}-${index}`}>
              {index > 0 && <ChevronRight className="size-3.5 text-neutral-600" />}
              {crumb.href ? (
                <Link href={crumb.href} className="transition-colors hover:text-white">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-neutral-300">{crumb.label}</span>
              )}
            </Fragment>
          ))}
        </nav>
        <h1 className="text-2xl font-semibold tracking-tight text-white">{title}</h1>
        {description && <p className="text-sm text-neutral-400">{description}</p>}
      </div>
      {action}
    </header>
  )
}

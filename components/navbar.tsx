"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useSession } from "@/lib/auth-client"

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/companies" },
  { label: "Pricing", href: "/pricing" },
] as const

function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

function NavbarLink({
  href,
  label,
  active,
  onNavigate,
  className,
}: {
  href: string
  label: string
  active: boolean
  onNavigate?: () => void
  className?: string
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "text-[13px] font-medium text-neutral-300 transition-colors outline-none hover:text-white focus-visible:text-white",
        active && "text-white",
        className
      )}
    >
      {label}
    </Link>
  )
}

function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="HireLoop home"
      className={cn("flex shrink-0 items-center outline-none", className)}
    >
      <Image
        src="/logo.png"
        alt="HireLoop"
        width={128}
        height={32}
        priority
        className="h-6 w-auto md:h-7"
      />
    </Link>
  )
}

function AuthActions({
  isMobile = false,
  onNavigate,
}: {
  isMobile?: boolean
  onNavigate?: () => void
}) {
  const pathname = usePathname()

  if (isMobile) {
    return (
      <div className="flex flex-col gap-3">
        <NavbarLink
          href="/sign-in"
          label="Sign In"
          active={isActive("/sign-in", pathname)}
          onNavigate={onNavigate}
          className="text-brand"
        />
        <Button
          nativeButton={false}
          render={<Link href="/sign-up" onClick={onNavigate} />}
          className="h-10 w-full bg-brand text-brand-foreground hover:bg-brand-hover"
        >
          Get Started
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4 md:gap-5">
      <Separator
        orientation="vertical"
        className="h-5 self-auto bg-white/15"
      />
      <NavbarLink
        href="/sign-in"
        label="Sign In"
        active={isActive("/sign-in", pathname)}
        className="text-[13px] text-brand hover:text-brand-hover focus-visible:text-brand-hover"
      />
      <Button
        nativeButton={false}
        render={<Link href="/sign-up" />}
        className="h-8 bg-brand px-4 text-[13px] text-brand-foreground hover:bg-brand-hover"
      >
        Get Started
      </Button>
    </div>
  )
}

export function Navbar() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const{data: session} = useSession();

  console.log("Session in Navbar:", session); // Log the session data to the console


  return (
    <header className="sticky top-0 z-40 w-full bg-[#1e1e1e]">
      <div className="mx-auto flex h-14 w-full max-w-[1440px] items-center justify-between px-5 md:h-16 lg:px-12">
        <Logo />

        {/* Desktop navigation */}
        <nav
          aria-label="Main"
          className="hidden items-center gap-7 md:flex md:gap-8"
        >
          {navLinks.map((link) => (
            <NavbarLink
              key={link.href}
              href={link.href}
              label={link.label}
              active={isActive(link.href, pathname)}
            />
          ))}
          <AuthActions />
        </nav>

        {/* Mobile navigation trigger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden aria-expanded:bg-white/10"
                aria-label="Open menu"
              />
            }
          >
            <Menu />
          </SheetTrigger>
          <SheetContent
            side="right"
            showCloseButton
            className="w-72 gap-6 border-white/10 bg-[#1e1e1e] text-neutral-100"
          >
            <SheetHeader className="p-4 pb-0">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <Logo />
            </SheetHeader>
            <nav
              aria-label="Mobile"
              className="flex flex-col gap-1 px-4 text-base"
            >
              {navLinks.map((link) => (
                <NavbarLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  active={isActive(link.href, pathname)}
                  onNavigate={() => setOpen(false)}
                  className="rounded-md border border-transparent px-2 py-2 text-base hover:bg-white/5 focus-visible:bg-white/5"
                />
              ))}
            </nav>
            <Separator className="bg-white/10" />
            <div className="px-4 pb-6">
              <AuthActions isMobile onNavigate={() => setOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

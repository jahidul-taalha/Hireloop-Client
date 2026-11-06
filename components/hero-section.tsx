import Image from "next/image"
import Link from "next/link"
import { Briefcase, Search, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"

const heroStats = [
  { value: "40K+", label: "Active Jobs" },
  { value: "20K+", label: "Companies" },
  { value: "300K+", label: "Job Seekers" },
  { value: "98%", label: "Satisfaction Rate" },
] as const

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#1e1e1e]">
      {/* Purple swirl backdrop from the Figma design, fading into the page */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[42rem] opacity-40 [mask-image:linear-gradient(to_bottom,black_10%,transparent_85%)] sm:h-[48rem]"
      >
        <Image
          src="/hero-swirl.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-20 text-center sm:pt-28">
        <div className="mx-auto inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-neutral-300 backdrop-blur-sm">
          <Sparkles className="size-3.5 text-brand" />
          Your partner in global hiring
        </div>

        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold tracking-tighter text-balance text-white sm:text-5xl md:text-6xl">
          Find your future here —{" "}
          <span className="text-balance bg-gradient-to-r from-[#2b7fff] via-[#7c5cfc] to-[#ff7a1a] bg-clip-text text-transparent">
            hire and get hired.
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-neutral-400 md:text-lg">
          HireLoop connects job seekers and the companies that need them —
          smart search, salary insights, and a faster, data-driven way to land
          the role.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            nativeButton={false}
            render={<Link href="/jobs" />}
            className="h-11 bg-brand px-6 text-sm text-brand-foreground hover:bg-brand-hover"
          >
            <Search data-icon="inline-start" />
            Search Jobs
          </Button>
          <Button
            nativeButton={false}
            variant="outline"
            render={<Link href="/sign-up" />}
            className="h-11 border-white/15 bg-white/5 px-6 text-sm text-white hover:bg-white/10 hover:text-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
          >
            <Briefcase data-icon="inline-start" />
            Post a Job
          </Button>
        </div>

        {/* Live stats */}
        <div className="relative z-10 mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-1 bg-[#242424]/90 px-4 py-6"
            >
              <span className="text-2xl font-semibold text-white md:text-3xl">
                {stat.value}
              </span>
              <span className="text-sm text-neutral-400">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Globe horizon visual from the Figma design */}
      <div
        aria-hidden
        className="pointer-events-none relative -mt-10 flex justify-center pb-4 sm:-mt-16"
      >
        <Image
          src="/globe.png"
          alt=""
          width={1536}
          height={1536}
          sizes="(min-width: 1100px) 1100px, 100vw"
          className="w-full max-w-[1100px] select-none"
          style={{
            maskImage:
              "radial-gradient(120% 90% at 50% 72%, black 45%, transparent 82%)",
            WebkitMaskImage:
              "radial-gradient(120% 90% at 50% 72%, black 45%, transparent 82%)",
          }}
        />
      </div>
    </section>
  )
}

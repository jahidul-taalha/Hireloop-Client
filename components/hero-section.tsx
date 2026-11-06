import Image from "next/image"
import Link from "next/link"
import {
  Building2,
  Flame,
  MapPin,
  Monitor,
  Search,
  ThumbsUp,
  Users,
} from "lucide-react"

const trendingPositions = [
  "Product Designer",
  "UX Engineer",
  "Data Analyst",
] as const

const heroStats = [
  { icon: Monitor, value: "50K", label: "Active Jobs" },
  { icon: Building2, value: "12K", label: "Companies" },
  { icon: Users, value: "2M", label: "Job Seekers" },
  { icon: ThumbsUp, value: "97%", label: "Satisfaction Rate" },
] as const

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#101010] pb-16 text-center">
      {/* Faint violet glow bleeding from the top, as in the design */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(ellipse_55%_55%_at_50%_0%,rgba(93,63,211,0.18),transparent_72%)]"
      />

      <div className="mx-auto max-w-7xl px-6 pt-16 sm:pt-20">
        {/* New jobs badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pr-5 pl-1.5 backdrop-blur-sm">
          <span className="flex size-7 items-center justify-center rounded-full bg-brand">
            <Flame className="size-4 text-white" />
          </span>
          <span className="text-sm font-semibold text-white">50,000+</span>
          <span className="text-[11px] font-medium tracking-[0.18em] text-neutral-400">
            NEW JOBS THIS MONTH
          </span>
        </div>

        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-[3.5rem] md:leading-[1.15]">
          Find Your Dream Job Today
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-sm text-pretty text-neutral-400 md:text-base">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search bar */}
        <form
          action="/jobs"
          method="get"
          className="mx-auto mt-8 flex max-w-xl items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-sm sm:max-w-2xl sm:pl-5"
        >
          <Search className="ml-2 size-4 shrink-0 text-neutral-400 sm:ml-0" />
          <input
            type="search"
            name="q"
            placeholder="Job title, skill or company"
            aria-label="Job title, skill or company"
            className="h-9 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
          />
          <MapPin className="hidden size-4 shrink-0 text-neutral-400 sm:block" />
          <input
            type="search"
            name="location"
            placeholder="Location or Remote"
            aria-label="Location or Remote"
            className="hidden h-9 w-44 shrink bg-transparent text-sm text-white outline-none placeholder:text-neutral-500 sm:block lg:w-52"
          />
          <button
            type="submit"
            aria-label="Search jobs"
            className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-brand text-white transition-colors hover:bg-brand-hover"
          >
            <Search className="size-4" />
          </button>
        </form>

        {/* Trending positions */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 text-xs">
          <span className="text-neutral-500">Trending Position:</span>
          {trendingPositions.map((position) => (
            <Link
              key={position}
              href={`/jobs?q=${encodeURIComponent(position)}`}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-neutral-300 transition-colors hover:border-white/25 hover:text-white"
            >
              {position}
            </Link>
          ))}
        </div>
      </div>

      {/* Globe horizon with overlay content, as in the design */}
      <div className="relative mx-auto h-[26rem] max-w-[1100px] sm:h-[30rem] md:h-[40rem]">
        <Image
          src="/globe.png"
          alt=""
          fill
          priority
          sizes="(min-width: 1100px) 1100px, 100vw"
          className="object-cover object-top [filter:hue-rotate(-40deg)_saturate(1.05)_brightness(0.98)]"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 18%, black 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 18%, black 92%, transparent 100%)",
          }}
        />
        <div className="absolute inset-x-0 top-[24%] flex flex-col items-center gap-6 px-4 md:top-[30%] md:gap-10">
          <p className="text-xl font-semibold text-pretty text-white md:text-[2rem] md:leading-snug">
            Assisting over{" "}
            <span className="text-violet-300">15,000 job seekers</span>
            <br className="hidden md:block" /> find their dream positions.
          </p>

          {/* Stats cards floating over the globe */}
          <div className="grid w-full max-w-5xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-start gap-3 rounded-xl border border-white/10 bg-[#151515]/80 px-4 py-4 text-left backdrop-blur-sm md:px-5"
              >
                <stat.icon className="size-4 text-neutral-400" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-2xl font-bold tracking-tight text-white md:text-[2rem]">
                    {stat.value}
                  </span>
                  <span className="text-xs text-neutral-400 md:text-sm">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

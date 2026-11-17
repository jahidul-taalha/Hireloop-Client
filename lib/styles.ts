// Shared class strings for the dark dashboard theme.
// Pull these instead of retyping long Tailwind class lists in every file.

/** Standard styled input/select trigger look. */
export const inputFieldClass =
  "h-9 rounded-lg border-white/10 bg-white/5 text-white placeholder:text-neutral-500 focus-visible:border-brand-hover/60 focus-visible:ring-brand/25 dark:bg-white/5"

/** Textarea variant of the input look (auto height instead of h-9). */
export const textareaFieldClass =
  "min-h-28 rounded-lg border-white/10 bg-white/5 text-white placeholder:text-neutral-500 focus-visible:border-brand-hover/60 focus-visible:ring-brand/25 dark:bg-white/5"

/** Dark card/panel surface used for sections and the table wrapper. */
export const cardClass = "rounded-2xl border border-white/10 bg-[#151515]"

/** Primary brand action button look (used in page headers). */
export const brandButtonClass = "h-10 bg-brand px-5 text-brand-foreground hover:bg-brand-hover"

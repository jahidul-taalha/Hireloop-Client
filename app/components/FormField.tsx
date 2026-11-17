import { Label } from "@/components/ui/label"

/** Form field wrapper: label (with optional required marker) + control. */
export function FormField({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string
  htmlFor: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor} className="text-neutral-300">
        {label}
        {required && <span className="text-brand">*</span>}
      </Label>
      {children}
    </div>
  )
}

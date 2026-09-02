import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

function Checkbox({ className, ...props }) {
  return (
    <CheckboxPrimitive.Root className={cn('flex size-4 shrink-0 items-center justify-center rounded border border-slate-300 bg-white text-white outline-none transition focus:ring-4 focus:ring-indigo-100 data-[state=checked]:border-indigo-600 data-[state=checked]:bg-indigo-600', className)} {...props}>
      <CheckboxPrimitive.Indicator><Check className="size-3" strokeWidth={3} /></CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }

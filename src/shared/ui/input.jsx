import { cn } from '@/shared/lib/utils'

function Input({ className, ...props }) {
  return <input className={cn('flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-50', className)} {...props} />
}

export { Input }

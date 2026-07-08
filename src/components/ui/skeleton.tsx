import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-md skeleton-shimmer', className)} aria-busy="true" aria-label="Ładowanie…" {...props} />
}

function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton key={i} className={cn('h-4', i === lines - 1 ? 'w-4/5' : 'w-full')} />
      ))}
    </div>
  )
}

function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-lg border border-border bg-card p-5 space-y-4', className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1"><Skeleton className="h-4 w-1/3" /><Skeleton className="h-7 w-1/2" /></div>
        <Skeleton className="h-10 w-10 rounded-md" />
      </div>
      <Skeleton className="h-3 w-2/3" />
    </div>
  )
}

function SkeletonTable({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <tbody>
      {Array.from({ length: rows }, (_, i) => (
        <tr key={i} className="border-b border-border">
          {Array.from({ length: cols }, (__, j) => (
            <td key={j} className="px-4 py-3"><Skeleton className="h-4 w-full" /></td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

export { Skeleton, SkeletonText, SkeletonCard, SkeletonTable }

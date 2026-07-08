import * as React from 'react'
import { cn } from '@/lib/utils'

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('rounded-lg border border-border bg-card text-card-foreground shadow-card', className)} {...props} />
  )
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('flex flex-col gap-1.5 p-5 pb-0', className)} {...props} />
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => <h3 ref={ref} className={cn('text-base font-semibold leading-tight tracking-tight text-foreground', className)} {...props} />
)
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
)
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('p-5 pt-4', className)} {...props} />
)
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('flex items-center px-5 pb-5 pt-0', className)} {...props} />
)
CardFooter.displayName = 'CardFooter'

interface KpiCardProps {
  label: string
  value: React.ReactNode
  subValue?: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  icon?: React.ReactNode
  accent?: 'primary' | 'success' | 'warning' | 'destructive' | 'accent'
  className?: string
  action?: React.ReactNode
}

const accentBorderMap: Record<NonNullable<KpiCardProps['accent']>, string> = {
  primary: 'border-l-primary', success: 'border-l-success',
  warning: 'border-l-warning', destructive: 'border-l-destructive', accent: 'border-l-accent',
}

function KpiCard({ label, value, subValue, trend, trendValue, icon, accent, className, action }: KpiCardProps) {
  return (
    <div className={cn('rounded-lg border border-border bg-card shadow-card p-5', accent && `border-l-4 ${accentBorderMap[accent]}`, className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide truncate">{label}</p>
          <p className="mt-1.5 text-2xl font-bold tracking-tight text-foreground tabular-mono">{value}</p>
          {(subValue || trendValue) && (
            <div className="mt-1 flex items-center gap-2">
              {trendValue && (
                <span className={cn('inline-flex items-center text-xs font-medium', trend === 'up' && 'text-success', trend === 'down' && 'text-destructive', trend === 'neutral' && 'text-muted-foreground')}>
                  {trend === 'up' && '↑'}{trend === 'down' && '↓'}{' '}{trendValue}
                </span>
              )}
              {subValue && <span className="text-xs text-muted-foreground">{subValue}</span>}
            </div>
          )}
        </div>
        {icon && <div className="text-muted-foreground/50 shrink-0 mt-0.5">{icon}</div>}
      </div>
      {action && <div className="mt-3">{action}</div>}
    </div>
  )
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, KpiCard }

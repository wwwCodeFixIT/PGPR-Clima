import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from './button'

interface EmptyStateProps {
  icon?: React.ReactNode; title: string; description?: string
  action?: { label: string; onClick: () => void; icon?: React.ReactNode }
  secondaryAction?: { label: string; onClick: () => void }
  className?: string; compact?: boolean
}

export function EmptyState({ icon, title, description, action, secondaryAction, className, compact = false }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center', compact ? 'py-10 px-4' : 'py-16 px-6', className)} role="status" aria-label={title}>
      {icon && <div className={cn('rounded-xl bg-muted flex items-center justify-center text-muted-foreground mb-4', compact ? 'h-12 w-12' : 'h-16 w-16')} aria-hidden="true">{icon}</div>}
      <h3 className={cn('font-semibold text-foreground', compact ? 'text-sm' : 'text-base')}>{title}</h3>
      {description && <p className={cn('mt-1.5 text-muted-foreground max-w-xs mx-auto', compact ? 'text-xs' : 'text-sm')}>{description}</p>}
      {(action || secondaryAction) && (
        <div className="mt-5 flex flex-col sm:flex-row gap-2 items-center">
          {action && <Button size={compact ? 'sm' : 'default'} onClick={action.onClick} leftIcon={action.icon}>{action.label}</Button>}
          {secondaryAction && <Button variant="ghost" size={compact ? 'sm' : 'default'} onClick={secondaryAction.onClick}>{secondaryAction.label}</Button>}
        </div>
      )}
    </div>
  )
}

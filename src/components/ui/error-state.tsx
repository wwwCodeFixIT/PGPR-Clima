import * as React from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'

interface ErrorStateProps {
  title?: string; description?: string; error?: Error | string | null
  onRetry?: () => void; retryLabel?: string; className?: string; compact?: boolean
}

export function ErrorState({ title = 'Coś poszło nie tak', description, error, onRetry, retryLabel = 'Spróbuj ponownie', className, compact = false }: ErrorStateProps) {
  const errorMessage = typeof error === 'string' ? error : error instanceof Error ? error.message : undefined
  return (
    <div className={cn('flex flex-col items-center justify-center text-center', compact ? 'py-8 px-4' : 'py-14 px-6', className)} role="alert">
      <div className={cn('rounded-xl bg-destructive/10 flex items-center justify-center text-destructive mb-4', compact ? 'h-11 w-11' : 'h-14 w-14')} aria-hidden="true">
        <AlertCircle className={compact ? 'h-5 w-5' : 'h-6 w-6'} />
      </div>
      <h3 className={cn('font-semibold text-foreground', compact ? 'text-sm' : 'text-base')}>{title}</h3>
      {(description || errorMessage) && <p className={cn('mt-1.5 text-muted-foreground max-w-sm mx-auto', compact ? 'text-xs' : 'text-sm')}>{description ?? errorMessage}</p>}
      {onRetry && <Button variant="outline" size={compact ? 'sm' : 'default'} onClick={onRetry} className="mt-5" leftIcon={<RefreshCw className="h-4 w-4" />}>{retryLabel}</Button>}
    </div>
  )
}

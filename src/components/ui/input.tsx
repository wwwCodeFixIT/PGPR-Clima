import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftElement?: React.ReactNode
  rightElement?: React.ReactNode
  error?: boolean
  inputClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftElement, rightElement, error, inputClassName, ...props }, ref) => {
    if (leftElement || rightElement) {
      return (
        <div className={cn('relative flex items-center', className)}>
          {leftElement && <div className="absolute left-3 flex items-center pointer-events-none text-muted-foreground">{leftElement}</div>}
          <input type={type} ref={ref} className={cn('flex h-9 w-full rounded-md border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50', leftElement && 'pl-9', rightElement && 'pr-9', error && 'border-destructive focus-visible:ring-destructive', inputClassName)} aria-invalid={error ? 'true' : undefined} {...props} />
          {rightElement && <div className="absolute right-3 flex items-center text-muted-foreground">{rightElement}</div>}
        </div>
      )
    }
    return (
      <input type={type} ref={ref} className={cn('flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50', error && 'border-destructive focus-visible:ring-destructive', className)} aria-invalid={error ? 'true' : undefined} {...props} />
    )
  }
)
Input.displayName = 'Input'

interface FieldProps {
  label?: string; error?: string; hint?: string; required?: boolean
  children: React.ReactNode; className?: string; id?: string
}

function Field({ label, error, hint, required, children, className, id }: FieldProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label htmlFor={id} className="field-label">
          {label}{required && <span className="ml-0.5 text-destructive" aria-hidden="true">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p role="alert" className="text-xs text-destructive" id={id ? `${id}-error` : undefined}>{error}</p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}

export { Input, Field }

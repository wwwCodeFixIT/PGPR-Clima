'use client'
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none',
  {
    variants: {
      variant: {
        default:     'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 shadow-soft',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-soft',
        outline:     'border border-input bg-background hover:bg-secondary hover:text-secondary-foreground',
        secondary:   'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:       'hover:bg-secondary hover:text-secondary-foreground',
        link:        'text-primary underline-offset-4 hover:underline',
        success:     'bg-success text-success-foreground hover:bg-success/90 shadow-soft',
        warning:     'bg-warning text-warning-foreground hover:bg-warning/90 shadow-soft',
        'outline-primary': 'border border-primary/60 text-primary hover:bg-primary/5 hover:border-primary',
      },
      size: {
        sm:      'h-8  px-3  text-xs  gap-1.5',
        default: 'h-9  px-4  text-sm',
        lg:      'h-11 px-6  text-base',
        xl:      'h-12 px-8  text-base',
        icon:    'h-9  w-9',
        'icon-sm':'h-7 w-7',
        'icon-lg':'h-11 w-11',
        touch:   'h-12 px-5 text-base min-w-[44px]',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?:   boolean
  leftIcon?:    React.ReactNode
  rightIcon?:   React.ReactNode
  asChild?:     boolean
  loadingText?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading = false, leftIcon, rightIcon, loadingText, children, disabled, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} disabled={disabled || isLoading} aria-busy={isLoading} {...props}>
        {isLoading ? (
          <><Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden="true" />{loadingText ?? children}</>
        ) : (
          <>{leftIcon && <span className="shrink-0" aria-hidden="true">{leftIcon}</span>}{children}{rightIcon && <span className="shrink-0" aria-hidden="true">{rightIcon}</span>}</>
        )}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }

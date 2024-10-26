import { cn } from "@/lib/utils"
import { forwardRef, useState, type HTMLInputTypeAttribute } from "react"

interface CellsProps extends React.ComponentPropsWithoutRef<"form"> {
  className?: string
  children: React.ReactNode
}

export const Cells = forwardRef<HTMLFormElement, CellsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <form className={cn("", className)} {...props} ref={ref}>
        {children}
      </form>
    )
  },
)
Cells.displayName = "Cells"

interface CellRowProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string
  children: React.ReactNode
}

export const CellRow = forwardRef<HTMLDivElement, CellRowProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={cn("flex flex-row", className)} {...props} ref={ref}>
        {children}
      </div>
    )
  },
)
CellRow.displayName = "CellRow"

interface CellProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode
  className?: string
}

export const Cell = forwardRef<HTMLInputElement, CellProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          "has-[:focus]:inner-border-primary has-[:focus]:inner-border-2 hover:cursor-pointer hover:inner-border-2 px-1 py-1 inner-border select-none group",
          className,
        )}
      >
        {children}
      </div>
    )
  },
)
Cell.displayName = "Cell"

interface CellInput extends React.ComponentPropsWithoutRef<"input"> {
  name: string
  label: string
  type?: HTMLInputTypeAttribute
  initialValue?: string
  className?: string
}

export const CellInput = forwardRef<HTMLInputElement, CellInput>(
  ({ type = "text", name, label, initialValue, className, ...props }, ref) => {
    const [value, setValue] = useState<string | undefined>(initialValue)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    }

    return (
      <>
        <label htmlFor={name} className="sr-only">
          {label}
        </label>
        <input
          type={type}
          name={name}
          className="px-2 py-1 w-20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none min-w-4 text-center focus:border-0 focus:outline-none cursor-pointer"
          {...props}
          ref={ref}
          value={value}
          onChange={handleChange}
        />
      </>
    )
  },
)

import { cn } from "@/lib/utils"
import React from "react"

export function Table({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLTableElement> & {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className="overflow-x-auto flex lg:block">
      <div className="flex-none min-w-full overflow-hidden lg:overflow-auto">
        <table
          className={cn("w-full text-left border-collapse", className)}
          {...props}
        >
          {children}
        </table>
      </div>
    </div>
  )
}

export function TableHead({
  children,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement> & {
  children: React.ReactNode
}) {
  return <thead {...props}>{children}</thead>
}

export function TableBody({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement> & {
  className?: string
  children: React.ReactNode
}) {
  return (
    <tbody className={cn("align-baseline", className)} {...props}>
      {children}
    </tbody>
  )
}

export function TableRow({
  children,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement> & {
  children: React.ReactNode
}) {
  return <tr {...props}>{children}</tr>
}

export function TableCell({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLTableCellElement> & {
  className?: string
  children: React.ReactNode
}) {
  return (
    <td
      className={cn(
        "[&:not(:last-of-type)]:pr-4 md:[&:not(:last-of-type)]:pr-8 pt-1.5 md:min-w-20 min-w-16 max-w-48",
        className,
      )}
      {...props}
    >
      {children}
    </td>
  )
}

export function TableHeadCell({
  children,
  ...props
}: React.HTMLAttributes<HTMLTableCellElement> & {
  children: React.ReactNode
}) {
  return <th {...props}>{children}</th>
}

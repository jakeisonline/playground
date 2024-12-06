"use client"

import {
  SegmentedControlContextProvider,
  useSegmentedControl,
} from "@/registry/hooks/use-segmented-control"
import { cn } from "@/lib/utils"
import React from "react"

type SegmentedControlProps = {
  defaultValue: string
  children: React.ReactNode
  className?: string
  role?: string
}

export const SegmentedControl = ({
  defaultValue,
  children,
  className,
  role,
  ...props
}: SegmentedControlProps) => {
  const stuffedProps = { ...props, defaultValue, className, role }

  return (
    <SegmentedControlContextProvider defaultValue={defaultValue}>
      <SegmentedControlMapper {...stuffedProps}>
        {children}
      </SegmentedControlMapper>
    </SegmentedControlContextProvider>
  )
}
SegmentedControl.displayName = "SegmentedControl"

interface SegmentedControlMapperProps {
  children: React.ReactNode
  className?: string
  role?: string
}

const SegmentedControlMapper = ({
  children,
  className,
  role,
  ...props
}: SegmentedControlMapperProps) => {
  const { setValues } = useSegmentedControl()
  const controlValues: string[] = []

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.props.value) {
      controlValues.push(child.props.value)
    }

    setValues(controlValues)
  })

  return (
    <div
      className={cn(
        "flex gap-1 rounded-md bg-accent p-1 shadow-inner",
        className,
      )}
      role={role || "radiogroup"}
      {...props}
    >
      {children}
    </div>
  )
}

interface SegmentedControlItemProps
  extends React.ComponentPropsWithoutRef<"button"> {
  value: string
  children: React.ReactNode
  disabled?: boolean
  className?: string
  role?: string
}

export const SegmentedControlItem = ({
  value,
  children,
  className,
  disabled,
  role,
  ...props
}: SegmentedControlItemProps) => {
  const { selectControlItem, selectedValue } = useSegmentedControl()

  const isSelected = selectedValue === value

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return
    selectControlItem(value)
    e.currentTarget.dataset.state = "active"
  }

  return (
    <button
      aria-disabled={disabled}
      aria-checked={isSelected}
      className={cn(
        "rounded-sm bg-accent px-4 py-1 text-muted-foreground transition-colors duration-300 focus:outline-primary disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
        className,
      )}
      data-state={isSelected ? "active" : "inactive"}
      disabled={disabled}
      role={role || "radio"}
      onClick={handleClick}
      tabIndex={isSelected ? 0 : -1}
      value={value}
      {...props}
    >
      {children}
    </button>
  )
}
SegmentedControlItem.displayName = "SegmentedControlItem"

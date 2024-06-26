import clsx from "clsx"

interface StepperLabelProps {
  fieldId?: string
  fieldLabel?: string
  fieldLabelReader?: string
  collapsible?: boolean | false
}

const StepperLabel = ({
  fieldId,
  fieldLabel,
  fieldLabelReader,
  collapsible,
}: StepperLabelProps) => {
  const ariaLabel = fieldLabelReader ? fieldLabelReader : fieldLabel

  const labelClass = clsx(
    "cursor-pointer text-gray-800 pl-1.5",
    collapsible && "pr-1.5",
    !collapsible && "pr-2 border-r",
    !fieldLabel && "sr-only",
  )

  return (
    <label htmlFor={fieldId} aria-label={ariaLabel} className={labelClass}>
      {fieldLabel}
    </label>
  )
}

export default StepperLabel

import useStepperFieldContext from "@/hooks/use-stepper-field-context"

type StepperBadgeProps = {
  hideBadge?: boolean
  hideBadgeNum?: number
  collapsible?: boolean
}

const StepperBadge = ({
  hideBadge,
  hideBadgeNum,
  collapsible,
}: StepperBadgeProps) => {
  const { stepValue } = useStepperFieldContext()
  if (!collapsible || hideBadge || stepValue == hideBadgeNum) return

  return (
    <div className="group-has-[:focus]:hidden py-0 px-1.5 absolute -top-2 -right-2.5 bg-primary text-background rounded-full text-2xs font-medium">
      {stepValue}
    </div>
  )
}

export default StepperBadge

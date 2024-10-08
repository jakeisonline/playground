import * as React from "react"

import {
  StepperField,
  StepperFieldButton,
  StepperFieldInput,
  StepperFieldLabel,
} from "@/components/ui/stepper-field"

export default function StepperDemo() {
  return (
    <StepperField start={0}>
      <StepperFieldLabel htmlFor="stepper">Quantity</StepperFieldLabel>
      <StepperFieldButton direction="down">-</StepperFieldButton>
      <StepperFieldInput id="stepper" />
      <StepperFieldButton direction="up">+</StepperFieldButton>
    </StepperField>
  )
}

"use client"

import StepperPlusIcon from "@/svgs/StepperPlusIcon"
import StepperMinusIcon from "@/svgs/StepperMinusIcon"
import StepperValue from "./StepperValue"
import StepperController from "./StepperController"
import useStepperField from "@/utils/useStepperField"
import { useRef } from "react"
import StepperLabel from "./StepperLabel"

interface StepperFieldProps {
  startNum: number
  minNum?: number
  maxNum?: number
  fieldName?: string
}

const StepperField = ({
  startNum,
  minNum,
  maxNum,
  fieldName,
}: StepperFieldProps) => {
  const { stepValue, handleStep } = useStepperField(startNum, minNum, maxNum)

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (e.screenX !== 0 && e.screenY !== 0)
      inputRef.current && inputRef.current.focus()
  }

  return (
    <div
      onClick={handleClick}
      className={`has-[:focus]:inner-border-blue-500 has-[:focus]:inner-border-2  hover:cursor-pointer flex flex-row items-center gap-1 px-1 py-1 inner-border rounded-md select-none text-xs`}
    >
      <StepperLabel fieldName={fieldName} labelValue="M" />
      <StepperController
        direction="down"
        handleStep={handleStep}
        stepValue={stepValue}
        minValue={minNum}
      >
        <StepperMinusIcon className="fill-gray-800 group-hover:fill-blue-900" />
      </StepperController>
      <StepperValue
        stepValue={stepValue}
        handleStep={handleStep}
        inputRef={inputRef}
        fieldName={fieldName}
      />
      <StepperController
        direction="up"
        handleStep={handleStep}
        stepValue={stepValue}
        maxValue={maxNum}
      >
        <StepperPlusIcon className="fill-gray-800 group-hover:fill-blue-900" />
      </StepperController>
    </div>
  )
}

export default StepperField

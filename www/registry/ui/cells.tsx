import { cn } from "@/lib/utils"
import React, {
  forwardRef,
  useRef,
  useState,
  type HTMLInputTypeAttribute,
} from "react"
import {
  CellsContextProvider,
  useCellsContext,
  type CellTraverseDirection,
} from "@/registry/hooks/use-cells"

interface CellsProps extends React.ComponentPropsWithoutRef<"form"> {
  className?: string
  children: React.ReactNode
}

export const Cells = forwardRef<HTMLFormElement, CellsProps>(
  ({ className, children, ...props }, ref) => (
    <CellsContextProvider>
      <CellsForm className={cn("", className)} {...props} ref={ref}>
        {children}
      </CellsForm>
    </CellsContextProvider>
  ),
)
Cells.displayName = "Cells"

const _renderCells = (children: React.ReactNode, parentRowIndex?: number) => {
  if (!children) throw new Error("No children provided")

  const { addCellIndex } = useCellsContext()
  let rowIndex = parentRowIndex ?? 0
  let cellIndex = 0

  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return null

    if (parentRowIndex === undefined) {
      if (
        typeof child.type === "function" &&
        (child.type as any).displayName !== "CellRow"
      ) {
        throw new Error("Invalid child type, only CellRow is allowed")
      }

      const tmpKey = child.key ? child.key : rowIndex
      rowIndex++

      return (
        <CellRow key={tmpKey}>
          {_renderCells(child.props.children, rowIndex - 1)}
        </CellRow>
      )
    }

    if (
      typeof child.type === "function" &&
      (child.type as any).displayName !== "Cell"
    ) {
      throw new Error("Invalid child type, only Cell is allowed")
    }

    const childRef = useRef<HTMLInputElement>(null)
    const initialValue = child.props.initialValue || ""

    addCellIndex(rowIndex, cellIndex, childRef, initialValue)
    cellIndex++

    return (
      <Cell
        cellIndex={cellIndex - 1}
        rowIndex={rowIndex}
        ref={childRef}
        {...child.props}
      >
        {child.props.children}
      </Cell>
    )
  })
}

interface CellsForm extends React.ComponentPropsWithoutRef<"form"> {
  className?: string
  children: React.ReactNode
}

const CellsForm = forwardRef<HTMLFormElement, CellsForm>(
  ({ className, children, ...props }, ref) => {
    return (
      <form className={cn("", className)} {...props} ref={ref}>
        {_renderCells(children)}
      </form>
    )
  },
)

interface CellRowProps extends React.ComponentPropsWithoutRef<"div"> {
  parentRow?: any
  className?: string
  children: React.ReactNode
}

export const CellRow = forwardRef<HTMLDivElement, CellRowProps>(
  ({ parentRow, className, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex flex-row border-b border-l border-r first:border-t",
          className,
        )}
        {...props}
        ref={ref}
      >
        {children}
      </div>
    )
  },
)
CellRow.displayName = "CellRow"

interface CellProps extends React.ComponentPropsWithoutRef<"input"> {
  name: string
  label: string
  autoselect?: boolean
  type?: HTMLInputTypeAttribute
  cellIndex?: number
  rowIndex?: number
  initialValue?: string
  className?: string
}

export const Cell = forwardRef<HTMLInputElement, CellProps>(
  (
    {
      type = "text",
      name,
      label,
      autoselect,
      initialValue,
      cellIndex,
      rowIndex,
      className,
      ...props
    },
    ref,
  ) => {
    if (cellIndex === undefined || rowIndex === undefined)
      throw new Error("cellIndex and rowIndex are required props for Cell")

    const {
      getCellState,
      setCellValue,
      isSelectedCell,
      toggleSelectedCell,
      clearSelectedCells,
      startShiftTraverse,
      isActiveCell,
      setActiveCell,
      setNextActiveCell,
      setInputFocus,
      handleMouseSelectStart,
      handleMouseSelectMove,
      handleShiftClickCell,
    } = useCellsContext()

    const cellState = getCellState(rowIndex, cellIndex)
    const [value, setValue] = useState<string>(
      cellState?.value ?? initialValue ?? "",
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setValue(newValue)
      setCellValue(rowIndex, cellIndex, newValue)
    }

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        setActiveCell(rowIndex, cellIndex)
        return
      }

      if (e.key === "Enter") {
        setActiveCell(rowIndex, cellIndex)
        return
      }
    }

    const handleCellKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.target !== e.currentTarget) return
      if (rowIndex === undefined || cellIndex === undefined) return

      const keyPressed = e.key

      const keyMap: Record<string, CellTraverseDirection> = {
        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowUp: "up",
        ArrowDown: "down",
      }

      const isAlphaNumeric = /^[a-zA-Z0-9]$/.test(keyPressed)

      if (keyPressed === "Shift") {
        startShiftTraverse({
          rowIndex,
          cellIndex,
        })
        return
      }

      if (keyPressed === "Escape") {
        clearSelectedCells()
        setActiveCell(rowIndex, cellIndex)
        return
      }

      if (keyPressed === "Enter") {
        setInputFocus(rowIndex, cellIndex)
        return
      }

      if (keyPressed === "Delete" || keyPressed === "Backspace") {
        setValue("")
        return
      }

      const direction = keyMap[keyPressed]

      if (direction) {
        e.preventDefault()

        setNextActiveCell({
          direction,
          currentRowIndex: rowIndex,
          currentCellIndex: cellIndex,
          isShiftHeld: e.shiftKey,
          isCtrlHeld: e.ctrlKey || e.metaKey,
        })
      }

      if (isAlphaNumeric) {
        setInputFocus(rowIndex, cellIndex)
      }
    }

    const handleCellMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
      // Prevent the cell from being selected when ctrl or cmd is held
      // to allow for multi-cell selection
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        toggleSelectedCell(rowIndex, cellIndex)
        return
      }

      if (e.shiftKey) {
        e.preventDefault()
        handleShiftClickCell(rowIndex, cellIndex)
        return
      }

      // Effectively a double click, but much more forgiving on timing
      if (!isActiveCell(rowIndex, cellIndex)) {
        e.preventDefault()
        setActiveCell(rowIndex, cellIndex)
      }

      handleMouseSelectStart(rowIndex, cellIndex)
    }

    const handleCellMouseEnter = () => {
      handleMouseSelectMove(rowIndex, cellIndex)
    }

    const handleCellBlur = () => {
      clearSelectedCells()
    }

    const isSelected = isSelectedCell(rowIndex, cellIndex)
    const isActive = isActiveCell(rowIndex, cellIndex)

    return (
      <div
        tabIndex={0}
        className="w-20 min-w-4 cursor-pointer bg-background p-0.5 text-center [appearance:textfield] hover:inner-border-2 focus:bg-primary/5 focus:outline-none focus:inner-border-2 focus:inner-border-primary has-[:focus]:bg-primary/5 has-[:focus]:inner-border-2 has-[:focus]:inner-border-primary data-[is-selected=true]:bg-primary/5 data-[is-selected=true]:inner-border-2 [&:not(:focus)]:data-[is-selected=true]:inner-border-primary/25 [&:not(:last-child)]:border-r"
        data-is-active={isActive}
        data-is-selected={isSelected}
        onKeyDown={handleCellKeyDown}
        onMouseDown={handleCellMouseDown}
        onMouseEnter={handleCellMouseEnter}
        onBlur={handleCellBlur}
        ref={ref}
        autoFocus={autoselect}
      >
        <label htmlFor={name} className="sr-only">
          {label}
        </label>
        <input
          type={type}
          name={name}
          className="w-full bg-transparent px-3 py-2 text-center outline-none [appearance:textfield] focus:inner-border-2 focus:inner-border-primary/25 [&:not(:focus)]:cursor-pointer"
          value={value}
          tabIndex={-1}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          {...props}
        />
      </div>
    )
  },
)
Cell.displayName = "Cell"

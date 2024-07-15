import { FeatureItem, FeatureList } from "@/components/feature-list"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@/components/ui/table"
import StepperField from "@/components/stepper-field"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import CodeBlock from "@/components/ui/code-block"
import { H1, H2, H3 } from "@/components/ui/headings"
import P from "@/components/ui/p"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ExternalLink from "@/components/external-link"
import Keeb from "@/components/keeb"
import Code from "@/components/ui/code"

export default function StepperPage() {
  return (
    <div className="mx-auto w-full min-w-0">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Stepper</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <H1>Stepper</H1>
      <P className="mt-2">
        The Stepper component is a user interface element that allows users to
        increment or decrement a value. It is commonly used for inputting
        numerical values, such as quantities or prices.
      </P>
      <FeatureList>
        <FeatureItem>Native form element (number input)</FeatureItem>
        <FeatureItem>Keyboard editable, controllable & accessible</FeatureItem>
        <FeatureItem>Custom step size and range (optional)</FeatureItem>
        <FeatureItem>Shift stepping for power users (optional)</FeatureItem>
      </FeatureList>
      <Tabs defaultValue="example" className="mt-8">
        <TabsList>
          <TabsTrigger value="example">Example</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="example">
          <Card>
            <CardContent className="pt-6 min-h-44 flex w-auto justify-center items-center">
              <StepperField
                minNum={0}
                startNum={0}
                stepShiftSize={10}
                fieldId={"quantity"}
                fieldName={"quantity"}
                fieldLabel={"Quantity"}
                fieldLabelReader={"Quantity"}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="code">
          <CodeBlock>{`<StepperField
  minNum={0}
  startNum={0}
  stepShiftSize={10}
  fieldId={"quantity"}
  fieldName={"quantity"}
  fieldLabel={"Quantity"}
  fieldLabelReader={"Quantity"}
/>`}</CodeBlock>
        </TabsContent>
      </Tabs>
      <H2>Usage</H2>
      <CodeBlock className="mb-4">{`import { StepperField } from "@/components/ui/stepper-field"`}</CodeBlock>
      <CodeBlock>{`<StepperField startNum={0} />`}</CodeBlock>
      <H2>Props</H2>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Prop</TableHeadCell>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>Default</TableHeadCell>
            <TableHeadCell>Description</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Code>collapsible</Code>
            </TableCell>
            <TableCell>boolean</TableCell>
            <TableCell>false</TableCell>
            <TableCell>Collapsed or not?</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <H2>Accessibility</H2>
      <P>
        Adheres to the{" "}
        <ExternalLink href="https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/">
          Spinbutton WAI-ARIA design pattern
        </ExternalLink>
        . At its core, this component is simply a{" "}
        <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number">
          native number field
        </ExternalLink>
        .
      </P>
      <H3>Keyboard interaction</H3>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Key</TableHeadCell>
            <TableHeadCell>Action</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Keeb>ArrowUp</Keeb>
            </TableCell>
            <TableCell>
              Increment value by <Code>stepSize</Code>, or <Code>1</Code>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Keeb>ArrowDown</Keeb>
            </TableCell>
            <TableCell>
              Decrement value by <Code>stepSize</Code>, or <Code>1</Code>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Keeb>Shift</Keeb>+<Keeb>ArrowUp</Keeb>
            </TableCell>
            <TableCell>
              Increment value by <Code>stepShiftSize</Code>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Keeb>Shift</Keeb>+<Keeb>ArrowDown</Keeb>
            </TableCell>
            <TableCell>
              Decrement value by <Code>stepShiftSize</Code>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Keeb>PageUp</Keeb>
            </TableCell>
            <TableCell>
              Increment value by <Code>stepShiftSize</Code>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Keeb>PageDown</Keeb>
            </TableCell>
            <TableCell>
              Decrement value by <Code>stepShiftSize</Code>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Keeb>Home</Keeb>
            </TableCell>
            <TableCell>
              Set value to <Code>minNum</Code>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Keeb>End</Keeb>
            </TableCell>
            <TableCell>
              Set value to <Code>maxNum</Code>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <H2>Examples</H2>
      <H3>Collapsing stepper fields</H3>
      <P>
        You might want to display multiple quantities in a single row. For
        example, when ordering multiple product variants in bulk, or providing
        measurements for a product.
      </P>
      <Tabs defaultValue="example" className="mt-8">
        <TabsList>
          <TabsTrigger value="example">Example</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="example">
          <Card>
            <CardContent className="pt-6 min-h-44 flex w-auto justify-center items-center">
              <div className="flex gap-3">
                <StepperField
                  collapsible={true}
                  hideBadgeNum={0}
                  fieldId="sizes_small"
                  fieldName="sizes_small"
                  fieldLabel="S"
                  fieldLabelReader="Small"
                  startNum={0}
                  minNum={0}
                  maxNum={100}
                />
                <StepperField
                  collapsible={true}
                  hideBadgeNum={0}
                  fieldId="sizes_med"
                  fieldName="sizes_medium"
                  fieldLabel="M"
                  fieldLabelReader="Medium"
                  startNum={3}
                  minNum={0}
                  maxNum={100}
                />
                <StepperField
                  collapsible={true}
                  hideBadgeNum={0}
                  fieldId="sizes_large"
                  fieldName="sizes_large"
                  fieldLabel="L"
                  fieldLabelReader="Large"
                  startNum={0}
                  minNum={0}
                  maxNum={100}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="code">
          <CodeBlock>{`<div className="flex gap-3">
  <StepperField
    collapsible={true}
    hideBadgeNum={0}
    fieldId="sizes_small"
    fieldName="sizes_small"
    fieldLabel="S"
    fieldLabelReader="Small"
    startNum={0}
    minNum={0}
    maxNum={100}
  />
  <StepperField
    collapsible={true}
    hideBadgeNum={0}
    fieldId="sizes_med"
    fieldName="sizes_medium"
    fieldLabel="M"
    fieldLabelReader="Medium"
    startNum={3}
    minNum={0}
    maxNum={100}
  />
  <StepperField
    collapsible={true}
    hideBadgeNum={0}
    fieldId="sizes_large"
    fieldName="sizes_large"
    fieldLabel="L"
    fieldLabelReader="Large"
    startNum={0}
    minNum={0}
    maxNum={100}
  />
</div>`}</CodeBlock>
        </TabsContent>
      </Tabs>
    </div>
  )
}

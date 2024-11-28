import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Index } from "@/components/examples/react"
import ExampleSource from "@/components/example-source"

interface ExampleComponentWithCodeProps {
  name: string
}

export default function ExampleComponentWithCode({
  name,
}: ExampleComponentWithCodeProps) {
  const Example = React.useMemo(() => {
    const Component = Index[name]?.component

    if (!Component) return <p>Component not found: {name}</p>

    return <Component />
  }, [name])

  return (
    <Tabs defaultValue="example">
      <TabsList>
        <TabsTrigger value="example">Example</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent
        value="example"
        className="rounded-lg border bg-card text-card-foreground shadow-sm"
      >
        <div className="flex min-h-44 w-auto items-center justify-center p-6 pt-6">
          <React.Suspense
            fallback={
              <div className="flex w-full items-center justify-center text-sm text-muted-foreground">
                Loading...
              </div>
            }
          >
            {Example}
          </React.Suspense>
        </div>
      </TabsContent>
      <TabsContent value="code" className="mt-0">
        <ExampleSource name={name} />
      </TabsContent>
    </Tabs>
  )
}
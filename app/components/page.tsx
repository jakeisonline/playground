import RangeField from "@/components/RangeField"
import StepperField from "@/components/StepperField"
import TaggerField from "@/components/TaggerField"

export default function ComponentsPage() {
  return (
    <main className="m-auto max-w-4xl min-h-lvh pt-10">
      <h1 className="font-semibold text-3xl">Components</h1>
      <div className="flex flex-col gap-3 mt-3">
        <div className="group w-full h-40 border border-slate-300 rounded-md hover:shadow-md transition-all transition-300 cursor-pointer ease-in-out bg-white hover:border-indigo-300 hover:shadow-indigo-300/40 relative p-6">
          <div className="absolute left-1 bottom-1">
            <span className="text-xs py-0.5 px-1.5">Stepper</span>
          </div>
          <div className="flex justify-center m-auto">
            <StepperField startNum={0} minNum={0} fieldLabelReader="Quantity" />
          </div>
        </div>
        <div className="group w-full h-40 border border-slate-300 rounded-md hover:shadow-md transition-all transition-300 cursor-pointer ease-in-out bg-white hover:border-indigo-300 hover:shadow-indigo-300/40 relative p-6">
          <div className="absolute left-1 bottom-1">
            <span className="text-xs py-0.5 px-1.5">Tagger</span>
          </div>
          <div className="flex justify-center m-auto">
            <TaggerField />
          </div>
        </div>
        <div className="group w-full h-40 border border-slate-300 rounded-md hover:shadow-md transition-all transition-300 cursor-pointer ease-in-out bg-white hover:border-indigo-300 hover:shadow-indigo-300/40 relative p-6">
          <div className="absolute left-1 bottom-1">
            <span className="text-xs py-0.5 px-1.5">Range</span>
          </div>
          <div className="flex justify-center m-auto">
            <RangeField minRange={0} maxRange={10} />
          </div>
        </div>
      </div>
    </main>
  )
}

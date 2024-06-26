import { COUNTRIES } from "../lib/countries"
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons"
import useMapContext from "../hooks/useMapContext"

export default function InfoPanel() {
  const { currentCountry, handleShowCountryPage, handleResetCountry } =
    useMapContext()
  const country = COUNTRIES.find(
    (country) => country.country === currentCountry,
  )

  return (
    <div className="absolute top-0 right-0">
      <div className="shadow-xl  mt-4 mr-4 rounded-lg z-10 w-96 bg-white text-zinc-900">
        <div className="py-4 px-4">
          <button
            className="flex items-center text-sm font-semibold gap-1 py-2 px-4 border border-zinc-400 rounded-full mb-4"
            onClick={handleResetCountry}
          >
            <ArrowLeftIcon />
            Back
          </button>
          <div className="flex gap-2 items-center">
            <div className="w-10 h-10 bg-[#e60000] rounded-full" />
            <div className="w-24 h-3 bg-gray-200 rounded-full" />
          </div>
          <section className="mt-3">
            <h1 className="font-extrabold text-2xl pb-6">{country?.country}</h1>
            <p>{country?.infoText}</p>
            <section>
              <ul className="list-disc list-inside pl-1 mt-5 mb-8">
                {country?.infoBullets.map((bullet, index) => (
                  <li key={`bullet-${index}`}>{bullet}</li>
                ))}
              </ul>
            </section>
            {country?.site && (
              <div className="flex justify-end">
                <button
                  className="flex items-center text-sm bg-[#e60000] font-semibold gap-1 py-2 px-4 border border-[#e60000] rounded-full text-white relative right-0"
                  onClick={(e) => {
                    e.preventDefault()
                    handleShowCountryPage(true)
                  }}
                >
                  Visit site
                  <ArrowRightIcon />
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

type InfoPillProps = {
  label: string
}

function InfoPill({ label }: InfoPillProps) {
  return (
    <div className="py-1 px-2 bg-slate-100 text-xs rounded-full">{label}</div>
  )
}

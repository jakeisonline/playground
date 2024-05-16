import { COUNTRIES } from "./countries"
import CountryPills from "./countryPills"

type InfoPanelProps = {
  currentCountry: any // todo: define type for country
  onSelectCountry: (country: any) => void
}

export default function InfoPanel({
  currentCountry,
  onSelectCountry,
}: InfoPanelProps) {
  const country = COUNTRIES.find(
    (country) => country.country === currentCountry,
  )
  return (
    <div className="absolute top-0 right-0 ">
      <div className="w-96 mt-6">
        <CountryPills onSelectCountry={onSelectCountry} />
      </div>
      <div className="shadow-xl mt-4 mr-4 rounded-lg z-10 w-96 bg-white text-zinc-900">
        <div className="py-4 px-4">
          <div className="flex gap-2 items-center">
            <div className="w-10 h-10 bg-[#e60000] rounded-full" />
            <div className="w-24 h-3 bg-gray-200 rounded-full" />
          </div>
          <section className="mt-3">
            <h1 className="font-extrabold text-2xl pb-6">{country?.country}</h1>
            <p>{country?.infoText}</p>
            <section>
              <ul className="list-disc list-inside pl-1 my-4">
                {country?.infoBullets.map((bullet, index) => (
                  <li key={`bullet-${index}`}>{bullet}</li>
                ))}
              </ul>
            </section>
            <section className="flex mt-3 gap-2">
              {country?.infoLabels.map((label, index) => (
                <InfoPill key={`label-${index}`} label={label} />
              ))}
            </section>
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

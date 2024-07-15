export function FeatureList({ children }: { children: React.ReactNode }) {
  return (
    <ul className="max-w-md gap-x-4 gap-y-2 list-inside mt-6 grid grid-cols-2">
      {children}
    </ul>
  )
}

export function FeatureItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start">
      <svg
        className="w-3.5 h-3.5 mt-1 mr-2 text-green-500 flex-shrink-0"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
      </svg>
      {children}
    </li>
  )
}

import { cn } from "@/lib/utils"
import { ExternalLinkIcon } from "lucide-react"
import NextLink from "next/link"

type LinkProps = React.LinkHTMLAttributes<HTMLAnchorElement> & {
  href: string
  external?: boolean
  noIcon?: boolean
  className?: string
  children: React.ReactNode
}

export default function Link({
  href,
  external,
  noIcon,
  className,
  children,
  ...props
}: LinkProps) {
  const newProps = !external
    ? props
    : { target: "_blank", rel: "noreferrer", ...props }

  return (
    <NextLink
      href={href}
      className={cn(
        "text-link hover:text-link-hover underline-offset-4 underline decoration-transparent  decoration-dotted transition-colors duration-300 ease-out hover:decoration-link-hover",
        className,
      )}
      {...newProps}
    >
      {children}
      {external && !noIcon && (
        <ExternalLinkIcon className="ml-0.5 w-3 h-3 inline-flex -mt-3" />
      )}
    </NextLink>
  )
}

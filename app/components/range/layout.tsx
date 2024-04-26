import "./range.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Components | Range</title>
      </head>

      <body className="min-h-96 sm:min-h-screen">{children}</body>
    </html>
  )
}

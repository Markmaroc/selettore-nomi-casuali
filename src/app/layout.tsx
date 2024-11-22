import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Selettore Nomi Casuali',
  description: 'Applicazione per selezionare nomi in modo casuale',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  )
}

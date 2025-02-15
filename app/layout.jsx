import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--inter-font' })

export const metadata = {
  title: 'Drink up!',
  description: 'Must drink water',
}

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  )
}

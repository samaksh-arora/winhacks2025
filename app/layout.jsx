import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from "../components/Navbar"

const inter = Inter({ subsets: ['latin'], variable: '--inter-font' })

export const metadata = {
  title: 'Drink up!',
  description: 'Must drink water',
}

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Navbar />
        <main className="flex flex-col place-center justify-between mt-[48px]">
          {children}
        </main>
      </body>
    </html>
  )
}
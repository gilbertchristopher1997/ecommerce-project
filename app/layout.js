import './globals.css'
import { Inter } from 'next/font/google'
import {StoreProvider} from "@/utils/Store";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ecommerce Project',
  description: 'Gilbert Christopher - 2023',
}

export default function RootLayout({ children }) {
  return (
      <StoreProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </StoreProvider>
  )
}

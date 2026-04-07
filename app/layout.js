import './globals.css'
import { Inter, Playfair_Display } from 'next/font/google'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata = {
  title: 'Rio Largo | Award-winning South African olive oil',
  description:
    "Hand-picked, cold-pressed extra virgin olive oil from South Africa's Breede River Valley. Gold medals in New York, Japan, Amsterdam and Italy. Fresh from the southern harvest — on UK tables before the northern oils are bottled.",
  keywords:
    'South African olive oil, extra virgin olive oil, Rio Largo, award winning olive oil UK, premium olive oil, Breede River Valley, southern hemisphere harvest',
  openGraph: {
    title: 'Rio Largo | Award-winning South African olive oil',
    description:
      "Fresh from the southern harvest. On UK tables before the northern oils are bottled. Gold medals in New York, Japan, Amsterdam and Italy.",
    type: 'website',
    images: ['/images/hero-breede-valley-1280w.webp'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

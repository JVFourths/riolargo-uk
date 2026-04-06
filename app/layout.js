import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Rio Largo | Award-Winning South African Olive Oil',
  description: 'Multiple award-winning extra virgin olive oil from the Breede River Valley, South Africa. Gold medals in New York, Japan, Amsterdam and more. Free UK delivery on orders over £40.',
  keywords: 'South African olive oil, extra virgin olive oil, Rio Largo, award winning olive oil UK, premium olive oil',
  openGraph: {
    title: 'Rio Largo | Award-Winning South African Olive Oil',
    description: 'Gold medal EVOO from South Africa\'s Breede River Valley. Hand-picked. Cold-pressed. Internationally recognised.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

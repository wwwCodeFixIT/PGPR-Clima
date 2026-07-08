import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-sans', display: 'swap' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap', weight: ['400', '500'] })

export const metadata: Metadata = {
  title: { template: '%s | PGPR Clima', default: 'PGPR Clima – Field Service HVAC' },
  description: 'Profesjonalny system zarządzania serwisem HVAC, klimatyzacją i pompami ciepła.',
  applicationName: 'PGPR Clima',
  keywords: ['HVAC', 'klimatyzacja', 'serwis', 'F-Gazy', 'protokoły', 'zlecenia'],
  robots: { index: false, follow: false },
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f6f8' },
    { media: '(prefers-color-scheme: dark)',  color: '#0a1019' },
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster position="bottom-right" richColors closeButton toastOptions={{ duration: 4000 }} />
        </ThemeProvider>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { CheckCircle, Calendar, Shield, Phone } from 'lucide-react'

export const metadata: Metadata = { title: 'Oferta | PGPR Clima', robots: { index: false, follow: false } }

export default function PublicQuotationPage({ params }: { params: { token: string } }) {
  const { token } = params
  // In production: verify token, fetch quotation data
  void token

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-pgpr-blue-700 to-pgpr-cyan-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">PC</span>
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">PGPR Instalacje Sp. z o.o.</p>
              <p className="text-xs text-gray-500">ul. Klimatyczna 14, Wrocław</p>
            </div>
          </div>
          <a href="tel:+48710000000" className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
            <Phone className="h-4 w-4" /><span className="hidden sm:inline">+48 71 000 00 00</span>
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Hero */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Oferta nr OF/2024/0042</p>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Montaż systemu klimatyzacji</h1>
              <p className="text-gray-500 mt-2">Jan Kowalski · ul. Różana 7, Wrocław</p>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-amber-600 bg-amber-50 dark:bg-amber-950/50 rounded-full px-3 py-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Ważna do 31.01.2025
            </div>
          </div>
        </div>

        {/* Variants */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Wybierz wariant</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Ekonomiczny', tag: null,          price: '3 490', device: 'Gree Fairy 3,5 kW', warranty: '24 mies.', badge: '' },
              { label: 'Rekomendowany', tag: 'Polecamy',  price: '4 790', device: 'Daikin FTXM35R 3,5 kW', warranty: '36 mies.', badge: 'ring-2 ring-pgpr-blue-600' },
              { label: 'Premium',    tag: null,           price: '6 890', device: 'Mitsubishi Electric MSZ-EF35 3,5 kW', warranty: '60 mies.', badge: '' },
            ].map(({ label, tag, price, device, warranty, badge }) => (
              <div key={label} className={`relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 ${badge}`}>
                {tag && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pgpr-blue-700 text-white text-xs font-semibold px-3 py-1 rounded-full">{tag}</span>
                )}
                <p className="text-sm font-semibold text-gray-500 mb-1">{label}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{price} <span className="text-sm font-normal text-gray-500">zł brutto</span></p>
                <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p>📦 {device}</p>
                  <p>🛡️ Gwarancja {warranty}</p>
                  <p>🔧 Montaż w cenie</p>
                </div>
                <button className="mt-5 w-full py-3 rounded-xl bg-pgpr-blue-700 text-white text-sm font-semibold hover:bg-pgpr-blue-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pgpr-blue-500">
                  Wybieram ten wariant
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Trust */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Shield,       text: 'Licencjonowani technicy F-Gaz' },
            { icon: CheckCircle,  text: 'Protokół montażu w cenie' },
            { icon: Calendar,     text: 'Termin: do 14 dni roboczych' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
              <Icon className="h-5 w-5 text-pgpr-cyan-500 shrink-0" />
              <p className="text-sm text-gray-700 dark:text-gray-300">{text}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Sticky CTA mobile */}
      <div className="sticky bottom-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 md:hidden">
        <button className="w-full py-3 rounded-xl bg-pgpr-blue-700 text-white font-semibold text-base">
          Zaakceptuj ofertę
        </button>
      </div>
    </div>
  )
}

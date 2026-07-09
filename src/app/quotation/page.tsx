'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { CheckCircle, Calendar, Shield } from 'lucide-react'

function QuotationContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('t')

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center p-8">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">Link oferty jest nieprawidłowy.</p>
          <p className="text-gray-500 mt-2">Sprawdź link otrzymany od wykonawcy.</p>
        </div>
      </div>
    )
  }

  // In production: fetch quotation data by token from Supabase
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <p className="font-semibold text-sm text-gray-900 dark:text-white">PGPR Instalacje Sp. z o.o.</p>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Oferta nr OF/2024/0042</p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Montaż systemu klimatyzacji</h1>
          <p className="text-gray-500 mt-2">Jan Kowalski · ul. Różana 7, Wrocław</p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Wybierz wariant</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Ekonomiczny',   price: '3 490', device: 'Gree Fairy 3,5 kW',         warranty: '24 mies.', hl: false },
              { label: 'Rekomendowany', price: '4 790', device: 'Daikin FTXM35R 3,5 kW',     warranty: '36 mies.', hl: true },
              { label: 'Premium',       price: '6 890', device: 'Mitsubishi Electric MSZ-EF', warranty: '60 mies.', hl: false },
            ].map(({ label, price, device, warranty, hl }) => (
              <div key={label} className={`relative bg-white dark:bg-gray-900 rounded-2xl border p-6 ${hl ? 'border-pgpr-blue-600 ring-2 ring-pgpr-blue-600' : 'border-gray-200 dark:border-gray-800'}`}>
                {hl && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pgpr-blue-700 text-white text-xs font-semibold px-3 py-1 rounded-full">Polecamy</span>}
                <p className="text-sm font-semibold text-gray-500 mb-1">{label}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{price} <span className="text-sm font-normal text-gray-500">zł brutto</span></p>
                <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p>📦 {device}</p>
                  <p>🛡️ Gwarancja {warranty}</p>
                  <p>🔧 Montaż w cenie</p>
                </div>
                <button className="mt-5 w-full py-3 rounded-xl bg-pgpr-blue-700 text-white text-sm font-semibold hover:bg-pgpr-blue-600 transition-colors">
                  Wybieram ten wariant
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Shield,      text: 'Licencjonowani technicy F-Gaz' },
            { icon: CheckCircle, text: 'Protokół montażu w cenie' },
            { icon: Calendar,    text: 'Termin: do 14 dni roboczych' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
              <Icon className="h-5 w-5 text-pgpr-cyan-500 shrink-0" />
              <p className="text-sm text-gray-700 dark:text-gray-300">{text}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default function QuotationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" /></div>}>
      <QuotationContent />
    </Suspense>
  )
}

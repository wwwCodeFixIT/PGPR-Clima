'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Wind } from 'lucide-react'

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/app')
  }, [router])

  return (
    <div className="min-h-screen bg-pgpr-navy-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-pgpr-blue-600 to-pgpr-cyan-500 flex items-center justify-center shadow-lg">
          <Wind className="h-6 w-6 text-white" />
        </div>
        <div className="h-6 w-6 rounded-full border-2 border-pgpr-cyan-400 border-t-transparent animate-spin" aria-hidden="true" />
        <p className="text-white/50 text-sm">PGPR Clima</p>
      </div>
    </div>
  )
}

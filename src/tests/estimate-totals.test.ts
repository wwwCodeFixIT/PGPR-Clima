import { describe, it, expect } from 'vitest'
import { calculateLineTotals, calculateEstimateTotals } from '@/domain/estimate-totals'

describe('calculateLineTotals', () => {
  it('calculates net line with VAT 23%', () => {
    const t = calculateLineTotals({ quantity: 2, unitNetPrice: 100, vatRate: 0.23 })
    expect(t.lineNet).toBe(200)
    expect(t.vatAmount).toBe(46)
    expect(t.lineGross).toBe(246)
  })

  it('applies discount correctly', () => {
    const t = calculateLineTotals({ quantity: 1, unitNetPrice: 200, vatRate: 0.23, discount: 0.10 })
    expect(t.lineNet).toBe(180)
    expect(t.lineGross).toBeCloseTo(221.4, 1)
  })

  it('calculates margin from purchase price', () => {
    const t = calculateLineTotals({ quantity: 1, unitNetPrice: 300, vatRate: 0.23, purchasePrice: 200 })
    expect(t.margin).toBe(100)
    expect(t.marginPct).toBeCloseTo(33.33, 1)
  })
})

describe('calculateEstimateTotals', () => {
  it('sums multiple lines', () => {
    const totals = calculateEstimateTotals([
      { quantity: 1, unitNetPrice: 1000, vatRate: 0.23, purchasePrice: 700 },
      { quantity: 2, unitNetPrice: 200,  vatRate: 0.08, purchasePrice: 120 },
    ])
    expect(totals.netTotal).toBe(1400)
    expect(totals.grossMargin).toBe(760)
  })
})

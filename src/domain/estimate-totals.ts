/**
 * Estimate / Invoice totals engine.
 * Always run server-side — never trust client-submitted totals.
 */

export interface EstimateLineInput {
  quantity:      number
  unitNetPrice:  number
  vatRate:       number   // e.g. 0.23 for 23%
  discount?:     number   // fraction, e.g. 0.10 for 10%
  markup?:       number   // fraction on purchasePrice
  purchasePrice?: number
}

export interface EstimateLineTotals {
  unitNetPrice:  number
  discount:      number
  discountedNet: number
  vatAmount:     number
  lineNet:       number
  lineGross:     number
  margin:        number
  marginPct:     number
}

export interface EstimateTotals {
  netTotal:   number
  vatTotal:   number
  grossTotal: number
  totalCost:  number
  grossMargin: number
  grossMarginPct: number
}

export function calculateLineTotals(line: EstimateLineInput): EstimateLineTotals {
  const unitNetPrice = line.markup && line.purchasePrice
    ? line.purchasePrice * (1 + line.markup)
    : line.unitNetPrice

  const discountFraction = line.discount ?? 0
  const discountAmount   = unitNetPrice * discountFraction
  const discountedNet    = unitNetPrice - discountAmount
  const lineNet          = discountedNet * line.quantity
  const vatAmount        = lineNet * line.vatRate
  const lineGross        = lineNet + vatAmount
  const cost             = (line.purchasePrice ?? 0) * line.quantity
  const margin           = lineNet - cost
  const marginPct        = lineNet > 0 ? (margin / lineNet) * 100 : 0

  return {
    unitNetPrice: round2(unitNetPrice),
    discount:     round2(discountAmount),
    discountedNet: round2(discountedNet),
    vatAmount:    round2(vatAmount),
    lineNet:      round2(lineNet),
    lineGross:    round2(lineGross),
    margin:       round2(margin),
    marginPct:    round2(marginPct),
  }
}

export function calculateEstimateTotals(
  lines: Array<EstimateLineInput & { purchasePrice?: number }>
): EstimateTotals {
  let netTotal   = 0
  let vatTotal   = 0
  let grossTotal = 0
  let totalCost  = 0

  for (const line of lines) {
    const t = calculateLineTotals(line)
    netTotal   += t.lineNet
    vatTotal   += t.vatAmount
    grossTotal += t.lineGross
    totalCost  += (line.purchasePrice ?? 0) * line.quantity
  }

  const grossMargin    = netTotal - totalCost
  const grossMarginPct = netTotal > 0 ? (grossMargin / netTotal) * 100 : 0

  return {
    netTotal:       round2(netTotal),
    vatTotal:       round2(vatTotal),
    grossTotal:     round2(grossTotal),
    totalCost:      round2(totalCost),
    grossMargin:    round2(grossMargin),
    grossMarginPct: round2(grossMarginPct),
  }
}

function round2(n: number): number {
  return Math.round(n * 100) / 100
}

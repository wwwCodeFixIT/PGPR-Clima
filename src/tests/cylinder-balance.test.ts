import { describe, it, expect } from 'vitest'
import { calculateBalance, validateMovement, co2EquivalentTonnes, CylinderBalanceError } from '@/domain/cylinder-balance'

describe('calculateBalance', () => {
  it('returns correct net when cylinder has gas', () => {
    const { grossKg, netKg, isValid } = calculateBalance(8.5, [
      { id: '1', type: 'receipt', massChangeKg: 15, performedAt: new Date() },
    ])
    expect(grossKg).toBe(23.5)
    expect(netKg).toBe(15)
    expect(isValid).toBe(true)
  })

  it('netKg is 0 when gross equals tara', () => {
    const { netKg } = calculateBalance(8.5, [])
    expect(netKg).toBe(0)
  })

  it('isValid false when below tara minus tolerance', () => {
    const { isValid } = calculateBalance(8.5, [
      { id: '1', type: 'correction', massChangeKg: -2, performedAt: new Date() },
    ])
    expect(isValid).toBe(false)
  })
})

describe('validateMovement', () => {
  it('throws when operation would go below tara', () => {
    expect(() => validateMovement(9.0, 8.5, -2)).toThrow(CylinderBalanceError)
  })

  it('does not throw for valid operation', () => {
    expect(() => validateMovement(23.5, 8.5, -5)).not.toThrow()
  })
})

describe('co2EquivalentTonnes', () => {
  it('calculates correctly for R32 (GWP 675)', () => {
    const result = co2EquivalentTonnes(1, 675)
    expect(result).toBe(0.675)
  })
  it('calculates correctly for R410A (GWP 2088)', () => {
    const result = co2EquivalentTonnes(5, 2088)
    expect(result).toBeCloseTo(10.44, 2)
  })
})

/**
 * Cylinder balance engine.
 * Append-only ledger — each movement is immutable.
 * Balance is derived from the sum of movements.
 */

export interface CylinderMovement {
  id:           string
  type:         CylinderMovementType
  massChangeKg: number   // positive = add, negative = subtract
  performedAt:  Date
}

export type CylinderMovementType =
  | 'receipt'    // +
  | 'fill'       // +
  | 'recovery'   // +
  | 'transfer_in'// +
  | 'consumption'// -
  | 'issue'      // -
  | 'transfer_out'// -
  | 'disposal'   // -
  | 'correction' // +/-

export interface CylinderState {
  cylinderId:     string
  taraKg:         number
  currentGrossKg: number
  currentNetKg:   number
  movements:      CylinderMovement[]
}

export class CylinderBalanceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CylinderBalanceError'
  }
}

const TOLERANCE_KG = 0.05 // measurement tolerance

export function calculateBalance(taraKg: number, movements: CylinderMovement[]): {
  grossKg: number
  netKg:   number
  isValid: boolean
} {
  const initialGrossKg = taraKg // assume empty initially
  const totalChange = movements.reduce((sum, m) => sum + m.massChangeKg, 0)
  const grossKg = initialGrossKg + totalChange
  const netKg = Math.max(0, grossKg - taraKg)
  return { grossKg, netKg, isValid: grossKg >= taraKg - TOLERANCE_KG }
}

export function validateMovement(
  currentGrossKg: number,
  taraKg: number,
  massChangeKg: number
): void {
  const newGross = currentGrossKg + massChangeKg
  if (newGross < taraKg - TOLERANCE_KG) {
    throw new CylinderBalanceError(
      `Niedozwolona operacja: nowy stan butli (${newGross.toFixed(3)} kg) byłby poniżej tary (${taraKg} kg). ` +
      `Sprawdź masę operacji.`
    )
  }
}

export function co2EquivalentTonnes(massKg: number, gwp: number): number {
  return (massKg * gwp) / 1000
}

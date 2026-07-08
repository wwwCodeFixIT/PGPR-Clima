import type { OcrProvider, NameplateAnalysis, NameplateField } from './types'

function field(value: string, confidence: number): NameplateField {
  return { value, confidence, raw: value }
}

export class MockOcrAdapter implements OcrProvider {
  async analyzeNameplate(_imageBase64: string, _mimeType: string): Promise<NameplateAnalysis> {
    await new Promise((r) => setTimeout(r, 800)) // simulate processing
    return {
      manufacturer:  field('Mitsubishi Electric',  0.95),
      model:         field('MSZ-EF35VG',            0.92),
      serialNumber:  field('DEMO123456789',         0.98),
      refrigerant:   field('R32',                   0.97),
      chargeKg:      field('1.05',                  0.88),
      voltage:       field('230V~50Hz',             0.91),
      powerW:        field('1050',                  0.85),
      coolingCapKw:  field('3.5',                   0.90),
      rawText:       '[DEMO OCR — rzeczywiste dane po konfiguracji providera]',
      processingMs:  800,
      provider:      'mock',
    }
  }
}

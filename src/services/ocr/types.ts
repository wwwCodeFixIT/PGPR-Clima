export interface NameplateField {
  value:      string | null
  confidence: number   // 0-1
  raw:        string   // raw OCR text
}

export interface NameplateAnalysis {
  manufacturer:  NameplateField
  model:         NameplateField
  serialNumber:  NameplateField
  refrigerant:   NameplateField
  chargeKg:      NameplateField
  voltage:       NameplateField
  powerW:        NameplateField
  coolingCapKw:  NameplateField
  rawText:       string
  processingMs:  number
  provider:      string
}

export interface OcrProvider {
  analyzeNameplate(imageBase64: string, mimeType: string): Promise<NameplateAnalysis>
}

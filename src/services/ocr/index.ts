import type { OcrProvider } from './types'

let _provider: OcrProvider | null = null

export async function getOcrProvider(): Promise<OcrProvider> {
  if (_provider) return _provider
  const providerType = process.env.OCR_PROVIDER ?? 'mock'
  if (providerType === 'mock') {
    const { MockOcrAdapter } = await import('./mock-adapter')
    _provider = new MockOcrAdapter()
  } else {
    // Future: Google Vision, Azure CV, etc.
    const { MockOcrAdapter } = await import('./mock-adapter')
    _provider = new MockOcrAdapter()
  }
  return _provider
}

export type { OcrProvider, NameplateAnalysis, NameplateField } from './types'

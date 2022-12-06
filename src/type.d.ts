export type Options = {
  id?: string
  camSize?: Dimension
  dropShadow?: boolean
  border?: number
  borderRadius?: number
  audio?: boolean
  audioConstraints?: Promise<MediaStream> | null
  forceScreenshotSourceSize?: boolean
  imageSmoothing?: boolean
  mirrored?: boolean
  minScreenshotHeight?: number
  minScreenshotWidth?: number
  screenshotFormat?: string
  screenshotQuality?: number
  videoConstraints?: Promise<MediaStream> | null
  onUserMedia?: () => void
  onUserMediaError?: () => void
}

export type ImageFormat = 'img/png' | 'img/jpg' | 'img/webpg'

export interface Dimension {
  width: number
  height: number
}

export type CameraMode = 'PICTURE' | 'VIDEO'

export type Options = {
  id?: string
  dropShadow?: boolean
  border?: number
  borderRadius?: number
  audio?: boolean
  audioMediaStream?: Promise<MediaStream> | null
  forceScreenshotSourceSize?: boolean
  imageSmoothing?: boolean
  mirrored?: boolean
  minScreenshotHeight?: number
  minScreenshotWidth?: number
  screenshotFormat?: string
  screenshotQuality?: number
  videoMediaStream?: Promise<MediaStream> | null
  onUserMedia?: () => void
  onUserMediaError?: () => void
}

export type ImageFormat = 'img/png' | 'img/jpg' | 'img/webpg'

export type CameraMode = 'PICTURE' | 'VIDEO'

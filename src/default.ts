import { Dimension, ImageFormat } from './type'
/* TODO => find a way to dynamicaly generate the type of defaultValue from
 * Options */
export type Options = {
  id: string
  camSize: Dimension
  dropShadow: boolean
  border: number
  borderRadius: number
  audio: boolean
  audioConstraints: Promise<MediaStream> | null
  forceScreenshotSourceSize: boolean
  imageSmoothing: boolean
  mirrored: boolean
  minScreenshotHeight: number
  minScreenshotWidth: number
  screenshotFormat: ImageFormat
  screenshotQuality: number
  videoConstraints: Promise<MediaStream> | null
  onUserMedia: () => void
  onUserMediaError: () => void
}

const defaultValue: Options = {
  id: '',
  camSize: { width: 100, height: 100 },
  dropShadow: false,
  border: 0,
  borderRadius: 0,
  audio: false,
  audioConstraints: navigator.mediaDevices.getUserMedia({
    audio: true
  }),
  forceScreenshotSourceSize: false,
  imageSmoothing: false,
  mirrored: false,
  minScreenshotHeight: 1000,
  minScreenshotWidth: 1000,
  screenshotFormat: 'img/jpg',
  screenshotQuality: 0.9,
  videoConstraints: navigator.mediaDevices.getUserMedia({
    video: true
  }),
  onUserMedia: () => {},
  onUserMediaError: () => {}
} as const

export default defaultValue

import { Dimension, ImageFormat } from './type'
import getUserMediaStream from './modules/getUserMedia'
/* TODO => find a way to dynamicaly generate the type of defaultValue from
 * Options */
export type Options = {
  audio: boolean
  audioMediaStream: Promise<MediaStream> | null
  forceScreenshotSourceSize: boolean
  imageSmoothing: boolean
  mirrored: boolean
  minScreenshotHeight: number
  minScreenshotWidth: number
  screenshotFormat: ImageFormat
  screenshotQuality: number
  videoMediaStream: Promise<MediaStream> | null
  onUserMedia: () => void
  onUserMediaError: () => void
}

const defaultValue: Options = {
  audio: false,
  audioMediaStream: getUserMediaStream('audio'),
  forceScreenshotSourceSize: false,
  imageSmoothing: false,
  mirrored: false,
  minScreenshotHeight: 1000,
  minScreenshotWidth: 1000,
  screenshotFormat: 'img/jpg',
  screenshotQuality: 0.9,
  videoMediaStream: getUserMediaStream('video'),
  onUserMedia: () => {},
  onUserMediaError: () => {}
} as const

export default defaultValue

import { Options, Dimension } from './type'
import defaultValue from './default'

export default class CamLibu {
  /* Options */
  id: string
  camSize: Dimension
  dropShadow: boolean
  border: number
  borderRadius: number
  audio: boolean // enable | disable audio
  audioConstraints: Promise<MediaStream> | null // Object contaning the audio source
  forceScreenshotSourceSize: boolean // uses size of underlying source video stream (and thus ignores other size related props)
  imageSmoothing: boolean // pixel smoothing of the screenshot taken
  mirrored: boolean // show camera preview and get the screenshot mirrored
  minScreenshotHeight: number
  minScreenshotWidth: number
  screenshotFormat: string
  screenshotQuality: number // quality between the range of 0 to 1
  videoConstraints: Promise<MediaStream> | null // MediaStreamConstraints(s) for the video
  onUserMedia: () => void // callback when the component recives mediStream
  onUserMediaError: () => void // callback when the component gets an error reciving the mediStream

  /* Methods */
  getScreenshot!: () => void

  constructor(options: Options = {}) {
    this.id = options.id || defaultValue.id
    this.camSize = options.camSize || defaultValue.camSize
    this.dropShadow = options.dropShadow || defaultValue.dropShadow
    this.border = options.border || defaultValue.border
    this.borderRadius = options.borderRadius || defaultValue.borderRadius
    this.audio = options.audio || defaultValue.audio
    this.audioConstraints = options.audioConstraints || defaultValue.audioConstraints
    this.forceScreenshotSourceSize =
      options.forceScreenshotSourceSize || defaultValue.forceScreenshotSourceSize
    this.imageSmoothing = options.imageSmoothing || defaultValue.imageSmoothing
    this.mirrored = options.mirrored || defaultValue.mirrored
    this.minScreenshotHeight = options.minScreenshotWidth || defaultValue.minScreenshotWidth
    this.minScreenshotWidth = options.minScreenshotHeight || defaultValue.minScreenshotHeight
    this.screenshotFormat = options.screenshotFormat || defaultValue.screenshotFormat
    this.screenshotQuality = options.screenshotQuality || defaultValue.screenshotQuality
    this.videoConstraints = options.videoConstraints || defaultValue.videoConstraints
    this.onUserMedia = options.onUserMedia || defaultValue.onUserMedia
    this.onUserMediaError = options.onUserMediaError || defaultValue.onUserMediaError
  }
}

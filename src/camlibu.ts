import { Options } from './type'
import defaultValue from './default'

export default class CamLibu {
  /* Options */
  audio: boolean // enable | disable audio
  audioMediaStream: Promise<MediaStream> | null // Object contaning the audio source
  forceScreenshotSourceSize: boolean // uses size of underlying source video stream (and thus ignores other size related props)
  imageSmoothing: boolean // pixel smoothing of the screenshot taken
  mirrored: boolean // show camera preview and get the screenshot mirrored
  minScreenshotHeight: number
  minScreenshotWidth: number
  screenshotFormat: string
  screenshotQuality: number // quality between the range of 0 to 1
  videoMediaStream: Promise<MediaStream> | null // MediaStreamConstraints(s) for the video
  onUserMedia: () => void // callback when the component recives mediStream
  onUserMediaError: () => void // callback when the component gets an error reciving the mediStream

  /* Methods */
  getVideo!: () => void
  getPicture!: () => string

  constructor(options: Options = {}) {
    this.audio = options.audio || defaultValue.audio
    this.audioMediaStream = options.audioMediaStream || defaultValue.audioMediaStream
    this.forceScreenshotSourceSize =
      options.forceScreenshotSourceSize || defaultValue.forceScreenshotSourceSize
    this.imageSmoothing = options.imageSmoothing || defaultValue.imageSmoothing
    this.mirrored = options.mirrored || defaultValue.mirrored
    this.minScreenshotHeight = options.minScreenshotWidth || defaultValue.minScreenshotWidth
    this.minScreenshotWidth = options.minScreenshotHeight || defaultValue.minScreenshotHeight
    this.screenshotFormat = options.screenshotFormat || defaultValue.screenshotFormat
    this.screenshotQuality = options.screenshotQuality || defaultValue.screenshotQuality
    this.videoMediaStream = options.videoMediaStream || defaultValue.videoMediaStream
    this.onUserMedia = options.onUserMedia || defaultValue.onUserMedia
    this.onUserMediaError = options.onUserMediaError || defaultValue.onUserMediaError
  }
}

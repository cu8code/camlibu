import { throws } from 'assert'

interface Dimension {
  width: number
  height: number
}

interface CamLibProps {
  rootElement?: HTMLElement
  dimension?: Dimension
}

type Mode = 'PICTURE' | 'VIDEO'

const htmlIDs = {
  root: 'cam-lib-r',
  video: 'cam-lib-v',
  button: 'cam-lib-b',
}

const notImp = new Error('TODO: not imp')

const initHTMLString = `
    <video id=${htmlIDs.video}></video>
    <button id=${htmlIDs.button}></button>
  `

export default class CamLib {
  private _dimension!: Dimension
  private _mode!: Mode

  private _rootElement: HTMLElement
  private _buttonElement: HTMLButtonElement
  private _videoElement: HTMLVideoElement

  constructor(props: CamLibProps = {}) {
    this._rootElement =
      props.rootElement ||
      (function () {
        const root = document.createElement('div') as HTMLElement
        document.body.append(root)
        return root
      })()
    this._rootElement.innerHTML = initHTMLString
    this._videoElement = document.getElementById(htmlIDs.video) as HTMLVideoElement
    this._buttonElement = document.getElementById(htmlIDs.button) as HTMLButtonElement
    if (!this._buttonElement || !this._videoElement) {
      throw new Error(
        `[ERROR] SHIT WE FUCKED UP!!! 
        this._videoElement = ${this._videoElement} 
        this._buttonElement = ${this._buttonElement}`
      )
    }
    this.dimension = props.dimension || { width: 100, height: 100 }
    this.mode = 'PICTURE'
    // this._getMediaDevices()
  }
  private async _permisionStatus(): Promise<boolean> {
    const res = await navigator.permissions.query({ name: 'camera' })
    if (res.state === 'granted') {
      return true
    } else {
      return false
    }
  }
  private _getMediaDevices() {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((s) => {
        this._videoElement.srcObject = s
      })
      .catch((err) => {
        throw new Error(err)
      })
  }
  private _removeMediaDevices(): void {
    this._videoElement.srcObject = null
  }

  private _takePicture(): string {
    if (!this._permisionStatus()) {
      throw new Error('[ERROR] permissions was not provided')
    }
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.drawImage(this._videoElement, 0, 0, this.dimension.width, this.dimension.height)
    return canvas.toDataURL('image/jpeg')
  }
  private _takeVideo(): void {
    throw notImp
  }

  public get camera() {
    return this._rootElement
  }

  public get mode(): Mode {
    return this._mode
  }
  public set mode(e: Mode) {
    this._mode = e
  }

  public get dimension(): Dimension {
    return this._dimension
  }
  public set dimension(c: Dimension) {
    this._rootElement.style.height = String(c.height) //  TODO:DO you need to dispatchEvent resize event
    this._rootElement.style.width = String(c.width)
    this._dimension = c
  }

  public onButtonClicked() {
    switch (this.mode) {
      case 'PICTURE':
        this._takePicture()
        break
      case 'VIDEO':
        this._takeVideo()
        break
    }
  }
  public configureStylePreferences() {
    throw notImp
  }
  public addEventListeners() {
    throw notImp
  }
  public reset() {
    throw notImp
  }
}

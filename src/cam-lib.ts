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
  root: `cam-lib-r-X0o${Math.random()}`,
  video: `cam-lib-v-X0o${Math.random()}`,
  button: `cam-lib-b-X0o${Math.random()}`,
}
console.log(htmlIDs)

const notImp = new Error('TODO: not imp')

const initHTMLString = `
    <video class=${htmlIDs.video}></video>
    <button class=${htmlIDs.button}></button>
  `

export default class CamLib {
  private _dimension!: Dimension
  private _mode!: Mode

  private _rootElement: HTMLElement
  private _buttonElement: HTMLButtonElement
  private _videoElement: HTMLVideoElement

  constructor(props: CamLibProps = {}) {
    this._rootElement = props.rootElement || (document.createElement('div') as HTMLElement)
    this._rootElement.innerHTML = initHTMLString
    this._videoElement = this._rootElement.getElementsByClassName(htmlIDs.video)[0] as HTMLVideoElement
    this._buttonElement = this._rootElement.getElementsByClassName(htmlIDs.button)[0] as HTMLButtonElement
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

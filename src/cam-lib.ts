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

const notImp = new Error("TODO: not imp")

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
    this._rootElement = (function () {
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
    this._getMediaDevices()
  }
  private async _permisionStatus(): Promise<boolean> {
    const res = await navigator.permissions.query({ name: 'camera' })
    if (res.state === 'granted') {
      return true
    } else {
      return false
    }
  }
  private _getMediaDevices() : void {
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
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then((s) => {
        throw notImp
      })
      .catch((err) => {
        throw new Error(err)
      })
  }
  private _removeMediaDevices() : void {
    this._videoElement.srcObject = null
  }

  private _takePicture() : void {
    throw notImp
  }
  private _takeVideo() : void {
    throw notImp
  }

  public get mode() : Mode {
    return this._mode
  }
  public set mode(e: Mode) {
    this._mode = e
  }

  public get dimension() : Dimension{
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
}

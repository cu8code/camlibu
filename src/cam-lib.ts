interface Dimension {
  width: number
  height: number
}

interface CamLibProps {
  rootElement?: HTMLElement
  dimension?: Dimension
}

type Mode = 'PICTURE' | 'VIDEO'
type NavigatorPermisionStatus = 'OK' | 'NO' | 'DENIED'

const getAllVideoDevice = navigator.mediaDevices
  .enumerateDevices()
  .then((d) => {
    const s = []
    for (const i of d) {
      if (i.kind === 'videoinput') {
        s.push(i)
      }
    }
    return s
  })
  .catch((e) => {
    throw new Error(e)
  })

const htmlIDs = {
  root: 'cam-lib-r',
  video: 'cam-lib-v',
  button: 'cam-lib-b',
}

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
  private _navigatorPermisionStatusVideo: NavigatorPermisionStatus
  private _navigatorPermisionStatusAudio: NavigatorPermisionStatus

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
    this._navigatorPermisionStatusVideo = 'NO'
    this._navigatorPermisionStatusAudio = 'NO'
    this._getMediaDevices()
  }

  private _getMediaDevices() {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((s) => {
        this._navigatorPermisionStatusVideo = 'OK'
        this._videoElement.srcObject = s
      })
      .catch((err) => {
        this._navigatorPermisionStatusVideo = 'DENIED'
        throw new Error(err)
      })
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then((s) => {
        this._navigatorPermisionStatusAudio = 'OK'
      })
      .catch((err) => {
        this._navigatorPermisionStatusAudio = 'DENIED'
        throw new Error(err)
      })
  }
  private _removeMediaDevices() {
    this._navigatorPermisionStatusAudio = 'NO'
    this._navigatorPermisionStatusVideo = 'NO'
    this._videoElement.srcObject = null
  }

  private _takePicture() {
    if (
      this._navigatorPermisionStatusVideo === 'NO' ||
      this._navigatorPermisionStatusVideo === 'DENIED'
    ) {
      throw new Error(`Permision Failed`)
    }
  }
  private _takeVideo() {
    if (!this._navigatorPermisionStatusVideo) {
      throw new Error(`Permision Failed`)
    }
    if (!this._navigatorPermisionStatusAudio) {
      throw new Error(`Permision Failed`)
    }
  }

  public get mode() {
    return this._mode
  }
  public set mode(e: Mode) {
    this._mode = e
  }

  public get dimension() {
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

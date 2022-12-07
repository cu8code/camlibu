import { CamLibu } from '../camlibu'

export async function getPicture(this: CamLibu, e: 'returnDataURL', type?: void): Promise<String>
export async function getPicture(this: CamLibu, e: 'returnAsFile', type?: void): Promise<File>
export async function getPicture(this: CamLibu, e: 'returnAsBlob', type?: void): Promise<Blob>
export async function getPicture(
  this: CamLibu,
  e: 'returnAsFileAndSaveToUser',
  type: string
): Promise<File>
export async function getPicture(
  this: CamLibu,
  e: 'returnAsBlobAndSaveToUser',
  type: string
): Promise<File>

export async function getPicture(this: CamLibu, e: any, type: any): Promise<any> {
  switch (e) {
    case 'returnDataURL': {
      const c = document.createElement('canvas')
      const x = c.getContext('2d')
      const v = document.createElement('video')

      if (x === null) {
        throw new Error('Device not compatable')
      }
      const stream = await this.videoMediaStream
      v.srcObject = stream

      x.drawImage(v, 0, 0)
      return c.toDataURL()
      break
    }
    case 'returnAsFile': {
      break
    }
    case 'returnAsBlob': {
      break
    }
    case 'returnAsFileAndSaveToUser': {
      break
    }
    case 'returnAsBlobAndSaveToUser': {
      break
    }
  }
}

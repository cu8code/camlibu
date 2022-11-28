import CamLib from '../src/cam-lib'

function _getMediaDevices() {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
    })
    .then((s: MediaStream) => {
      console.log(s)
    })
    .catch((err: any) => {
      throw new Error(err)
    })
}

Object.assign(window.navigator, {
  mediaDevices: {
    getUserMedia: jest
      .fn()
      .mockImplementation(
        (): Promise<MediaStream> => Promise.resolve({} as unknown as MediaStream)
      ),
  },
})

test('check all the methods and props present in Cam-lib', () => {
  spyOn(CamLib.prototype, 'onButtonClicked')
  spyOn(CamLib.prototype, 'configureStylePreferences')
  spyOn(CamLib.prototype, 'addEventListeners')
  spyOn(CamLib.prototype, 'reset')

  const camLib = new CamLib()

  expect(camLib.camera).not.toBeNull()
})

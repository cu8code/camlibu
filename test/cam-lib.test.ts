import CamLib from '../src/camlibu'

Object.assign(window.navigator, {
  mediaDevices: {
    getUserMedia: jest
      .fn()
      .mockImplementation(
        (): Promise<MediaStream> => Promise.resolve(({} as unknown) as MediaStream)
      )
  }
})

test('check all the methods and props present in Cam-lib', () => {
  spyOn(CamLib.prototype, 'onUserMedia')
  spyOn(CamLib.prototype, 'onUserMediaError')
  spyOn(CamLib.prototype, 'getScreenshot')

  const camLib = new CamLib()

  expect(camLib.forceScreenshotSourceSize).not.toBeNull()
  expect(camLib.imageSmoothing).not.toBeNull()
  expect(camLib.mirrored).not.toBeNull()
  expect(camLib.minScreenshotWidth).not.toBeNull()
  expect(camLib.minScreenshotHeight).not.toBeNull()
  expect(camLib.screenshotFormat).not.toBeNull()
  expect(camLib.screenshotQuality).not.toBeNull()
  expect(camLib.videoConstraints).not.toBeNull()
})

import CamLib from '../src/cam-lib'

test('check all the methods and props present in Cam-lib', () => {
  spyOn(CamLib.prototype, 'onButtonClicked')
  spyOn(CamLib.prototype, 'configureStylePreferences')
  spyOn(CamLib.prototype, 'addEventListeners')
  spyOn(CamLib.prototype, 'reset')

  const camLib = new CamLib()

  expect(camLib.camera).not.toBeNull()
})

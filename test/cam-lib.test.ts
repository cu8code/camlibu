import CamLib from "../src/cam-lib"

const c = console.log

describe("Cam-lib", () => {
  const testObj = new CamLib()
  c(typeof testObj)
})

import { testColors } from '../components/constants'

export const FAILING = 'failing'
export const PASSING = 'passing'
export const PENDING = 'pending'

export const getTestResult = (mainBrick, unitTest) => {
  const testOutputId = mainBrick.testOutputIds[0]

  if (!testOutputId) {
    return PENDING
  }

  const brickValue = mainBrick.outputSlots[testOutputId].value
  const value = unitTest.values[brickValue && brickValue.slotId]
  const testOutput = unitTest.values[testOutputId]

  if (value && value.type && value.value &&
     testOutput && testOutput.type && testOutput.value
  ) {
    if (value.type == testOutput.type && value.value == testOutput.value) {
      return PASSING
    } else {
      return FAILING
    }
  }

  return PENDING
}

export const getTestResultColor = (unitTest) => {
  return testColors[unitTest.result]
}

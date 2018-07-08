import { fontSizeRoot, scale } from 'utils/constants'
import { round } from 'utils/helpers'

export const scaleValue = (i, {f, r, n} = scale) => f * Math.pow(r, i / n)

const spacing = (i, units = 'rem') => {

  let value = scaleValue(i, scale)

  if ('none' === units || false === units) {
    return round(value, 3)
  }

  if ('px' === units) {
    value = round(value * fontSizeRoot, 1)
  }

  return `${round(value, 3)}${units}`
}

export default spacing
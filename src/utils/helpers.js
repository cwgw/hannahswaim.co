import queryWidth from 'dom-helpers/query/width'
import queryHeight from 'dom-helpers/query/height'
import getComputedStyle from 'dom-helpers/style/getComputedStyle'

export const normalUnits = (stringVal) => {
  if (typeof stringVal !== 'string') {
    return stringVal
  }

  const [num, unit] = stringVal.split(/(\D+)$/).map((val) => parseFloat(val) || val)

  let returnVal = num

  switch (unit) {
    case 'rem': {
      const baseFontSize = 16
      returnVal = baseFontSize * num
      break
    }
    case 'px':
    default: {
      // return returnVal
    }
  }

  return parseFloat(returnVal)
}


export const innerWidth = (element) => {
  const width = queryWidth(element)
  const style = getComputedStyle(element)
  return width - (normalUnits(style.paddingLeft) + normalUnits(style.paddingRight))
}

export const outerWidth = (element) => {
  const width = queryWidth(element)
  const style = getComputedStyle(element)
  return width + (normalUnits(style.marginLeft) + normalUnits(style.marginRight))
}

export const innerHeight = (element) => {
  const height = queryHeight(element)
  const style = getComputedStyle(element)
  return height - (normalUnits(style.paddingTop) + normalUnits(style.paddingBottom))
}

export const outerHeight = (element) => {
  const height = queryHeight(element)
  const style = getComputedStyle(element)
  return height + (normalUnits(style.marginTop) + normalUnits(style.marginBottom))
}
import _isNil from 'lodash/isNil'
import { spreadValues } from './media'
import { has, merge } from './helpers'
import { spacing } from './spacing'
import { breakpoints } from './constants'

// const parseProperties = (key, properties) => {

//   // split the key on capital letters, e.g. ['padding', 'Top']
//   const [subjectKey, ...predicateKey] = key.split(/(?=[A-Z])/)

//   const subject = spacingProperties.subjects[subjectKey]

//   // bail early if the property can't be found
//   if (!subject) {
//     return null
//   }

//   const predicate = spacingProperties.predicates[predicateKey] || ''

//   return Array.isArray(predicate)
//     ? predicate.map(_predicate => subject + _predicate)
//     : [ subject + predicate ]
// }

const parseValue = (value) => {
  if (Array.isArray(value)) {
    return value.map(v => parseValue(v))
  }
  if (typeof value === 'number') {
    return spacing(value)
  }
  return value
}

export const mapProps = (propertyMap, additionalStyle = {}) => (props) => {

  return  Object.keys(propertyMap).reduce((acc, key) => {

    const value = props[key]
    const property = propertyMap[key]

    if (_isNil(value)) {
      return acc
    }

    if (Array.isArray(value) || typeof value === 'object') {
      return merge(acc, spreadValues(value, (n) => ({[property]: parseValue(n)})))
    }

    return merge(acc, {[property]: parseValue(value)})

  }, additionalStyle)
}

// Spacing
//
const spacingProperties = {
  subjects: {
    margin: 'margin',
    padding: 'padding',
  },
  predicates: {
    Top: 'Top',
    Right: 'Right',
    Bottom: 'Bottom',
    Left: 'Left',
    X: ['Right', 'Left'],
    Y: ['Top', 'Bottom'],
  }
}

export const space = mapProps(spacingProperties)

// Flex
//
const flexProperties = {
  flexDirection: 'flex-direction',
  flexWrap: 'flex-wrap',
  flexFlow: 'flex-flow',
  justifyContent: 'justify-content',
  alignItems: 'align-items',
  alignContent: 'align-content',
}

// const flexProps = new Map([
//   ['flexDirection', 'flex-direction'],
//   ['flexWrap', 'flex-wrap'],
//   ['flexFlow', 'flex-flow'],
//   ['justifyContent', 'justify-content'],
//   ['alignItems', 'align-items'],
//   ['alignContent', 'align-content']
// ])

export const makeFlex = mapProps(flexProperties, {display: 'flex'})

// Grid
//
const gridProperties = {
  gridTemplateColumns: 'grid-template-columns',
  gridTemplateRows: 'grid-template-rows',
  gridTemplateAreas: 'grid-template-areas',
  gridTemplate: 'grid-template',
  gridAutoColumns: 'grid-auto-columns',
  gridAutoRows: 'grid-auto-rows',
  gridAutoFlow: 'grid-auto-flow',
  columnGap: 'column-gap',
  rowGap: 'row-gap',
  gap: ['gap', 'grid-gap'],
  // gridGap: 'grid-gap', // old syntax necessary for safari
  grid: 'grid',
  justifyItems: 'justify-items',
  alignItems: 'align-items',
  placeItems: 'place-items',
  justifyContent: 'justify-content',
  alignContent: 'align-content',
  placeContent: 'place-content',
}

export const makeGrid = mapProps(gridProperties, {display: 'grid'})

export const size = ({size = null}) => () => typeof size === 'string'
  ? {
    maxWidth: has(breakpoints,size) ? `${breakpoints[size]}px` : size,
  }
  : null

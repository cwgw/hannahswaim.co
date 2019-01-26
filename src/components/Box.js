import styled from 'styled-components'

import { mapProps, size } from 'utils/props'
import { space } from 'utils/spacing'

const flexChildProperties = {
  order: 'order',
  flex: 'flex',
  flexGrow: 'flex-grow',
  flexShrink: 'flex-shrink',
  flexBasis: 'flex-basis',
  alignSelf: 'align-self',
}

const gridChildProperties = {
  gridColumnStart: 'grid-column-start',
  gridColumnEnd: 'grid-column-end',
  gridRowStart: 'grid-row-start',
  gridRowEnd: 'grid-row-end',
  gridColumn: 'grid-column',
  gridRow: 'grid-row',
  gridArea: 'grid-area',
  justifySelf: 'justify-self',
  alignSelf: 'align-self',
  placeSelf: 'place-self',
}

export const makeBox = mapProps({...flexChildProperties, ...gridChildProperties})

const Box = styled.div`
  ${size}
  ${space}
  ${makeBox}
`

export default Box

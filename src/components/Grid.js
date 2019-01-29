import styled from 'styled-components'

import { makeGrid } from 'style/layout'
import Box from 'components/Box'

const Grid = styled(Box)`
  ${makeGrid}
`

const colWidth = '1fr'
const gutterWidth = 'minmax(auto, 1.5rem)'
const gutterHalfWidth = 'minmax(auto, 0.75rem)'
const bleedWidth = 'minmax(0.5rem, 1fr)'

const columns = [
  '[bleedStart]',
  bleedWidth,
  '[wideStart]',
  bleedWidth,
  '[contentStart col1Start]',
  colWidth,
  '[col1End gutter1Start]',
  gutterWidth,
  '[gutter1End col2Start]',
  colWidth,
  '[col2End gutter2Start]',
  gutterWidth,
  '[gutter2End col3Start]',
  colWidth,
  '[col3End gutter3Start]',
  gutterHalfWidth,
  '[center]',
  gutterHalfWidth,
  '[gutter3End col4Start]',
  colWidth,
  '[col4End gutter4Start]',
  gutterWidth,
  '[gutter4End col5Start]',
  colWidth,
  '[col5End gutter5Start]',
  gutterWidth,
  '[gutter5End col6Start]',
  colWidth,
  '[col6End contentEnd]',
  bleedWidth,
  '[wideEnd]',
  bleedWidth,
  '[bleedEnd]'
]

const StandardGrid = styled(Box)
  .attrs({
    // gridTemplateColumns: '[bleedStart] 1fr [wideStart] 1fr [contentStart col1Start] 3fr [col1End] 1fr [center] 1fr [content2Start] 5fr [contentEnd content2End] 1fr [wideEnd] 1fr [bleedEnd]',
    gridTemplateColumns: columns.join(' '),
    // gridTemplateRows: 'repeat(auto-fill, minmax(1rem, min-content))'
  })`
    ${makeGrid}
  `

export {
  Grid as default,
  Grid,
  StandardGrid
}

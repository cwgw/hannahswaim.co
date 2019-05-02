import styled from 'styled-components'

import { spacing } from 'style/sizing'
import { makeGrid } from 'style/layout'
import Box from 'components/Box'

const Grid = styled(Box)`
  ${makeGrid}
`

const makeColumns = (n = 6, { includeGutters } = { includeGutters: true }) => {
  let gutter = `minmax(${spacing('lg')}, 2fr)`;
  let column = `minmax(auto, ${spacing(14)})`;
  let columns= [];
  for (let i = 1; i <= n + 1; i++) {
    let line = [];
    if (i === 1) line.push('contentStart');
    if (i > 1) line.push(`col${i - 1}End`);
    if (i <= n) line.push(`col${i}Start`);
    if (i === n + 1) line.push('contentEnd');
    columns.push(`[${line.join(' ')}]`);
  }
  return includeGutters
    ? `[bleedStart] ${gutter} ${columns.join(` ${column} `)} ${gutter} [bleedEnd]`
    : columns.join(` ${column} `);
}

const StandardGrid = styled(Box).attrs({
  gridTemplateColumns: makeColumns(),
  gap: 'lg'
})`
  ${makeGrid}
`

export {
  Grid as default,
  Grid,
  StandardGrid,
  makeColumns,
}

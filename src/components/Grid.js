import styled from 'styled-components';

import Box from 'components/Box';

const Grid = styled(Box)``;

Grid.defaultProps = {
  display: 'grid',
  gap: 'md',
  gridTemplateColumns: `var(--standard-grid-columns)`,
};

export default Grid;

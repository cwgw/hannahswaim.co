import styled from 'styled-components';
import { grid } from 'styled-system';

import Box from 'components/Box';

const Grid = styled(Box)(grid);

Grid.defaultProps = {
  display: 'grid',
  gridGap: 'md',
  gridTemplateColumns: `var(--standard-grid-columns)`,
};

export default Grid;

import React from 'react';

import { StandardGrid } from 'components/Grid';
import Box from 'components/Box';

const NotFoundPage = () => (
  <StandardGrid>
    <Box gridColumn="contentStart / contentEnd">
      <h1>404: NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist.</p>
    </Box>
  </StandardGrid>
);

export default NotFoundPage;

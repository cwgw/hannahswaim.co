import React from 'react';

import Grid from 'components/Grid';
import Box from 'components/Box';

const NotFoundPage = () => (
  <Grid marginTop={{ lg: 'xxl' }}>
    <Box col="contentStart / contentEnd">
      <h1>404: NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist.</p>
    </Box>
  </Grid>
);

export default NotFoundPage;

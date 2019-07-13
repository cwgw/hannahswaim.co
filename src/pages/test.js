import React from 'react';

import type from 'style/type';
import spacing from 'style/spacing';
import { spacingSizes } from 'style/tokens';

import Box from 'components/Box';
import Grid from 'components/Grid';

const TestPage = () => {
  return (
    <Grid paddingTop={{ lg: 11 }}>
      <Box col="col1Start / span 6">
        {Object.keys(type)
          .sort()
          .map(key => (
            <React.Fragment>
              <p
                key={key}
                style={
                  key === 'body'
                    ? {
                        ...type[key],
                        fontSize: 'inherit',
                      }
                    : type[key]
                }
              >
                {key}
              </p>
              <pre
                style={{
                  background: `rgba(0, 0, 0, 0.05)`,
                  fontSize: '0.8rem',
                  whiteSpace: 'pre-wrap',
                  lineHeight: 1.5,
                  padding: '0.5rem',
                }}
              >
                <code>{JSON.stringify(type[key])}</code>
              </pre>
            </React.Fragment>
          ))}
      </Box>
      <Box col="col1Start / span 3">
        {Array.apply(null, Array(16)).map((_, i) => (
          <p>
            <span
              style={{
                height: `${spacing(i)}`,
                width: `${spacing(i)}`,
                backgroundColor: 'gray',
                display: 'inline-block',
              }}
            />
            &emsp;
            {`spacing(${i})`}
          </p>
        ))}
      </Box>
      <Box col="span 3 / col6End">
        {Object.keys(spacingSizes).map(key => (
          <p>
            <span
              style={{
                height: `${spacing(key)}`,
                width: `${spacing(key)}`,
                backgroundColor: 'gray',
                display: 'inline-block',
              }}
            />
            &emsp;
            {`spacing(${key})`}
          </p>
        ))}
      </Box>
    </Grid>
  );
};

export default TestPage;

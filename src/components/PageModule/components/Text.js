import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { graphql } from 'gatsby'
import css from '@styled-system/css';

import { mediaQueries } from 'style/theme';

import Box from 'components/Box';
import Grid from 'components/Grid';

const propTypes = {
  text: PropTypes.shape({
    childMarkdownRemark: PropTypes.object,
  }).isRequired,
};

const defaultProps = {};

const Content = styled(Box)(
  css({
    [mediaQueries.md]: {
      '& .gatsby-resp-image-wrapper': {
        marginBottom: 'xl',
      },
    },
  })
);

const Text = React.forwardRef(
  ({ text: { childMarkdownRemark }, ...props }, ref) => (
    <Grid {...props} ref={ref}>
      <Content
        col={{
          base: 'contentStart / contentEnd',
          xl: 'contentStart / col4End',
        }}
        dangerouslySetInnerHTML={{ __html: childMarkdownRemark.html }}
        row="1"
      />
    </Grid>
  )
);

Text.propTypes = propTypes;

Text.defaultProps = defaultProps;

export default Text;

// export const pageQuery = graphql`
//   fragment PageText on ContentfulPageText {
//     id
//     text {
//       childMarkdownRemark {
//         html
//       }
//     }
//   }
// `

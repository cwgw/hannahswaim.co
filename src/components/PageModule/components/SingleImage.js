import React from 'react';
// import { graphql } from 'gatsby'
import GatsbyImage from 'gatsby-image';

import Grid from 'components/Grid';
import Box from 'components/Box';

const SingleImage = ({ id, image, ...props }) => {
  // console.log(props);
  return (
    <Grid {...props}>
      <Box
        gridColumn={{
          base: 'wideStart / col3End',
        }}
      >
        <GatsbyImage {...image} />
      </Box>
    </Grid>
  );
};

export default SingleImage;

// export const queryFragment = graphql`
//   fragment PageSingleImage on ContentfulPageSingleImage {
//     id
//     image {
//       fluid(maxWidth: 800, quality: 90) {
//         aspectRatio
//         ...GatsbyContentfulFluid_withWebp
//       }
//     }
//   }
// `

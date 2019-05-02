import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import * as PageModule from 'components/PageModule';

const propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.shape({
    page: PropTypes.object,
  }).isRequired,
};

const PageTemplate = ({
  location,
  data: {
    page: { contentModules },
  },
}) => (
  <React.Fragment>
    {contentModules.map(({ __typename, ...content }, index) => {
      const Module = PageModule[__typename];
      return Module ? (
        <Module
          key={content.id}
          marginBottom={{
            base: 10,
            lg: 13,
          }}
          paddingTop={
            index === 0 && __typename !== 'ContentfulPageHero'
              ? { lg: 10 }
              : null
          }
          location={location}
          {...content}
        />
      ) : null;
    })}
  </React.Fragment>
);

PageTemplate.propTypes = propTypes;

export default PageTemplate;

export const pageQuery = graphql`
  query singlePage($id: String!) {
    page: contentfulPage(contentful_id: { eq: $id }) {
      id
      title
      slug
      node_locale
      contentModules {
        ...PageHero
        ...PageArtwork
        ...PageInstagram
        ...PageFeature
      }
    }
  }
`;

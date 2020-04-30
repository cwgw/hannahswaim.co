import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { meta } from 'utils/meta';

import image from 'assets/images/icon.png';

const propTypes = {
  location: PropTypes.object.isRequired,
  siteMetadata: PropTypes.shape({
    siteName: PropTypes.string,
    siteTitle: PropTypes.string,
    siteTitleSeparator: PropTypes.string,
    siteUrl: PropTypes.string,
  }).isRequired,
  pageTitle: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  locale: PropTypes.string,
  socialMedia: PropTypes.shape({
    edges: PropTypes.array,
  }),
};

const defaultProps = {
  pageTitle: null,
  image: null,
  description: '',
  locale: 'en-US',
  socialMedia: {
    edges: [],
  },
};

const Head = ({
  siteMetadata: { description, name, short_name, siteUrl },
  location,
  socialMedia,
}) => {
  const structuredData = [
    {
      '@context': 'http://schema.org',
      '@type': 'Website',
      url: siteUrl,
      image: image,
    },
    {
      '@context': 'http://schema.org',
      '@type': 'Person',
      familyName: 'Swaim',
      givenName: 'Hannah',
      url: siteUrl,
      sameAs: socialMedia.edges.map(({ node }) => node.url),
    },
  ];

  return (
    <Helmet
      htmlAttributes={{ lang: 'en-US' }}
      titleTemplate={`%s | ${short_name}`}
      defaultTitle={name}
      meta={[
        ...meta({
          title: name,
          description,
          image: `${siteUrl}${image}`,
          url: `${siteUrl}${location.pathname}`,
        }),
        { property: 'og:site_name', content: name },
      ]}
    >
      {structuredData.map((data) => (
        <script key={data['@type']} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

Head.propTypes = propTypes;

Head.defaultProps = defaultProps;

export default Head;

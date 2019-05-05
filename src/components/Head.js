import React from 'react';
import { css } from 'styled-components';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { withPrefix } from 'gatsby';

import { fontFaces } from 'style/fonts';
import siteIcon from 'images/icon.png';

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
  pageTitle,
  siteMetadata: {
    siteName,
    siteTitle,
    siteTitleSeparator,
    description: siteDescription,
    siteUrl,
  },
  image,
  description,
  location,
  locale,
  socialMedia,
}) => {
  const title = pageTitle
    ? pageTitle + siteTitleSeparator + siteTitle
    : siteTitle;

  const metaTags = [
    ['description', description || siteDescription],
    ['twitter:card', 'summary'],
    ['og:type', 'website'],
    ['og:title', title],
    ['og:url', location.pathname || siteUrl],
    ['og:image', image || withPrefix(siteIcon)],
    ['og:description', description || siteDescription],
    ['og:site_name', siteName],
    ['og:locale', locale.replace(/-+/, '_')],
  ];

  const structuredData = [
    {
      '@context': 'http://schema.org',
      '@type': 'Website',
      url: siteUrl,
      image: withPrefix(siteIcon),
    },
    {
      '@context': 'http://schema.org',
      '@type': 'Person',
      url: siteUrl,
      sameAs: socialMedia.edges.map(({ node }) => node.url),
    },
  ];

  return (
    <Helmet
      htmlAttributes={{ lang: locale }}
      title={title}
      meta={metaTags.map(([name, content]) => ({ name, content }))}
    >
      <style type="text/css">
        {fontFaces
          .map(font =>
            css({
              ['@font-face']: {
                ...font,
                fontDisplay: 'swap',
              },
            })
          )
          .join(`\n`)}
      </style>
      {structuredData.map(data => (
        <script key={data.type} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

Head.propTypes = propTypes;

Head.defaultProps = defaultProps;

export default Head;

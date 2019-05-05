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
  siteMetadata: { siteName, siteTitle, siteTitleSeparator, description: siteDescription, siteUrl },
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

  const structuredData = {
    '@context': 'http://schema.org',
    '@type': 'website',
    url: siteUrl,
    logo: withPrefix(siteIcon),
    sameAs: socialMedia.edges.map(({ node }) => node.url),
  };

  return (
    <Helmet>
      <html lang={locale} />
      <title>{title}</title>
      {metaTags.map(tag => {
        if (tag) {
          const [name, content] = tag;
          return <meta key={name} name={name} content={content} />;
        }
        return null;
      })}
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="msapplication-config" content="/static/browserconfig.xml" />
      <meta name="theme-color" content="#ffffff" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/static/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/static/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/static/favicon-16x16.png"
      />
      <link
        rel="mask-icon"
        href="/static/safari-pinned-tab.svg"
        color="#b86e5c"
      />
      <link rel="shortcut icon" href="/static/favicon.ico" />
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
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

Head.propTypes = propTypes;

Head.defaultProps = defaultProps;

export default Head;

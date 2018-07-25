import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import defaultImage from 'images/icon.png'

const propTypes = {
  location: PropTypes.object.isRequired,
  siteMetadata: PropTypes.shape({
    siteName: PropTypes.string,
    siteTitle: PropTypes.string,
    siteTitleSeparator: PropTypes.string,
    siteUrl: PropTypes.string,
    siteDescription: PropTypes.string,
  }).isRequired,
  pageTitle: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  locale: PropTypes.string,
  socialMedia: PropTypes.array,
}

const defaultProps = {
  pageTitle: null,
  image: null,
  description: '',
  locale: 'en_US',
  socialMedia: [],
}


function Head (props) {

  const {
    pageTitle,
    siteMetadata: {
      siteName,
      siteTitle,
      siteTitleSeparator,
      siteUrl,
      siteDescription,
    },
    image,
    description,
    location,
    locale,
    socialMedia,
  } = props

  const title = pageTitle ? pageTitle + siteTitleSeparator + siteTitle : siteTitle

  const metaTags = [
    ['description', description || siteDescription],
    ['twitter:card', 'summary'],
    ['og:type', 'website'],
    ['og:title', title],
    ['og:url', location.pathname || siteUrl],
    ['og:image', image || defaultImage],
    ['og:description', description || siteDescription],
    ['og:site_name', siteName],
    ['og:locale', locale.replace(/-+/,'_')],
  ]

  const structuredData = {
    '@context': 'http://schema.org',
    '@type': 'website',
    url: siteUrl,
    image: defaultImage,
    sameAs: socialMedia.map(({url}) => url),
  }

  return (
    <Helmet>
      <title>{title}</title>
      {metaTags.map(tag => {
        if (tag) {
          const [name, content] = tag
          return (
            <meta
              key={name}
              name={name}
              content={content}
            />
          )
        }
        return null
      })}
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="msapplication-config" content="/static/browserconfig.xml" />
      <meta name="theme-color" content="#ffffff" />
      <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
      <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#b86e5c" />
      <link rel="shortcut icon" href="/static/favicon.ico" />
      <script type="application/ld+json" >
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  )
}

Head.propTypes = propTypes

Head.defaultProps = defaultProps

export default Head

// <!-- Update your html tag to include the itemscope and itemtype attributes. -->
// <html itemscope itemtype="http://schema.org/Article">

// <!-- Place this data between the <head> tags of your website -->
// <title>Page Title. Maximum length 60-70 characters</title>
// <meta name="description" content="Page description. No longer than 155 characters." />

// <!-- Schema.org markup for Google+ -->
// <meta itemprop="name" content="The Name or Title Here">
// <meta itemprop="description" content="This is the page description">
// <meta itemprop="image" content="http://www.example.com/image.jpg">

// <!-- Twitter Card data -->
// <meta name="twitter:card" content="summary_large_image">
// <meta name="twitter:site" content="@publisher_handle">
// <meta name="twitter:title" content="Page Title">
// <meta name="twitter:description" content="Page description less than 200 characters">
// <meta name="twitter:creator" content="@author_handle">
// <!-- Twitter summary card with large image must be at least 280x150px -->
// <meta name="twitter:image:src" content="http://www.example.com/image.jpg">

// <!-- Open Graph data -->
// <meta property="og:title" content="Title Here" />
// <meta property="og:type" content="article" />
// <meta property="og:url" content="http://www.example.com/" />
// <meta property="og:image" content="http://example.com/image.jpg" />
// <meta property="og:description" content="Description Here" />
// <meta property="og:site_name" content="Site Name, i.e. Moz" />
// <meta property="article:published_time" content="2013-09-17T05:59:00+01:00" />
// <meta property="article:modified_time" content="2013-09-16T19:08:47+01:00" />
// <meta property="article:section" content="Article Section" />
// <meta property="article:tag" content="Article Tag" />
// <meta property="fb:admins" content="Facebook numberic ID" />
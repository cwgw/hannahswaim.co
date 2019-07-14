let contentfulConfig;

try {
  contentfulConfig = require('./.contentful');
} catch (_) {
  contentfulConfig = {
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
    environment: process.env.CONTENTFUL_ENV,
  };
} finally {
  const { spaceId, accessToken } = contentfulConfig;

  if (!spaceId || !accessToken) {
    throw new Error(
      'Contentful spaceId and the delivery token must be provided.'
    );
  }
}

module.exports = {
  siteMetadata: {
    name: 'hannah m. swaim',
    short_name: 'hannah swaim',
    description: 'Website and portfolio of fiber artist Hannah M. Swaim',
    siteUrl: 'https://hannahswaim.co',
    title: 'hannahswaim.co',
  },
  plugins: [
    'gatsby-plugin-catch-links',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-122813170-1',
        head: false,
        anonymize: true,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        background_color: '#ffffff',
        description: 'Website and portfolio of fiber artist Hannah M. Swaim',
        display: 'standalone',
        icon: 'src/images/icon.png',
        lang: 'en',
        name: 'hannah m. swaim',
        short_name: 'hannah swaim',
        start_url: '/',
        theme_color: '#b86e5c',
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        useMozJpeg: true,
        stripMetadata: true,
        defaultQuality: 85,
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-source-contentful',
      options: {
        ...contentfulConfig,
        downloadLocal: true,
      },
    },
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'instagramPosts',
        path: `${__dirname}/data/`,
      },
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images-contentful',
            options: {
              maxWidth: 832,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noopener noreferrer',
            },
          },
        ],
      },
    },
    'gatsby-transformer-sharp',
  ],
};

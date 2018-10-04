let contentfulConfig

try {
  contentfulConfig = require('./.contentful')
} catch (_) {
  contentfulConfig = {
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
  }
} finally {
  const { spaceId, accessToken } = contentfulConfig

  if (!spaceId || !accessToken) {
    throw new Error(
      'Contentful spaceId and the delivery token need to be provided.'
    )
  }
}

module.exports = {
  siteMetadata: {
    siteName: 'hannahswaim.co',
    siteTitle: 'hannah m. swaim',
    siteTitleSeparator: ' | ',
    siteUrl: 'https://hannahswaim.co',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: "hannah m. swaim",
        short_name: "hannah swaim",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#b86e5c",
        display: "minimal-ui",
        icon: "src/images/icon.png",
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-catch-links',
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
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "noopener noreferrer",
            },
          },
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-transformer-sqip',
    'gatsby-image',
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
  ],
}

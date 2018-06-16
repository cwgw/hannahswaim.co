import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Wrap from 'components/Wrap'
import Header from 'components/Header'

import globalStyle from 'utils/globalStyle'

const Layout = ({ children, data }) => (
  <Wrap>
    <Header siteTitle={data.site.siteMetadata.title} />
    {children()}
  </Wrap>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

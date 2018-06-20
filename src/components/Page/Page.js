import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Wrap from 'components/Wrap'
import Header from 'components/Header'
import Footer from 'components/Footer'

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  siteMetadata: PropTypes.shape({
    title: PropTypes.string,
  }),
  menu: PropTypes.object,
}

const defaultProps = {}

function Page (props) {

  const {
    children,
    siteMetadata: {
      title,
    },
    menu: {
      menuItems,
    },
  } = props

  return (
    <Wrap>
      <Header
        siteTitle={title}
        pages={menuItems}
      />
      <main>
        {children}
      </main>
      <Footer
        siteTitle={title}
        pages={menuItems}
      />
    </Wrap>
  )
}

Page.propTypes = propTypes

Page.defaultProps = defaultProps

export default Page

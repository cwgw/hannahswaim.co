import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { spacing, space, makeFlex } from 'style/layout'
import { colors } from 'style/constants'

import Icon from 'components/Icon'
import Link from 'components/Link'

const propTypes = {
  siteTitle: PropTypes.string,
}

const defaultProps = {
  siteTitle: null,
  justifyContent: 'center',
  flexFlow: ['column nowrap',,,'row wrap'], // eslint-disable-line no-sparse-arrays
  alignItems: ['center',,,'flex-end'], // eslint-disable-line no-sparse-arrays
  marginTop: 'auto',
  padding: 'md',
}

const Default = styled.footer`
  ${makeFlex}
  ${space}
  position: relative;
  text-align: center;
  background-color: ${colors.brand[5]};
  color: ${colors.brand[2]};

  a,
  span {
    display: block;
    color: inherit;
    padding: ${spacing('sm')} ${spacing('md')};
  }
`

const Footer = ({siteTitle, ...props}) => (
  <Default {...props} >
    <span>
      {siteTitle}
    </span>
    <Link
      to="https://www.instagram.com/hannahswaimco/"
      title="follow me on Instagram"
      >
      <Icon
        type="instagram"
        style={{
          width: '1rem',
          height: '1rem',
          margin: '0 auto',
        }}
      />
      @hannahswaimco
    </Link>
    <Link
      to="mailto:hannahswaimco@gmail.com"
      title="send me an email"
      >
      <Icon
        type="mail"
        style={{
          width: '1rem',
          height: '1rem',
          margin: '0 auto',
        }}
      />
      get in touch
    </Link>
  </Default>
)

Footer.propTypes = propTypes

Footer.defaultProps = defaultProps

export default Footer

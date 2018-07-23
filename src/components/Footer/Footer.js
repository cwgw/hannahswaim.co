import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import spacing from 'utils/spacing'
// import { colors } from 'utils/constants'

const propTypes = {
  siteTitle: PropTypes.string,
}

const defaultProps = {
  siteTitle: null
}

const Default = styled.footer`
  margin-top: auto;
  min-height: ${spacing(2)};
  text-align: center;

  a,
  span {
    display: inline-block;

    &:nth-last-child(n + 2):after {
      content: '|';
      padding: 0 ${spacing(-1)};
    }
  }
`

function Footer (props) {

  return (
    <Default>
      <span>
        {props.siteTitle}
      </span>
      <a
        href="https://www.instagram.com/hannahswaimco/"
        rel="noopener noreferrer"
        target="_blank"
        title="follow me on Instagram"
      >
        @hannahswaimco
      </a>
      <a
        href="mailto:hannahswaimco@gmail.com"
        title="send me an email"
      >
        get in touch
      </a>
    </Default>
  )
}

Footer.propTypes = propTypes

Footer.defaultProps = defaultProps

export default Footer

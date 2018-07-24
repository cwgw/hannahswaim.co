import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import spacing from 'utils/spacing'
import media from 'utils/media'
import { colors } from 'utils/constants'

const propTypes = {
  siteTitle: PropTypes.string,
}

const defaultProps = {
  siteTitle: null
}

const Default = styled.footer`
  position: relative;
  margin-top: auto;
  min-height: ${spacing(2)};
  text-align: center;
  background-color: ${colors.green[6]};
  color: ${colors.gray[1]};
  padding: ${spacing(2)};
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  ${media.min.md`
    flex-flow: row wrap;
  `}

  a,
  span {
    display: block;
    color: inherit;
    padding: ${spacing(-3)} ${spacing(-1)};
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

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import spacing from 'utils/spacing'
import media from 'utils/media'
import { colors } from 'utils/constants'

import Icon from 'components/Icon'
import Link from 'components/Link'

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
  background-color: ${colors.brand[5]};
  color: ${colors.brand[2]};
  padding: ${spacing(2)};
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  ${media.min.md`
    flex-flow: row wrap;
    align-items: flex-end;
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
      <Link
        href="https://www.instagram.com/hannahswaimco/"
        title="follow me on Instagram"
        external
      >
        <Icon
          type="instagram"
          style={{
            width: spacing(1),
            height: spacing(1),
            margin: '0 auto',
          }}
        />
        @hannahswaimco
      </Link>
      <a
        href="mailto:hannahswaimco@gmail.com"
        title="send me an email"
      >
        <Icon
          type="mail"
          style={{
            width: spacing(1),
            height: spacing(1),
            margin: '0 auto',
          }}
        />
        get in touch
      </a>
    </Default>
  )
}

Footer.propTypes = propTypes

Footer.defaultProps = defaultProps

export default Footer

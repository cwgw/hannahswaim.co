import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import mousetrap from "mousetrap"
import { navigate } from 'gatsby'

import { style as fontStyle } from 'style/fonts'
import { colors } from 'style/constants'
import Flex from 'components/Flex'
import Button from 'components/Button'
import Icon from 'components/Icon'

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  next: PropTypes.object,
  previous: PropTypes.object,
}

const defaultProps = {
  children: null,
  next: null,
  previous: null,
}

const NavContainer = styled(Flex)`
  position: fixed;
  top: 50%;
  left: 0;
  width: 100%;
  transform: translate(0,-50%);
  align-items: center;
`

const NavItem = styled(Button)`
  color: ${colors.white};
  background-color: transparent;
  border: none;
  font-size: ${fontStyle.lead.fontSize};

  &:hover,
  &:focus {
    background-color: ${colors.gray[0]};
  }
`


class PostNavigation extends React.Component {

  componentDidMount () {
    mousetrap.bind('left', this.toPrevious)
    mousetrap.bind('right', this.toNext)
  }

  componentWillUnmount () {
    mousetrap.unbind('left')
    mousetrap.unbind('right')
  }

  toNext = (e) => {
    if (e) {
      e.stopPropagation()
    }
    this.to(this.props.next)
  }

  toPrevious = (e) => {
    if (e) {
      e.stopPropagation()
    }
    this.to(this.props.previous)
  }

  to (location) {
    if (location.pathname) {
      navigate(location.pathname, {state: location.state})
    }
  }

  render () {
    const {
      next,
      previous,
      children,
    } = this.props

    return (
      <NavContainer>
        <NavItem
          aria-label="Previous"
          onClick={this.toPrevious}
          disabled={!previous.pathname}
          >
          <Icon
            type="previous"
            inline
          />
        </NavItem>
        {children}
        <NavItem
          aria-label="Next"
          onClick={this.toNext}
          disabled={!next.pathname}
          >
          <Icon
            type="next"
            inline
          />
        </NavItem>
      </NavContainer>
    )
  }
}

PostNavigation.propTypes = propTypes

PostNavigation.defaultProps = defaultProps

export default PostNavigation

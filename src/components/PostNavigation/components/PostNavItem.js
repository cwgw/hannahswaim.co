import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import mousetrap from "mousetrap"
import { push } from 'gatsby'

import media from 'utils/media'

import Icon from 'components/Icon'

const propTypes = {
  direction: PropTypes.oneOf([
    'next',
    'previous'
  ]).isRequired,
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  variant: PropTypes.oneOf([
    'light',
    'dark',
  ]),
}

const defaultProps = {
  variant: 'light',
  location: null,
}

const Button = styled.button`
  display: block;
  flex: 0 0 ${1.5 + 0.75 * 2}rem;
  height: ${3 + 0.75 * 2}rem;
  padding: 0.75rem;

  border: none;
  background: none;

  cursor: pointer;

  ${media.min.lg`
    flex: 0 0 ${2.25 + 1.5 * 2}rem;
    height: ${4.5 + 1.5 * 2}rem;
    padding: 1.5rem;
  `}

  ${({disabled}) => disabled && `
    opacity: 0;
  `}

  ${({variant}) => {
    if (variant === 'dark') {
      return `color: white;`
    } else {
      return `color: inherit;`
    }
  }}
`

const Caret = styled(Icon)`
  width: 100%;
  height: 100%;
  display: block;
`

class PostNavigation extends React.Component {

  constructor (props) {
    super(props)
    this.to = this.to.bind(this)

    const DirectionEnum = {
      previous: 'left',
      next: 'right'
    }

    this.key = DirectionEnum[props.direction]
  }

  componentDidMount() {
    mousetrap.bind(this.key, () => this.to())
  }

  componentWillUnmount() {
    mousetrap.unbind(this.key)
  }

  to (e) {
    if (e) {
      e.stopPropagation()
    }

    if (this.props.location) {
      push(this.props.location)
    }
  }

  render () {
    const {
      direction,
      location,
      variant,
    } = this.props

    return (
      <Button
        variant={variant}
        onClick={this.to}
        disabled={!location}
      >
        <Caret type={direction} />
      </Button>
    )
  }
}

PostNavigation.propTypes = propTypes

PostNavigation.defaultProps = defaultProps

export default PostNavigation

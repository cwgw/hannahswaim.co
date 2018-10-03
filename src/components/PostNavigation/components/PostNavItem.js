import React from 'react'
import PropTypes from 'prop-types'
import mousetrap from "mousetrap"
import { navigate } from 'gatsby'

import { capitalizeFirstLetter } from 'utils/helpers'

import { Control } from 'components/Button'
import Icon from 'components/Icon'

const propTypes = {
  direction: PropTypes.oneOf([
    'next',
    'previous'
  ]).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    state: PropTypes.object,
  }),
  variant: PropTypes.oneOf([
    'light',
    'dark',
  ]),
}

const defaultProps = {
  variant: 'light',
  location: null,
}

class PostNavigation extends React.Component {

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)

    const DirectionEnum = {
      previous: 'left',
      next: 'right'
    }

    this.key = DirectionEnum[props.direction]
  }

  componentDidMount() {
    mousetrap.bind(this.key, this.handleClick)
  }

  componentWillUnmount() {
    mousetrap.unbind(this.key)
  }

  handleClick (e) {
    if (e) {
      e.stopPropagation()
    }

    if (this.props.location.pathname) {
      navigate(this.props.location.pathname, {state: this.props.location.state})
    }
  }

  render () {
    const {
      direction,
      location,
      variant,
    } = this.props

    return (
      <Control
        aria-label={capitalizeFirstLetter(direction)}
        title={capitalizeFirstLetter(direction)}
        variant={variant}
        outline
        onClick={this.handleClick}
        disabled={!location.pathname}
      >
        <Icon type={direction} />
      </Control>
    )
  }
}

PostNavigation.propTypes = propTypes

PostNavigation.defaultProps = defaultProps

export default PostNavigation

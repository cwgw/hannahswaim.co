import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { transparentize } from 'polished'
// import { graphql } from 'gatsby'

import spacing from 'utils/spacing'
import media from 'utils/media'
import fonts from 'utils/fonts'
import { colors, ease } from 'utils/constants'

// import Row from 'components/Row'
import Row from 'components/Row/RowAlt'
import Icon from 'components/Icon'

const propTypes = {
  posts: PropTypes.array,
}

const defaultProps = {}

const Link = styled.a`
  display: block;
  margin-right: ${spacing(2)};
  flex: 1;
  color: ${colors.white};
  position: relative;

  &:last-child {
    margin-right: 0;
  }

  ${media.min.lg`
    &:hover,
    &:focus {

      &:before,
      &:after {
        opacity: 1;
      }

      &:after {
        transform: translate(-50%,-50%);
      }
    }

    &:focus {
      outline: none;

      &:before {
        border-color: ${colors.white};
      }
    }

    &:before,
    &:after {
      position: absolute;
      z-index: 1;
      opacity: 0;
      transition: opacity 175ms ${ease};
    }

    &:before {
      left: ${spacing(-3)};
      right: ${spacing(-3)};
      top: ${spacing(-3)};
      bottom: ${spacing(-3)};
      background-color: ${transparentize(0.5, colors.gray[1])};
      border: 1px solid transparent;
      content: '';
    }

    &:after {
      top: 50%;
      left: 50%;
      text-align: center;
      content: 'View on Instagram';
      transform: translate3d(-50%,calc(-50% + ${spacing(0)}),0);
      transition: transform 175ms ${ease} 100ms,
                  opacity 350ms ${ease} 0ms;
    }
  `}
`

const Caption = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing(-1)};
  margin: ${spacing(-3)};
  z-index: 1;

  & > span {
    display: inline-block;
    padding-right: ${spacing(2)};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: ${fonts.sansSerif};
    font-size: ${spacing(-1)};
  }
`

const ImageWrapper = styled.span`
  display: block;
  width: 100%;
  padding-bottom: 100%;
  overflow: hidden;
  position: relative;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
  object-position: center center;
`

class Instagram extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      posts: [],
    }
  }

  componentDidMount () {
    this.props.posts.forEach(({url}) => {
      fetch(`https://api.instagram.com/oembed?url=${url}&omitscript=true`, {method: 'get'})
        .then(response => response.json())
        .then(data => {
          this.setState((prevState) => ({
            posts: [...prevState.posts, {post_url: url, ...data}]
          }))
        })
        .catch(e => {
          console.log(e)
        })
    })
  }

  render () {

    const posts = this.state.posts.map(({media_id, thumbnail_url, thumbnail_width, thumbnail_height, post_url, title}) => (
      <Link
        key={media_id}
        flex={thumbnail_width / thumbnail_height}
        rel="noopener nofollow"
        target="_blank"
        href={post_url}
        title="View on Instagram"
        >
        <ImageWrapper>
          <Image
            src={thumbnail_url}
            alt={title}
          />
        </ImageWrapper>
        <Caption>
          <span>{title}</span>
          <Icon
            type="instagram"
            inline
            style={{
              width: spacing(3),
              height: spacing(3),
              flex: '0 0 auto',
            }}
          />
        </Caption>
      </Link>
    ))

    return (
      <React.Fragment>
        {posts ? (
          <Row
            childAspectRatioResolver={_ => 1}
            items={posts}
            height={400}
            >
            {posts}
          </Row>
        ) : (
          <div>
            Loading…
          </div>
        )}
      </React.Fragment>
    )
  }
}

Instagram.propTypes = propTypes

Instagram.defaultProps = defaultProps

export default Instagram

// export const pageQuery = graphql`
//   fragment PageInstagram on ContentfulPageInstagramPosts {
//     id
//     posts {
//       url
//     }
//   }
// `

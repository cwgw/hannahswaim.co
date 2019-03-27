import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import GatsbyImage from 'gatsby-image'
import { transparentize } from 'polished'
import { useSpring, animated } from 'react-spring'

import { spacing, fontSizes, rem } from 'style/sizing'
import { colors } from 'style/constants'
import { sansSerif } from 'style/fonts'

import Row from 'components/Row'
import Icon from 'components/Icon'
import Box from 'components/Box'
import Flex from 'components/Flex'
import Link from 'components/Link'
import { StandardGrid } from 'components/Grid'

const propTypes = {
  posts: PropTypes.number,
  localPosts: PropTypes.shape({
    edges: PropTypes.array
  }).isRequired,
  profile: PropTypes.object,
}

const defaultProps = {
  posts: 6,
}

const Container = styled(StandardGrid)`
  // color: ${colors.green[3]};
  color: ${colors.brand[3]};

  &:before {
    content: '';
    // border: 2px solid ${colors.green[5]};
    border: 2px solid ${colors.brand[4]};
    grid-column: contentStart / contentEnd;
    grid-row: 2;
    user-select: none;
    pointer-events: none;
  }
`

const StyledLink = styled(Link)`
  color: inherit;
`

const ItemCover = animated(styled.p`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  margin: 0;
  text-align: center;
  background: ${transparentize(0.5, colors.gray[3])};
  color: ${colors.white};
`)

const StyledItem = styled(Box)`
  position: relative;

  &:before {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    border-radius: ${spacing('xs')};
    box-shadow: 0px 3px 64px ${transparentize(0.8, colors.coolBlack)};
  }
`

const AnimatedIcon = animated(Icon)

const Item = ({
  id,
  url,
  image: {
    childImageSharp: {
      fluid,
    },
  },
  ...props
}) => {
  const [ { o, s }, set ] = useSpring(() => ({
    o: 0,
    s: 1.1,
    config: (key) => key === 's'
      ? {
        tension: 540,
        friction: 16,
      }
      : {
        tension: 320,
        friction: 36,
      }
  }));
  const show = useCallback(() => set({ o: 1, s: 1 }));
  const hide = useCallback(() => set({ o: 0, s: 1.1 }));
  const translate = s.interpolate(s => `scale3d(${s}, ${s}, 1)`);

  return (
    <StyledItem
      as={Link}
      to={url}
      onFocus={show}
      onBlur={hide}
      onMouseEnter={show}
      onMouseLeave={hide}
      {...props}
      >
      <GatsbyImage
        fluid={fluid}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: spacing('xs'),
        }}
        />
      <ItemCover
        style={{
          opacity: o,
          borderRadius: spacing('xs'),
        }}
        >
        <AnimatedIcon
          type="instagram"
          inline
          style={{
            fontSize: rem(fontSizes.lead),
            transform: translate,
          }}
        />
        <animated.span
          style={{
            transform: translate,
          }}
          >
          {'View on Instagram'}
        </animated.span>
      </ItemCover>
    </StyledItem>
  )
}

const Instagram = ({
  id,
  posts: limit,
  localPosts: posts,
  profile,
  ...props
}) => {
    const images = posts.edges.slice(0, limit).map(({ node }) => node);
    const username = `@${new URL(profile.url).pathname.replace(/\//g,'')}`;
    return (
      <Container {...props} >
        <Flex
          gridColumn="contentStart / contentEnd"
          alignItems="baseline"
          marginBottom="xs"
          >
          <StyledLink
            to={profile.url}
            >
            <Icon
              type="instagram"
              title="Instagram"
              inline
              style={{
                fontSize: rem(fontSizes.lead),
                marginRight: spacing('xs'),
                verticalAlign: 'bottom',
              }}
            />
            <span
              style={{
                fontFamily: sansSerif,
              }}
              >
              {username}
            </span>
          </StyledLink>
          <StyledLink
            to={profile.url}
            style={{
              marginLeft: 'auto',
            }}
            >
            {'See more →'}
          </StyledLink>
        </Flex>
        <Row
          items={images}
          gap={'lg'}
          isCentered
          gridColumn="bleedStart / bleedEnd"
          gridRow="2"
          height={300}
          paddingY={'lg'}
          >
          {images && images.map((node) => (
            <Item
              key={node.id}
              {...node}
            />
          ))}
        </Row>
      </Container>
    )
}

Instagram.propTypes = propTypes

Instagram.defaultProps = defaultProps

export default (props) => (
  <StaticQuery
    query={graphql`
      query Instagram {
        localPosts: allInstagramPostsJson (
          sort: {fields: time, order: DESC}
          limit: 8
        ) {
          edges {
            node {
              id
              url
              image {
                childImageSharp {
                  fluid(maxWidth: 300) {
                    aspectRatio
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
        profile: contentfulSocialMediaLink (service: {eq: "Instagram"}) {
          id
          service
          url
        }
      }
    `}
    render={data => <Instagram {...props} {...data} />}
  />
)

export const pageQuery = graphql`
  fragment PageInstagram on ContentfulPageInstagram {
    id
    posts
  }
`

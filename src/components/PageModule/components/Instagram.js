import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import GatsbyImage from 'gatsby-image'
import { transparentize } from 'polished'

import { spacing } from 'style/layout'
import { colors } from 'style/constants'
import { size, rem, sansSerif } from 'style/fonts'

// import Row from 'components/Row'
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
  }),
}

const defaultProps = {}

const Container = styled(StandardGrid)`
  color: ${colors.green[3]};

  &:before {
    content: '';
    border: 2px solid ${colors.green[5]};
    grid-column: contentStart / wideEnd;
    grid-row: 2;
    user-select: none;
    pointer-events: none;
  }
`

const StyledLink = styled(Link)`
  color: inherit;
`

const Item = styled(Box)`
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0px 3px 48px ${transparentize(0.75, colors.coolBlack)};
`

const Instagram = ({
  id,
  posts: limit,
  localPosts: posts,
  profile,
  ...props
}) => {
    const images = posts.edges.map(({ node }) => node);
    const username = `@${new URL(profile.url).pathname.replace(/\//g,'')}`;
    return (
      <Container {...props} >
        <Flex
          gridColumn="contentStart / wideEnd"
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
                fontSize: rem(size('display')),
                marginRight: spacing('xs'),
                verticalAlign: 'bottom',
              }}
            />
            <span
              style={{
                fontSize: rem(size('lead')),
              }}
              >
              {username}
            </span>
          </StyledLink>
          <StyledLink
            to={profile.url}
            style={{
              marginLeft: 'auto',
              fontFamily: sansSerif,
            }}
            >
            See more →
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
          // childAspectRatioResolver={o => o.image.childImageSharp.fluid.aspectRatio}
          >
          {images && images.map(({ id, url, image: { childImageSharp } }) => (
            <Item key={id} >
              <GatsbyImage
                fluid={childImageSharp.fluid}
                style={{
                  width: '100%',
                  height: '100%'
                }}
              />
            </Item>
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
          limit: 6
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

// allContentfulSocialMediaLink (filter: {service: {eq: "Instagram"}}) {
//   edges {
//     node {
//       service
//       url
//     }
//   }
// }

export const pageQuery = graphql`
  fragment PageInstagram on ContentfulPageInstagram {
    id
    posts
  }
`

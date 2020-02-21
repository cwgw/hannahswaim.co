import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import css from '@styled-system/css';

import { type } from 'style/shared';
import { space, transparentize } from 'style/utils';

import Row from 'components/Row';
import Icon from 'components/Icon';
import Box from 'components/Box';
import Link from 'components/Link';
import Button from 'components/Button';
import Grid from 'components/Grid';

const Wrapper = styled(Grid)(
  css({
    color: 'brand.3',
    position: 'relative',
    zIndex: 0,
    '&:before': {
      content: '""',
      border: '2px solid',
      borderColor: 'brand.4',
      gridColumn: 'contentStart / contentEnd',
      gridRow: 2,
      userSelect: 'none',
      pointerEvents: 'none',
    },
  })
);

const TextContainer = styled(Box)({
  position: 'relative',
  zIndex: 2,
  display: 'flex',
  flexFlow: 'row wrap',
  alignItems: 'baseline',
});

const ProfileLink = styled(Link)(
  css({
    marginLeft: 'auto',
    color: 'brand.4',
    display: ['none', null, 'block'],
  })
);

const ListItem = styled(Box)({
  position: 'relative',
});

const ItemLink = styled(Link)(
  css({
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    borderRadius: space.xs,
    overflow: 'hidden',
    color: 'white',
  })
);

const Overlay = styled('p')(
  css({
    display: 'flex',
    width: '100%',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    backgroundColor: transparentize(0.5, 'gray.3'),
    opacity: 0,
    transition: '200ms opacity',
    transitionTimingFunction: 'in',
    [`& span, & ${Icon}`]: {
      transform: 'matrix(1.1, 0, 0, 1.1, 0, 0)',
      transition: '300ms transform',
      transitionTimingFunction: 'in',
      transformStyle: 'preserve-3d',
      marginBottom: 'xs',
    },
    [Icon]: {
      fontSize: type.hero.fontSize,
    },
    [`${ItemLink}:hover &, ${ItemLink}:focus &`]: {
      opacity: 1,
      [`& span, & ${Icon}`]: {
        transform: 'matrix(1, 0, 0, 1, 0, 0)',
      },
    },
  })
);

const Instagram = ({ id, location, ...props }) => {
  const { posts, profile } = useStaticQuery(graphql`
    query Instagram {
      posts: allInstagramPostsJson(
        sort: { fields: time, order: DESC }
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
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
        }
      }
      profile: contentfulSocialMediaLink(service: { eq: "Instagram" }) {
        id
        service
        url
      }
    }
  `);

  if (!posts) return null;

  const username = `@${new URL(profile.url).pathname.replace(/\//g, '')}`;

  const images = posts.edges.map(
    ({
      node: {
        className,
        id,
        image: {
          childImageSharp: { fluid },
        },
        url,
      },
    }) => (
      <ListItem as="li" className={className} key={id}>
        <GatsbyImage
          fluid={fluid}
          css={css({
            width: '100%',
            height: '0',
            paddingBottom: '100%',
            boxShadow: `0px 3px 36px 2px ${transparentize(0.8, 'coolBlack')}`,
            borderRadius: space.xs,
          })}
        />
        <ItemLink to={url}>
          <Overlay>
            <Icon icon="instagram" />
            <span>View on Instagram </span>
          </Overlay>
        </ItemLink>
      </ListItem>
    )
  );

  return (
    <Wrapper {...props}>
      <TextContainer col="contentStart / contentEnd">
        <Button to={profile.url}>
          <Icon icon="instagram" />
          &ensp;
          {username}
        </Button>
        <ProfileLink to={profile.url}>{'See more →'}</ProfileLink>
      </TextContainer>
      <Row
        items={images}
        getAspectRatio={() => 1}
        gap={'md'}
        isCentered
        col="bleedStart / bleedEnd"
        row="2"
        height={300}
        paddingY="md"
      >
        {images}
      </Row>
    </Wrapper>
  );
};

export default Instagram;

export const pageQuery = graphql`
  fragment PageInstagram on ContentfulPageInstagram {
    id
  }
`;

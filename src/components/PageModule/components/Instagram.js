import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import { transparentize } from 'polished';

import { colors, ease } from 'style/tokens';
import media from 'style/media-queries';
import spacing from 'style/spacing';
import type from 'style/type';

import Row from 'components/Row';
import Icon from 'components/Icon';
import Box from 'components/Box';
import Link from 'components/Link';
import Button from 'components/Button';
import Grid from 'components/Grid';

const Wrapper = styled(Grid)`
  color: ${colors.brand[3]};
  position: relative;
  z-index: 0;

  &:before {
    content: '';
    border: 2px solid ${colors.brand[4]};
    grid-column: contentStart / contentEnd;
    grid-row: 2;
    user-select: none;
    pointer-events: none;
  }
`;

const TextContainer = styled(Box)`
  position: relative;
  z-index: 2;
  display: flex;
  flex-flow: row wrap;
  align-items: baseline;
`;

const ProfileLink = styled(Link)`
  margin-left: auto;
  color: ${colors.brand[4]};

  ${media.max.sm`
    display: none;
  `}
`;

const ListItem = styled(Box)`
  position: relative;
`;

const ItemLink = styled(Link)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  border-radius: ${spacing('xs')};
  overflow: hidden;
  color: ${colors.white};
`;

const Overlay = styled.p`
  display: flex;
  width: 100%;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  margin: 0;
  background: ${transparentize(0.5, colors.gray[3])};
  opacity: 0;
  transition: 200ms opacity ${ease.in};

  & span,
  & ${Icon} {
    transform: matrix(1.1, 0, 0, 1.1, 0, 0);
    transition: 300ms transform ${ease.in};
    transform-style: preserve-3d;
    margin-bottom: ${spacing('xs')};
  }

  ${Icon} {
    font-size: ${type.hero.fontSize};
  }

  ${ItemLink}:hover &,
  ${ItemLink}:focus & {
    opacity: 1;

    & span,
    & ${Icon} {
      transform: matrix(1, 0, 0, 1, 0, 0);
    }
  }
`;

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
          style={{
            width: '100%',
            height: '0',
            paddingBottom: '100%',
            boxShadow: `0px 3px 36px 2px ${transparentize(
              0.8,
              colors.coolBlack
            )}`,
            borderRadius: spacing('xs'),
          }}
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
      <TextContainer gridColumn="contentStart / contentEnd">
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
        gridColumn="bleedStart / bleedEnd"
        gridRow="2"
        height={{
          base: 200,
          sm: 300,
        }}
        paddingY={'md'}
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

import React from 'react';
import WrapPage from './wrap-page';

export const wrapPageElement = WrapPage;

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="dns-prefetch"
      key="dns-prefetch-contentful-cdn"
      href="https://images.ctfassets.net"
    />,
  ]);
};
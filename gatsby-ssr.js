import React from 'react';

import wrapPageElement from './wrapPageElement';

const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="dns-prefetch"
      key="dns-prefetch-contentful-cdn"
      href="https://images.ctfassets.net"
    />,
  ]);
};

export {
  onRenderBody,
  wrapPageElement
}
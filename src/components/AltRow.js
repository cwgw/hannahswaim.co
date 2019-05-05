import React from 'react';
import styled from 'styled-components';

const Scroller = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  white-space: nowrap;
  overflow-x: scroll;
`;

const Row = ({ children, ...props }) => {
  const Children = React.Children.map(children, child =>
    React.cloneElement(child, {
      style: {
        display: 'inline-block',
        height: '100%',
        // lineHeight: '1',
      },
    })
  );
  console.log(Children);
  return <Scroller>{Children}</Scroller>;
};

export default Row;

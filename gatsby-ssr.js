import React from 'react'
import { Provider, useStaticRendering } from 'mobx-react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

import UIStore from 'stores/UIStore';

export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString, setHeadComponents }) => {

  useStaticRendering(true)

  const sheet = new ServerStyleSheet()

  const app = (
    <Provider UIStore={UIStore}>
      <StyleSheetManager sheet={sheet.instance}>
          {bodyComponent}
      </StyleSheetManager>
    </Provider>
  )

  const body = renderToString(app)

  replaceBodyHTMLString(body)

  setHeadComponents([sheet.getStyleElement()])

  return
}
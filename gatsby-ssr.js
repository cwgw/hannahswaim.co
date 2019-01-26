import React from 'react'

import UIContext from 'components/UIContext'
import Layout from 'components/Layout'

export const wrapRootElement = ({element}) => <UIContext.Provider>{element}</UIContext.Provider>

export const wrapPageElement = ({element, props}) => <Layout {...props} >{element}</Layout>

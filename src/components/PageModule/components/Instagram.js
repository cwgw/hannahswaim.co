import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'

import spacing from 'utils/spacing'

import Row from 'components/Row'

const propTypes = {
  edges: PropTypes.array,
}

const defaultProps = {}

class Instagram extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      posts: [],
    }
  }

  componentDidMount () {
    this.props.edges.forEach(({url}) => {
      fetch(`https://api.instagram.com/oembed?url=${url}&omitscript=true`, {method: 'get'})
        .then(response => response.json())
        .then(data => {
          this.setState((prevState) => ({
            posts: [...prevState.posts, data]
          }))
        })
        .catch(e => {
          console.log(e)
        })
    })

    if (typeof window !== 'undefined') {
      const that = this
      const instgrm = window.document.createElement('script')
      instgrm.src = 'https://www.instagram.com/embed.js'
      instgrm.setAttribute('defer', true)
      instgrm.setAttribute('async', true)
      instgrm.onload = () => {
        that.instgrmIsLoaded = true
      }
      window.document.body.appendChild(instgrm)
    }
  }

  componentDidUpdate () {
    if (this.props.edges.length === this.state.posts.length && typeof window !== 'undefined') {
      console.log('this.instgrmIsLoaded', this.instgrmIsLoaded)
      window.instgrm.Embeds.process()
    }
  }

  render () {
    const posts = this.state.posts.map(({media_id, html, thumbnail_width, thumbnail_height}) => (
      <div
        key={media_id}
        style={{
          marginRight: spacing(2),
          flex: thumbnail_width / thumbnail_height,
          maxWidth: '100vw',
        }}
        dangerouslySetInnerHTML={{__html: html.replace('//www.instagram.com/embed.js','https://www.instagram.com/embed.js')}}
      />
    ))

    const combinedAspectRatio = this.state.posts.reduce((acc, val) => acc = acc + val.thumbnail_width / val.thumbnail_height, 0)

    return (
      <React.Fragment>
        {posts ? (
          <Row
            itemHeight="200px"
            aspectRatio={combinedAspectRatio}
            overflow
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
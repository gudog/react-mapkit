import * as React from 'react'
import { render } from 'react-dom'
import Markdown from 'react-markdown'
import load from 'little-loader'

import Typography from 'typography'
import usWebDesignStandardsTheme from 'typography-theme-us-web-design-standards'

import { css } from 'glamor'

css.global('html, body', { padding: 0, margin: 0 })
css.global('body', {
  backgroundColor: '#18d7fd',
  fontFamily:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
})

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.5,
})
typography.injectStyles()

const content = `
# React Mapkit 🗺️

## Intro

This is a demo page for [React Mapkit](https://github.com/chrisdrackett/react-mapkit), a react wrapper for Apple Maps (mapkit.js)

## Uses

Todo
`

class Demo extends React.Component {
  componentDidMount() {
    load('https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js', function(err) {
      mapkit.init({
        authorizationCallback: function(done) {
          done(
            'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkFLNTY2RFk1ODIifQ.eyJpYXQiOjE1MjgzNTM1NTkuODAxLCJpc3MiOiJHOERBODY0VVlLIiwib3JpZ2luIjoiaHR0cHM6Ly9jaHJpc2RyYWNrZXR0LmdpdGh1Yi5pbyJ9.iQACl4A3JH-y_1YWiHQHSPZoZbT2_so1kdnSBBqEO-IjfPz9X8J6Isr5mISpjY3QOf8fgbnpN1Wl0Ny3Nlbo4A',
          )
        },
        language: 'en',
      })

      const map = new mapkit.Map('map')
    })
  }

  render() {
    const white = '#ffffff'

    const styles = {
      grid: {
        backgroundColor: white,

        height: '100%',
        display: 'grid',
        gridTemplateColumns: '360px auto',
        gridTemplateRows: 'auto',
        gridTemplateAreas: '"sidebar content"',
      },
      sidebar: {
        gridArea: 'sidebar',

        padding: 16,
      },
      content: {
        gridArea: 'content',

        height: '100vh',
      },
    }

    return (
      <div {...css(styles.grid)}>
        <section {...css(styles.sidebar)}>
          <Markdown source={content} />
        </section>
        <section {...css(styles.content)} id="map" />
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
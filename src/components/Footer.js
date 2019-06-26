import React from 'react'
import { Link } from 'gatsby'

import { rhythm } from '../utils/typography'
import Subscribe from './Subscribe'

class Footer extends React.Component {
  render() {
    return (
      <footer
        style={{
          marginTop: rhythm(3 / 4),
          paddingTop: rhythm(1 / 2),
          textAlign: 'center',
        }}
      >
        <Subscribe />
        <div>
          Host: Henry Zhu
        </div>
        <div>
          Music: Angus Croll (writer), Shawn Wang (vocals)
        </div>
        <Link
          style={{
            boxShadow: 'none',
            textDecoration: 'none',
            color: 'inherit',
          }}
          to={'/'}
        >
          All rights reserved
        </Link>
      </footer>
    )
  }
}

export default Footer

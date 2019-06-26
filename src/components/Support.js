import React from 'react'
import { Link } from 'gatsby'

class Support extends React.Component {
  render() {
    return (
      <p style={{
      	maxWidth: 620,
        backgroundColor: '#4F5B66',
        textAlign: 'center',
      }}>
          <Link
            style={{
              color: 'inherit',
            }}
            to={'/'}
          >
            <i>The Babel Podcast</i>
          </Link>{' '}<br/>
          is made possible by the support of patrons.<br/>Consider becoming a{' '}
        <a href="https://www.opencollective.com/babel">supporter</a> today!
      </p>
    )
  }
}

export default Support

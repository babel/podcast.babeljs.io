import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'
import cover from '../assets/icon.jpg'
import Subscribe from './Subscribe'

class Intro extends React.Component {
  render() {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: 'center',
        maxWidth: '472px',
        margin: '0 auto',
      }}>
        <img src={cover} alt="Babel Podcast Cover Art"/>
        
        <p>
          You probably use <a href="https://babeljs.io/">Babel</a>, directly or as a dependency.
          But do you ever wonder who works on it? <a href="https://twitter.com/left_pad">Henry Zhu</a> chats
          with other members of the team,
          TC39, and the JS community about
          the future of JavaScript and how it's all maintained.
          Please join us in babbling about Babel!
        </p>
        
        <Subscribe />
      </div>
    )
  }
}

export default Intro

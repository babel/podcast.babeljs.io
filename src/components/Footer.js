import React from "react";
import { Link } from "gatsby";

import { rhythm } from "../utils/typography";
import Subscribe from "./Subscribe";

const Footer = () => {
  return (
    <footer
      style={{
        marginTop: rhythm(3 / 4),
        paddingTop: rhythm(1 / 2),
        textAlign: "center",
      }}
    >
      <Subscribe />
      <div>
        Host: <a href="https://twitter.com/left_pad">Henry Zhu</a>
      </div>
      <div>
        Temporary Cover Art:{" "}
        <a href="https://twitter.com/kosamari/status/808409755278397441">
          Mariko Kosaka
        </a>
        , via <a href="https://kosamari.github.io/sweaterify">Sweaterify</a>
      </div>
      <div>
        Music: <a href="https://twitter.com/angustweets">Angus Croll</a> (
        <a href="https://github.com/babel/babel/blob/master/SONG.md">author</a>
        ), <a href="https://twitter.com/swyx">Shawn Wang</a> (
        <a href="https://www.youtube.com/watch?v=40abpedBKK8">cover</a>)
      </div>
      <Link
        style={{
          boxShadow: "none",
          textDecoration: "none",
          color: "inherit",
        }}
        to={"/"}
      >
        All rights reserved
      </Link>
    </footer>
  );
};

export default Footer;

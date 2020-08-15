import React from "react";

// Import typefaces
import "typeface-montserrat";
import "typeface-merriweather";
import babel_cover from "../assets/babel.jpg";
import Subscribe from "./Subscribe";

const Intro = ({ title }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        maxWidth: "472px",
        margin: "0 auto",
      }}
    >
      <img src={babel_cover} alt={`${title} Cover Art`} />

      <p>
        How can we work together to achieve a common goal: whether in our code,
        cities, or infrastructure?{" "}
        <a href="https://twitter.com/left_pad">Henry Zhu</a> chats with fellow
        maintainers across all disciplines of life on their process,
        motivations, and struggles as they learn in public.
      </p>

      <Subscribe />
    </div>
  );
};

export default Intro;

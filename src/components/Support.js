import React from "react";
import { Link } from "gatsby";

const Support = ({ title }) => {
  return (
    <p
      style={{
        maxWidth: 620,
        backgroundColor: "#4F5B66",
        textAlign: "center",
      }}
    >
      <Link
        style={{
          color: "inherit",
        }}
        to={"/"}
      >
        <i>{title}</i>
      </Link>{" "}
      <br />
      is made possible by the support of the community!
      <br />
      Consider becoming a{" "}
      <a href="https://www.opencollective.com/babel">sponsor</a> today!
    </p>
  );
};

export default Support;

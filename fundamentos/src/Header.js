import PropTypes from "prop-types";
import React from "react";

export default function Header({ title, children }) {
  return (
    <>
      <h1>{title}</h1>
      {children}
    </>
  );
}

Header.prototype = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Header.defaultProps = {
  title: `JStack's Blog`,
};

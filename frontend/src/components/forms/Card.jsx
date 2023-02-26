// Create Card component

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function Card({ children, className, ...props }) {
  return (
    <div
      className={classNames(
        "bg-white shadow-md rounded-md overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;

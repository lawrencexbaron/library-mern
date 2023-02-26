// Create button component
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function Button({ children, className, ...props }) {
  return (
    <button
      className={classNames(
        "px-4 py-2 text-white font-bold rounded-md",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;

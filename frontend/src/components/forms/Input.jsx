// Create Input component
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function Input({ className, ...props }) {
  return (
    <input
      className={classNames(
        "px-4 py-2 border border-gray-300 rounded-md",
        className
      )}
      {...props}
    />
  );
}

Input.propTypes = {
  className: PropTypes.string,
};

export default Input;

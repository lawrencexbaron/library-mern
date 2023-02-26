// Create Label component
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function Label({ children, className, ...props }) {
  return (
    <label
      className={classNames("block text-sm font-bold text-gray-700", className)}
      {...props}
    >
      {children}
    </label>
  );
}

Label.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Label;

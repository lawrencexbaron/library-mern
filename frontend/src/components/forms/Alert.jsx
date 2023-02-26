// Create alert component

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function Alert({ children, className, ...props }) {
  return (
    <div
      className={classNames(
        "px-4 py-2 text-white font-bold rounded-md my-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Alert;

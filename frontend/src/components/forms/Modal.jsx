// Create modal component

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function Modal({ children, className, ...props }) {
  return (
    <div
      className={classNames(
        "fixed top-0 left-0 w-full h-full flex items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Modal;

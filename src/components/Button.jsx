import React from "react";

const Button = ({
  type = "button",
  children,
  onClick,
  disabled = false,
  className = "",
  variant = "PRIMARY",
  size = "",
  outline = false,
}) => {
  return (
    <button
      type={type}
      className={
        "btn " +
        (outline ? " btn-outline " : "") +
        ("btn-" + variant.toLowerCase()) +
        (size ? " btn-" + size.toLowerCase() : "") +
        (className ? " " + className : "")
      }
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export { Button };

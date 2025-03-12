import React from "react";

const Group = ({ children, label, htmlFor, className, required = true }) => {
  return (
    <div className={"form-group" + (className ? " " + className : "")}>
      <label
        className={(required ? "" : "optional") + " mb-1"}
        attr-optional={"(optional)"}
        htmlFor={htmlFor}
      >
        {label}
      </label>
      <div>{children}</div>
    </div>
  );
};

export default Group;

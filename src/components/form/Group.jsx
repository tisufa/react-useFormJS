import React, { useRef } from "react";

const Group = ({ children, label, htmlFor, className, required = true }) => {
  const labelRef = useRef(null);
  return (
    <div className={"form-group" + (className ? " " + className : "")}>
      <label
        ref={labelRef}
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

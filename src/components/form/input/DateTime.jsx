import React, { forwardRef, useImperativeHandle } from "react";
import { useControl } from "../../../hooks/form";
import { InputText } from "./Text";

const InputDateTimeComponent = ({ placeholder, ...props }, ref) => {
  const control = useControl(props.name, props.props);
  useImperativeHandle(ref, () => control);

  return (
    <InputText
      placeholder={placeholder}
      {...control.props}
      type="datetime-local"
    />
  );
};

export const InputDateTime = forwardRef(InputDateTimeComponent);

import React, { forwardRef, useImperativeHandle } from "react";
import { useControl } from "../../../hooks/form";
import { InputText } from "./Text";

const InputTimeComponent = ({ placeholder, ...props }, ref) => {
  const control = useControl(props.name, props.props, props.parent);
  useImperativeHandle(ref, () => control);

  return <InputText placeholder={placeholder} {...control.props} type="time" />;
};

export const InputTime = forwardRef(InputTimeComponent);

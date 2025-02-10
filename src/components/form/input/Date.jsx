import React, { forwardRef, useImperativeHandle } from "react";
import { useControl } from "../../../hooks/form";
import { InputText } from "./Text";

const InputDateComponent = ({ placeholder, ...props }, ref) => {
  const control = useControl(props.name, props.props);
  useImperativeHandle(ref, () => control);

  return <InputText placeholder={placeholder} {...control.props} type="date" />;
};

export const InputDate = forwardRef(InputDateComponent);

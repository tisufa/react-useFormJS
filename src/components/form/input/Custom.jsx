import React, { forwardRef, useImperativeHandle } from "react";
import { useControl } from "../../../hooks/form";
import { InputText } from "./Text";

const CustomInputComponent = (props, ref) => {
  const control = useControl(props.name, props.props, props.parent);
  useImperativeHandle(ref, () => control);
  return <InputText {...props} {...control.props} />;
};

export const CustomInput = forwardRef(CustomInputComponent);

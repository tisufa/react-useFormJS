import React, { forwardRef, useImperativeHandle } from "react";
import { useControl } from "../../../hooks/form";
import { InputText } from "./Text";

const InputNumericComponent = ({ placeholder, ...props }, ref) => {
  const control = useControl(props.name, props.props, props.parent);
  useImperativeHandle(ref, () => control);

  const onChange = (value) => {
    control.setValue(value.replace(/\D/g, ""));
  };

  return (
    <InputText
      placeholder={placeholder}
      control={control}
      onChange={onChange}
    />
  );
};

export const InputNumeric = forwardRef(InputNumericComponent);

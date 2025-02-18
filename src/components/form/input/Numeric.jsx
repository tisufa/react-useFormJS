import React, { forwardRef, useImperativeHandle } from "react";
import { useControlRef } from "../../../hooks/form";
import { InputText } from "./Text";

const InputNumericComponent = ({ control, ...props }, ref) => {
  const { setValue } = useControlRef(control);
  useImperativeHandle(ref, () => control);

  const handleChange = (event) => {
    const value = event.target.value;
    setValue(value.replace(/\D/g, ""));
  };

  return <InputText control={control} onChange={handleChange} {...props} />;
};

export const InputNumeric = forwardRef(InputNumericComponent);

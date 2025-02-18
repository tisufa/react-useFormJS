import React, { forwardRef, useImperativeHandle } from "react";
import { useControlRef } from "../../../hooks/form";

import { InputText } from "./Text";

const InputAlphaNumericComponent = ({ control, ...props }, ref) => {
  const { setValue } = useControlRef(control);
  useImperativeHandle(ref, () => control);

  const handleChange = (event) => {
    const value = event.target.value;
    setValue(value.replace(/\W/g, ""));
  };

  return <InputText control={control} onChange={handleChange} {...props} />;
};

export const InputAlphaNumeric = forwardRef(InputAlphaNumericComponent);

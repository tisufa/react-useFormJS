import React, { forwardRef } from "react";
import { InputText } from "./Text";

const InputTimeComponent = ({ control, ...props }, ref) => {
  return <InputText type="time" control={control} {...props} />;
};

export const InputTime = forwardRef(InputTimeComponent);

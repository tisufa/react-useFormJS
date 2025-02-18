import React, { forwardRef } from "react";
import { InputText } from "./Text";

const InputDateTimeComponent = ({ control, ...props }, ref) => {
  return <InputText type="datetime-local" control={control} {...props} />;
};

export const InputDateTime = forwardRef(InputDateTimeComponent);

import React, { forwardRef } from "react";
import { InputText } from "./Text";

const InputDateComponent = ({ control, ...props }, ref) => {
  return <InputText type="date" control={control} {...props} />;
};

export const InputDate = forwardRef(InputDateComponent);

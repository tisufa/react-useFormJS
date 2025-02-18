import React, { forwardRef, useImperativeHandle } from "react";
import { useControlRef } from "../../../hooks";
import { InputText } from "./Text";

const InputEmailComponent = ({ control, ...props }, ref) => {
  const { setValue } = useControlRef(control);
  useImperativeHandle(ref, () => control);

  const handleChange = (event) => {
    const value = event.target.value;
    setValue(value.toLowerCase());
  };

  return (
    <InputText
      type="email"
      control={control}
      onChange={handleChange}
      {...props}
      componentLeft={() => <em className="fas fa-envelope" />}
    />
  );
};

export const InputEmail = forwardRef(InputEmailComponent);

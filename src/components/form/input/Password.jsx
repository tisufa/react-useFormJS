import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useControlRef } from "../../../hooks";
import { InputText } from "./Text";

const InputPasswordComponent = ({ control, ...props }, ref) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { setValue } = useControlRef(control);
  useImperativeHandle(ref, () => control);

  const handleChange = (event) => {
    const value = event.target.value;
    setValue(value);
  };

  return (
    <InputText
      {...props}
      control={control}
      type={isShowPassword ? "text" : "password"}
      onChange={handleChange}
      componentRight={() => (
        <em
          className={
            "fas cursor-pointer " + (isShowPassword ? "fa-eye-slash" : "fa-eye")
          }
          onClick={() => setIsShowPassword(!isShowPassword)}
        />
      )}
    />
  );
};

export const InputPassword = forwardRef(InputPasswordComponent);

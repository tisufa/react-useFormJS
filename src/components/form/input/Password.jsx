import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useControl } from "../../../hooks/form";
import { InputText } from "./Text";

const InputPasswordComponent = ({ placeholder, ...props }, ref) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const control = useControl(props.name, props.props, props.parent);
  useImperativeHandle(ref, () => control);

  const onChange = (value) => {
    control.setValue(value.toLowerCase());
  };

  return (
    <InputText
      placeholder={placeholder}
      control={control}
      type={isShowPassword ? "text" : "password"}
      onChange={onChange}
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

import React, { forwardRef, useImperativeHandle } from "react";
import { useControl } from "../../../hooks/form";
import { InputText } from "./Text";

const InputEmailComponent = ({ placeholder, ...props }, ref) => {
  const control = useControl(props.name, props.props);
  useImperativeHandle(ref, () => control);

  const onChange = (value) => {
    control.setValue(value.toLowerCase());
  };

  return (
    <InputText
      placeholder={placeholder}
      control={control}
      type="email"
      onChange={onChange}
      componentLeft={() => <em className="fas fa-envelope" />}
    />
  );
};

export const InputEmail = forwardRef(InputEmailComponent);

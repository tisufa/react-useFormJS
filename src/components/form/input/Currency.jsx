import React, { forwardRef, useImperativeHandle } from "react";
import { useControl } from "../../../hooks/form";
import { InputText } from "./Text";

const InputCurrencyComponent = ({ placeholder, ...props }, ref) => {
  const control = useControl(props.name, props.props);
  useImperativeHandle(ref, () => control);

  const onChange = (value) => {
    control.setValue(value.replace(/\D/g, ""));
  };

  return (
    <InputText
      placeholder={placeholder}
      value={control.value ? (+control.value).toLocaleString() : ""}
      control={control}
      onChange={onChange}
      componentLeft={() => <>Rp</>}
    />
  );
};

export const InputCurrency = forwardRef(InputCurrencyComponent);

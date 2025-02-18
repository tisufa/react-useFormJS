import React, { forwardRef, useImperativeHandle } from "react";
import { useControlRef } from "../../../hooks/form";
import { InputText } from "./Text";

const InputCurrencyComponent = ({ control, ...props }, ref) => {
  const { setValue } = useControlRef(control);
  useImperativeHandle(ref, () => control);

  const handleChange = (event) => {
    const value = event.target.value;
    setValue(value.replace(/\D/g, ""));
  };

  return (
    <InputText
      control={control}
      value={control.value ? (+control.value).toLocaleString() : ""}
      onChange={handleChange}
      componentLeft={() => <>Rp</>}
      {...props}
    />
  );
};

export const InputCurrency = forwardRef(InputCurrencyComponent);

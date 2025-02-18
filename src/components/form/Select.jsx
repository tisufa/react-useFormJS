import React, { forwardRef, useImperativeHandle } from "react";
import { useControlRef } from "../../hooks";
import { valueResolver } from "../../utils";

const SelectComponent = ({ control, ...props }, ref) => {
  const { setValue, nativeProps } = useControlRef(control);
  useImperativeHandle(ref, () => control);

  return (
    <>
      {control.readonly ? (
        <p>{valueResolver(control.value, props.labelField || "name")}</p>
      ) : (
        <>
          <select
            className={
              "form-select " +
              (control.touched
                ? control.isValid
                  ? "is-valid"
                  : "is-invalid"
                : "")
            }
            {...nativeProps}
            onChange={(e) => {
              let value = e.target.value;
              if (value) {
                const indexOfOption = (props.options || []).findIndex(
                  (option) => option.id === +e.target.value
                );
                value = (props.options || [])[indexOfOption];
              }
              setValue(value);
              props.onChange && props.onChange(value);
            }}
            value={control.value?.id}
          >
            <option value="">{props.placeholder}</option>
            {(props.options || []).map((option, index) => (
              <option value={option.id} key={index}>
                {valueResolver(option, props.labelField || "name")}
              </option>
            ))}
          </select>
          {control.touched && control.errors ? (
            <small className="text-danger">{control.errors?.message}</small>
          ) : null}
        </>
      )}
    </>
  );
};

export const Select = forwardRef(SelectComponent);

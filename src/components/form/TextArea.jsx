import React, { forwardRef, useImperativeHandle } from "react";
import { useControl } from "../../hooks";

const TextAreaComponent = (props, ref) => {
  const control = useControl(props.name, props.props, props.parent);
  useImperativeHandle(ref, () => control);

  const onChange = (event) => {
    if (props.onChange) {
      const value = event.target.value;
      control.setValue(value);
      if (!props.onChange) return;
      props.onChange(value);
    } else if (control) {
      control.nativeProps.onChange(event);
    }
  };

  return (
    <>
      {control.readonly ? (
        <p>{control.value || "-"}</p>
      ) : (
        <>
          <textarea
            className={
              "form-control " +
              (control.touched
                ? control.isValid
                  ? "is-valid"
                  : "is-invalid"
                : "")
            }
            placeholder={props.placeholder}
            {...control.nativeProps}
            onChange={onChange}
            value={control.value || ""}
          />
          {control.touched && control.errors ? (
            <small className="text-danger">{control.errors?.message}</small>
          ) : null}
        </>
      )}
    </>
  );
};

export const TextArea = forwardRef(TextAreaComponent);

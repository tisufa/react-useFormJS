import React, { forwardRef } from "react";
import { useControlRef } from "../../hooks";

const TextAreaComponent = ({ control, ...props }, ref) => {
  const { nativeProps } = useControlRef(control);

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
            {...nativeProps}
            placeholder={props.placeholder}
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

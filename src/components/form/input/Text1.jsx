import React, { forwardRef } from "react";
import { useControlRef } from "../../../hooks";

const InputTextComponent = ({ control, ...props }, ref) => {
  const { onChange, onBlur, value } = useControlRef(control);

  return (
    <>
      {control?.readonly ? (
        <p>{value || "-"}</p>
      ) : (
        <>
          <div className="input-group">
            {props.componentLeft && (
              <span className="input-group-text">{props.componentLeft()}</span>
            )}
            <input
              type={props.type || "text"}
              className={
                "form-control " +
                (control?.touched
                  ? control.isValid
                    ? "is-valid"
                    : "is-invalid"
                  : "")
              }
              placeholder={props.placeholder}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
            />
            {props.componentRight && (
              <span className="input-group-text">{props.componentRight()}</span>
            )}
          </div>
          {control?.touched && control.errors ? (
            <small className="text-danger">{control.errors?.message}</small>
          ) : null}
        </>
      )}
    </>
  );
};

export const InputText = forwardRef(InputTextComponent);

import React, { forwardRef } from "react";
import { useControlRef } from "../../../hooks/form";

const InputTextComponent = (
  { control, componentLeft, componentRight, ...props },
  ref
) => {
  return control ? (
    <InputWithControl
      componentLeft={componentLeft}
      componentRight={componentRight}
      control={control}
      {...props}
    />
  ) : (
    <InputNative
      componentLeft={componentLeft}
      componentRight={componentRight}
      {...props}
    />
  );
};

const InputWithControl = ({ control, ...props }) => {
  const { nativeProps } = useControlRef(control);
  return <InputNative {...props} nativeProps={nativeProps} control={control} />;
};

const InputNative = ({
  control,
  componentLeft,
  componentRight,
  nativeProps,
  ...props
}) => {
  return (
    <>
      {control.readonly ? (
        <p>{props.value || control.value || "-"}</p>
      ) : (
        <div className="input-group">
          {componentLeft && (
            <span className="input-group-text">{componentLeft()}</span>
          )}
          <input
            type={props.type || "text"}
            className={
              "form-control " +
              (control.touched
                ? control.isValid
                  ? "is-valid"
                  : "is-invalid"
                : "")
            }
            {...nativeProps}
            {...props}
            value={props.value || control.value || ""}
          />
          {componentRight && (
            <span className="input-group-text">{componentRight()}</span>
          )}
        </div>
      )}
      {control?.touched && control.errors ? (
        <small className="text-danger">{control.errors?.message}</small>
      ) : null}
    </>
  );
};

export const InputText = forwardRef(InputTextComponent);

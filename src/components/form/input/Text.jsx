import React, { forwardRef, useImperativeHandle } from "react";
import { useControl } from "../../../hooks/form";

const InputTextComponent = (props, ref) => {
  return props.name && props.props ? (
    <InputWithProps {...props} ref={ref} />
  ) : (
    <InputWithControl {...props} />
  );
};

const InputWithPropsComponent = (props, ref) => {
  let control = useControl(props.name, props.props);

  useImperativeHandle(ref, () => control);

  return <InputWithControl {...props} control={control} />;
};

const InputWithProps = forwardRef(InputWithPropsComponent);

const InputWithControl = ({ control, ...props }) => {
  const onChange = (event) => {
    if (props.onChange) {
      props.onChange(event.target.value);
    } else if (control) {
      control.nativeProps.onChange(event);
    }
  };

  return (
    <>
      {control?.readonly ? (
        <p>{props.value || control.value || "-"}</p>
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
              {...control?.nativeProps}
              onChange={onChange}
              value={props.value || control?.nativeProps.value || ""}
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

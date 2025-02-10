import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useControl } from "../../hooks";

const RadioComponent = (props, ref) => {
  const inputRefs = useRef([]);
  const control = useControl(props.name, props.props);
  useImperativeHandle(ref, () => control);

  const [state] = useState({
    randomId: Math.ceil(Math.random() * 100),
  });

  const handleCheck = (index) => {
    const inputRef = inputRefs.current[index];
    if (!inputRef) return;
    inputRef.click();
  };

  return (
    <>
      {control.readonly ? (
        <p>{control.value?.name || "-"}</p>
      ) : (
        <>
          {(props.options || []).map((option, index) => (
            <div
              className={
                "custom-radio" +
                (control.touched && !control.isValid ? " invalid" : "")
              }
              key={index}
            >
              <input
                type="radio"
                ref={(el) => (inputRefs.current[index] = el)}
                value={option.id}
                checked={option.id === +control.value?.id}
                onChange={() => {
                  control.setValue(option);
                  if (!props.onChange) return;
                  props.onChange(option);
                }}
                id={"radio" + state.randomId + option.id}
                hidden
              />
              <div className="circle" onClick={() => handleCheck(index)}>
                <div className="dot"></div>
              </div>
              <label
                className="label"
                htmlFor={"radio" + state.randomId + option.id}
              >
                {option.name}
              </label>
            </div>
          ))}
          {control.touched && control.errors ? (
            <small className="text-danger">{control.errors?.message}</small>
          ) : null}
        </>
      )}
    </>
  );
};

export const Radio = forwardRef(RadioComponent);

import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useControl } from "../../hooks/form";

const CheckBoxComponent = (props, ref) => {
  const control = useControl(props.name, props.props);
  const inputRefs = useRef([]);
  useImperativeHandle(ref, () => control);

  const [state] = useState({ randomId: Math.ceil(Math.random() * 100) });

  const handleClick = (index) => {
    if (!inputRefs.current[index]) return;
    inputRefs.current[index].click();
  };

  return (
    <div>
      {control.readonly ? (
        <div>
          {props.placeholder ? (
            control.value || "-"
          ) : (
            <ul className="p-0" style={{ listStylePosition: "inside" }}>
              {(control.value || []).map((val, index) => (
                <li key={index}>{val.name}</li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <>
          {props.placeholder ? (
            <div className="custom-checkbox" onClick={() => handleClick(0)}>
              <input
                hidden
                type="checkbox"
                id={"checkbox" + state.randomId}
                ref={(el) => (inputRefs.current[0] = el)}
                {...control.nativeProps}
                checked={!!control.value}
                onChange={(e) => {
                  control.setValue(e.target.checked);
                  control.markAsTouched();
                  if (props.onChange) {
                    props.onChange(control.value);
                  }
                }}
              />
              <div
                className={
                  "item" +
                  (control.value ? " checked" : "") +
                  (control.touched && !control.isValid ? " invalid" : "")
                }
              >
                <svg
                  className="checkmark"
                  viewBox="0 0 24 24"
                  style={{
                    display: control.value ? "block" : "none",
                  }}
                >
                  <path d="M4 12l6 6L20 6" />
                </svg>
              </div>
              <div className="cursor-pointer">{props.placeholder}</div>
            </div>
          ) : (
            // Multiple Checkbox Options (Custom Checkbox)
            (props.options || []).map((option, index) => (
              <div
                className="custom-checkbox"
                key={option.id}
                onClick={() => handleClick(index)} // Pass index to handleClick
              >
                <input
                  hidden
                  type="checkbox"
                  id={"checkbox" + state.randomId + option.id}
                  ref={(el) => (inputRefs.current[index] = el)} // Assign dynamic ref based on index
                  {...control.nativeProps}
                  value={option.id}
                  checked={
                    (control.value || []).findIndex(
                      (val) => val.id === option.id
                    ) !== -1
                  }
                  onChange={(e) => {
                    const value = control.value || [];
                    if (e.target.checked) {
                      value.push(option);
                    } else {
                      const indexOfOption = value.findIndex(
                        (val) => val.id === option.id
                      );
                      if (indexOfOption !== -1) {
                        value.splice(indexOfOption, 1);
                      }
                    }
                    control.setValue(value.length > 0 ? value : "");
                    control.markAsTouched();
                    if (props.onChange) {
                      props.onChange(control.value);
                    }
                  }}
                />
                <div
                  className={
                    "item" +
                    ((control.value || []).findIndex(
                      (val) => val.id === option.id
                    ) !== -1
                      ? " checked"
                      : "") +
                    (control.touched && !control.isValid ? " invalid" : "")
                  }
                >
                  <svg
                    className="checkmark"
                    viewBox="0 0 24 24"
                    style={{
                      display:
                        (control.value || []).findIndex(
                          (val) => val.id === option.id
                        ) !== -1
                          ? "block"
                          : "none",
                    }}
                  >
                    <path d="M4 12l6 6L20 6" />
                  </svg>
                </div>
                <div className="cursor-pointer">{option.name}</div>
              </div>
            ))
          )}
          {control.touched && control.errors ? (
            <small className="text-danger">{control.errors?.message}</small>
          ) : null}
        </>
      )}
    </div>
  );
};

export const CheckBox = forwardRef(CheckBoxComponent);

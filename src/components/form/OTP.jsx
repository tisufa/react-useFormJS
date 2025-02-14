import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useControl } from "../../hooks";

const OTPComponent = ({ otpLength = 5, type = "number", ...props }, ref) => {
  const control = useControl(props.name, props.props, props.parent);
  const [otps, setOtps] = useState(Array(otpLength).fill(""));
  const [focus, setFocus] = useState(false);
  const [touched, setTouched] = useState(false);
  useImperativeHandle(ref, () => control);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (!(type === "number" || type === "text")) {
      throw new Error("Invalid otp type");
    }
  }, []);

  useEffect(() => {
    const values = otps.filter((otp) => otp).join("");
    control.setValue(values);
  }, [otps]);

  useEffect(() => {
    if (focus) return;
    if (control.touched) return;
    if (touched && !control.touched) {
      control.markAsTouched();
      control.reloadState();
    }
  }, [focus]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (!value) return;
    const newOTPs = [...otps];
    const isValidNumber = type === "number" ? !isNaN(value) : true;
    newOTPs[index] = isValidNumber ? value : "";
    setOtps(newOTPs);
    if (!isValidNumber) return;
    const inputRef = inputRefs.current[index + 1];
    if (inputRef) inputRef.focus();
  };

  const handleKeyDown = (e, index) => {
    const { key } = e;
    if (key === "Backspace") {
      const newOTPs = [...otps];
      newOTPs[index] = "";
      setOtps(newOTPs);
      const inputRef = inputRefs.current[index - 1];
      if (!inputRef) return;
      inputRef.focus();
    } else if (key === "ArrowLeft") {
      const inputRef = inputRefs.current[index - 1];
      if (!inputRef) return;
      inputRef.focus();
    } else if (key === "ArrowRight") {
      const inputRef = inputRefs.current[index + 1];
      if (!inputRef) return;
      inputRef.focus();
    }
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const handleFocus = () => {
    if (!touched) setTouched(true);
    setFocus(true);
  };

  return (
    <>
      <div
        className={`form-control ${
          control.touched ? (control.isValid ? "is-valid" : "is-invalid") : ""
        }`}
      >
        {Array(otpLength)
          .fill(0)
          .map((val, index) => (
            <div className={otps[index] ? "fill" : ""} key={val + index}>
              <input
                type="text"
                onChange={(e) => handleChange(e, index)}
                size={1}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                value={otps[index]}
                maxLength={1}
                placeholder="0"
                onBlur={() => handleBlur()}
                onFocus={() => handleFocus()}
              />
            </div>
          ))}
      </div>
      {control.touched && control.errors ? (
        <small className="text-danger">{control.errors?.message}</small>
      ) : null}
    </>
  );
};

export const OTP = forwardRef(OTPComponent);

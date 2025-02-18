import { useControlRef } from "./hooks/form/useControlRef";

const Input = ({ control, ...props }) => {
  const controlRef = useControlRef(control);
  console.log("ReRendered");
  return (
    <>
      <input
        className={
          "form-control " +
          (control.touched ? (control.isValid ? "is-valid" : "is-invalid") : "")
        }
        type="text"
        {...controlRef}
        placeholder="Enter name"
      />
      {control.touched && control.errors ? (
        <small className="text-danger">{control.errors?.message}</small>
      ) : null}
    </>
  );
};

export default Input;

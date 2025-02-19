import { forwardRef, useImperativeHandle, useRef } from "react";
import { useControlRef } from "../../../hooks";
import { Button } from "../../Button";

const UploadButtonComponent = ({ control, ...props }, ref) => {
  const { setValue } = useControlRef(control);
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => control);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleChange = (event) => {
    const maxFile = props.maxFile || 1;
    const isMultiple = maxFile > 1;
    let values = isMultiple ? control.value || [] : control.value;
    const files = event.target.files;
    if (isMultiple) {
      Array.from(files).forEach((file) => {
        values.push(file);
      });
      setValue(values);
    } else {
      setValue(files.item(0));
    }

    event.target.value = null;

    control.markAsTouched();

    if (!props.onChange) return;
    props.onChange(control.value);
  };

  const handleDelete = (index) => {
    const maxFile = props.maxFile || 1;
    const isMultiple = maxFile > 1;
    if (isMultiple) {
      const values = control.value;
      values.splice(index, 1);
      setValue(values);
    } else {
      setValue(null);
    }
    if (!props.onChange) return;
    props.onChange(control.value);
  };

  return (
    <div className="upload-button">
      <Button
        className="flex justify-center items-center gap-1 w-full"
        onClick={handleClick}
      >
        <em className="fas fa-file-arrow-up"></em>
        <span>File Pendukung</span>
      </Button>
      <input
        type="file"
        hidden
        ref={inputRef}
        onChange={handleChange}
        multiple
        accept={props.allowedExtension ? props.allowedExtension : "*"}
      />
      <ul className="files">
        {((props.maxFile || 1) > 1
          ? control.value || []
          : control.value
          ? [control.value]
          : []
        ).map((file, index) => (
          <li key={index}>
            <span>{file.name}</span>
            <em
              className="fas fa-trash text-danger"
              onClick={() => handleDelete(index)}
            />
          </li>
        ))}
      </ul>
      {control.touched && control.errors ? (
        <small className="text-danger">{control.errors?.message}</small>
      ) : null}
    </div>
  );
};

export const UploadButton = forwardRef(UploadButtonComponent);

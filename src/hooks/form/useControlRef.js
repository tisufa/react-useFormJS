import { useReducer } from "react";

export const useControlRef = (control) => {
  if (!control) throw new Error("Control not provided");

  const [, changeState] = useReducer((x) => x + 1, 0);

  const onChange = (event) => {
    control.setValue(event.target.value);
    reRender();
  };

  const onBlur = () => {
    control.markAsTouched();
    reRender();
  };

  const setValue = (value) => {
    control.setValue(value);
    reRender();
  };

  const markAsTouched = () => {
    control.markAsTouched();
    reRender();
  };

  const reRender = () => {
    changeState();
    if (!control?.options?.reRenderParent) return;
    control.reloadState();
  };

  const nativeProps = {
    ...control.nativeProps,
    onChange,
    onBlur,
  };

  return { ...control, nativeProps, setValue, markAsTouched };
};

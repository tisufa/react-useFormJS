import { useState } from "react";
import { FormControl } from "./FormControl";

export const useControl = (controlName, props, parent) => {
  const reloadState = () => {
    setState((state) => ({
      ...state,
      control: state.control,
    }));
  };

  const [state, setState] = useState({
    control: new FormControl(props, controlName, { reloadState, parent }),
  });

  return state.control;
};

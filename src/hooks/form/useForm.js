import { useState } from "react";
import { formBuilder } from "./formBuilder";
export const useForm = (props, options) => {
  const reloadState = () => {
    setState((state) => ({
      ...state,
      group: state.group,
    }));
  };

  const [state, setState] = useState({
    group: formBuilder.group(props, { reloadState }, options),
  });

  return state.group;
};

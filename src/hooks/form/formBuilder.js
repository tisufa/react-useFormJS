import { FormArray } from "./FormArray";
import { FormControl } from "./FormControl";
import { FormGroup } from "./FormGroup";

export const formBuilder = {
  group: (props, parent, options) => {
    const formGroup = new FormGroup({});

    if (options && options.readonly) {
      formGroup.readonly = options.readonly;
    }

    if (!parent) {
      parent = { parent: formGroup };
    } else {
      parent.parent = formGroup;
    }

    formGroup.setParent(parent);
    const controls = {};
    Object.keys(props).forEach((key) => {
      const prop = props[key];
      if (prop instanceof FormArray) {
        prop.setParent(parent);
        controls[key] = prop;
      } else {
        if (formGroup.readonly) {
          if (typeof prop[2] === "undefined") {
            prop[2] = { readonly: formGroup.readonly };
          } else if (prop[2] && typeof prop[2].readonly === "undefined") {
            prop[2].readonly = formGroup.readonly;
          }
        }
        controls[key] = new FormControl(prop, key, parent);
      }
    });
    formGroup.setControls(controls);
    return formGroup;
  },
  array: () => {
    const formArray = new FormArray([]);
    return formArray;
  },
};

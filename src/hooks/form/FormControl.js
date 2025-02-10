import { createRef } from "react";

export class FormControl {
  constructor(_props, name, parent) {
    this._props = _props;
    this.name = name;
    this.parent = parent;
    this.value = _props[0];
    this.errors = this.createErrors(_props[0]);
    this.isValid = !this.errors;
    this.touched = false;
    this.dirty = false;
    this.disabled = !!_props[2]?.disabled;
    this.readonly = !!_props[2]?.readonly;
    this.ref = createRef();
    this.options = _props[2];
  }

  get value() {
    return this.ref.current ? this.ref.current.value : this._value;
  }

  set value(value) {
    this._value = value;
  }

  get errors() {
    return this.ref?.current ? this.ref.current.errors : this._errors;
  }

  set errors(errors) {
    this._errors = errors;
  }

  patchValue(value) {
    this._props[0] = value;
    if (this.ref.current) {
      this.ref.current.patchValue(value);
    } else {
      if (this._props[2]?.toModel && value) {
        this.value = this._props[2]?.toModel(value);
        this.errors = this.createErrors(this.value);
      } else {
        this.value = value;
        this.errors = this.createErrors(value);
      }
      this.isValid = !this.errors;
      this.reloadState();
    }
  }

  setValue(value) {
    this.value = value;
    this.errors = this.createErrors(value);
    this.isValid = !this.errors;
    this.reloadState();
  }

  markAsTouched() {
    if (this.ref.current) {
      this.ref.current.markAsTouched();
    } else {
      this.touched = true;
    }
  }

  markAsDirty() {
    if (this.ref.current) {
      this.ref.current.markAsDirty();
    } else {
      this.dirty = true;
    }
  }

  get props() {
    if (this.parent && this.parent.parent && this.parent.parent.readonly) {
      if (typeof this._props[2] === "undefined") {
        this._props[2] = {
          readonly: this.parent.parent.readonly,
        };
      } else if (
        this._props[2] &&
        typeof this._props[2].readonly === "undefined"
      ) {
        this._props[2].readonly = this.parent.parent.readonly;
      }
    }

    return {
      name: this.name,
      props: this._props,
      ref: this.ref,
      parent: this.parent?.parent,
    };
  }

  get nativeProps() {
    return {
      value: this.value,
      onChange: (event) => {
        this.markAsDirty();
        this.setValue(event.target.value);
      },
      onBlur: () => {
        this.markAsTouched();
        this.reloadState();
      },
      name: this.name,
      disabled: this.disabled,
    };
  }

  createErrors(value) {
    if (!this._props[1]) return null;
    const validators = Array.isArray(this._props[1])
      ? this._props[1]
      : [this._props[1]];
    return (
      validators
        .map((validator) => validator(value, this.parent?.parent))
        .filter((error) => error)[0] || null
    );
  }

  setParent(parent) {
    this.parent = parent;
  }

  validate() {
    if (this.ref.current) {
      this.ref.current.validate();
    } else {
      if (this.errors && this.touched) return;
      this.markAsTouched();
      this.errors = this.createErrors(this.value);
      this.isValid = !this.errors;
      this.reloadState();
    }
  }

  reset() {
    if (this.ref.current) {
      this.ref.current.reset();
    } else {
      this.touched = false;
      this.dirty = false;
      this.patchValue("");
    }
  }

  setValidators(validators) {
    if (this.ref.current) {
      this.ref.current.setValidators(validators);
    } else {
      this._props[1] = validators;
      this.errors = this.createErrors(this.value);
      this.isValid = !this.errors;
      this.reloadState();
    }
  }

  clearValidators() {
    if (this.ref.current) {
      this.ref.current.clearValidators();
    } else {
      this._props[1] = [];
      this.errors = null;
      this.isValid = true;
      this.reloadState();
    }
  }

  disable() {
    if (this.ref.current) {
      this.ref.current.disable();
    } else {
      this.disabled = true;
      this.reloadState();
    }
  }

  enable() {
    if (this.ref.current) {
      this.ref.current.enable();
    } else {
      this.disabled = false;
      this.reloadState();
    }
  }

  setReadOnly(readOnly = true, reloadState = false) {
    this.readonly = readOnly;
    if (this.ref.current) {
      this.ref.current.setReadOnly(readOnly);
    }

    if (reloadState || !this.ref.current) {
      this.reloadState();
    }
  }

  setErrors(errors) {
    if (this.ref.current) {
      this.ref.current?.setErrors(errors);
    } else {
      this.errors = errors;
      this.isValid = false;
      this.reloadState();
    }
  }

  reloadState() {
    if (!this.parent?.reloadState) return;
    this.parent.reloadState();
  }
}

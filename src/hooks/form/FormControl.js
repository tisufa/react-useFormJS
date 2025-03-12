export class FormControl {
  constructor(_props, name, state) {
    const { parent, ...currentState } = state;
    this._props = _props;
    this.name = name;
    this.parent = state.parent;
    this.state = currentState;
    this.value = _props[0];
    this.errors = this.createErrors(_props[0]);
    this.isValid = !this.errors;
    this.touched = false;
    this.dirty = false;
    this.disabled = !!_props[2]?.disabled;
    this.readonly = !!_props[2]?.readonly;
    this.options = _props[2];
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }

  get errors() {
    return this._errors;
  }

  set errors(errors) {
    this._errors = errors;
  }

  patchValue(value) {
    this._props[0] = value;

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

  setValue(value) {
    this.value = value;
    this.errors = this.createErrors(value);
    this.isValid = !this.errors;
  }

  markAsTouched() {
    this.touched = true;
  }

  markAsDirty() {
    this.dirty = true;
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
        .map((validator) => validator(value, this.parent))
        .filter((error) => error)[0] || null
    );
  }

  setParent(parent) {
    this.parent = parent;
  }

  validate() {
    if (this.errors && this.touched) return;
    this.markAsTouched();
    this.errors = this.createErrors(this.value);
    this.isValid = !this.errors;
    this.reloadState();
  }

  reset() {
    this.touched = false;
    this.dirty = false;
    this.patchValue("");
  }

  setValidators(validators) {
    this._props[1] = validators;
    this.errors = this.createErrors(this.value);
    this.isValid = !this.errors;
    this.reloadState();
  }

  clearValidators() {
    this._props[1] = [];
    this.errors = null;
    this.isValid = true;
    this.reloadState();
  }

  disable() {
    this.disabled = true;
    this.reloadState();
  }

  enable() {
    this.disabled = false;
    this.reloadState();
  }

  setReadOnly(readOnly = true, reloadState = false) {
    this.readonly = readOnly;
    if (reloadState) {
      this.reloadState();
    }
  }

  setErrors(errors) {
    this.errors = errors;
    this.isValid = false;
    this.reloadState();
  }

  reloadState() {
    this.state.reloadState();
  }
}

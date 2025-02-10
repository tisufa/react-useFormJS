export class FormArray {
  constructor(controls) {
    this.controls = controls;
    this.parent = undefined;
    this.touched = false;
    this.dirty = false;
    this.disabled = false;
    this.readonly = false;
  }

  get value() {
    return this.controls.map((control) => control.value);
  }

  patchValue(values) {
    values.forEach((value, index) => {
      this.controls[index].patchValue(value);
    });
  }

  get isValid() {
    return (
      this.controls
        .map((formGroup) => formGroup.isValid)
        .filter((isValid) => !isValid).length === 0
    );
  }

  get errors() {
    return this.controls
      .map((formGroup) => formGroup.errors)
      .filter((error) => error)[0];
  }

  setParent(parent) {
    this.parent = parent;
  }

  markAllAsTouched() {
    this.controls.forEach((group) => {
      group.markAllAsTouched();
    });
  }

  push(props) {
    props.setParent(this.parent);
    if (this.disabled || this.parent?.parent?.disabled) {
      props.disable();
    }

    if (this.readonly || this.parent?.parent?.readonly) {
      props.setReadOnly();
    }

    this.controls.push(props);

    this.reloadState();
  }

  removeAt(index) {
    this.controls.splice(index, 1);
    this.reloadState();
  }

  reset() {
    this.controls.forEach((formGroup) => {
      formGroup.reset();
    });
  }

  setValidators(validators) {
    this.controls.forEach((formGroup) => {
      formGroup.setValidators(validators);
    });
  }

  clearValidators() {
    this.controls.forEach((formGroup) => {
      formGroup.clearValidators();
    });
  }

  disable() {
    this.disabled = true;
    this.controls.forEach((formGroup) => {
      formGroup.disable();
    });
  }

  enable() {
    this.disabled = false;
    this.controls.forEach((formGroup) => {
      formGroup.enable();
    });
  }

  setReadOnly(readOnly = true) {
    this.readonly = readOnly;
    this.controls.forEach((formGroup) => {
      formGroup.setReadOnly(readOnly);
    });
  }

  validate() {
    this.controls.forEach((formGroup) => {
      formGroup.validate();
    });
  }

  reloadState() {
    if (!this.parent?.reloadState) return;
    this.parent.reloadState();
  }
}

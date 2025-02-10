import { FormArray } from "./FormArray";
import { FormControl } from "./FormControl";

export class FormGroup {
  constructor(controls) {
    this.controls = controls;
    this.parent = undefined;
    this.disabled = false;
    this.readonly = false;
  }

  patchValue(value) {
    Object.keys(value).forEach((key) => {
      const control = this.get(key);
      if (!control) throw new Error(`Can't find control with name ${key}`);
      control.patchValue(value[key]);
    });
    this.reloadState();
  }

  get errors() {
    return Object.keys(this.controls)
      .map((key) => this.get(key).errors)
      .filter((error) => error)[0];
  }

  get isValid() {
    return !this.errors;
  }

  get value() {
    const value = {};
    Object.keys(this.controls).forEach((key) => {
      const control = this.get(key);
      if (
        !(control instanceof FormArray) &&
        control.options?.toDTO &&
        control.value
      ) {
        let dto = control.options?.toDTO(control.value);
        Object.keys(dto).forEach((dtoKey) => {
          value[dtoKey] = dto[dtoKey];
        });
      } else {
        value[key] = control.value;
      }
    });
    return value;
  }

  get(controlName) {
    return this.controls[controlName];
  }

  setControls(controls) {
    this.controls = controls;
  }

  setParent(parent) {
    this.parent = parent;
    Object.keys(this.controls).forEach((key) => {
      const control = this.get(key);
      control.setParent(parent);
    });
  }

  addControl(controlName, props) {
    if (this.controls[controlName]) return;
    const control = new FormControl(props, controlName, this.parent);
    this.disabled && control.disable();
    this.readonly && control.setReadOnly();
    this.controls[controlName] = control;
    this.reloadState();
  }

  removeControl(controlName) {
    if (!this.controls[controlName]) return;
    delete this.controls[controlName];
    this.reloadState();
  }

  validate() {
    Object.keys(this.controls).forEach((key) => {
      this.get(key).validate();
    });
  }

  getFormData() {
    const formData = new FormData();
    Object.keys(this.controls).forEach((key) => {
      const control = this.get(key);
      if (
        !(control instanceof FormArray) &&
        control.options?.toDTO &&
        control.value
      ) {
        let dto = control.options?.toDTO(control.value);
        Object.keys(dto).forEach((dtoKey) => {
          formData.append(dtoKey, dto[dtoKey]);
        });
      } else {
        formData.append(key, control.value);
      }
    });
    return formData;
  }

  markAllAsTouched() {
    Object.keys(this.controls).forEach((key) => {
      const control = this.get(key);
      control instanceof FormArray
        ? control.markAllAsTouched()
        : control.markAsTouched();
    });
  }

  reset() {
    Object.keys(this.controls).forEach((key) => {
      this.get(key).reset();
    });
  }

  setValidators(validators) {
    Object.keys(this.controls).forEach((key) => {
      this.get(key).setValidators(validators);
    });
  }

  clearValidators() {
    Object.keys(this.controls).forEach((key) => {
      this.get(key).clearValidators();
    });
  }

  disable() {
    this.disabled = true;
    Object.keys(this.controls).forEach((key) => {
      this.get(key).disable();
    });
  }

  enable() {
    this.disabled = false;
    Object.keys(this.controls).forEach((key) => {
      this.get(key).enable();
    });
  }

  setReadOnly(readOnly = true) {
    this.readonly = readOnly;
    Object.keys(this.controls).forEach((key) => {
      this.get(key).setReadOnly(readOnly);
    });
    this.reloadState();
  }

  reloadState() {
    if (!this.parent?.reloadState) return;
    this.parent.reloadState();
  }
}

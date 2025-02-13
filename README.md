# Custom React useForm Hooks

Create a simple form using custom `useForm` and `useControl` hooks.

## Live Demo

- **Live Code:** [StackBlitz](https://stackblitz.com/~/github.com/tisufa/react-useFormJS)
- **Demo:** [React UseFormJS](https://reactuseformjs-34go--5173--d20a0a75.local-credentialless.webcontainer.io/)

## Usage

### Using `useForm`

```jsx
const form = useForm({
  name: [null, Validators.required("Name is required")],
});
```

### Using `useControl`

```jsx
const control = useControl("name", [
  null,
  Validators.required("Name is required"),
]);
```

## Form Integration

### Native Input

Using `useForm` with a native `<input>` element:

```jsx
<input
  className={`form-control ${
    form.get("name").touched
      ? form.get("name").isValid
        ? "is-valid"
        : "is-invalid"
      : ""
  }`}
  {...form.get("name").nativeProps}
  placeholder="Enter name"
/>;
{
  form.get("name").touched && !form.get("name").isValid && (
    <small className="text-danger">{form.get("name").errors.message}</small>
  );
}
```

### Custom Component

Using `useForm` with a custom component:

```jsx
<Form.Input.Text {...form.get("name").props} placeholder="Enter name" />
```

Or using `useControl`:

```jsx
<Form.Input.Text {...control.props} placeholder="Enter username" />
```

## Form Actions

### Validate Form

```jsx
form.validate();
```

### Reset Form

```jsx
form.reset();
```

# `useForm` Options

`useForm` provides several configuration options to control form behavior.

### Methods

#### `patchValue(value: object): void`

Updates multiple control values at once.

```javascript
form.patchValue({ username: "JohnDoe", email: "john@example.com" });
```

#### `get(controlName: string): FormControl | FormArray`

Retrieves a specific control by its name.

```javascript
const emailControl = form.get("email");
```

#### `setControls(controls: object): void`

Replaces the current controls with new ones.

#### `setParent(parent: any): void`

Sets the parent of the `FormGroup`.

#### `addControl(controlName: string, props: any): void`

Adds a new control to the form.

```javascript
form.addControl("phone", { value: "123456789" });
```

#### `removeControl(controlName: string): void`

Removes a control from the form.

```javascript
form.removeControl("phone");
```

#### `validate(): void`

Triggers validation on all form controls.

```javascript
form.validate();
```

#### `getFormData(): FormData`

Converts form values to a `FormData` object.

```javascript
const formData = form.getFormData();
```

#### `markAllAsTouched(): void`

Marks all controls as touched.

#### `reset(): void`

Resets all form controls to their initial state.

```javascript
form.reset();
```

#### `setValidators(validators: Function[]): void`

Sets validators for all controls.

#### `clearValidators(): void`

Clears all validators from the controls.

#### `disable(): void`

Disables all controls in the form.

```javascript
form.disable();
```

#### `enable(): void`

Enables all controls in the form.

```javascript
form.enable();
```

#### `setReadOnly(readOnly: boolean = true): void`

Sets all controls to read-only mode.

```javascript
form.setReadOnly(true);
```

#### `reloadState(): void`

Triggers a state reload in the parent form.

### Properties

#### `errors: any`

Retrieves the first validation error in the form.

```javascript
if (form.errors) {
  console.log("Form has errors");
}
```

#### `isValid: boolean`

Indicates whether the form is valid.

```javascript
if (form.isValid) {
  console.log("Form is valid");
}
```

#### `value: object`

Gets the current values of the form controls.

```javascript
console.log(form.value);
```

## Properties

| Name       | Type      | Description                                                                                               |
| ---------- | --------- | --------------------------------------------------------------------------------------------------------- |
| `readonly` | `boolean` | Determines whether the form is in read-only mode. If `true`, users cannot edit the form inputs. Optional. |

## Example Usage

```jsx
const form = useForm({
  username: [null, [], { readonly: true }],
});
```

## Notes

- The `readonly` property is optional. If not included, the form is editable.
- Can be used in `useForm` configuration or components requiring read/write mode settings.

# `useControl` Options

`useControl` provides additional configuration options useful for managing input controls within the form.

## Properties

| Name             | Type                                     | Description                                                                                    |
| ---------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `toDTO`          | `(value: any) => { [key: string]: any }` | Converts the control value to a DTO.                                                           |
| `toModel`        | `(model: any) => any`                    | Converts the value from DTO to model when using `patchValue`.                                  |
| `disabled`       | `boolean`                                | Determines whether the control is disabled. If `true`, users cannot interact with the control. |
| `readonly`       | `boolean`                                | Determines whether the control is in read-only mode. If `true`, users cannot edit the input.   |
| `reRenderParent` | `boolean`                                | Determines whether it should trigger a parent re-render.                                       |

## Example Usage

```jsx
const control = useControl("name", [null, [], { disabled: true }]);
```

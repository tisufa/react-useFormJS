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

## Properties

| Name       | Type      | Description                                                                                               |
| ---------- | --------- | --------------------------------------------------------------------------------------------------------- |
| `readonly` | `boolean` | Determines whether the form is in read-only mode. If `true`, users cannot edit the form inputs. Optional. |

## Example Usage

```jsx
const form = useForm({
  username: [null],
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

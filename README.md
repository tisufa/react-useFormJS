# Custom React useForm Hooks

Create a simple form using custom `useForm` and `useControl`.

## Live Demo

- **Live Code:** [StackBlitz](https://stackblitz.com/~/github.com/tisufa/react-useFormJS)
- **Demo:** [React UseFormJS](https://reactuseformjs-34go--5173--d20a0a75.local-credentialless.webcontainer.io/)

## Installation

Ensure you have this custom useForm in your project:

## Usage

### Using `useForm`

```jsx
import { useForm, Validators } from "react-useFormJS";

const form = useForm({
  name: [null, Validators.required("Name is required")],
});
```

### Using `useControl`

```jsx
import { useControl, Validators } from "react-useFormJS";

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

### Custom Components

Using `useForm` with custom components:

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

## License

This project is licensed under the MIT License.

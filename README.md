# Custom React useForm hooks

Create simple form using custom useForm and useControl.

Live Code: https://stackblitz.com/~/github.com/tisufa/react-useFormJS

Demo: https://reactuseformjs-34go--5173--d20a0a75.local-credentialless.webcontainer.io/

### Using useForm

```
const form = useForm({
    name: [null, Validators.required('Name is required')]
});
```

### Using useControl

```
const control = useControl("name", [
  null,
  Validators.required("Name is required"),
]);
```

#### Native Input

Using useForm with native input

```
 <input
  className={
    "form-control " +
    (form.get("name").touched
      ? form.get("name").isValid
        ? "is-valid"
        : "is-invalid"
      : "")
  }
  {...form.get("name").nativeProps}
  placeholder="Enter name"
/>
{form.get("name").touched && !form.get("name").isValid && (
  <small className="text-danger">
    {form.get("name").errors.message}
  </small>
)}
```

#### Custom Components

Using useForm with custom components

```
<Form.Input.Text {...form.get("name").props} placeholder="Enter name" />
```

**Or**

```
<Form.Input.Text {...control.props} placeholder="Enter username" />
```

##### Validate

```
form.validate();
```

##### Reset

```
form.reset();
```

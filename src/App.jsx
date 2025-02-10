import { useState } from "react";
import "./App.css";
import { Form } from "./components";
import { Button } from "./components/Button";
import { useControl, useForm } from "./hooks";
import { GenderModel, ReligionModel, SkillModel } from "./models";
import { Validators } from "./validators";
function App() {
  const [state] = useState({
    genders: GenderModel.createList(),
    religions: ReligionModel.createList(),
    skills: SkillModel.createList(),
  });

  const form = useForm({
    username: [
      null,
      Validators.required("Username is required"),
      Validators.minLength(4, "Username must be greater than 3 characters"),
      Validators.maxLength(16, "Username must be less than 17 characters"),
    ],
    name: [null, Validators.required("Name is required")],
    age: [null, Validators.required("Age is required")],
    IDNumber: [
      null,
      [
        Validators.required("ID number is required"),
        Validators.actualLength(16, "ID Number should be 16 digits"),
      ],
    ],
    email: [
      null,
      [
        Validators.required("Email is required"),
        Validators.email("Format email is not valid"),
      ],
    ],
    password: [null, Validators.required("Password is required")],
    confirmPassword: [
      null,
      [
        Validators.required("Confirm password is required"),
        Validators.match(
          "password",
          "Confirm password is not match with password"
        ),
      ],
    ],
    gender: [null, Validators.required("Gender is required")],
    religion: [null, Validators.required("Religion is required")],
    skills: [null, Validators.required("Skills wajib dipilih")],
    salary: [null, Validators.required("Salary wajib diisi")],
    DOB: [null, Validators.required("Date of birth is required")],
    TOB: [null, Validators.required("Time of birth is required")],
    DTOB: [null, Validators.required("Date time of birth is required")],
    about: [null, Validators.required("About is required")],
  });

  const control = useControl("name", [
    null,
    Validators.required("Name is required"),
  ]);

  const handleSubmit = () => {
    form.validate();
    if (!form.isValid) return;
    console.log(form.value);
  };

  const handleReset = () => {
    form.reset();
  };

  return (
    <div className="outer-wrapper">
      <div className="header-wrapper">
        <h2>ReactJS Form</h2>
        <p>Build a form in a ReactJS application with custom useForm hooks</p>
      </div>
      <div className="content-wrapper">
        <div className="grid gap-2">
          <Form.Group label="Username">
            <Form.Input.Text {...control.props} placeholder="Enter username" />
          </Form.Group>

          <Form.Group label="Username">
            <Form.Input.AlphaNumeric
              {...form.get("username").props}
              placeholder="Enter username"
            />
          </Form.Group>

          <Form.Group label="Name">
            <Form.Input.Text
              {...form.get("name").props}
              placeholder="Enter name"
            />
          </Form.Group>

          <Form.Group label="Age">
            <Form.Input.Number
              {...form.get("age").props}
              placeholder="Enter age"
            />
          </Form.Group>

          <Form.Group label="ID Number">
            <Form.Input.Numeric
              {...form.get("IDNumber").props}
              placeholder="Enter ID number"
            />
          </Form.Group>

          <Form.Group label="Email">
            <Form.Input.Email
              {...form.get("email").props}
              placeholder="Enter email address"
            />
          </Form.Group>

          <Form.Group label="Password">
            <Form.Input.Password
              {...form.get("password").props}
              placeholder="Enter password"
            />
          </Form.Group>

          <Form.Group label="Confirm Password">
            <Form.Input.Password
              {...form.get("confirmPassword").props}
              placeholder="Enter confirm password"
            />
          </Form.Group>

          <Form.Group label="Gender">
            <Form.Radio
              {...form.get("gender").props}
              placeholder="Select gender"
              options={state.genders}
            />
          </Form.Group>

          <Form.Group label="Religion">
            <Form.Select
              {...form.get("religion").props}
              placeholder="Select religion"
              options={state.religions}
            />
          </Form.Group>

          <Form.Group label="Skills">
            <Form.CheckBox
              {...form.get("skills").props}
              options={state.skills}
            />
          </Form.Group>

          <Form.Group label="Salary">
            <Form.Input.Currency
              {...form.get("salary").props}
              placeholder="Enter salary"
            />
          </Form.Group>

          <Form.Group label="Date of Birth">
            <Form.Input.Date
              {...form.get("DOB").props}
              placeholder="Select date of birth"
            />
          </Form.Group>

          <Form.Group label="Time of Birth">
            <Form.Input.Time
              {...form.get("TOB").props}
              placeholder="Select time of birth"
            />
          </Form.Group>

          <Form.Group label="Date time of Birth">
            <Form.Input.DateTime
              {...form.get("DTOB").props}
              placeholder="Select date time of birth"
            />
          </Form.Group>

          <Form.Group label="About">
            <Form.TextArea
              {...form.get("about").props}
              placeholder="Enter about"
            />
          </Form.Group>
        </div>
        <div className="flex justify-end mt-3 gap-2">
          <Button variant="SECONDARY" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
}

export default App;

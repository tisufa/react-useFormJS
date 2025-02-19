import { useState } from "react";
import "./App.css";
import { Form } from "./components";
import { Button } from "./components/Button";
import { useForm } from "./hooks";
import { GenderModel, ReligionModel, SkillModel } from "./models";
import { Validators } from "./validators";

function App() {
  const [state] = useState({
    genders: GenderModel.createList(),
    religions: ReligionModel.createList(),
    skills: SkillModel.createList(),
  });

  const form = useForm({
    OTP: [
      null,
      [
        Validators.required("OTP is required"),
        Validators.actualLength(5, "OTP must be 5 characters long"),
      ],
    ],
    username: [
      "",
      [
        Validators.required("Username is required"),
        Validators.minLength(4, "Username must be greater than 3 characters"),
        Validators.maxLength(16, "Username must be less than 17 characters"),
      ],
    ],
    name: [null, Validators.required("Name is required")],
    age: [
      null,
      Validators.required("Age is required"),
      { reRenderParent: true },
    ],
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
    phone: [null, Validators.required("Phone number is required")],
    gender: [null, Validators.required("Gender is required")],
    religion: [null, Validators.required("Religion is required")],
    skills: [null, Validators.required("Skills wajib dipilih")],
    salary: [null, Validators.required("Salary wajib diisi")],
    DOB: [null, Validators.required("Date of birth is required")],
    TOB: [null, Validators.required("Time of birth is required")],
    DTOB: [null, Validators.required("Date time of birth is required")],
    about: [null, Validators.required("About is required")],
    agreement: [false, [], { reRenderParent: true }],
  });

  const handleSubmit = () => {
    form.validate();
    console.log(form.value);
    if (!form.isValid) return;
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
        <div className="grid gap-3">
          <Form.Group label="Username">
            <Form.Input.AlphaNumeric
              control={form.get("username")}
              placeholder="Enter username"
            />
          </Form.Group>

          <Form.Group label="Name">
            <Form.Input.Text
              control={form.get("name")}
              placeholder="Enter name"
            />
          </Form.Group>

          <Form.Group label="Age">
            <Form.Input.Number
              control={form.get("age")}
              placeholder="Enter age"
            />
          </Form.Group>

          <Form.Group label="ID Number">
            <Form.Input.Numeric
              control={form.get("IDNumber")}
              placeholder="Enter ID number"
            />
          </Form.Group>

          <Form.Group label="Email">
            <Form.Input.Email
              control={form.get("email")}
              placeholder="Enter email address"
            />
          </Form.Group>

          <Form.Group label="Password">
            <Form.Input.Password
              control={form.get("password")}
              placeholder="Enter password"
            />
          </Form.Group>

          <Form.Group label="Confirm Password">
            <Form.Input.Password
              control={form.get("confirmPassword")}
              placeholder="Enter confirm password"
            />
          </Form.Group>

          <Form.Group label="Phone">
            <Form.Input.Tel
              control={form.get("phone")}
              placeholder="Enter phone number"
            />
          </Form.Group>

          <Form.Group label="Gender">
            <Form.Radio
              control={form.get("gender")}
              placeholder="Select gender"
              options={state.genders}
            />
          </Form.Group>

          <Form.Group label="Religion">
            <Form.Select
              control={form.get("religion")}
              placeholder="Select religion"
              options={state.religions}
            />
          </Form.Group>

          <Form.Group label="Skills">
            <Form.CheckBox
              control={form.get("skills")}
              options={state.skills}
            />
          </Form.Group>

          <Form.Group label="Salary">
            <Form.Input.Currency
              control={form.get("salary")}
              placeholder="Enter salary"
            />
          </Form.Group>

          <Form.Group label="Date of Birth">
            <Form.Input.Date
              control={form.get("DOB")}
              placeholder="Select date of birth"
            />
          </Form.Group>

          <Form.Group label="Time of Birth">
            <Form.Input.Time
              control={form.get("TOB")}
              placeholder="Select time of birth"
            />
          </Form.Group>

          <Form.Group label="Date time of Birth">
            <Form.Input.DateTime
              control={form.get("DTOB")}
              placeholder="Select date time of birth"
            />
          </Form.Group>

          <Form.Group label="About">
            <Form.TextArea
              control={form.get("about")}
              placeholder="Enter about"
            />
          </Form.Group>

          <Form.Group label="OTP">
            <Form.OTP control={form.get("OTP")} type="number" />
          </Form.Group>

          <Form.Group>
            <Form.CheckBox
              control={form.get("agreement")}
              placeholder="Term and condition"
            />
          </Form.Group>
        </div>

        <div className="flex justify-end mt-3 gap-2">
          <Button variant="SECONDARY" onClick={handleReset}>
            Reset
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!form.get("agreement").value}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;

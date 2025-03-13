import "./App.css";
import { Form } from "./components";
import { Button } from "./components/Button";
import { useForm } from "./hooks";
import { formBuilder } from "./hooks/form/formBuilder";
import { Validators } from "./validators";

function App() {
  const form = useForm({
    familyName: [
      "Doe",
      Validators.required("Name is required"),
      { disabled: true },
    ],
    childrens: formBuilder.array([
      formBuilder.group({
        name: [null, Validators.required("Children name is required")],
        age: [null, Validators.required("Children age is required")],
      }),
    ]),
  });

  const addTab = () => {
    form.get("childrens").push(
      formBuilder.group({
        name: [null, Validators.required("Children name is required")],
        age: [null, Validators.required("Children age is required")],
      })
    );
  };

  const handleDeleteItem = (index) => {
    form.get("childrens").removeAt(index);
  };

  const handleSubmit = () => {
    form.validate();
    console.log(form);
    if (!form.isValid) return;
    console.log(form.value);
  };

  const handleAddForm = () => {
    addTab();
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
        <div className="mb-3">
          <Form.Group label="Family Name">
            <Form.Input.Text
              control={form.get("familyName")}
              placeholder="Enter family name"
            />
          </Form.Group>
        </div>
        <div className="grid">
          <h5>Childrens</h5>
          <div className="grid gap-3">
            {form.get("childrens").controls.map((fg, index) => (
              <div className="form-item" key={index}>
                <div>
                  <Form.Group label="Name">
                    <Form.Input.Text
                      control={fg.get("name")}
                      placeholder="Enter children name"
                    />
                  </Form.Group>
                  <Form.Group label="Age">
                    <Form.Input.Numeric
                      control={fg.get("age")}
                      placeholder="Enter children age"
                    />
                  </Form.Group>
                </div>
                <em
                  className="fas fa-times"
                  onClick={() => handleDeleteItem(index)}
                ></em>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-3 gap-2">
          <Button variant="SECONDARY" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="WARNING" onClick={handleAddForm}>
            Add Form
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
}

export default App;

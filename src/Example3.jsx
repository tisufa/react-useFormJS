import "./App.css";
import { Form } from "./components";
import { Button } from "./components/Button";
import { useForm } from "./hooks";
import { Validators } from "./validators";

function App() {
  const form = useForm({
    name: [null, Validators.required("Name is required")],
  });

  const handleSubmit = () => {
    form.validate();
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
            <Form.TextArea
              control={form.get("name")}
              placeholder="Enter username"
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

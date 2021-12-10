import { useState } from "react";

import { updateSingleRecipe } from "../../services/recipeService";
import LoadingComponent from "../../components/Loading/index";
import { Form, Container, Row, Col, Button } from "react-bootstrap";

function EditRecipe() {
  //   console.log("----->", formBody);

  const [formContent, setFormContent] = useState({
    title: "",
    category: "",
    ingredients: "",
    stepsRecipe: "",
    cookingTime: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormContent((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    console.log(e);
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    updateSingleRecipe(formContent)
      .then((res) => {
        console.log("Recipe updated 👇", res);
        setFormContent({
          title: "",
          category: "",
          ingredients: "",
          stepsRecipe: "",
          cookingTime: "",
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  if (isLoading) {
    return <LoadingComponent />;
  }

  // {(e) => {
  //    submitHandler(e);
  // }}

  return (
    <div>
      <Container>
        <Form className="form-container" onSubmit={submitHandler}>
          {error && <h1>{error}</h1>}
          <legend>Update this Recipe</legend>
          <Row className="mb-3">
            {/* <Col> */}
            <Form.Group as={Col}>
              <Form.Label>
                Title of your Recipe*:
                <Form.Control
                  // value={title}
                  onChange={handleChange}
                  type="text"
                  // placeholder="Tell us more!"
                  name="title"
                />
              </Form.Label>
            </Form.Group>
            {/* </Col> */}
            <Form.Group as={Col}>
              <Form.Label>
                Category of your recipe:
                <Form.Control
                  // value={category}
                  onChange={handleChange}
                  type="text"
                  placeholder="breakfast, lunch, dinner, snack, appetizer"
                  name="category"
                />
              </Form.Label>
            </Form.Group>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
export default EditRecipe;

// <input type="text" name="title" className="input" onChange={handleChange} />
// <label htmlFor="description" className="label">
//   Todo Description
// </label>
// <input
//   type="textarea"
//   name="description"
//   className="input"
//   onChange={handleChange}
// />
// <button type="submit" className="todo-btn">
//   ➕ Add
// </button>

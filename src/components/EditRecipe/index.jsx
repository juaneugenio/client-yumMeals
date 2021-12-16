import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import { updateSingleRecipe } from "../../services/recipeService";
import { useNavigate } from "react-router";
import * as PATHS from "../../utils/paths";

function EditRecipe({ recipe }) {
  console.log(recipe);
  const navigate = useNavigate();
  const [form, setForm] = useState(recipe);
  const { title, category, ingredients, stepsRecipe, cookingTime } = form;
  console.log("MARIEEEEEEEEEE", form);
  //   const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleNormalInput(event) {
    console.log(event.target.name);
    console.log(event.target.value);
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }
  function handleSubmit(event) {
    event.preventDefault();
    //  setIsLoading(true);
    setError(false);

    const formBody = new FormData();
    // formBody.appendy("imageRecipePic", choosenPicture);
    formBody.append("title", title);
    formBody.append("category", category);
    formBody.append("ingredients", ingredients);
    formBody.append("stepsRecipe", stepsRecipe);
    formBody.append("cookingTime", cookingTime);
    console.log(`formBody`, formBody);

    updateSingleRecipe(recipe._id, {
      title,
      category,
      ingredients,
      stepsRecipe,
      cookingTime,
    }).then((res) => {
      console.log("RES:", res);
      if (!res.success) {
        return setError(res.data);
      }
      navigate(PATHS.HOME_PAGE);
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      {error && <h1>{error}</h1>}
      {/* <input className="inputFile" type="file" onChange={handleFileInput} /> */}
      {/* //make sure we change className when we work on the CSS */}
      {/* <input className="inputFile" type="text"/>   */}
      {/* <input type="number" /> */}

      <fieldset>
        <legend>Update your Recipe</legend>
        <Row className="mb-3">
          {/* <Col> */}
          <Form.Group as={Col}>
            <Form.Label>
              Title of your Recipe*:
              <Form.Control
                value={title}
                onChange={handleNormalInput}
                type="text"
                placeholder={recipe.title}
                name="title"
              />
            </Form.Label>
          </Form.Group>
          {/* </Col> */}
          <Form.Group as={Col}>
            <Form.Label>
              Category of your recipe:
              <Form.Control
                value={category}
                onChange={handleNormalInput}
                type="text"
                placeholder="breakfast, lunch, dinner, snack, appetizer"
                name="category"
              />
            </Form.Label>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Ingredients of your recipe*:</Form.Label>
          <Form.Control
            value={ingredients}
            onChange={handleNormalInput}
            type="text"
            placeholder="butter, beef, carrot,..."
            name="ingredients"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Steps of your recipe*:</Form.Label>
          <Form.Control
            value={stepsRecipe}
            onChange={handleNormalInput}
            type="text"
            placeholder="First, you need to boil the carrots"
            name="stepsRecipe"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>CookingTime*:</Form.Label>
          <Form.Control
            value={cookingTime}
            onChange={handleNormalInput}
            type="text"
            placeholder="Set a duration of your recipe"
            name="cookingTime"
          />
        </Form.Group>
        <Button type="submit">Save</Button>
      </fieldset>
    </Form>
  );
}

export default EditRecipe;

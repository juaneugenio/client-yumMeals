import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import { updateSingleRecipe } from "../../services/recipeService";
import { useNavigate } from "react-router";
import * as PATHS from "../../utils/paths";

function EditRecipe({ recipe }) {
  console.log(recipe);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [newChosenPic, setNewChosenPic] = useState("");
  const [form, setForm] = useState(recipe);
  const {
    imageRecipe,
    title,
    category,
    ingredients,
    stepsRecipe,
    cookingTime,
  } = form;
  console.log("imageRecipe?", form);
  //   const [isLoading, setIsLoading] = useState(false);

  function handleImageInput(event) {
    console.log(event.target.files[0]);
    const imageFromInput = event.target.files[0];
    setNewChosenPic(imageFromInput);
  }

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

    if (!newChosenPic) {
      setError(
        "Please, make sure you select a picture to upload before submitting!"
      );
      // setIsLoading(false);
      return;
    }

    const formBody = new FormData();
    formBody.append("imageUrl", newChosenPic);
    formBody.append("title", title);
    formBody.append("category", category);
    formBody.append("ingredients", ingredients);
    formBody.append("stepsRecipe", stepsRecipe);
    formBody.append("cookingTime", cookingTime);
    console.log(`FORMBBODY client!!!!!!!`, formBody);
    console.log("and image here? ", newChosenPic);

    //if we have a picture to update, we have to send as a valueformBody instead of the values.
    updateSingleRecipe(recipe._id, formBody).then((res) => {
      console.log("updateSingleRecipe:", res);
      console.log("wheree is the imagee???---1", res.data);
      // console.log("wheree is the imagee???", res.file);
      if (!res.success) {
        return setError(res.data);
      }
      navigate(PATHS.HOME_PAGE);
      console.log(`where is the imageeee?`, res.data);
      // setForm({ ...form, imageUrl: res.data.imageUrl });
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      {/* {error && <h1>{error}</h1>} */}
      {/* <input className="inputFile" type="file" onChange={handleFileInput} /> */}
      {/* //make sure we change className when we work on the CSS */}
      {/* <input className="inputFile" type="text"/>   */}
      {/* <input type="number" /> */}

      <fieldset>
        <legend>Update your Recipe</legend>
        <Row className="px-6 py-5">
          <Form.Group as={Col}>
            <img height={"350px"} src={imageRecipe} alt={`${title}'s meal`} />
          </Form.Group>
          <Form.Group as={Col} className="m-5">
            {error && (
              <p style={{ color: "teal", fontWeight: "530" }}>{error}</p>
            )}
            <input type="file" onChange={handleImageInput} />
          </Form.Group>
        </Row>

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

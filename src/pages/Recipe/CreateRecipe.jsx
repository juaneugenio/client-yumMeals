import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router";
import LoadingComponent from "../../components/Loading/index";
import { createRecipe } from "../../services/recipeService";
import * as PATHS from "../../utils/paths";
// import { updateRecipeImage } from "../../services/recipeService";

function CreateRecipe() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    imageRecipe: "",
    title: "",
    category: "",
    ingredients: "",
    cookingTime: "",
    stepsRecipe: "",
  });
  console.log("FORM:", form);
  const {
    imageRecipe,
    title,
    category,
    ingredients,
    stepsRecipe,
    cookingTime,
  } = form;
  const [chosenPicture, setChosenPicture] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleFileInput(event) {
    // console.log(event.target.files[0]);
    const imageFromInput = event.target.files[0];
    setChosenPicture(imageFromInput);
  }

  function handleNormalInput(event) {
    // console.log(event.target.name);

    const inputElementBeingChanged = event.target;
    const keyInState = inputElementBeingChanged.name;
    const valueThatUserIsWriting = inputElementBeingChanged.value;
    const newVersionOfStateAfterWeUpdate = { ...form };
    newVersionOfStateAfterWeUpdate[keyInState] = valueThatUserIsWriting;
    setForm(newVersionOfStateAfterWeUpdate);
  }

  function handleSubmit(event) {
    event.preventDefault();
    SetIsLoading(true);
    setError(false);

    if (!chosenPicture) {
      setError("You must select a picture to upload!");
      setIsLoading(false);
      return;
    }

    const formBody = new FormData();
    formBody.append("imageRecipePic", chosenPicture);
    formBody.append("title", title);
    formBody.append("category", category);
    formBody.append("ingredients", ingredients);
    formBody.append("stepsRecipe", stepsRecipe);
    formBody.append("cookingTime", cookingTime);
    console.log(`formBody`, formBody);

    createRecipe(formBody).then((res) => {
      console.log("RES:", res);
      if (!res.success) {
        // setIsLoading(false);
        return setError(res.data);
      }
      // setForm({ ...form, imageRecipePic: res.data.imageRecipePic });
      // setIsLoading(false);
      navigate(PATHS.HOME_PAGE);
    });
  }

  if (Loading) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <Container>
        <Form onSubmit={handleSubmit} method="POST">
          <fieldset>
            <legend className="my-5 fw-bold"> Create your Recipe </legend>
            <Row className="mb-4">
              {/* <Col> */}
              <Form.Group as={Col}>
                <Form.Label className="mb-3">Title of your recipe*:</Form.Label>
                <Form.Control
                  value={title}
                  onChange={handleNormalInput}
                  type="text"
                  placeholder="Tell us more!"
                  name="title"
                />
              </Form.Group>
              {/* </Col> */}
              <Form.Group as={Col}>
                <Form.Label className="mb-3">Category:</Form.Label>
                <Form.Control
                  value={category}
                  onChange={handleNormalInput}
                  type="text"
                  placeholder="breakfast, lunch, dinner, snack, appetizer"
                  name="category"
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Ingredients*:</Form.Label>
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
            <Form.Group className="mb-4">
              <Form.Label>Cooking time*:</Form.Label>
              <Form.Control
                value={cookingTime}
                onChange={handleNormalInput}
                type="text"
                placeholder=" It takes 30-35mins per 500g..."
                name="cookingTime"
              />
            </Form.Group>
            <Form.Group className="mb-5">
              <div>
                <img height={"300px"} src={imageRecipe} alt="" />
                {error && (
                  <p style={{ color: "teal", fontWeight: "530" }}>{error}</p>
                )}
                <input type="file" onChange={handleFileInput} />
              </div>
            </Form.Group>
            <Button variant="secondary mt-2" type="submit">
              Submit
            </Button>
          </fieldset>
        </Form>
      </Container>
    </div>
  );
}
export default CreateRecipe;

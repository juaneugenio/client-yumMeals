import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router";
import LoadingComponent from "../../components/Loading/index";
import { createRecipe } from "../../services/recipeService";
import * as PATHS from "../../utils/paths";

function CreateRecipe() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    category: "",
    ingredients: "",
    cookingTime: "",
    stepsRecipe: "",
  });
  // console.log("FORM:", form);
  const { title, category, ingredients, stepsRecipe } = form;

  // const [chosenPicture, setChosenPicture] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // function handleFileInput(event) {
  //   const imageFromInput = event.target.files[0];

  //   setChosenPicture(imageFromInput);
  // }

  function handleNormalInput(event) {
    console.log(event.target.name);
    const inputElementBeingChanged = event.target;
    const keyInState = inputElementBeingChanged.name;
    const valueThatUserIsWriting = inputElementBeingChanged.value;
    const newVersionOfStateAfterWeUpdate = { ...form };
    newVersionOfStateAfterWeUpdate[keyInState] = valueThatUserIsWriting;
    setForm(newVersionOfStateAfterWeUpdate);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(false);

    // if (!chosenPicture) {
    //   setError("You must select a picture to upload! You fool! 👀");
    //   setIsIsLoading(false);
    //   return;
    // }

    const formBody = new FormData();
    formBody.append("title", title);
    formBody.append("category", category);
    formBody.append("ingredients", ingredients);
    formBody.append("stepsRecipe", stepsRecipe);
    // console.log(`formBody`, formBody);

    // formBody.append("juanPostPic", chosenPicture);

    createRecipe({ title, category, ingredients, stepsRecipe }).then((res) => {
      console.log("RES:", res);
      if (!res.success) {
        return setError(res.data);
      }
      navigate(PATHS.HOME_PAGE);
    });
  }

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <Container>
        <Form onSubmit={handleSubmit}>
          {error && <h1>{error}</h1>}
          {/* <input className="inputFile" type="file" onChange={handleFileInput} /> */}
          {/* //make sure we change className when we work on the CSS */}
          {/* <input className="inputFile" type="text"/>   */}
          {/* <input type="number" /> */}
          <fieldset>
            <legend>Create your Recipe</legend>
            <Row className="mb-3">
              {/* <Col> */}
              <Form.Group as={Col}>
                <Form.Label>
                  Title of your Recipe*:
                  <Form.Control
                    value={title}
                    onChange={handleNormalInput}
                    type="text"
                    placeholder="Tell us more!"
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

            <Button type="submit">Submit</Button>
          </fieldset>
        </Form>
      </Container>
    </div>
  );
}

export default CreateRecipe;

import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Card, Container, Form} from "react-bootstrap";
import { useParams } from "react-router";
import { getSingleRecipe } from "../../services/recipeService";
import "../Recipe/SingleRecipePage.css";
// import { createRating } from "../../services/ratingService";
import { useNavigate } from "react-router";
import * as PATHS from "../../utils/paths";

function SingleRecipe() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [singleRecipe, setSingleRecipe] = useState(undefined);
  console.log("singleRecipe1:", singleRecipe);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const [form, setForm] = useState({
    userRating: "",
    comment: "",
  });
  const { userRating, comment, } = form;

    useEffect(() => {
    setIsLoading(true);
    getSingleRecipe(recipeId)
      .then((recipe) => {
        if (!recipe.success) {
          return setError("setError:", recipe.data);
        }
        //    setTimeout(()=>{
        setSingleRecipe(recipe.data.recipe);
        console.log("recipe.data:", recipe.data);
        // setIsLoading(false);
        //    }, 2000); //2s to appear the recipe
      })
      .catch((message) => {
        setError(message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [recipeId]);

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
  }

  const formBody = new FormData();
  formBody.append("userRating", userRating);
  formBody.append("comment", comment);

//   createRating({ userRating, comment}).then(
//     (res) => {
//       console.log("RES:", res);
//       if (!res.success) {
//         return setError(res.data);
//       }
//       navigate(PATHS.HOME_PAGE);
//     }
//   );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Text className="h1">{singleRecipe.title}</Card.Text>
          <Card.Subtitle>by {singleRecipe.owner.username}</Card.Subtitle>
          <Card.Text>Category: {singleRecipe.category}</Card.Text>
          <Card.Text className="h3">Steps of the recipe:</Card.Text>
          <ol className="list-group list-group-numbered">
            {singleRecipe.ingredients.map((step) => (
              <li className="list-group-item">{step}</li>
            ))}
          </ol>
        </Card.Body>
      </Card>

      <Form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Please rate this recipe if you already did it !</legend>
          <Form.Group>
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;
              return (
                <Form.Label>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                  />
                  <FaStar
                    className="star"
                    color={
                      ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                    }
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                    size={20}
                  />
                </Form.Label>
              );
            })}
          </Form.Group>


        </fieldset>
      </Form>
    </Container>
  );
}
//in the video, {JSON.stringify(singleRecipe)} was deleted but if i do that, the function doesnt work

export default SingleRecipe;

import React, { useEffect, useState } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router";
import * as PATHS from "../../utils/paths";
import {
  getSingleRecipe,
  deleteSingleRecipe,
} from "../../services/recipeService";
import "../Recipe/SingleRecipePage.css";
import { FaStar } from "react-icons/fa";
import { createRating } from "../../services/recipeService";

function SingleRecipe() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [singleRecipe, setSingleRecipe] = useState(undefined);
  console.log("singleRecipe1:", singleRecipe);
  const [error, setError] = useState("");
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getSingleRecipe(recipeId)
      .then((recipe) => {
        if (!recipe.success) {
          return setError("setError:", recipe.data);
        }

        setSingleRecipe(recipe.data.recipe);
        console.log("recipe.data:", recipe.data);
      })
      .catch((message) => {
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [recipeId]);

  function handleNormalInput(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  //CREATE THE RATING COMPONENT
  //FIRST THE CONST
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [form, setForm] = useState({
    userRating: "",
    comment: "",
  });
  const { userRating, comment } = form;

  //IN THE SUBMIT EVENT WE PUT THE RATING FUNCTION
  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(false);
    //THIS FUNCTION COMES FROM THE RECIPE SERVICE
    createRating({ userRating, comment, recipeId }).then((res) => {
      console.log("RES:", res);
      if (!res.success) {
        return setError(res.data);
      }
      navigate(PATHS.HOME_PAGE);
    });
  }

  // It comes from RecipeService
  function handleDeleteSingleRecipe() {
    setLoading(true);
    deleteSingleRecipe(recipeId)
      .then((response) => {
        if (!response.success) {
          return setError(response.data);
        }
        navigate(PATHS.HOME_PAGE);
      })
      .catch((message) => {
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (Loading) {
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
        <button onClick={handleDeleteSingleRecipe} type="delete">
          Delete Recipe
        </button>

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
                      name="userRating"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                      onChange={handleNormalInput}
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

            <Form.Group>
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                name="comment"
                value={comment}
                onChange={handleNormalInput}
                placeholder="Write your comment about the recipe"
              />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </fieldset>
        </Form>
      </Card>
    </Container>
  );
}

export default SingleRecipe;

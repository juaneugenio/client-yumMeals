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

function SingleRecipe({ user }) {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [singleRecipe, setSingleRecipe] = useState(undefined);
  console.log("singleRecipe1:", singleRecipe);
  const [error, setError] = useState("");
  const [isLoading, SetIsLoading] = useState(true);

  useEffect(() => {
    SetIsLoading(true);
    getSingleRecipe(recipeId)
      .then((recipe) => {
        console.log("recipeId:", recipeId)
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
        SetIsLoading(false);
      });
  }, [recipeId]);

  //********************************DISPLAY ALL RATINGS OF THE RECIPE********************************************************************
  //FIRST THE CONST
  // const [allRatings, setAllRatings] = useState({
  //   rating: "",
  //   comment: "",
  //   userName: "",
  // });

  // const { rating, comment, userName } = allRatings;

  //***********************CREATE THE RATING COMPONENT************************************************************************************************************************************************
  //FIRST THE CONST

  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [errorLogin, setErrorLogIn] = useState(null);
  const [errorRecipe, setErrorRecipe] = useState(null);
  const [form, setForm] = useState({
    userRating: "",
    comment: "",
  });
  const { userRating, comment } = form;

  //HANDLE UPDATE INPUT
  function handleNormalInput(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }
  //IN THE SUBMIT EVENT WE PUT THE RATING FUNCTION
  function handleSubmit(event) {
    event.preventDefault();
    SetIsLoading(true);
    setError(false);

    // DISPLAY ERROR MESSAGE IF NO LOGGED IN USER
    function displayErrorLoginMessage() {
      setErrorLogIn(
        "You need to be logged in if you want to rate and comment a recipe"
      );
      setTimeout(() => {
        setErrorLogIn("");
      }, 3000);
    }
    // DISPLAY ERROR MESSAGE IF THE RECIPE DOESN'T EXIST
    function displayErrorRecipeMessage() {
      setErrorRecipe("This recipe doesn't exist");
      setTimeout(() => {
        setErrorRecipe("");
      }, 3000);
    }

    //THIS FUNCTION COMES FROM THE RECIPE SERVICE

    createRating({ userRating, comment, recipeId }).then((res) => {
      console.log("RES:", res);
      if (!res.success) {
        return setError(res.data);
      }
      navigate(PATHS.HOME_PAGE);
    });
  }

  //***********************************DELETE SINGLE RECIPE***************************************************************** */
  // It comes from RecipeService
  function handleDeleteSingleRecipe() {
    SetIsLoading(true);
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
        SetIsLoading(false);
      });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Card>
        <Form>
          <Card.Body>
            <Card.Text className="h1">{singleRecipe.title}</Card.Text>
            <Card.Subtitle>by {singleRecipe.owner.username}</Card.Subtitle>
            <Card.Text>Category: {singleRecipe.category}</Card.Text>
            <Card.Text className="h3">
              Steps of the recipe:
              <input type="text" />
            </Card.Text>
            <ol className="list-group list-group-numbered">
              {singleRecipe.ingredients.map((step) => (
                <li className="list-group-item">{step}</li>
              ))}
            </ol>
          </Card.Body>
          <button onClick={handleDeleteSingleRecipe} type="delete">
            Delete Recipe
          </button>
        </Form>

        {user && (
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
                          ratingValue <= (hover || rating)
                            ? "#ffc107"
                            : "#e4e5e9"
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
        )}
      </Card>
    </Container>
  );
}

export default SingleRecipe;

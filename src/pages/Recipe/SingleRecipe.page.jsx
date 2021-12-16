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
import LoadingComponent from "../../components/Loading/index";
import { Link } from "react-router-dom";
import EditRecipe from "../../components/EditRecipe";

function SingleRecipe({ user }) {
  console.log("-----> ", user);
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const [singleRecipe, setSingleRecipe] = useState(undefined);
  // console.log("singleRecipe1:", singleRecipe);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = () => Boolean(user);
  const isOwner = () => isLoggedIn() && user._id === singleRecipe?.owner._id;

  useEffect(() => {
    setIsLoading(true);
    getSingleRecipe(recipeId)
      .then((recipe) => {
        if (!recipe.success) {
          return setError("setError:", recipe.data);
        }
        setSingleRecipe(recipe.data.recipe);
        // console.log("recipe.data:", recipe.data);
      })
      .catch((message) => {
        setError(message);
      })
      .finally(() => {
        setIsLoading(false);
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
    setIsLoading(true);
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
  // It comes from RecipeService
  function handleDeleteSingleRecipe() {
    setIsLoading(true);
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
        if (error) {
          return setIsLoading(false);
        }
        navigate(PATHS.HOME_PAGE);
      });
  }

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container className="mt-2 p-5">
      <Container>
        <Card.Body>
          <img
            height={"500px"}
            src={singleRecipe.imageRecipe}
            alt={`${singleRecipe.title}'s meal`}
          />
          <Card.Text className="h1 mt-0 text-uppercase">
            {singleRecipe.title}
          </Card.Text>
          <Card.Subtitle className="mx-4 pt-1 text-secondary blockquote-footer">
            by {singleRecipe.owner.username}
          </Card.Subtitle>
          <Card.Text className="h6 mt-4">
            <b>Category:</b>
          </Card.Text>
          <Card.Subtitle className="text-secondary">
            {singleRecipe.category}
          </Card.Subtitle>
          <Card.Text className="h6 mt-4">
            <b>Cooking time </b>🕒:
          </Card.Text>
          <Card.Subtitle className="text-secondary">
            {singleRecipe.cookingTime}
          </Card.Subtitle>
          <Card.Text className="h6 mt-4">
            <b>Ingredients:</b>
          </Card.Text>
          <Card.Subtitle>
            <ol className="list-group list-group-numbered">
              {singleRecipe.ingredients.map((ingredient) => (
                <li className="list-group-item  text-secondary">
                  {ingredient}
                </li>
              ))}
            </ol>
          </Card.Subtitle>
          <Card.Text className="h6 mt-4">
            <b>Steps to follow:</b>
          </Card.Text>
          <ol className="list-group list-group-numbered">
            {singleRecipe.stepsRecipe.map((step) => (
              <li className="list-group-item  text-secondary">{step}</li>
            ))}
          </ol>
          <Card.Text className="h6 mt-4">
            <b>Rating:</b>
          </Card.Text>

          {isOwner() && (
            <div className="d-flex mt-5 gap-3">
              <Link key={singleRecipe._id} to={`/recipe/edit/${recipeId}`}>
                <Button variant="secondary">Edit Recipe</Button>
              </Link>
              <Button
                variant="danger"
                onClick={handleDeleteSingleRecipe}
                type="delete"
              >
                Delete Recipe
              </Button>
            </div>
          )}
          <Form onSubmit={handleSubmit}>
            <fieldset className="my-4">
              <legend>Please rate this recipe if you already did it !</legend>
              <Form.Group className="my-4">
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
              <Form.Group className="my-4">
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
              <Button className="px-5 " variant="success" type="submit">
                Submit
              </Button>
            </fieldset>
          </Form>
        </Card.Body>
      </Container>

      {isOwner() && <EditRecipe recipe={singleRecipe} />}
    </Container>
  );
}

export default SingleRecipe;

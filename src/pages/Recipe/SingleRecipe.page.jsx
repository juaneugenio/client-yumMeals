/** @format */

import React, { useEffect, useState } from "react";
import { Card, Container, Button, ListGroup } from "react-bootstrap";
import { useParams, useNavigate } from "react-router";
import * as PATHS from "../../utils/paths";
import {
  getSingleRecipe,
  deleteSingleRecipe,
} from "../../services/recipeService";
import "../Recipe/SingleRecipePage.css";
import EditRecipe from "../../components/EditRecipe";
import RatingRecipe from "../../components/RatingRecipe";
import DisplayRatings from "../../components/DisplayRatings/DisplayRatings";
import DisplayUserRatings from "../../components/DisplayUserRating/index";

function SingleRecipe({ user }) {
  const { recipeId } = useParams();
  const [singleRecipe, setSingleRecipe] = useState(undefined);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = () => Boolean(user);
  const isOwner = () => isLoggedIn() && user._id === singleRecipe?.owner._id;
  const isNotOwner = () => isLoggedIn() && user._id !== singleRecipe?.owner._id;
  const navigate = useNavigate();
  const [allRatings, setAllRatings] = useState(undefined);

  useEffect(() => {
    setIsLoading(true);
    getSingleRecipe(recipeId)
      .then((recipe) => {
        if (!recipe.success) {
          return setError("setError:", recipe.data);
        }
        setSingleRecipe(recipe.data.recipe);
<<<<<<< HEAD

=======
>>>>>>> main
        setAllRatings(recipe.data.rating);
      })
      .catch((message) => {
        setError(message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [recipeId]);

  function handleDeleteSingleRecipe() {
    setIsLoading(true);
    deleteSingleRecipe(recipeId)
      // console
      //   .log("deleteRecipe:", recipeId)
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container className="mt-2 p-5">
      <Card>
        <Card.Body>
          <Card.Img
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
            {isOwner() && <DisplayUserRatings recipe={singleRecipe} />}
          </Card.Text>
        </Card.Body>

        <DisplayRatings ratings={allRatings} />
        {/* ///////////////////////////////////CREATE RATING/////////////////////////////////////////////// */}
        {/* <ListGroup variant="flush"> */}
        <ListGroup.Item>
          {!user ||
            (isNotOwner() && (
              <strong>Rate & Comment ! Log in or Sign Up !!!</strong>
            ))}
        </ListGroup.Item>

        <RatingRecipe recipe={singleRecipe} />

        {/* ///////////////////////////////////DISPLAY ALL RATINGS/////////////////////////////////////////////// */}
        {/* </ListGroup> */}
      </Card>

      {isOwner() && (
        <div>
          <EditRecipe recipe={singleRecipe} />
          <div className="btn my-5">
            <Button
              variant="danger"
              onClick={handleDeleteSingleRecipe}
              type="delete"
            >
              Delete Recipe
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
}

export default SingleRecipe;

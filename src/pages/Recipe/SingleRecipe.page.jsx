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
import DisplayUserRating from "../../components/DisplayUserRating";

function SingleRecipe({ user }) {
  console.log("user-----> ", user);
  const { recipeId } = useParams();
  const [singleRecipe, setSingleRecipe] = useState(undefined);
  // console.log("singleRecipe1:", singleRecipe);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = () => Boolean(user);
  const isOwner = () => isLoggedIn() && user._id === singleRecipe?.owner._id;
  const isNotOwner = () => isLoggedIn() && user._id !== singleRecipe?.owner._id;
  const isNotLoggedIn = () => Boolean(!user);
  const navigate = useNavigate();
  const [allRatings, setAllRatings] = useState(undefined);
  const [ratedRecipe, setRatedRecipe] = useState();
  const Rated = () => Boolean(ratedRecipe);

  // console.log("///***isRated:", isRated);
  // console.log("///***recIsRated:", isNotRated);

  useEffect(() => {
    setIsLoading(true);
    getSingleRecipe(recipeId)
      .then((recipe) => {
        console.log("///***Rated:", Rated());
        // console.log("///***isRated:", isRated);
        console.log("recipeId:", recipeId);
        console.log("response.date:", recipe.data);
        if (!recipe.success) {
          return setError("setError:", recipe.data);
        }

        setSingleRecipe(recipe.data.recipe);
        setAllRatings(recipe.data.rating);
        setRatedRecipe(recipe.data.recipeIsRated);

        console.log("*****recipe.data:", recipe.data);
        console.log("*****recipe.data.recipe:", recipe.data.recipe);
        console.log("*****recipe.data.rating:", recipe.data.rating);
        console.log(
          "*****recipe.data.recipeIsRated:",
          recipe.data.recipeIsRated
        );
        // console.log("///***isOk:", isOk());
        // console.log("///***isNotOk:", isNotOk());
        // console.log("-----isLoggedIn:", isLoggedIn());
        // console.log("///***isNotRated:", isNotRated);
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
        </Card.Body>

        {/* ///////////////////////////////////CREATE RATING/////////////////////////////////////////////// */}
        <ListGroup variant="flush">
          <ListGroup.Item>
            {isNotLoggedIn() && (
              <p>
                <strong>Rate & Comment ! Log in or Sign Up !!!</strong>
              </p>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            {(isLoggedIn() || Rated() || isNotOwner()) && (
              <RatingRecipe recipe={singleRecipe} />
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            {isOwner() && <DisplayUserRating recipe={singleRecipe} />}
          </ListGroup.Item>
          {/* ///////////////////////////////////DISPLAY ALL RATINGS/////////////////////////////////////////////// */}
          <ListGroup.Item>
            <DisplayRatings ratings={allRatings} />
          </ListGroup.Item>
        </ListGroup>
      </Card>

      {isOwner() && (
        <div>
          <EditRecipe recipe={singleRecipe} />
          <Button
            variant="danger"
            onClick={handleDeleteSingleRecipe}
            type="delete"
          >
            Delete Recipe
          </Button>
        </div>
      )}
    </Container>
  );
}

export default SingleRecipe;

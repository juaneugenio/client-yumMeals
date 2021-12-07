import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoadingComponent from "../../components/Loading/index";
import { useParams, useNavigate } from "react-router";
import {
  getSingleRecipe,
  deleteSingleRecipe,
} from "../../services/recipeService";
import * as PATHS from "../../utils/paths";

function SingleRecipe() {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const [singleRecipe, setSingleRecipe] = useState(undefined);
  console.log("singleRecipe1:", singleRecipe);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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

  // It comes from RecipeService
  function handleDeleteSingleRecipe() {
    setLoading(true);
    deleteSingleRecipe(recipeId)
      .then((response) => {
        if (!response.success) {
          return setError(response.data);
        }
      })
      .catch((message) => {
        setError(message);
      })
      .finally(() => {
        if (error) {
          return setLoading(false);
        }
        navigate(PATHS.HOME_PAGE);
      });
  }

  if (loading) {
    return <LoadingComponent />;
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
      <button onClick={handleDeleteSingleRecipe} type="delete">
        Delete Recipe
      </button>
    </Container>
  );
}
//in the video, {JSON.stringify(singleRecipe)} was deleted but if i do that, the function doesnt work

export default SingleRecipe;

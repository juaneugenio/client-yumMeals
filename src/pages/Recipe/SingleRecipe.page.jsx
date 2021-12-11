import React, { useEffect, useState } from "react";
import { Card, Container, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
import IsLoadingComponent from "../../components/Loading/index";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getSingleRecipe, deleteSingleRecipe } from "../../services/recipeService";
import * as PATHS from "../../utils/paths";
import EditRecipe from "../../components/EditRecipe";

function SingleRecipe({ user }) {
  console.log("-----> ", user);
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const [singleRecipe, setSingleRecipe] = useState(undefined);
  // console.log("singleRecipe1:", singleRecipe);
  const [error, setError] = useState("");
  const [IsLoading, setIsIsLoading] = useState(true);
  const isLoggedIn = () => Boolean(user);
  const isOwner = () => isLoggedIn() && user._id === singleRecipe?.owner._id;

  useEffect(() => {
    setIsIsLoading(true);
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
        setIsIsLoading(false);
      });
  }, [recipeId]);

  // It comes from RecipeService
  function handleDeleteSingleRecipe() {
    setIsIsLoading(true);
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
          return setIsIsLoading(false);
        }
        navigate(PATHS.HOME_PAGE);
      });
  }

  if (IsLoading) {
    return <IsLoadingComponent />;
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

          {isOwner() && (
            <div className="d-flex mt-3 gap-2">
              <Link key={singleRecipe._id} to={`/recipe/edit/${recipeId}`}>
                <Button variant="primary">Edit Recipe</Button>
              </Link>
              <Button variant="danger" onClick={handleDeleteSingleRecipe} type="delete">
                Delete Recipe
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>

      {isOwner() && <EditRecipe recipe={singleRecipe} />}
    </Container>
  );
}
//in the video, {JSON.stringify(singleRecipe)} was deleted but if i do that, the function doesnt work

export default SingleRecipe;

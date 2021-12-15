import React, { useEffect, useState } from "react";
import { Card, Container, Button, Form } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router";
import {
  getSingleRecipe,
  deleteSingleRecipe,
} from "../../services/recipeService";
import "../Recipe/SingleRecipePage.css";
import { Link } from "react-router-dom";
import EditRecipe from "../../components/EditRecipe";
import RatingRecipe from "../../components/RatingRecipe";
import DisplayRatings from "../../components/DisplayRatings/DisplayRatings";
// import DeleteRecipe from "../../components/DeleteRecipe";
import { useNavigate } from "react-router";
import * as PATHS from "../../utils/paths";

function SingleRecipe({ user }) {
  console.log("user-----> ", user);
  const { recipeId } = useParams();
  const [singleRecipe, setSingleRecipe] = useState(undefined);
  // console.log("singleRecipe1:", singleRecipe);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn = () => Boolean(user);
  const isOwner = () => isLoggedIn() && user._id === singleRecipe?.owner._id;
  // const isRatedd = () => Boolean(isRated);
  const navigate = useNavigate();
  // const [isRated, setIsRated] = useState();
  const [allRatings, setAllRatings] = useState(undefined);
  const [rating, setRating] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getSingleRecipe(recipeId)
      .then((recipe) => {
        console.log("recipeId:", recipeId);
        console.log("response.date:", recipe.data);
        if (!recipe.success) {
          return setError("setError:", recipe.data);
        }
        setSingleRecipe(recipe.data.recipe);
        setAllRatings(recipe.data.rating);
        // setIsRated(recipe.data.isRated);
        console.log("recipe.data.recipe:", recipe.data.recipe);
        console.log("recipe.data.rating:", recipe.data.rating);

        // console.log("recipe.data.isRated:", recipe.data.isRated);
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

  console.log(`HERE?`);

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
          <Card.Text className="h3">Ingredients:</Card.Text>
          <ol className="list-group list-group-numbered">
            {singleRecipe.ingredients.map((ingredient) => (
              <li className="list-group-item">{ingredient}</li>
            ))}
          </ol>
          <Card.Text className="h3">Steps of the recipe:</Card.Text>
          <ol className="list-group list-group-numbered">
            {singleRecipe.stepsRecipe.map((step) => (
              <li className="list-group-item">{step}</li>
            ))}
          </ol>
          <Card.Text className="h3">
            Cooking Time: {singleRecipe.cookingTime}
          </Card.Text>
        </Card.Body>
      </Card>
      {/* ///////////////////////////////////RATING COMPONENT/////////////////////////////////////////////// */}
      <p>
        <strong>
          If you want to rate and comment this recipe, you need to create an
          account
        </strong>
      </p>
      {/* ///////////////////////////////////CREATE RATING/////////////////////////////////////////////// */}
      {user && <RatingRecipe recipe={singleRecipe} />}
      {/* ///////////////////////////////////DISPLAY ALL RATINGS/////////////////////////////////////////////// */}
      <DisplayRatings ratings={allRatings} />
      {/*////////////////////////////EDIT AND DELETE////////////////////////////////////  */}
      {isOwner() && (
        <div className="d-flex mt-3 gap-2">
          <Link key={singleRecipe._id} to={`/recipe/edit/${recipeId}`}>
            <Button variant="primary">Edit Recipe</Button>
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
      {isOwner() && <EditRecipe recipe={singleRecipe} />}
    </Container>
  );
}

export default SingleRecipe;

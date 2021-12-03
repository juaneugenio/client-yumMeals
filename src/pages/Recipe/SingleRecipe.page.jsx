import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSingleRecipe } from "../../services/recipeService";

function SingleRecipe() {
  const { recipeId } = useParams();
  const [singleRecipe, setSingleRecipe] = useState(undefined);
  const [error, setError] = useState("");

  useEffect(() => {
    getSingleRecipe(recipeId)
      .then((recipe) => {
        setTimeout(() => {
          setSingleRecipe(recipe);
        }, 2000); //2s to appear the recipe
      })
      .catch((message) => {
        setError(message);
      });
  }, [recipeId]);

  if (!singleRecipe) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <div>Single Post Id {recipeId} </div>;
}
//in the video, {JSON.stringify(singleRecipe)} was deleted but if i do that, the function doesnt work

export default SingleRecipe;

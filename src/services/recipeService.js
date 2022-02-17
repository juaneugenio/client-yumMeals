import axios from "axios";
import { SERVER_URL } from "../utils/consts";
import { sendUser, getUserToken } from "../utils/userToken";
import { onError, onSuccess } from "../utils/serverResponseHandlers";

const recipeService = axios.create({
  baseURL: `${SERVER_URL}/recipes`,
});

//we use a promise to get all the recipes and we will send it to singleRecipe.page
export function getRecipes() {
  // const authorization = getUserToken();

  return recipeService
    .get("/", {
      headers: {
        authorization: getUserToken(),
      },
    })
    .then(onSuccess("GET RECIPES:"))
    .catch(onError("GET RECIPES:"));
}

export function getSingleRecipe(recipeId) {
  return recipeService
    .get(`/${recipeId}`, sendUser())
    .then(onSuccess("getSingleRecipe"))
    .catch(onError(recipeId));
}

export function createRecipe(formBody) {
  console.log(`Recipe created 👇`, formBody);
  return recipeService
    .post("/create", formBody, sendUser())
    .then(onSuccess("create-recipe"))
    .catch(onError("create-recipe"));
}

// Function to delete a single recipe and to be used in the SingleRecipe.page.
export function deleteSingleRecipe(id) {
  // const authorization = getUserToken();
  console.log("This recipe succesful deleted 👉:", id);
  return recipeService
    .delete(`/${id}`, {
      headers: {
        authorization: getUserToken(),
      },
    })
    .then(onSuccess("deleted-recipe"))
    .catch(onError("deleted-recipe"));
}

// Function to edit/update a singleRecipe and to be used in the SingleRecipe.page
export function updateSingleRecipe(recipeId, formBody) {
  console.log("------>", formBody);
  return recipeService
    .put(`/edit/${recipeId}`, formBody, sendUser())
    .then(onSuccess("updated-recipe"))
    .catch(onError("updated-recipe"));
}

export function createRating(formRate, recipeId) {
  console.log(`body`, { formRate });
  return recipeService
    .post(`/rating/${recipeId}`, { ...formRate }, sendUser())
    .then(onSuccess("create-rating"))
    .catch(onError(formRate));
}

export function UserRecipeRate(recipeId) {
  return recipeService
    .get(`/rating/${recipeId}`, sendUser())
    .then(onSuccess("GET USER RATING"))
    .catch(onError("GET USER RATING"));
}

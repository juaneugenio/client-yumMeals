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
    .then(onSuccess("getRecipes"))
    .catch(onError("getRecipes"));
}

export function getSearchRecipes(search) {
  return recipeService
    .get(`/${search}`)
    .then(onSuccess("getSearchRecipes"))
    .catch(onError(search));
}

export function getSingleRecipe(recipeId) {
  const authorization = getUserToken();
  console.log("authorization:", authorization);
  return recipeService
    .get(`/${recipeId}`, sendUser())
    .then(onSuccess("getSingleRecipe"))
    .catch(onError(recipeId));
}

export function createRecipe(formBody) {
  console.log(`body`, { formBody });
  return recipeService
    .post("/create", formBody, sendUser())
    .then(onSuccess("create-recipe"))
    .catch(onError(formBody));
}
// Function to delete a single recipe and to be used in the SingleRecipe.page.
export function deleteSingleRecipe(id) {
  const authorization = getUserToken();
  console.log("authorization:", authorization);
  return recipeService
    .delete(`/${id}`, {
      headers: {
        authorization: getUserToken(),
      },
    })
    .then(onSuccess("deleted-recipe"))
    .catch(onError("deleted-recipe"));
}

export function createRating(formRate) {
  console.log(`body`, { formRate });
  return recipeService
    .post("/comment", formRate, sendUser())
    .then(onSuccess("create-rating"))
    .catch(onError(formRate));
}
// Funtion to edit/update a singleRecipe and to be used in the SingleRecipe.page

export function updateSingleRecipe() {}

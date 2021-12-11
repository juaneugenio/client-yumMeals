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

export function getSingleRecipe(recipeId) {
  return recipeService
    .get(`/${recipeId}`)
    .then(onSuccess("getSingleRecipe"))
    .catch(onError(recipeId));
}
// export function getRecipeEdit(recipeId) {
//   return recipeService
//     .get(`/${recipeId}`)
//     .then(onSuccess("getRecipeEdit"))
//     .catch(onError(recipeId));
// }
export function createRecipe(formBody) {
  console.log(`Recipe created 👇`, formBody);
  return recipeService
    .post("/create", formBody, sendUser())
    .then(onSuccess("create-recipe"))
    .catch(onError(formBody));
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

<<<<<<< HEAD
export function createRating(formBody) {
  console.log(`body`, { formBody });
  return recipeService
    .post("/comment", formBody, sendUser())
    .then(onSuccess("create-rating"))
    .catch(onError(formBody));
}
// Funtion to edit/update a singleRecipe and to be used in the SingleRecipe.page
=======
// Function to edit/update a singleRecipe and to be used in the SingleRecipe.page

export function updateSingleRecipe(recipeId, formBody) {
  console.log("------>", { formBody });
  return recipeService
    .put(`/${recipeId}`, formBody, sendUser(), {
      headers: {
        authorization: getUserToken(),
      },
    })
    .then(onSuccess("updated-recipe"))
    .catch(onError("updated-recipe"));
}
>>>>>>> juan

// export function updateSingleRecipe(id, formBody) {
//   console.log("Mira el cuerpo de la form->", { formBody });
//   return recipeService
//     .patch(`/${id}/edit`, formBody, sendUser())
//     .then(onSuccess("update-recipe"))
//     .catch(onError("formBody"));
// }

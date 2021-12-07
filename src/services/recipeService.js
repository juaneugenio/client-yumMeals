import axios from "axios";
import { SERVER_URL } from "../utils/consts";
import { sendUser, getUserToken } from "../utils/userToken";
import { onError, onSuccess } from "../utils/serverResponseHandlers";

const recipeService = axios.create({
  baseURL: `${SERVER_URL}/recipes`,
});

//we use a promise to get all the recipes and we will send it to singleRecipe.page
export function getRecipes() {
  const authorization = getUserToken();

  return recipeService
    .get("/", {
      headers: {
        authorization: getUserToken(),
      },
    })
    .then(onSuccess("getRecipes"))
    .catch(onError("getRecipes"));
}

export function getSingleRecipe(id) {
  return recipeService
    .get(`/${id}`)
    .then(onSuccess("getSingleRecipe"))
    .catch(onError(id));
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

import axios from "axios";
import { SERVER_URL } from "../utils/consts";
import { sendUser, getUserToken } from "../utils/userToken";
import { onError, onSuccess } from "../utils/serverResponseHandlers";

const postService = axios.create({
  baseURL: `${SERVER_URL}/recipes`,
});

//we use a promise to get all the recipes and we will send it to singleRecipe.page
export function getRecipes() {
  const authorization = getUserToken();
  console.log("authorization:", authorization);
  return postService
    .get("/", {
      headers: {
        authorization: getUserToken(),
      },
    })
    .then(onSuccess("getRecipes"))
    .catch(onError("getRecipes"));
}

export function getSingleRecipe(recipeId) {
  return postService
    .get(`/${recipeId}`)
    .then(onSuccess("getSingleRecipe"))
    .catch(onError("getSingleRecipe"));
}

export function createRecipe(formBody) {
  console.log(`body`, { formBody });
  return postService
    .post("/create", formBody, sendUser())
    .then(onSuccess("create-recipe"))
    .catch(onError("create-recipe"));
}

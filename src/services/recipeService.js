import axios from "axios";
import { SERVER_URL } from "../utils/consts";
import { sendUser, getUserToken } from "../utils/userToken";
import { onError, onSuccess } from "../utils/serverResponseHandlers";

const recipeService = axios.create({
  baseURL: `${SERVER_URL}/recipes`,
});

//mock data. this array will mimic what the API will return (if we use one)
// const recipes = [
//   {
//     ._id: "ris",
//     title: "Risotto",
//     cuisine: "Italian",
//     timeToPrepare: 60,
//     category: "Main Dishes",
//     cookingTime: 20,
//     level: "Amateur Chef",
//     ingredients: ["Take the rice", "water boil", "blabla"],
//     ratings: 3,
//     image: "../images/risotto.jpeg",
//   },
//   {
//     id: "002",
//     title: "Spaghettis",
//     cuisine: "Italian",
//     timeToPrepare: 60,
//     category: "Main Dishes",
//     cookingTime: 20,
//     level: "Amateur Chef",
//     ingredients: ["Take the rice", "water boil", "don't forget safran"],
//     ratings: 4,
//     image: "../images/spaghettis.jpeg",
//   },
//   {
//     id: "003",
//     title: "Penne tomato sauce",
//     cuisine: "Italian",
//     timeToPrepare: 60,
//     category: "Main Dishes",
//     cookingTime: 20,
//     level: "Amateur Chef",
//     ingredients: ["French fries", "Take the cod", "blabla"],
//     ratings: 5,
//     image: "../images/side-view-penne-pasta-with-tomato-sauce-greens-plate.jpg",
//   },
// ];

//we use a promise to get all the recipes and we will send it to singleRecipe.page
export function getRecipes() {
  const authorization = getUserToken();
  console.log("authorization:", authorization);
  return recipeService
    .get("/", {
      headers: {
        authorization: getUserToken(),
      },
    })
    .then(onSuccess("getRecipes"))
    .catch(onError("getRecipes"));
}

// export function getSingleRecipe(recipeId) {
//   const singleRecipe = recipes.find((element) => element.id === recipeId);

//   if (!singleRecipe) {
//     return Promise.reject("This recipe doesn't exist!");
//   }

//   return Promise.resolve(singleRecipe);
// }

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

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
<<<<<<< HEAD
//     id: "ris",
=======
//     ._id: "ris",
>>>>>>> dev
//     title: "Risotto",
//     cuisine: "Italian",
//     timeToPrepare: 60,
//     category: "Main Dishes",
//     cookingTime: 20,
//     level: "Amateur Chef",
//     ingredients: ["Take the rice", "water boil", "blabla"],
//     ratings: 3,
<<<<<<< HEAD
//     image:
//       "https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fbeta.ctvnews.ca%2Fcontent%2Fdam%2Fctvnews%2Fimages%2F2019%2F11%2F18%2F1_4691731.png%3Fcache_timestamp%3D1574134871525&sp=1636049065T284b1a325bbeb0c2d0ecce8350c81787be51afb65220e512e19c61ef42b6e5e5",
//   },
//   {
//     id: "002",
//     title: "Paella",
//     cuisine: "Spanish",
=======
//     image: "../images/risotto.jpeg",
//   },
//   {
//     id: "002",
//     title: "Spaghettis",
//     cuisine: "Italian",
>>>>>>> dev
//     timeToPrepare: 60,
//     category: "Main Dishes",
//     cookingTime: 20,
//     level: "Amateur Chef",
//     ingredients: ["Take the rice", "water boil", "don't forget safran"],
//     ratings: 4,
<<<<<<< HEAD
//     image: "https://i.ytimg.com/vi/WCcpSyVWMwU/maxresdefault.jpg",
//   },
//   {
//     id: "003",
//     title: "Fish&Chips",
//     cuisine: "British",
=======
//     image: "../images/spaghettis.jpeg",
//   },
//   {
//     id: "003",
//     title: "Penne tomato sauce",
//     cuisine: "Italian",
>>>>>>> dev
//     timeToPrepare: 60,
//     category: "Main Dishes",
//     cookingTime: 20,
//     level: "Amateur Chef",
//     ingredients: ["French fries", "Take the cod", "blabla"],
//     ratings: 5,
<<<<<<< HEAD
//     image:
//       "https://static.wikia.nocookie.net/mrbean/images/4/4b/Mr_beans_holiday_ver2.jpg/revision/latest?cb=20181130033425",
=======
//     image: "../images/side-view-penne-pasta-with-tomato-sauce-greens-plate.jpg",
>>>>>>> dev
//   },
// ];

//we use a promise to get all the recipes and we will send it to singleRecipe.page
export function getRecipes() {
  const authorization = getUserToken();
  console.log("authorization:", authorization);
<<<<<<< HEAD
  return postService
=======
  return recipeService
>>>>>>> dev
    .get("/", {
      headers: {
        authorization: getUserToken(),
      },
    })
    .then(onSuccess("getRecipes"))
    .catch(onError("getRecipes"));
}

<<<<<<< HEAD
export function getSingleRecipe(recipeId) {
  return postService
    .get(`/${recipeId}`)
    .then(onSuccess("getSingleRecipe"))
    .catch(onError("getSingleRecipe"));
}
=======
// export function getSingleRecipe(recipeId) {
//   const singleRecipe = recipes.find((element) => element.id === recipeId);

//   if (!singleRecipe) {
//     return Promise.reject("This recipe doesn't exist!");
//   }

//   return Promise.resolve(singleRecipe);
// }
>>>>>>> dev

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

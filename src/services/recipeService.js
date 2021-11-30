import axios from "axios";
import { SERVER_URL } from "../utils/consts";
import { sendUser, getUserToken } from "../utils/userToken";
import { onError, onSuccess } from "../utils/serverResponseHandlers";

const postService = axios.create({
  baseURL: `${SERVER_URL}/recipes`,
});

//mock data. this array will mimic what the API will return (if we use one)
const recipes = [
  {
    id: "ris",
    title: "Risotto",
    cuisine: "Italian",
    timeToPrepare: 60,
    category: "Main Dishes",
    cookingTime: 20,
    level: "Amateur Chef",
    ingredients: ["Take the rice", "water boil", "blabla"],
    ratings: 3,
    image:
      "https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fbeta.ctvnews.ca%2Fcontent%2Fdam%2Fctvnews%2Fimages%2F2019%2F11%2F18%2F1_4691731.png%3Fcache_timestamp%3D1574134871525&sp=1636049065T284b1a325bbeb0c2d0ecce8350c81787be51afb65220e512e19c61ef42b6e5e5",
  },
  {
    id: "002",
    title: "Paella",
    cuisine: "Spanish",
    timeToPrepare: 60,
    category: "Main Dishes",
    cookingTime: 20,
    level: "Amateur Chef",
    ingredients: ["Take the rice", "water boil", "don't forget safran"],
    ratings: 4,
    image: "https://i.ytimg.com/vi/WCcpSyVWMwU/maxresdefault.jpg",
  },
  {
    id: "003",
    title: "Fish&Chips",
    cuisine: "British",
    timeToPrepare: 60,
    category: "Main Dishes",
    cookingTime: 20,
    level: "Amateur Chef",
    ingredients: ["French fries", "Take the cod", "blabla"],
    ratings: 5,
    image:
      "https://static.wikia.nocookie.net/mrbean/images/4/4b/Mr_beans_holiday_ver2.jpg/revision/latest?cb=20181130033425",
  },
];

//we use a promise to get all the recipes and we will send it to singleRecipe.page
export function getRecipes() {
  return Promise.resolve(recipes);
}

export function getSingleRecipe(recipeId) {
  const singleRecipe = recipes.find((element) => element.id === recipeId);

  if (!singleRecipe) {
    return Promise.reject("This recipe doesn't exist!");
  }

  return Promise.resolve(singleRecipe);
}

export function createRecipe(formBody) {
  console.log(`body`, { formBody });
  return postService
    .post("/create", formBody, sendUser())
    .then(onSuccess("create-recipe"))
    .catch(onError("create-recipe"));
}

const recipes = [
  {
    id: 001,
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
    id: 002,
    title: "Paella",
    cuisine: "Spanish",
    timeToPrepare: 60,
    category: "Main Dishes",
    cookingTime: 20,
    level: "Amateur Chef",
    ingredients: ["Take the rice", "water boil", "blabla"],
    ratings: 4,
    image: "https://i.ytimg.com/vi/WCcpSyVWMwU/maxresdefault.jpg",
  },
  {
    id: 003,
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

export function getRecipes() {
  return recipes;
}

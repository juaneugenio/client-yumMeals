/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecipes } from "../services/recipeService";
import "../App.css";

function HomePage() {
  const [recipes, setRecipes] = useState([]); //when we go to homepage, initialy we dont have any recipes. user travels to this pages but it will be empty

  //calling our mockdata (singlerecipe.page)
  //getRecipe is done in SingleRecipe.page.  using a promise to get the mockdata
  useEffect(() => {
    getRecipes().then((dbRecipes) => {
      setRecipes(dbRecipes);
    });
  }, []);

  return (
    <div className="container-sm">
      {recipes.map((recipe) => (
        <div className="row">
          <div className="col p-3">
            <div className="card-body">
              <Link
                className="btn "
                key={recipe.id}
                to={`/recipe/${recipe.id}`}
              >
                <h1>{recipe.title}</h1>
              </Link>
              <br />
              <img
                className="card-img-top"
                height="100px"
                src={recipe.image}
                alt={recipe.title}
              />
              <br />
              <h2>Steps to prepare the recipe</h2>
              <ol className="list-group list-group-numbered">
                {recipe.ingredients.map((step) => (
                  <li className="list-group-item">{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;

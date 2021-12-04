/** @format */
import { Card, Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecipes } from "../services/recipeService";
import "../App.css";
// import { Card, Container } from "react-bootstrap";

function HomePage() {
  const [recipes, setRecipes] = useState([]); //when we go to homepage, initialy we dont have any recipes. user travels to this pages but it will be empty

  //calling our mockdata (singlerecipe.page)
  //getRecipe is done in SingleRecipe.page.  using a promise to get the mockdata
  // useEffect(() => {
  // 	getRecipes().then((dbRecipes) => {;
  // 	setRecipes(dbRecipes);
  // });
  // }, []);

  useEffect(() => {
    getRecipes().then((dbRecipes) => {
      if (!dbRecipes.success) {
        return console.log(dbRecipes.data);
      }
      console.log(dbRecipes);
      setRecipes(dbRecipes.data.recipes);
    });
  }, []);

  return (
    <div>
      {recipes.map((recipe) => (
        <Card className="p-3" style={{ width: "18rem" }}>
          <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
          <Card.Body>
            <Card.Title>
              <Card.Link key={recipe._id} href={`/recipe/${recipe._id}`}>
                {recipe.title}
              </Card.Link>
            </Card.Title>
            <br />
            {/* <h2>Steps to prepare the recipe</h2>
				<ol className="list-group list-group-numbered">{recipe.ingredients.map((step) => (
					<li className="list-group-item">{step}</li>
				))}</ol> */}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default HomePage;

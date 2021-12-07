/** @format */
import { Card, Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecipes } from "../services/recipeService";
import "../App.css";

function HomePage() {
  const [recipes, setRecipes] = useState([]); //when we go to homepage, initialy we dont have any recipes. user travels to this pages but it will be empty

  // const [recipes, setRecipes] = useState([]);

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
    <Container>
      {recipes.map((recipe) => (
        <Link to={`/recipe/${recipe._id}`}>
          <Card className="p-3 m-3" style={{ width: "600px" }}>
            <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
            <Card.Body>
              <Card.Title>
                <Card key={recipe._id}>{recipe.title}</Card>
              </Card.Title>
              <br />
              {/* <h2>Steps to prepare the recipe</h2>
				<ol className="list-group list-group-numbered">{recipe.ingredients.map((step) => (
					<li className="list-group-item">{step}</li>
				))}</ol> */}
            </Card.Body>
          </Card>
        </Link>
      ))}
    </Container>
  );
}

export default HomePage;

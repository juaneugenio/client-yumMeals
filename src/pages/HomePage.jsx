/** @format */
import { Card, Button, Row, Container, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { getRecipes } from "../services/recipeService";

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
      <Container>
        <Row className="py-3">
          <Col className="row justify-content-center">
            {recipes.map((recipe) => (
              <Card className="my-4 mx-3" style={{ width: "23rem" }}>
                <Card.Img variant="top" src={recipe.imageRecipe} alt={recipe.title} />
                <Card.Body>
                  <Card.Title>
                    <Card.Title className="text-uppercase">
                      <b>{recipe.title}</b>
                    </Card.Title>
                    <Card.Text className="font-weight-light text-secondary h6 mt-1">
                      Category:
                      {recipe.category}
                    </Card.Text>
                    <Card.Link key={recipe._id} href={`/recipe/${recipe._id}`}>
                      <Button variant="outline-secondary mt-4">View Recipe</Button>
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
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;

/** @format */
import { Card, Button, Row, Container, Col, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { getRecipes } from "../services/recipeService";
import { FaStar } from "react-icons/fa";
import "./HomePage.css";

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
    // <div>
    //   <Container fluid className="pt-5">
    //     <Row className="mt-5"></Row>
    //     <Row xs={1} md={2} lg={3} className=" mr-2 mt-3">
    //       {recipes.map((recipe) => (
    //         <Col className="row justify-content-center">
    //           <Card className=" row mt-3">
    //             <Card.Img variant="top" src={recipe.imageRecipe} alt={recipe.title} />
    //             <Card.Body>
    //               <Card.Title>
    //                 <Card.Title className="text-uppercase">
    //                   <b>{recipe.title}</b>
    //                 </Card.Title>
    //                 <Card.Text className="font-weight-light text-secondary h6 mt-1">
    //                   Category:
    //                   {recipe.category}
    //                 </Card.Text>
    //                 <Card.Link key={recipe._id} href={`/recipe/${recipe._id}`}>
    //                   <Button variant="outline-secondary mt-4">View Recipe</Button>
    //                 </Card.Link>
    //               </Card.Title>
    //               <br />
    //               {/* <h2>Steps to prepare the recipe</h2>
    // 		<ol className="list-group list-group-numbered">{recipe.ingredients.map((step) => (
    // 			<li className="list-group-item">{step}</li>
    // 		))}</ol> */}
    //             </Card.Body>
    //           </Card>
    //         </Col>
    //       ))}
    //     </Row>
    //   </Container>
    // </div>

    <div>
      <Container>
        <Row className="wrapper"></Row>
        <Row xs={1} md={2} lg={3}>
          {recipes.map((recipe) => (
            <Col>
              <Card className=" card-container">
                <Row className="img-recipe-card">
                  <Card.Img
                    className="photo-recipe"
                    variant="top"
                    src={recipe.imageRecipe}
                    alt={recipe.title}
                  />
                </Row>
                <Card.Body>
                  <Card.Title>
                    <b>{recipe.title}</b>{" "}
                  </Card.Title>
                  <hr />
                  <Card.Subtitle
                    style={{ fontSize: 14 }}
                    className="mb-2 text-muted"
                  >
                    Category: {recipe.category} <br />
                    Cooking Time: {recipe.cookingTime} <br />
                    <Form>
                      <Form.Group>
                        {[...Array(5)].map((star, i) => {
                          const ratingValue = i + 1;
                          let rating = 3;

                          return (
                            <Form.Label>
                              <input
                                type="radio"
                                readOnly
                                name="Rating"
                                value={ratingValue}
                              />
                              <FaStar
                                className="star"
                                color={
                                  ratingValue <= rating ? "#ffc107" : "#e4e5e9"
                                }
                                size={20}
                              />
                            </Form.Label>
                          );
                        })}
                      </Form.Group>
                    </Form>
                  </Card.Subtitle>
                </Card.Body>
                <Card.Footer className=" img-footer">
                  <Button
                    className="readmore-btn"
                    key={recipe._id}
                    href={`/recipe/${recipe._id}`}
                  >
                    Read More
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Row className="wrapper"></Row>
    </div>
  );
}

export default HomePage;

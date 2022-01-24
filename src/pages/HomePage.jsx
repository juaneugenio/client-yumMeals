/** @format */
import { Card, Button, Row, Container, Col, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { getRecipes } from "../services/recipeService";
import { FaStar } from "react-icons/fa";
import "./HomePage.css";

function HomePage({ user }) {
  const [recipes, setRecipes] = useState([]); //when we go to homepage, initialy we dont have any recipes. user travels to this pages but it will be empty

  useEffect(() => {
    getRecipes().then((dbRecipes) => {
      if (!dbRecipes.success) {
        return console.log("GET RECIPES:", dbRecipes.data);
      }
      console.log("GET RECIPES:", dbRecipes);
      setRecipes(dbRecipes.data.recipes);
      console.log("USER:", user);
    });
  }, []);

  return (
    <div>
      <Container>
        {user && <Row className="wrapper">Hello {user.username} !</Row>}
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

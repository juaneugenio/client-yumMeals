/** @format */
import { Card, Button, Row, Container, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { getRecipes } from "../services/recipeService";
import "./HomePage.css";
import DisplayUserRatings from "../components/DisplayUserRating";

function HomePage() {
	const [recipes, setRecipes] = useState([]); //when we go to homepage, initialy we dont have any recipes. user travels to this pages but it will be empty

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
			<Container className="grid__container">
				<Row xs={1} md={2} lg={3}>
					<Col>
						{recipes.map((recipe) => (
							<Card className=" card-container" key={recipe._id}>
								<Row className="img-recipe-card">
									<Card.Img className="photo-recipe" variant="top" src={recipe.imageRecipe} alt={recipe.title} />
								</Row>
								<Card.Body>
									<Card.Title>
										<b>{recipe.title}</b>
										<DisplayUserRatings recipe={recipe} />
									</Card.Title>
									<hr />
									<Card.Subtitle style={{ fontSize: 14 }} className="mb-2 text-muted">
										Category: {recipe.category} <br />
										Cooking Time: {recipe.cookingTime} <br />
									</Card.Subtitle>
								</Card.Body>
								<Card.Footer className=" img-footer">
									<Button className="readmore-btn" href={`/recipe/${recipe._id}`}>
										Read More
									</Button>
								</Card.Footer>
							</Card>
						))}
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default HomePage;

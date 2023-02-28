/** @format */
import { Card, Button, Row, Container, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { getRecipes } from "../services/recipeService";
import "./HomePage.css";
// import DisplayUserRatings from "../components/DisplayUserRating";
// import DisplayRatings from "../components/DisplayRatings/DisplayRatings";

function HomePage() {
	const [recipes, setRecipes] = useState([]); //when we go to homepage, initialy we dont have any recipes. user travels to this pages but it will be empty
	const [ratings, setRatings] = useState([]);

	useEffect(() => {
		getRecipes().then((dbRecipes) => {
			if (!dbRecipes.success) {
				console.log("Unsuccesful response getting recipes");
				return;
			}
			// console.log(dbRecipes);
			setRecipes(dbRecipes.data.recipes);
			setRatings(dbRecipes.data.ratings);
		});
	}, []);

	// function averageRatings(ratings) {
	// 	const rating = ratings.reduce((a, b) => a + b);
	// 	console.log("%c ▶︎▶︎ -28-「HomePage」", "font-size:13px; background:#993441; color:#ffb8b1;", rating);
	// }
	// averageRatings(ratings);

	return (
		<div>
			<Container className="grid__container">
				<Row xs={1} md={2} lg={3}>
					{recipes.map((recipe) => (
						<Col key={recipe._id}>
							<Card className=" card-container">
								<Row className="img-recipe-card">
									<Card.Img className="photo-recipe" variant="top" src={recipe.imageRecipe} alt={recipe.title} />
								</Row>
								<Card.Body>
									<Card.Title>
										<b>{recipe.title}</b>
										{ratings.map((rating) => (
											<p key={rating._id}>{rating.rating}</p>
										))}
										{/* <DisplayUserRatings recipes={recipes} /> */}
										{/* <DisplayRatings /> */}
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
						</Col>
					))}
				</Row>
			</Container>
		</div>
	);
}

export default HomePage;

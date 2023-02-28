/** @format */
import "./HomePage.css";
import { Card, Button, Row, Container, Col } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { getRecipes } from "../services/recipeService";

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
	//Converting the array of ratings to numbers and calculating the average
	const ratingArra = ratings.map((rating) => parseInt(rating.rating));
	const ratingAverage = ratingArra.reduce((a, b) => a + b, 0) / ratingArra.length;

	const ratingStars = [...Array(5)].map((star, i) => {
		const ratingValue = i + 1;
		return (
			<div key={i}>
				<input type="radio" readOnly name="Rating" value={ratingValue} />
				<FaStar className="star" color={ratingValue <= ratingAverage ? "#ffc107" : "#e4e5e9"} size={15} />
			</div>
		);
	});
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
									</Card.Title>
									<hr />
									<Card.Subtitle style={{ fontSize: 16 }} className="mb-1 text-muted star__row">
										Rating: {ratingStars}
									</Card.Subtitle>
									<Card.Subtitle style={{ fontSize: 16 }} className="mb-2 text-muted">
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

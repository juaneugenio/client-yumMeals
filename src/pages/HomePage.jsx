/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecipes } from "../services/recipeService";
import "../App.css";

function HomePage() {
	const [recipes, setRecipes] = useState([])
	useEffect(() => {
		getRecipes().then((dbRecipes) => {;
		setRecipes(dbRecipes);
	});
	}, []);
	return (<div>
		{recipes.map((recipe) => (
			
			<div>
				<Link key={recipe.id} to={`/recipe/${recipe.id}`} >				
				<h1>{recipe.title}</h1>
				</Link>
				<br />
				<img height= "100px" src={recipe.image} alt={recipe.title} />
				<br />
				<h2>Steps to prepare the recipe</h2>
				<ol>{recipe.ingredients.map((step) => (
					<li>{step}</li>
				))}</ol>
			</div>
		))}
	</div>
	);
		}

export default HomePage;
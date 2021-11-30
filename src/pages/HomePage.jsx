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
		getRecipes().then((dbRecipes) => {;
		setRecipes(dbRecipes);
	});
	}, []);

	return (<div class="container-sm">
		{recipes.map((recipe) => (
			<div class="row">
			<div class="col p-3">
				<div class="card-body">
				<Link class="btn " key={recipe.id} to={`/recipe/${recipe.id}`} >				
				<h1>{recipe.title}</h1>
				</Link>
				<br />
				<img class="card-img-top" height= "100px" src={recipe.image} alt={recipe.title} />
				<br />
				<h2>Steps to prepare the recipe</h2>
				<ol class="list-group list-group-numbered">{recipe.ingredients.map((step) => (
					<li class="list-group-item">{step}</li>
				))}</ol>
				</div>
			</div>
			</div>
		))}
	</div>
	);
		}

export default HomePage;
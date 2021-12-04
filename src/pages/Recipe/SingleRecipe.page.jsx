import React,{useEffect, useState} from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import {getSingleRecipe} from "../../services/recipeService";


function SingleRecipe() {
    const { recipeId } = useParams();
    const [singleRecipe, setSingleRecipe] = useState(undefined);
    console.log("singleRecipe1:", singleRecipe);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        setLoading(true)
        getSingleRecipe(recipeId)
        .then((recipe) =>{
            if (!recipe.success) {
                return setError("setError:",recipe.data)
            }
        //    setTimeout(()=>{
            setSingleRecipe (recipe.data.recipe);
            console.log("recipe.data:",recipe.data)
            // setLoading(false);
        //    }, 2000); //2s to appear the recipe
        })
        .catch((message)=>{setError(message);
        })
        .finally(() => {
            setLoading(false);
          });
    },[recipeId]);

    if (loading) {
        return <div>Loading...</div>
    }

    if (error){
        return <div>{error}</div>
    }

return <Container>
    <Card>
        <Card.Body>
            <Card.Text className="h1">{singleRecipe.title}</Card.Text>
            <Card.Subtitle>by {singleRecipe.owner.username}</Card.Subtitle>
            <Card.Text>Category: {singleRecipe.category}</Card.Text>
            <Card.Text className="h3">Steps of the recipe:</Card.Text>
            <ol className="list-group list-group-numbered">
                {singleRecipe.ingredients.map((step) => (
					<li className="list-group-item">{step}</li>
				))}</ol>
        </Card.Body>

    </Card>
    
    </Container>;
}
    //in the video, {JSON.stringify(singleRecipe)} was deleted but if i do that, the function doesnt work

export default SingleRecipe;

import React,{useEffect, useState} from "react";
import { useParams } from "react-router";
import {getSingleRecipe} from "../../services/recipeService";


function SingleRecipe() {
    const { recipeId } = useParams();
    const [singleRecipe, setSingleRecipe] = useState(undefined);
    const [error, setError] = useState("");
    
    useEffect(()=>{
        getSingleRecipe(recipeId).then((recipe) =>{
           setSingleRecipe(recipe); 
        }).catch((message)=>{setError(message);
        });
    },[recipeId]);
if (error){
    return <div>{error}</div>
}
    return <div>Single Post Id {recipeId}{JSON.stringify(singleRecipe)}</div>;
};

export default SingleRecipe;

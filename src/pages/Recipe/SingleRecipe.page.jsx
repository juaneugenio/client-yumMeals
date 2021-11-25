import React from "react";
import { useParams } from "react-router";

function SingleRecipe() {
    const { recipeId } = useParams();
    return <div>Single Post Id {recipeId} gg</div>;
}

export default SingleRecipe;

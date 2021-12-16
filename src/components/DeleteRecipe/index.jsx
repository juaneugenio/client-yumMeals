// import React, { useState } from "react";
// import { deleteSingleRecipe } from "../../services/recipeService";
// import { useNavigate } from "react-router";
// import * as PATHS from "../../utils/paths";

// function DeleteRecipe({ recipe }) {
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState();
//   const navigate = useNavigate();

//   setIsLoading(true);
//   deleteSingleRecipe(recipe._id);
//   console
//     .log("deleteRecipe:", recipe._id)
//     .then((response) => {
//       if (!response.success) {
//         return setError(response.data);
//       }
//       navigate(PATHS.HOME_PAGE);
//     })
//     .catch((message) => {
//       setError(message);
//     })
//     .finally(() => {
//       if (error) {
//         return setIsLoading(false);
//       }
//       navigate(PATHS.HOME_PAGE);
//     });
// }

// export default DeleteRecipe;

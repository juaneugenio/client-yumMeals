import { useState } from "react";
import { useNavigate } from "react-router";
import LoadingComponent from "../../components/Loading/index";
// import { createRecipe } from "../../services/recipeService";
import { createRecipe } from "../../services/recipeService";
import * as PATHS from "../../utils/paths";

function CreateRecipe() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  // const [chosenPicture, setChosenPicture] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // function handleFileInput(event) {
  //   const imageFromInput = event.target.files[0];

  //   setChosenPicture(imageFromInput);
  // }

  function handleNormalInput(event) {
    setTitle(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(false);

    // if (!chosenPicture) {
    //   setError("You must select a picture to upload! You fool! 👀");
    //   setIsLoading(false);
    //   return;
    // }

    const formBody = new FormData();
    formBody.append("title", title);
    // formBody.append("juanPostPic", chosenPicture);

    createRecipe({ title }).then((res) => {
      if (!res.success) {
        return setError(res.data);
      }
      navigate(PATHS.HOME_PAGE);
    });
  }

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error && <h1>{error}</h1>}
        {/* <input className="inputFile" type="file" onChange={handleFileInput} /> */}
        {/* //make sure we change className when we work on the CSS */}
        {/* <input className="inputFile" type="text"/>   */}
        {/* <input type="number" /> */}
        <br />
        <label>
          {" "}
          Title of your Recipe:
          <input
            value={title}
            onChange={handleNormalInput}
            type="text"
            placeholder="Tell us more!"
          />
        </label>
        <button type="submit">Submit"</button>
      </form>
    </div>
  );
}

export default CreateRecipe;

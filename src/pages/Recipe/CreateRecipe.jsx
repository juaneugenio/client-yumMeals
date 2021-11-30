import { useState } from "react";
import { useNavigate } from "react-router";
import LoadingComponent from "../../components/Loading/index";
import { createRecipe } from "../../services/recipeService";
import * as PATHS from "../../utils/paths";

function CreateRecipe() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    category: "",
    ingredients: "",
    stepsRecipe: ""
  });
  console.log("FORM:", form)
const {title, category, ingredients, stepsRecipe} = form;

  // const [chosenPicture, setChosenPicture] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // function handleFileInput(event) {
  //   const imageFromInput = event.target.files[0];

  //   setChosenPicture(imageFromInput);
  // }

  function handleNormalInput(event) {
    console.log(event.target.name)
    setForm(event.target.value);
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
    formBody.append("category", category);
    formBody.append("ingredients", ingredients);
    formBody.append("stepsRecipe", stepsRecipe);

    // formBody.append("juanPostPic", chosenPicture);

    createRecipe({ title,  category, ingredients, stepsRecipe}).then((res) => {
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
        <fieldset>
        <legend>Create your Recipe</legend>
        <label>
          Title of your Recipe*:
          <input
            value={title}
            onChange={handleNormalInput}
            type="text"
            placeholder="Tell us more!"
            name="title"
          />
        </label>
        <br />
        <label>
          {" "}
          Category of your recipe:
          <input
            value={category}
            onChange={handleNormalInput}
            type="text"
            placeholder="breakfast, lunch, dinner, snack, appetizer"
            name="category"
          />
        </label>
        <br />
        <label>
          {" "}
          Ingredients of your recipe*:
          <input
            value={ingredients}
            onChange={handleNormalInput}
            type="text"
            placeholder="butter, beef, carrot,..."
            name="ingredients"
          />
        </label>
        <br />
        <label>
          {" "}
          Steps of your recipe*:
          <input
            value={stepsRecipe}
            onChange={handleNormalInput}
            type="text"
            placeholder="First, you need to boil the carrots"
            name="stepsRecipe"
          />
        </label>
        <br />
        <button type="submit">Submit</button>
        </fieldset>
      </form>
    </div>
  );
}

export default CreateRecipe;

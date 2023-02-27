/** @format */

import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { Card, Container, Form, Button } from "react-bootstrap";
=======
import { Card, Container, Button, ListGroup } from "react-bootstrap";
>>>>>>> 8543e9921ce0648980562543215a9727f27d8c3b
import { useParams, useNavigate } from "react-router";
import * as PATHS from "../../utils/paths";
import { getSingleRecipe, deleteSingleRecipe } from "../../services/recipeService";
import "../Recipe/SingleRecipePage.css";
import EditRecipe from "../../components/EditRecipe";
import RatingRecipe from "../../components/RatingRecipe";
import DisplayRatings from "../../components/DisplayRatings/DisplayRatings";
import DisplayUserRatings from "../../components/DisplayUserRating/index";

function SingleRecipe({ user }) {
	const { recipeId } = useParams();
	const [singleRecipe, setSingleRecipe] = useState(undefined);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(true);

<<<<<<< HEAD
function SingleRecipe() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [singleRecipe, setSingleRecipe] = useState(undefined);
  console.log("singleRecipe1:", singleRecipe);
  const [error, setError] = useState("");
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getSingleRecipe(recipeId)
      .then((recipe) => {
        if (!recipe.success) {
          return setError("setError:", recipe.data);
        }
=======
	const isLoggedIn = () => Boolean(user);
	const isOwner = () => isLoggedIn() && user._id === singleRecipe?.owner._id;
	const isNotOwner = () => isLoggedIn() && user._id !== singleRecipe?.owner._id;
	const navigate = useNavigate();
	const [allRatings, setAllRatings] = useState(undefined);

	useEffect(() => {
		setIsLoading(true);
		getSingleRecipe(recipeId)
			.then((recipe) => {
				if (!recipe.success) {
					return setError("setError:", recipe.data);
				}
				setSingleRecipe(recipe.data.recipe);
>>>>>>> 8543e9921ce0648980562543215a9727f27d8c3b

				setAllRatings(recipe.data.rating);
			})
			.catch((message) => {
				setError(message);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [recipeId]);

	function handleDeleteSingleRecipe() {
		setIsLoading(true);
		deleteSingleRecipe(recipeId)
			// console
			//   .log("deleteRecipe:", recipeId)
			.then((response) => {
				if (!response.success) {
					return setError(response.data);
				}
				navigate(PATHS.HOME_PAGE);
			})
			.catch((message) => {
				setError(message);
			})
			.finally(() => {
				if (error) {
					return setIsLoading(false);
				}
				navigate(PATHS.HOME_PAGE);
			});
	}

<<<<<<< HEAD
  //CREATE THE RATING COMPONENT
  //FIRST THE CONST
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [form, setForm] = useState({
    userRating: "",
    comment: "",
  });
  const { userRating, comment } = form;

  //IN THE SUBMIT EVENT WE PUT THE RATING FUNCTION
  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(false);
    //THIS FUNCTION COMES FROM THE RECIPE SERVICE
    createRating({ userRating, comment, recipeId }).then((res) => {
      console.log("RES:", res);
      if (!res.success) {
        return setError(res.data);
      }
      navigate(PATHS.HOME_PAGE);
    });
  }

  // It comes from RecipeService
  function handleDeleteSingleRecipe() {
    setLoading(true);
    deleteSingleRecipe(recipeId)
      .then((response) => {
        if (!response.success) {
          return setError(response.data);
        }
        navigate(PATHS.HOME_PAGE);
      })
      .catch((message) => {
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (Loading) {
    return <div>Loading...</div>;
  }
=======
	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<Container className="mt-2 p-5">
			<Card>
				<Card.Body>
					<Card.Img height={"500px"} src={singleRecipe.imageRecipe} alt={`${singleRecipe.title}'s meal`} />
					<Card.Text className="h1 mt-0 text-uppercase">{singleRecipe.title}</Card.Text>
					<Card.Subtitle className="mx-4 pt-1 text-secondary blockquote-footer">
						by {singleRecipe.owner.username}
					</Card.Subtitle>
					<Card.Text className="h6 mt-4">
						<b>Category:</b>
					</Card.Text>
					<Card.Subtitle className="text-secondary">{singleRecipe.category}</Card.Subtitle>
					<Card.Text className="h6 mt-4">
						<b>Cooking time </b>🕒:
					</Card.Text>
					<Card.Subtitle className="text-secondary">{singleRecipe.cookingTime}</Card.Subtitle>
					<Card.Text className="h6 mt-4">
						<b>Ingredients:</b>
					</Card.Text>
					<Card.Subtitle>
						<ol className="list-group list-group-numbered">
							{singleRecipe.ingredients.map((ingredient) => (
								<li className="list-group-item  text-secondary">{ingredient}</li>
							))}
						</ol>
					</Card.Subtitle>
					<Card.Text className="h6 mt-4">
						<b>Steps to follow:</b>
					</Card.Text>
					<ol className="list-group list-group-numbered">
						{singleRecipe.stepsRecipe.map((step) => (
							<li className="list-group-item  text-secondary">{step}</li>
						))}
					</ol>
					<Card.Text className="h6 mt-4">
						<b>Rating:</b>
						{isOwner() && <DisplayUserRatings recipe={singleRecipe} />}
					</Card.Text>
				</Card.Body>
>>>>>>> 8543e9921ce0648980562543215a9727f27d8c3b

				<DisplayRatings ratings={allRatings} />
				{/* ///////////////////////////////////CREATE RATING/////////////////////////////////////////////// */}
				{/* <ListGroup variant="flush"> */}
				<ListGroup.Item>
					{!user || (isNotOwner() && <strong>Rate & Comment ! Log in or Sign Up !!!</strong>)}
				</ListGroup.Item>

<<<<<<< HEAD
  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Text className="h1">{singleRecipe.title}</Card.Text>
          <Card.Subtitle>by {singleRecipe.owner.username}</Card.Subtitle>
          <Card.Text>Category: {singleRecipe.category}</Card.Text>
          <Card.Text className="h3">Steps of the recipe:</Card.Text>
          <ol className="list-group list-group-numbered">
            {singleRecipe.ingredients.map((step) => (
              <li className="list-group-item">{step}</li>
            ))}
          </ol>
        </Card.Body>
        <button onClick={handleDeleteSingleRecipe} type="delete">
          Delete Recipe
        </button>

        <Form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Please rate this recipe if you already did it !</legend>
            <Form.Group>
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <Form.Label>
                    <input
                      type="radio"
                      name="userRating"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                      onChange={handleNormalInput}
                    />
                    <FaStar
                      className="star"
                      color={
                        ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                      }
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                      size={20}
                    />
                  </Form.Label>
                );
              })}
            </Form.Group>

            <Form.Group>
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                name="comment"
                value={comment}
                onChange={handleNormalInput}
                placeholder="Write your comment about the recipe"
              />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </fieldset>
        </Form>
      </Card>
    </Container>
  );
=======
				<RatingRecipe recipe={singleRecipe} />

				{/* ///////////////////////////////////DISPLAY ALL RATINGS/////////////////////////////////////////////// */}
				{/* </ListGroup> */}
			</Card>

			{isOwner() && (
				<div>
					<EditRecipe recipe={singleRecipe} />
					<div className="btn my-5">
						<Button variant="danger" onClick={handleDeleteSingleRecipe} type="delete">
							Delete Recipe
						</Button>
					</div>
				</div>
			)}
		</Container>
	);
>>>>>>> 8543e9921ce0648980562543215a9727f27d8c3b
}

export default SingleRecipe;

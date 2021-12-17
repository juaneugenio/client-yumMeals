import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { createRating } from "../../services/recipeService";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import * as PATHS from "../../utils/paths";
import "./index.css";

function RatingRecipe({ recipe }) {
  console.log("RatingRecipe recipe:", recipe);
  console.log("RatingRecipe recipe._id:", recipe._id);

  const navigate = useNavigate();
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    userRating: "",
    comment: "",
  });
  const { userRating, comment } = form;

  //HANDLE UPDATE INPUT
  function handleNormalInput(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  //IN THE SUBMIT EVENT WE PUT THE RATING FUNCTION
  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(false);

    //THIS FUNCTION COMES FROM THE RECIPE SERVICE
    createRating({ userRating, comment }, recipe._id).then((res) => {
      console.log("RES:", res);
      if (!res.success) {
        return setError(res.data);
      }
      console.log("recipe._id", recipe._id);
      navigate(PATHS.HOME_PAGE);
    });
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <fieldset>
          <legend className="rating-reminder">
            Remember to rate the recipe if you have not done it yet!{" "}
          </legend>
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
    </div>
  );
}

export default RatingRecipe;

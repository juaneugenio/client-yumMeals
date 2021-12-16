import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Form, Card } from "react-bootstrap";
import { UserRecipeRating } from "../../services/recipeService";

function DisplayUserRatings({ recipe }) {
  const [userRating, setUserRating] = useState(null);
  const [userComment, setUserComment] = useState(null);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState(null);
  console.log("DisplayUserRatings recipeId:", recipe);

  useEffect(() => {
    setIsLoading(true);
    UserRecipeRating(recipe._id)
      .then((response) => {
        console.log("RESPONSE DATA:", response.data);
        // console.log(
        //   "RESPONSE DATA.oneRating.rating:",
        //   response.data.oneRating[0]?.rating
        // );
        if (!response.success) {
          return setError("setError:", response.data);
        }

        //  return;

        console.log(response);

        if (!response.data.oneRating.length) {
          setUserRating(null);
          setUserComment("");
        } else {
          setUserRating(response.data.oneRating[0]?.rating);
          setUserComment(response.data.oneRating[0]?.comment);
        }
      })
      .catch((message) => {
        setError(message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [recipe._id]);

  console.log(userRating, userComment);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>{error}</div>;
  }

  return (
    <div>
      <legend>Your Rating & Comment </legend>
      <div className="row-sm-3">
        <div className="col-sm-3">
          <Card>
            <Card.Body>
              <Form>
                <Form.Group>
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;

                    return (
                      <Form.Label>
                        <input
                          type="radio"
                          readOnly
                          name="userRating"
                          value={userRating}
                        />
                        <FaStar
                          className="star"
                          color={
                            ratingValue <= userRating ? "#ffc107" : "#e4e5e9"
                          }
                          size={20}
                        />
                      </Form.Label>
                    );
                  })}
                  <Card.Text className="h3">{userComment}</Card.Text>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DisplayUserRatings;

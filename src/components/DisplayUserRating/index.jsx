import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Form, Card } from "react-bootstrap";
import { UserRecipeRating } from "../../services/recipeService";

function DisplayUserRatings(recipeId) {
  const [userRating, setUserRating] = useState(null);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState(null);
  console.log("DisplayUserRatings recipeId:", recipeId);

  useEffect(() => {
    setIsLoading(true);
    UserRecipeRating(recipeId)
      .then((response) => {
        if (!response.success) {
          return setError("setError:", response.data);
        }
        setUserRating(response.data);
      })
      .catch((message) => {
        setError(message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [recipeId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* {/* <legend>All Ratings & Comments</legend> */}
      <div className="row-sm-3">
        <div className="col-sm-3">
          <Card>
            <Card.Title>by {}</Card.Title>
            <Card.Body>
              <Form>
                <Form.Group>
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    {
                      /* let rating = oneRating.rating; */
                    }

                    return (
                      <Form.Label>
                        <input type="radio" readOnly name="Rating" value="" />
                        <FaStar
                          className="star"
                          // color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                          size={20}
                        />
                      </Form.Label>
                    );
                  })}
                  <Card.Text className="h3">Comment</Card.Text>
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

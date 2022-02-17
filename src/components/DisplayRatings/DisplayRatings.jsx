import React from "react";
import { FaStar } from "react-icons/fa";
import { Form, Card } from "react-bootstrap";

//**** DISPLAY ALL RATINGS FOR A RECIPE*/
function DisplayRatings({ ratings }) {
  // console.log("DisplayRatings recipe:", recipe);
  console.log("DisplayRatings allRatings:", ratings);

  // const [rating, setRating] = useState(null);
  // const [isLoading, setIsLoading] = useState();
  // const [error, setError] = useState(null);

  // ratings.map((oneRating) => {
  //   console.log("oneRating:", oneRating);
  //   setRating(oneRating.rating);
  // });

  return (
    <div>
      <legend>All Ratings & Comments</legend>
      {ratings.map((oneRating) => (
        <div className="row-sm-3">
          <div className="col-sm-3">
            <Card>
              <Card.Title>by {oneRating.rater.username}</Card.Title>
              <Card.Body>
                <Form>
                  <Form.Group>
                    {[...Array(5)].map((star, i) => {
                      const ratingValue = i + 1;
                      let rating = oneRating.rating;

                      return (
                        <Form.Label>
                          <input
                            type="radio"
                            readOnly
                            name="Rating"
                            value={ratingValue}
                          />
                          <FaStar
                            className="star"
                            color={
                              ratingValue <= rating ? "#ffc107" : "#e4e5e9"
                            }
                            size={20}
                          />
                        </Form.Label>
                      );
                    })}
                    <Card.Text className="h3">{oneRating.comment}</Card.Text>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DisplayRatings;

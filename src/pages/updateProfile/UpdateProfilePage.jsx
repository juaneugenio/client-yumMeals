import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  updateProfileImage,
  deleteUser,
  updatingUserName,
} from "../../services/userService";
import * as PATHS from "../../utils/paths";
import "./UpdateProfilePage.css";
import { Container, Button, Row, Form, Col } from "react-bootstrap";

export default function UpdateProfile(props) {
  const { user, setUser } = props;
  const [chosenPicture, setChosenPicture] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [inputKey, setInputKey] = useState("");
  const navigate = useNavigate();

  //First thing we always do before creating a form is prevent the default behaviour
  function handleFromSubmit(event) {
    event.preventDefault();
    setError(false); //we want the teal message to disappear"

    if (!chosenPicture) {
      setError("Don't forget to choose your profile image!");
      return;
    }
    //lets create a new form body because we are upIsLoading files.
    //FormData: It provides a way to easily construct a set of key/value representing the form fields and their values
    const formBody = new window.FormData();
    formBody.append("profileImage", chosenPicture); //profileImage  comes from index router.post
    formBody.append("userId", user._id);

    //the end point comes from index and we send the formBody
    updateProfileImage(formBody).then((res) => {
      if (!res.success) {
        setError("Double Check");
        return;
      }
      setUser({ ...user, profileImage: res.data.profileImage });
      setInputKey(Date.now());
    });
  }

  function handleInputChange(event) {
    // console.log(event.target.files[0]);
    const imageFromInput = event.target.files[0];

    setChosenPicture(imageFromInput);
  }

  function handleUserChange(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(false);

    if (!username) {
      setError("You have to write a username");
      setIsLoading(false);
      return;
    }
    updatingUserName(username)
      .then((response) => {
        if (!response.success) {
          return setError(response.data);
        }

        setUser(response.data.user);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleDeleteUser(event) {
    event.preventDefault();
    setIsLoading(true);
    deleteUser(user._id)
      .then((res) => {
        if (!res.success) {
          return setError(res.data);
        }
        setUser(null);
      })
      .finally(() => {
        if (error) {
          return setIsLoading(false);
        }
        navigate(PATHS.HOME_PAGE);
      });
  }

  return (
    <Container className="form-container">
      <div className="container-card col col-xl-5 col-lg-7 col-md-8 col-sm-7 col-xs-7 justify-content-center  mb-4 mw-50 b-1px">
        <div className="my-5">
          <img
            className="image-rounded"
            src={
              isLoading
                ? "https://ak.picdn.net/shutterstock/videos/1039407446/thumb/1.jpg"
                : user.profileImage
            }
            alt={`${user.username}'s Profile`}
          />
          {/* {error && <p style={{ color: "teal", fontWeight: "530" }}>{error}</p>}
        <form onSubmit={handleFromSubmit} method="POST">
        <div className="my-4">
        <input key={inputKey} type="file" onChange={handleInputChange} />
        <button type="submit">Upload Image</button>
        </div>
      </form> */}

          <div className="input-group mt-3">
            {error && <p style={{ color: "teal", fontWeight: "530" }}>{error}</p>}
            <form onSubmit={handleFromSubmit} method="POST">
              <div className="my-2">
                <input key={inputKey} type="file" onChange={handleInputChange} />
                <button className="btn my-3 btn-secondary" type="submit">
                  Update image
                </button>
              </div>
              <hr />
              <h3 className="justify-content-center mt-3">
                Hello <b> {user.username} </b>
              </h3>
            </form>
            <form className="my-3" onSubmit={handleUserChange}>
              {/* <span className="input-group-text" id="inputName"> */}

              <input
                type="text"
                name="username"
                placeholder="update your name"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <button className="btn mx-1 btn-secondary mt-3" type="submit">
                Update Name
              </button>

              {/* </span> */}
            </form>
          </div>
          <Row>
            <Form.Group as={Col}>
              <Button
                variant="secondary"
                className="btn-group justify-content-center my-3 d-block"
                href={PATHS.CURRENT_USER_PROFILE}>
                Cancel
              </Button>
            </Form.Group>
            <Form.Group as={Col}>
              <Button
                variant="danger"
                className="justify-content-center btn-group my-3 d-block"
                onClick={handleDeleteUser}
                type="delete">
                Delete Account
              </Button>
            </Form.Group>
          </Row>
        </div>
      </div>
    </Container>
  );
}

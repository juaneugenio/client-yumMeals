import React from "react";
import { useState } from "react";
import axios from "react";

export default function Profile(props) {
  const [chosenPicture, setChosenPicture] = useState("");

  const { user } = props;

  //First thing we always do before creating a form is prevent the default behaviour
  function handleFromSubmit(event) {
    event.preventDefault();

    if (!chosenPicture) {
      console.log("please, select a picture");
      return;
    }

    //lets create a new form body because we are uploading files.
    //FormData: It proveides a way to easily construct a set of key/value representing the form fields and their values
    const formBody = new window.FormData();
    formBody.append("profilePic", chosenPicture); //profilePic  comes from index router.post
    formBody.append("userId", user._id);

    //the end point comes from index and we send the FormBody
    axios
      .post("${SERVER_URL}/user/updateProfilePic", formBody)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  function handleInputChange(event) {
    // console.log(event.target.files[0]);
    const imageFromTheInput = event.target.files[0];

    setChosenPicture(imageFromTheInput);
  }

  return (
    <div>
      <h1>{user.username}´s Profile</h1>
      <p>
        <b>Picture:</b>
      </p>
      <img
        height={"300px"}
        src={user.userImage}
        alt={"${user.username}'s Profile"}
      />
      <form onSubmit={handleFromSubmit} method="POST">
        <input type="file" onChange={handleInputChange} />
        <button type="submit">Upload Image</button>
      </form>
      <p>
        <b>Username:</b> {user.username}
      </p>
      <p>
        <b>Email:</b> {user.email}
      </p>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function Profile({ user }) {
  // const { user, setUser } = props;
  return (
    <div>
      <h1>{user.username}´s Profile</h1>
      <button>Favourite Recipes</button>
      <button>Your Recipes</button>
      <p>
        <b>Profile Picture:</b>
      </p>
      <img
        height={"300px"}
        src={user.profileImage}
        alt={"${user.username}'s Profile"}
      />
      <p>
        <b>Username:</b> {user.username}
      </p>
      <p>
        <b>Email:</b> {user.email}
      </p>
      <Link to="/profile/edit">Edit Profile</Link>
    </div>
  );
}

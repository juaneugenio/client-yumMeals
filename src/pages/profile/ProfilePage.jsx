import React from "react";
import { Link } from "react-router-dom";
import "./ProfilePage.css";
import { Card, Container } from "react-bootstrap";

export default function Profile({ user }) {
  // const { user, setUser } = props;
  return (
    <Container>
      <Container className="justify-content-center col col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center mb-4 mw-50 b-1px p-5">
        {/* <button>Favourite Recipes</button>
      <button>Your Recipes</button> */}
        <Card className="card p-4">
          <h2
            style={{ fontSize: 30 }}
            className="text justify-content-center text-center "
          >
            {user.username}´s Profile
          </h2>
          <div className="fluit d-flexbox">
            <Card.Img
              className="image-rounded p-3"
              src={user.profileImage}
              alt={`${user.username}'s Profile`}
            />
            <hr />
            <p>
              <b>Username</b> {user.username}
            </p>
            <p>
              <b>Email</b> {user.email}
            </p>

            <a href="/profile/edit" class="btn btn-secondary mb-5">
              Edit Profile
            </a>
            <div className="card-footer text-muted">2 days ago</div>
          </div>
        </Card>
      </Container>
    </Container>
  );
}

import React from "react";

import "./ProfilePage.css";
import { Card, Container } from "react-bootstrap";

export default function Profile({ user }) {
  // const { user, setUser } = props;
  return (
    <Container>
      <Container className="p-5 container col col-xl-5 col-lg-7 col-md-8 col-sm-7 col-xs-7 justify-content-center text-center mb-4 mw-50 b-1px">
        {/* <button>Favourite Recipes</button>
      <button>Your Recipes</button> */}
        <Card className="card p-3">
          <div className=" d-flexbox">
            <Card.Img
              className="image-rounded p-3"
              src={user.profileImage}
              alt={`${user.username}'s Profile`}
            />
            <p style={{ fontSize: 16 }} className=" mb-1 stext-muted">
              Username
            </p>
            <h4>
              {" "}
              <b> {user.username} </b>
            </h4>
            <hr />
            <p>
              <b>Email: </b> {user.email}
            </p>
            <a href="/profile/edit" className="btn btn-secondary mb-4">
              Edit Profile
            </a>
            <a href="/profile/edit" className="btn btn-primary mb-4">
              Home Page
            </a>
            {/* <div className="card-footer text-muted">2 days ago</div> */}
          </div>
        </Card>
      </Container>
    </Container>
  );
}

import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="fixed-bottom">
      YumMeals | {new Date().getFullYear()} |{" "}
      <a href="https://www.freepik.com/photos/food">
        Food photo created by stockking - www.freepik.com
      </a>
    </footer>
  );
}

export default Footer;

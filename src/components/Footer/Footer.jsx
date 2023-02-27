import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="fixed-bottom">
      YumMeals | {new Date().getFullYear()} |{" "}
      <a href="https://www.freepik.com/photos/food">
        Credit to "www.freepik.com"
      </a>
    </footer>
  );
}

export default Footer;

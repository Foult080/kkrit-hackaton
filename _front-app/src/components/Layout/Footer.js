import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer mt-auto py-4 bg-light text-white">
      <div style={styles.footer}>
        <p>
          Open-Kras-KRIT &copy; Открытая площадка для студентов ККРИТ{" "}
          <i className="icon-small fas fa-globe"></i>
        </p>
        <Link to="/privacy">
          <p>
            Политика конфиденциальности{" "}
            <i className="fas icon-small fa-user-secret"></i>
          </p>
        </Link>
        <Link to="/contact-form">
          <p>
            Помогите нам стать лучше{" "}
            <i className="icon-small fas fa-envelope"></i>
          </p>
        </Link>
        <a
          href="https://github.com/Foult080"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>
            Created by @foult080 {" "}
            <i className="icon-small fab fa-github-square"></i>
          </p>
        </a>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    textAlign: "center",
    paddingTop: "0.5rem",
    paddingBottom: "1rem",
    color: "#007bff",
  },
};

export default Footer;

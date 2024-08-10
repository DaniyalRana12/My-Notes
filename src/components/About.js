import React from "react";
import "./About.css"; // Custom CSS for additional styling

const About = () => {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://www.creativefabrica.com/wp-content/uploads/2018/10/My-Notes-by-Atjcloth-Studio-580x387.jpg"
            alt="App"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h1 className="display-4 mb-3">About My Notes</h1>
          <p className="lead">
            My Notes is a powerful and intuitive application designed to help
            you manage your notes efficiently. Whether you're jotting down ideas
            for a project, keeping track of important tasks, or simply recording
            your thoughts, Notebook provides a seamless experience that keeps
            your notes organized and easily accessible.
          </p>
        <p>
          With Notebook, you can enjoy features like note tagging, editing, and
          deletion, giving you complete control over your content. Our intuitive
          design and user-friendly interface make managing your notes simple and
          efficient, helping you stay productive and focused.
        </p>
        <p>
          Notebook is designed to keep your notes secure and accessible from
          anywhere, at any time. Enjoy a clean, modern interface that lets you
          focus on what truly matters—your thoughts and ideas.
        </p>
          <a href="/home" className="btn btn-primary btn-lg mt-3">
            Start Using Notebook
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;

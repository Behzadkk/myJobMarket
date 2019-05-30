import React from "react";

const DefineProject = props => {
  return (
    <div className="projects-control">
      <p>Introduce your new project!</p>
      <button className="btn" onClick={props.clickHandler}>
        Define a Project
      </button>
    </div>
  );
};

export default DefineProject;

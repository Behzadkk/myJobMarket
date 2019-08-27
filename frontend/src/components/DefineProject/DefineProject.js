import React from "react";

const DefineProject = props => {
  return (
    <div className='ui segment container center projects-control'>
      <p>Introduce your new project!</p>
      <button className='ui button  teal btn' onClick={props.clickHandler}>
        Define a Project
      </button>
    </div>
  );
};

export default DefineProject;

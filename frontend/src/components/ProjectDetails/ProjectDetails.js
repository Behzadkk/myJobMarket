import React from "react";

const ProjectDetails = props => {
  return (
    <React.Fragment>
      <h1>Project: {props.selectedProject.title}</h1>
      <h2>Price : £{props.selectedProject.price}</h2>
      <h2>Needs to be done by: {props.selectedProject.deadline}</h2>
      <h2>It's a {props.selectedProject.project_length}-day job</h2>
      <p>{props.selectedProject.details}</p>
      <p>This project is created by {props.selectedProject.email}</p>
      <p>
        This project is defined on{" "}
        {new Date(props.selectedProject.created_date).toLocaleDateString()}
      </p>
      {props.selectedProject.updated_date && (
        <p>
          and updated on{" "}
          {new Date(props.selectedProject.updated_date).toLocaleDateString()}
        </p>
      )}
    </React.Fragment>
  );
};

export default ProjectDetails;

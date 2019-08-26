import React from "react";

const ProjectDetails = props => {
  return (
    <div className='ui items'>
      <div className='item'>
        <div className='content' id='modal-content'>
          <h1 className=''>{props.selectedProject.title}</h1>
          <h2 className='ui sub header'>
            Price : £{props.selectedProject.price}
            <br />
            Needs to be done by: {props.selectedProject.deadline}
            <br />
            It's a {props.selectedProject.project_length}-day job
          </h2>

          <p className='description'>{props.selectedProject.details}</p>
          <p className='description'>
            This project is created by {props.selectedProject.email}
          </p>
          <p className='extra'>
            This project is defined on{" "}
            {new Date(props.selectedProject.created_date).toLocaleDateString()}
          </p>
          {props.selectedProject.updated_date && (
            <p className='extra'>
              and updated on{" "}
              {new Date(
                props.selectedProject.updated_date
              ).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;

import React from "react";
import "./ProjectsItem.css";

const ProjectsItem = props => (
  <li key={props.projectId} className='item projects__rows'>
    <div className='content'>
      <h1 className='header'>{props.title}</h1>
      <h2 className='meta'>
        £{props.price} - {props.createdDate}
      </h2>
    </div>
    <div className='extra'>
      {props.userId === props.hirerId ? (
        <div>
          <button
            className='ui floated  teal button'
            onClick={() => props.onEdit(props.projectId)}
          >
            Edit
          </button>
          <button
            className='ui floated  red button'
            onClick={() => props.onDelete(props.projectId)}
          >
            Delete
          </button>
        </div>
      ) : (
        <button
          className='ui floated basic teal button'
          onClick={props.onDetail.bind(this, props.projectId)}
        >
          View Details
          <i className='right chevron icon' />
        </button>
      )}
    </div>
  </li>
);

export default ProjectsItem;

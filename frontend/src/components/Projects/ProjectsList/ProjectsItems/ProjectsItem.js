import React from "react";
import "./ProjectsItem.css";

const ProjectsItem = props => (
  <li key={props.projectId} className="projects__rows">
    <div>
      <h1>{props.title}</h1>
      <h2>
        £{props.price} - {props.createdDate}
      </h2>
    </div>
    <div>
      {props.userId === props.hirerId ? (
        <div>
          <button className="btn" onClick={() => props.onEdit(props.projectId)}>
            Edit
          </button>
          <button
            className="btn"
            onClick={() => props.onDelete(props.projectId)}
          >
            Delete
          </button>
          {/* these buttons needs some handler to PUT and DELETE from database */}
        </div>
      ) : (
        <button
          className="btn"
          onClick={props.onDetail.bind(this, props.projectId)}
        >
          View Details
        </button>
      )}
    </div>
  </li>
);

export default ProjectsItem;

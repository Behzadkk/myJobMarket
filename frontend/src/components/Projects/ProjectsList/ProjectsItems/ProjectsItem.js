import React from "react";
import "./ProjectsItem.css";

const ProjectsItem = props => (
  <li key={props.id} className="projects__rows">
    <div>
      <h1>{props.title}</h1>
      <h2>
        £{props.price} - {props.createdDate}
      </h2>
    </div>
    <div>
      <button className="btn" onClick={props.onDetail.bind(this, props.id)}>
        View Details
      </button>
    </div>
  </li>
);

export default ProjectsItem;

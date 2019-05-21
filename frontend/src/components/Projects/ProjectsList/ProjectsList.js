import React from "react";
import "./ProjectsList.css";

import ProjectsItem from "./ProjectsItems/ProjectsItem";

const ProjectsList = props => {
  const projects = props.projects.map(project => {
    return (
      <ProjectsItem
        key={project.id}
        id={project.id}
        title={project.title}
        price={project.price}
        createdDate={new Date(project.created_date).toLocaleDateString()}
        onDetail={props.onViewDetail}
      />
    );
  });
  return <ul className="projects__table">{projects}</ul>;
};

export default ProjectsList;

import React from "react";
import "./ProjectsList.css";

import ProjectsItem from "./ProjectsItems/ProjectsItem";

const ProjectsList = props => {
  const projects = props.projects.map(project => {
    return (
      <ProjectsItem
        key={project.projectId}
        projectId={project.projectId}
        title={project.title}
        price={project.price}
        createdDate={new Date(project.created_date).toLocaleDateString()}
        onDetail={props.onViewDetail}
        userId={props.authUserId}
        hirerId={project.hirer_id}
      />
    );
  });
  return <ul className="projects__table">{projects}</ul>;
};

export default ProjectsList;

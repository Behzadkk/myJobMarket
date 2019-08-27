import React from "react";
import "./ProjectsList.css";

import ProjectsItem from "./ProjectsItems/ProjectsItem";

const ProjectsList = props => {
  const projects = props.projects.map(project => {
    return (
      <div className='ui top attached segment'>
        <ProjectsItem
          key={project.projectId}
          projectId={project.projectId}
          title={project.title}
          price={project.price}
          createdDate={new Date(project.created_date).toLocaleDateString()}
          onDetail={props.onViewDetail}
          onEdit={props.onViewEdit}
          onDelete={props.onViewDelete}
          userId={props.authUserId}
          hirerId={project.hirer_id}
        />
      </div>
    );
  });
  return <ul className='ui divided items '>{projects}</ul>;
};

export default ProjectsList;

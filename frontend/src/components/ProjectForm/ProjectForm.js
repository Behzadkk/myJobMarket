import React from "react";

const ProjectForm = props => {
  return (
    <form>
      <div className="form-control">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" ref={props.titleInput} />
      </div>
      <div className="form-control">
        <label htmlFor="price">Price £</label>
        <input type="number" id="price" ref={props.priceInput} />
      </div>
      <div className="form-control">
        <label htmlFor="deadline">Deadline</label>
        <input type="date" id="deadline" ref={props.deadlineInput} />
      </div>
      <div className="form-control">
        <label htmlFor="length">Project's Length (Days)</label>
        <input type="number" id="length" ref={props.lengthInput} />
      </div>
      <div className="form-control">
        <label htmlFor="details">Details</label>
        <textarea type="text" id="details" rows="4" ref={props.detailsInput} />
      </div>
    </form>
  );
};

export default ProjectForm;

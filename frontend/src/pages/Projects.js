import React, { Component } from "react";

import Modal from "../components/Modal/Modal";
import Backdrop from "../components/Backdrop/Backdrop";
import "./projects.css";

class ProjectsPage extends Component {
  state = {
    creating: false,
    projects: []
  };
  constructor(props) {
    super(props);
    this.titleEl = React.createRef();
    this.priceEl = React.createRef();
    this.deadlineEl = React.createRef();
    this.lengthEl = React.createRef();
    this.detailsEl = React.createRef();
    this.hirerEl = React.createRef();
  }

  componentDidMount() {
    this.fetchProjects();
  }
  startDefineProjectHandler = () => {
    this.setState({ creating: true });
  };
  modalConfirmHandler = () => {
    this.setState({ creating: false });
    const title = this.titleEl.current.value;
    const price = +this.priceEl.current.value;
    const deadline = this.deadlineEl.current.value;
    const project_length = +this.lengthEl.current.value;
    const details = this.detailsEl.current.value;
    const hirer_id = +this.hirerEl.current.value;

    const project = {
      title,
      price,
      deadline,
      project_length,
      details,
      hirer_id
    };
    const requestBody = { ...project };
    console.log(requestBody);

    fetch("http://localhost:5000/api/projects", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res;
      })
      .then(data => {
        this.fetchProjects();
      })
      .catch(err => {
        console.log(err);
      });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false });
  };

  fetchProjects = () => {
    fetch("http://localhost:5000/api/projects")
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        this.setState({ projects: resData.tableName });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const projectsList = this.state.projects.map(project => {
      return (
        <li key={project.id} className="projects__rows">
          {project.title}
        </li>
      );
    });
    return (
      <React.Fragment>
        {this.state.creating && <Backdrop />}
        {this.state.creating && (
          <Modal
            title="Define a Project"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
          >
            <form>
              <div className="form-control">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" ref={this.titleEl} />
              </div>
              <div className="form-control">
                <label htmlFor="price">Price £</label>
                <input type="number" id="price" ref={this.priceEl} />
              </div>
              <div className="form-control">
                <label htmlFor="deadline">Deadline</label>
                <input type="date" id="deadline" ref={this.deadlineEl} />
              </div>
              <div className="form-control">
                <label htmlFor="length">Project's Length (Days)</label>
                <input type="number" id="length" ref={this.lengthEl} />
              </div>
              <div className="form-control">
                <label htmlFor="details">Details</label>
                <textarea
                  type="text"
                  id="details"
                  rows="4"
                  ref={this.detailsEl}
                />
              </div>
              <div className="form-control">
                <label htmlFor="hirer">Hirer</label>
                <input type="number" id="hirer" ref={this.hirerEl} />
              </div>
            </form>
          </Modal>
        )}
        <div className="projects-control">
          <p>Introduce your new project!</p>
          <button className="btn" onClick={this.startDefineProjectHandler}>
            Define a Project
          </button>
        </div>
        <ul className="projects__table">{projectsList}</ul>
      </React.Fragment>
    );
  }
}

export default ProjectsPage;

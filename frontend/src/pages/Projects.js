import React, { Component } from "react";

import AuthContext from "../context/authContext";
import Modal from "../components/Modal/Modal";
import Backdrop from "../components/Backdrop/Backdrop";
import ProjectsList from "../components/Projects/ProjectsList/ProjectsList";
import Spinner from "../components/Spinner/Spinner";
import "./projects.css";

class ProjectsPage extends Component {
  state = {
    creating: false,
    projects: [],
    isLoading: false,
    selectedProject: null
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.titleEl = React.createRef();
    this.priceEl = React.createRef();
    this.deadlineEl = React.createRef();
    this.lengthEl = React.createRef();
    this.detailsEl = React.createRef();
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
    const hirer_id = +this.context.userId;

    const project = {
      title,
      price,
      deadline,
      project_length,
      details,
      hirer_id
    };
    const requestBody = { ...project };
    const token = this.context.token;
    fetch("/api/projects", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        this.setState(prevState => {
          const updatedProjects = [...prevState.projects];
          updatedProjects.push({
            projectId: resData.projects[0].projectId,
            title: resData.projects[0].title,
            price: resData.projects[0].price,
            deadline: resData.projects[0].deadline,
            project_length: resData.projects[0].project_length,
            details: resData.projects[0].details,
            hirer_id: resData.projects[0].hirer_id,
            created_date: resData.projects[0].created_date
          });
          return { projects: updatedProjects };
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false, selectedProject: null });
  };

  fetchProjects = () => {
    this.setState({ isLoading: true });
    fetch("/api/projects")
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        this.setState({ projects: resData.projects, isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  showDetailHandler = id => {
    this.setState(prevState => {
      const selectedProject = prevState.projects.find(
        project => project.projectId === id
      );
      return { selectedProject: selectedProject };
    });
  };

  modalApplyHandler = () => {
    const requestBody = {
      projectId: this.state.selectedProject.projectId,
      userId: Math.floor(Math.random() * 5)
    };

    fetch("/api/applications", {
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
        this.setState({ selectedProject: null });
        return res;
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        {(this.state.creating || this.state.selectedProject) && <Backdrop />}
        {this.state.creating && (
          <Modal
            title="Define a Project"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
            confirmText="Confirm"
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
            </form>
          </Modal>
        )}
        {this.state.selectedProject && (
          <Modal
            title={this.state.selectedProject.title}
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalApplyHandler}
            confirmText="Apply"
          >
            <h1>Price : £{this.state.selectedProject.price}</h1>
            <h2>Needs to be done by: {this.state.selectedProject.deadline}</h2>
            <h2>It's a {this.state.selectedProject.project_length}-day job</h2>
            <p>{this.state.selectedProject.details}</p>
            <p>This project is created by {this.state.selectedProject.email}</p>
            <p>
              This project is defined on{" "}
              {new Date(
                this.state.selectedProject.created_date
              ).toLocaleDateString()}
            </p>
            {this.state.selectedProject.updated_date && (
              <p>
                and updated on{" "}
                {new Date(
                  this.state.selectedProject.updated_date
                ).toLocaleDateString()}
              </p>
            )}
          </Modal>
        )}
        {this.context.token && (
          <div className="projects-control">
            <p>Introduce your new project!</p>
            <button className="btn" onClick={this.startDefineProjectHandler}>
              Define a Project
            </button>
          </div>
        )}
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <ProjectsList
            projects={this.state.projects}
            authUserId={this.context.userId}
            onViewDetail={this.showDetailHandler}
          />
        )}
      </React.Fragment>
    );
  }
}

export default ProjectsPage;

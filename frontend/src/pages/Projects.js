import React, { Component } from "react";

import AuthContext from "../context/authContext";
import Modal from "../components/Modal/Modal";
import Backdrop from "../components/Backdrop/Backdrop";
import ProjectsList from "../components/Projects/ProjectsList/ProjectsList";
import Spinner from "../components/Spinner/Spinner";
import ProjectForm from "../components/ProjectForm/ProjectForm";
import ProjectDetails from "../components/ProjectDetails/ProjectDetails";
import DefineProject from "../components/DefineProject/DefineProject";
import "./projects.css";

class ProjectsPage extends Component {
  state = {
    creating: false,
    projects: [],
    isLoading: false,
    selectedProject: null,
    editingProject: null,
    deleting: false
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
    this.setState({ creating: false, editingProject: null });
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
    let verb = "POST";
    if (this.state.editingProject) {
      verb = "PUT";
      project.projectId = this.state.editingProject.projectId;
    }
    const requestBody = { ...project };
    const token = this.context.token;
    fetch("/api/projects", {
      method: verb,
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
          let updatedProjects = prevState.projects.filter(project => {
            return project.projectId !== resData.projects[0].projectId;
          });
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
    this.setState({
      creating: false,
      selectedProject: null,
      editingProject: null,
      deleting: false
    });
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

  showEditHandler = id => {
    this.setState(prevState => {
      const editingProject = prevState.projects.find(
        project => project.projectId === id
      );
      return { editingProject: editingProject };
    });
  };

  showDeleteHandler = id => {
    this.setState({ deleting: true });
    this.showDetailHandler(id);
  };

  modalApplyHandler = () => {
    if (!this.context.token) {
      this.setState({ selectedProject: null });
      return;
    }
    const requestBody = {
      projectId: this.state.selectedProject.projectId,
      userId: this.context.userId
    };

    fetch("/api/applications", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.context.token
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

  ModalDeleteHandler = () => {
    this.setState({ deleting: true });
    const projectId = this.state.selectedProject.projectId;
    fetch("/api/projects", {
      method: "DELETE",
      body: JSON.stringify({ projectId: projectId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.context.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res;
      })
      .then(data => {
        this.setState(prevState => {
          const updatedProjects = prevState.projects.filter(project => {
            return project.projectId !== projectId;
          });
          return {
            projects: updatedProjects,
            deleting: false,
            selectedProject: null
          };
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ deleting: false });
      });
  };

  render() {
    return (
      <React.Fragment>
        {(this.state.creating ||
          this.state.selectedProject ||
          this.state.editingProject) && <Backdrop />}
        {this.state.creating && (
          <Modal
            title="Define a Project"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
            confirmText="Confirm"
          >
            <ProjectForm
              titleInput={this.titleEl}
              priceInput={this.priceEl}
              deadlineInput={this.deadlineEl}
              lengthInput={this.lengthEl}
              detailsInput={this.detailsEl}
            />
          </Modal>
        )}
        {this.state.selectedProject && (
          <Modal
            title="Project details"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalApplyHandler}
            confirmText={this.context.token ? "Apply" : "OK"}
          >
            <ProjectDetails selectedProject={this.state.selectedProject} />
          </Modal>
        )}
        {this.context.token && (
          <DefineProject clickHandler={this.startDefineProjectHandler} />
        )}
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <ProjectsList
            projects={this.state.projects}
            authUserId={this.context.userId}
            onViewDetail={this.showDetailHandler}
            onViewEdit={this.showEditHandler}
            onViewDelete={this.showDeleteHandler}
          />
        )}
        {this.state.editingProject && (
          <Modal
            title="Edit your project"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
            confirmText="Confirm"
          >
            <ProjectForm
              titleInput={this.titleEl}
              priceInput={this.priceEl}
              deadlineInput={this.deadlineEl}
              lengthInput={this.lengthEl}
              detailsInput={this.detailsEl}
            />
          </Modal>
        )}
        {this.state.deleting && (
          <Modal
            title="Are you sure about Deleting"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.ModalDeleteHandler}
            confirmText="Delete"
          >
            <ProjectDetails selectedProject={this.state.selectedProject} />
          </Modal>
        )}
      </React.Fragment>
    );
  }
}

export default ProjectsPage;

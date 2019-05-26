import React, { Component } from "react";

import Spinner from "../components/Spinner/Spinner";

class ApplicationsPage extends Component {
  state = {
    isLoading: false,
    applications: []
  };

  componentDidMount() {
    this.fetchApplications();
  }

  fetchApplications = () => {
    this.setState({ isLoading: true });
    fetch("/api/applications")
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        this.setState({ applications: resData.application, isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };
  render() {
    return (
      <React.Fragment>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <ul>
            {this.state.applications.map(app => (
              <li key={app.appId}>{app.appId}</li>
            ))}
          </ul>
        )}
      </React.Fragment>
    );
  }
}

export default ApplicationsPage;

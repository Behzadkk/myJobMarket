import React, { Component } from "react";
import AuthContext from "../context/authContext";

import Spinner from "../components/Spinner/Spinner";
import AppList from "../components/Applications/AppList/AppList";

class ApplicationsPage extends Component {
  state = {
    isLoading: false,
    applications: []
  };
  static contextType = AuthContext;

  componentDidMount() {
    this.fetchApplications();
  }

  fetchApplications = () => {
    this.setState({ isLoading: true });
    fetch("/api/applications", {
      headers: {
        Authorization: "Bearer " + this.context.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        this.setState({ applications: resData.applications, isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  cancelAppHandler = appId => {
    this.setState({ isLoading: true });
    fetch("/api/applications", {
      method: "DELETE",
      body: JSON.stringify({ appId: appId }),
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
          const updatedApps = prevState.applications.filter(app => {
            return app.applicationId !== appId;
          });
          return { applications: updatedApps, isLoading: false };
        });
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
          <AppList
            applications={this.state.applications}
            onDelete={this.cancelAppHandler}
          />
        )}
      </React.Fragment>
    );
  }
}

export default ApplicationsPage;

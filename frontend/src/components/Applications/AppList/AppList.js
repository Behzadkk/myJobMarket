import React from "react";

import "./AppList.css";

const AppList = props => (
  <ul className="applications__list">
    {props.applications.map(app => {
      return (
        <li key={app.applicationId} className="applications__item">
          <div className="applications__item-data">
            {app.title} - {new Date(app.created_date).toLocaleDateString()}
          </div>
          <div className="applications__item-actions">
            <button
              className="btn"
              onClick={props.onDelete.bind(this, app.applicationId)}
            >
              Cancel Application
            </button>
          </div>
        </li>
      );
    })}
  </ul>
);

export default AppList;

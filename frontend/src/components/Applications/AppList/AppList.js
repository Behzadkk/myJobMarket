import React from "react";

import "./AppList.css";

const AppList = props => (
  <div className='ui container center'>
    <ul className='ui divided items'>
      {props.applications.map(app => {
        return (
          <div className='ui top attached segment'>
            <li key={app.applicationId} className='item applications__item'>
              <div className='content'>
                <h2 className='header'>{app.title}</h2>
                <h3 className='meta'>
                  {new Date(app.created_date).toLocaleDateString()}
                </h3>
              </div>
              <div className='extra'>
                <button
                  className='ui floated  red button'
                  onClick={props.onDelete.bind(this, app.applicationId)}
                >
                  Cancel Application
                </button>
              </div>
            </li>
          </div>
        );
      })}
    </ul>
  </div>
);

export default AppList;

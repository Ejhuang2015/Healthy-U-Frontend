import React from "react";
import { Redirect } from "react-router-dom";

function ViewProfile(props) {
  if (props.user.message) {
    return <Redirect to="/callback/" />
  }

  return (
    <div>
      <div className="row align-items-center profile-header">
        <div className="col-md-2 mb-3">
          <img
            src={props.user.avatar}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </div>
        <div className="col-md text-center text-md-left">
          <h2>{props.user.name}</h2>
          <p className="lead text-muted">{props.user.email}</p>
        </div>
      </div>
      <div className="row">
        <pre className="col-12 text-light bg-dark p-4">
          {JSON.stringify(props.user, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ViewProfile;
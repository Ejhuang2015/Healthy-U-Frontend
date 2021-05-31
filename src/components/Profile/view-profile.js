import React from "react";
import { Redirect } from "react-router-dom";
import Goal from "../Goal/goal";
import Challenge from "../Challenge/challenge";
import "./style.css";

function ViewProfile(props) {
  if (props.user.message) {
    return <Redirect to="/callback/" />
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-2">
          <div className="row mb-3">
            <div className="col mx-0 text-center">
              <img className="rounded-circle img-fluid border border-success avatar" src={props.user.avatar} alt="User profile" />
            </div>
          </div>
          <div className="row mb-3 mx-auto">
            <button className="btn btn-warning"onClick={props.editButton}>Edit Profile</button>
          </div>
          <div className="row mb-1 text-center text-break">
            <h3>{props.user.name}</h3>
          </div>
          <div className="row mb-1 text-center text-break">
            <h6>{props.user.email}</h6>
          </div>
        </div>

        <div className="col-sm">
          <div className="row border border-2 border-dark rounded p-3 m-1">
            <Goal />
          </div>
          <div className="row m-1">
            <Challenge />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
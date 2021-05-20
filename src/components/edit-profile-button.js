import React from "react";
import { Link } from "react-router-dom";

const EditProfileButton = () => {

    return (
        <Link to="/edit-profile">
            <button className="btn btn-primary btn-block">
                Edit Profile
            </button>
        </Link>
    );
};

export default EditProfileButton;
import React, { useEffect, useReducer } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

function EditProfile(props) {
    const [formData, setFormData] = useReducer(formReducer, {
        name: props.user.name,
        email: props.user.email,
        avatar: props.user.avatar
    });
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const { user, getAccessTokenSilently } = useAuth0();

    const updateUserData = async (data) => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`${serverUrl}/api/${user.sub}`, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                method: 'PUT',
                body: JSON.stringify(data)
            });
            console.log(response.message);
        } catch (err) {
            console.log(err);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        updateUserData(formData);
        window.location.reload();
    };

    function handleChange(event) {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    // useEffect(() => {
    //     getUserData();
    //   }, []);

    return (
        <div>
            <h1 className="page-heading">Edit Profile</h1>
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="text" required id="name" className="form-control" placeholder="placeholder" name="name" onChange={handleChange} value={formData.name || ""} />
                    <label className="floatingInput" htmlFor="name">Name</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="email" required id="email" className="form-control" placeholder="placeholder" name="email" onChange={handleChange} value={formData.email || ""} />
                    <label className="floatingInput" htmlFor="email">Email</label>
                </div>

                <div className="form-floating input-group mb-3" id="uploadButton">
                    <input type="text" readOnly required id="avatar" className="form-control" name="avatar" onChange={handleChange} value={formData.avatar || ""} />
                    <label className="floatingInput" htmlFor="avatar">Profile Image</label>
                    <button type="button" className="btn btn-outline-secondary imageBtn">Upload Image</button>
                </div>

                <div className="col-12 text-center">
                    <button type="submit" id="formSubmit" className="btn btn-outline-secondary">Update Profile</button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
import React, { useReducer } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

const fData = new FormData()

function EditProfile(props) {
    const [formData, setFormData] = useReducer(formReducer, {
        name: props.user.name,
        email: props.user.email,
        avatar: props.user.avatar
    });
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const { user, getAccessTokenSilently } = useAuth0();

    async function handleSubmit(event) {
        event.preventDefault();
        fData.append('name', formData.name);
        fData.append('email', formData.email);
        fData.append('avatar', formData.avatar);
        try {
            const token = await getAccessTokenSilently();
            await fetch(`${serverUrl}/api/${user.sub}`, {
                headers: { Authorization: `Bearer ${token}` },
                method: 'PUT',
                body: fData
            });
        } catch (err) {
            console.log(err);
        }

        window.location.reload();
    };

    function handleChange(event) {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    function handleImageUpload(event) {
        setFormData({
            name: event.target.name,
            value: event.target.files[0],
        });
    }

    return (
        <div>
            <div className="row">
                <div className="col offset-sm-2">
                    <h1 className="page-heading text-center fw-bolder">Edit Profile</h1>
                </div>
                <div className="d-flex col-sm-2 align-items-center flex-row-reverse">
                    <button onClick={props.editButton} className="btn btn-danger">Discard Changes</button>
                </div>
            </div>
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="text" required className="form-control" placeholder="placeholder" name="name" onChange={handleChange} value={formData.name || ""} />
                    <label className="floatingInput" htmlFor="name">Name</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="email" required className="form-control" placeholder="placeholder" name="email" onChange={handleChange} value={formData.email || ""} />
                    <label className="floatingInput" htmlFor="email">Email</label>
                </div>

                <div className="form-floating input-group mb-3" id="uploadButton">
                    <input type="file" accept="image/png, image/jpeg" readOnly required className="form-control" name="avatar" onChange={handleImageUpload}/>
                    <label className="floatingInput" htmlFor="avatar">Profile Image</label>
                </div>

                <div className="col-12 text-center">
                    <button type="submit" className="btn btn-outline-success">Update Profile</button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
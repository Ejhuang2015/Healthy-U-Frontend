import React, { useState, useReducer } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

function NewChallenge() {
    const [formData, setFormData] = useReducer(formReducer, {
        title: "",
        desc: "",
    });
    const [editState, setEditState] = useState(false);

    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const { user, getAccessTokenSilently } = useAuth0();

    async function handleSubmit(event) {
        event.preventDefault();
        const data = {
            title: formData.title,
            desc: formData.desc,
            date: new Date(new Date().setHours(0, 0, 0, 0))
        }
        try {
            const token = await getAccessTokenSilently();
            await fetch(`${serverUrl}/api/challenge/${user.sub}`, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify(data)
            });
        } catch (err) {
            console.log(err);
        }

        window.location.reload();
    }

    function handleEdit(){
        setEditState(true);
    }

    function handleChange(event) {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }


    return (
        <div>
            <h1 className="fw-bolder text-center">49-Day Better U Challenge</h1>
            {editState ? 
                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <input type="text" required className="form-control" placeholder="placeholder" name="title" onChange={handleChange} value={formData.title || ""} />
                        <label className="floatingInput" htmlFor="title">Title</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" required className="form-control" placeholder="placeholder" name="desc" onChange={handleChange} value={formData.desc || ""} />
                        <label className="floatingInput" htmlFor="desc">Description</label>
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" className="btn btn-outline-success">Create Challenge</button>
                    </div>
                </form> 
            : 
                <div>
                    <div className="row">
                        <p className="text-center">Challenge yourself to become better! Track your progress over 49 days by marking your success daily!</p>
                    </div>
                    <div>
                        <div className="col-sm-4 mx-auto">
                            <button className="btn btn-block btn-success" onClick={handleEdit}>Ready to Make a Challenge?</button>
                        </div>
                    </div>
                </div> 
            }
        </div>
    );
};

export default NewChallenge;
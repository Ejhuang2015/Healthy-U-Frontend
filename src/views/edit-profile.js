import React, { useState, useEffect } from "react";

function EditProfile() {

    return (
        <div>
            <h1 className="page-heading">Edit Exhibit</h1>
            <form id="editExhibit" className="row g-3">
                <div className="form-floating mb-3">
                    <input type="text" required id="title" className="form-control" placeholder="placeholder" name="title" value="{{exhibit.title}}" />
                    <label className="floatingInput" for="title">Name</label>
                </div>

                <div className="form-floating input-group mb-3" id="uploadButton">
                    <input type="text" readonly required id="imageUrl" className="form-control" name="imageUrl" value="{{exhibit.image_url}}" />
                    <label className="floatingInput" for="imageUrl">Image File</label>
                    <button type="button" className="btn btn-outline-secondary imageBtn">Upload Image</button>
                </div>

                <div className="col-12 text-center">
                    <button type="submit" id="formSubmit" className="btn btn-outline-secondary">Update</button>
                </div>
            </form>
        </div>

    );
};

export default EditProfile;
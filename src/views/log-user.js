import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function LogUser() {
    const [message, setMessage] = useState("");
    const [healthTip, setHealthTip] = useState("");
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const { user, getAccessTokenSilently } = useAuth0();
    const { name, picture, email, sub } = user;

    // Log user data and retrieve message
    const callbackUserData = async () => {
        try {
            const token = await getAccessTokenSilently();
            const data = {
                id: sub,
                name: name,
                avatar: picture,
                email: email
            }

            const response = await fetch(`${serverUrl}/api/callback`, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify(data)
            });

            const responseData = await response.json();
            setMessage(responseData.message);
        } catch (err) {
            setMessage(err);
        }
    };

    // Get a random health tip from database
    const getRandomTip = async () => {
        try {
            const response = await fetch(`${serverUrl}/api/quote/health/random`, {
                method: 'GET',
            });
            const responseData = await response.json();
            setHealthTip(responseData.message);
        } catch (err) {
            setHealthTip(err);
        }
    };

    // Run functions once upon render
    useEffect(() => {
        callbackUserData();
        getRandomTip();
    }, []);

    // Render
    return (
        <div className="container text-center mt-2">
            {(healthTip || message) ? 
                <div> 
                    <h1 className="fw-bolder my-3">{message}</h1>
                    <div className="border rounded-3 border-success border-2 p-2">
                        <p className="fs-5">{healthTip}</p>
                    </div>        
                </div>
                :
                <div className="spinner-border text-success mt-3" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            }
        </div>
    );
};

export default LogUser;
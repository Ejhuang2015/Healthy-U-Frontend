import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NewQuote from "../components/Quotes/NewQuote"

function LogUser() {
    const [message, setMessage] = useState("");
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

    // Run functions once upon render
    useEffect(() => {
        callbackUserData();
    }, []);

    // Render
    return (
        <div className="container text-center mt-2">
            {(message) ? 
                <div> 
                    <h1 className="fw-bolder my-3">{message}</h1>
                    <div className="border rounded-3 border-success border-2 p-2">
                        <NewQuote />
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
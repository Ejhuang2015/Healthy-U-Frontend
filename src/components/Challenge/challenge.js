import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NewChallenge from "./newChallenge";
import ChallengeGrid from "./challengeGrid";


function Challenge() {
    const [newChallengeState, setChallengeState] = useState(true);
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const { user, getAccessTokenSilently } = useAuth0();

    const checkValidChallenge = async () => {
        try {
            const data = { date: new Date(new Date().setHours(0, 0, 0, 0)) }
            const token = await getAccessTokenSilently();
            const finishedChallenge = await fetch(`${serverUrl}/api/challenge/finished/${user.sub}`, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                method: "POST",
                body: JSON.stringify(data)
            });
            const responseData = await finishedChallenge.json();
            setChallengeState(responseData.challenge);
        } catch (err) {
            console.log(err);
        }
    }

    // Run functions once upon render
    useEffect(() => {
        checkValidChallenge();
    }, []);

    return newChallengeState ? (<NewChallenge />) : (<ChallengeGrid />);
};

export default Challenge;
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import GoalTracker from "./goalTracker";

function Goal() {
    const [goalState, setGoalState] = useState();
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const { user, getAccessTokenSilently } = useAuth0();
    const today = new Date(new Date().setHours(0, 0, 0, 0));

    const getDailyGoals = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`${serverUrl}/api/goal/${user.sub}`, {
                headers: { Authorization: `Bearer ${token}` },
                method: "GET"
            });
            const responseData = await response.json();
            // If no past goals found, create a new daily goal
            if (!responseData) {
                createDailyGoal();
            } else {
                // Check the latest goal's date
                const lastGoalDate = new Date(responseData.date);
                // If last recorded date and today's date is the same, set the data
                if (lastGoalDate - today === 0) {
                    setGoalState(responseData);
                    // else create a new daily goal
                } else {
                    createDailyGoal();
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    const createDailyGoal = async () => {
        const data = { date: today }
        try {
            const token = await getAccessTokenSilently();
            const newGoal = await fetch(`${serverUrl}/api/goal/${user.sub}`, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                method: "POST",
                body: JSON.stringify(data)
            });
            const newGoalData = await newGoal.json();
            // Set data with a new daily goal
            setGoalState(newGoalData);
        } catch (err) {
            console.log(err);
        }
    }

    // Run functions once upon render
    useEffect(() => {
        getDailyGoals();
    }, []);

    return (
        <div className={goalState ? "text-center" : "text-center py-3"}>
            {goalState ?
                <div>
                    <h1 className="fw-bolder">Daily Goals and Limits</h1>
                    <div>
                        <GoalTracker checked={goalState.water} id={goalState._id} src="https://healthy-u.s3.us-east-2.amazonaws.com/goalWater.png" item="water" alignment="good" />
                        <GoalTracker checked={goalState.food} id={goalState._id} src="https://healthy-u.s3.us-east-2.amazonaws.com/goalFood.png" item="food" alignment="good"/>
                        <GoalTracker checked={goalState.bad} id={goalState._id} src="https://healthy-u.s3.us-east-2.amazonaws.com/goalBad.png" item="bad" alignment="bad"/>
                    </div>
                </div>
                :
                <div className="spinner-border text-success" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            }
        </div>
    )
};

export default Goal;
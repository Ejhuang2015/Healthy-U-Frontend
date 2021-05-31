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
        <div>
            {goalState ?
                <div>
                    <h1 className="text-center fw-bolder">Daily Goals and Limits</h1>
                    <div>
                        <GoalTracker checked={goalState.water} src="https://healthy-u.s3.us-east-2.amazonaws.com/goalWater.png" item="water"/>
                        <GoalTracker checked={goalState.food} src="https://healthy-u.s3.us-east-2.amazonaws.com/goalFood.png" item="food"/>
                        <GoalTracker checked={goalState.bad} src="https://healthy-u.s3.us-east-2.amazonaws.com/goalBad.png" item="bad"/>
                    </div>
                </div>
                :
                "Loading..."
            }
        </div>
    )
};

export default Goal;
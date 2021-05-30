import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useDebounce from "../../utils/debounceHook"

function Goal() {
    const [goalState, setGoalState] = useState();
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const { user, getAccessTokenSilently } = useAuth0();
    const today = new Date(new Date().setHours(0, 0, 0, 0));

    const debouncedState = useDebounce(goalState, 500)

    const getDailyGoals = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`${serverUrl}/api/goal/${user.sub}`, {
                headers: { Authorization: `Bearer ${token}` },
                method: "GET"
            });

            const responseData = await response.json();
            const lastGoalDate = new Date(responseData.date);

            if (lastGoalDate !== today) {
                const newGoal = await fetch(`${serverUrl}/api/goal/${user.sub}`, {
                    headers: { Authorization: `Bearer ${token}` },
                    method: "POST",
                });
                const newGoalData = await newGoal.json();
                setGoalState(newGoalData);
            } else {
                setGoalState(responseData);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const updateGoal = async () => {
        try {
            const token = await getAccessTokenSilently();
            const updateGoal = await fetch(`${serverUrl}/api/goal/${user.sub}`, {
                headers: { Authorization: `Bearer ${token}` },
                method: "PUT",
                body: { finish: debouncedState }
            });
            console.log(updateGoal);
        } catch (err) {
            console.log(err);
        }
    }

    // Run functions once upon render
    useEffect(() => {
        getDailyGoals();
    }, []);

    // Run function only after debounce timer passes
    useEffect(() => {
        updateGoal();
    }, [debouncedState])

    return (
        <div>

        </div>
    )
};

export default Goal;
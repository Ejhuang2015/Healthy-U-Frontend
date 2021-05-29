import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./style.css"
import useDebounce from "../../utils/debounceHook"

function ChallengeGrid() {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const { user, getAccessTokenSilently } = useAuth0();
    const [challengeState, setChallengeState] = useState();
    const [currentTileState, setCurrentTileState] = useState(false);
    const today = new Date(new Date().setHours(0, 0, 0, 0));

    const debouncedState = useDebounce(currentTileState, 500)

    const getChallenge = async () => {
        try {
            const token = await getAccessTokenSilently();
            const latestChallenge = await fetch(`${serverUrl}/api/challenge/${user.sub}`, {
                headers: { Authorization: `Bearer ${token}` },
                method: "GET"
            });
            const responseData = await latestChallenge.json();
            console.log(responseData);
            setChallengeState(responseData);
        } catch (err) {
            console.log(err);
        }
    }

    const updateTile = async () => {
        try {
            const token = await getAccessTokenSilently();
            const updateChallenge = await fetch(`${serverUrl}/api/challenge/${user.sub}`, {
                headers: { Authorization: `Bearer ${token}` },
                method: "PUT",
                body: { finish: debouncedState }
            });
            console.log(updateChallenge);
        } catch (err) {
            console.log(err);
        }
    }

    function currentTileClickHandler() {
        setCurrentTileState(!currentTileState);
    }

    function mapTiles(day) {
        const tileDate = new Date(day.date);
        console.log(tileDate);
        console.log(today);
        // Past
        if (tileDate - today < 0) {
            return (<div className={day.finish ? "col challengeSuccess" : "col challengeFail"}> {day.day} </div>)
        };
        // Current
        if (tileDate - today === 0) {
            return (<div onClick={currentTileClickHandler} className={currentTileState ? "col challengeSuccess" : "col challengeFail"}> {day.day} </div>)
        };
        // Future
        if (tileDate - today > 0) {
            return (<div className="col challengeFuture"> {day.day} </div>)
        }
        else {
            return "Error day.date not found";
        };
    }

    // Run functions once upon render
    useEffect(() => {
        getChallenge();
    }, []);

    // Run function only after debounce timer passes
    useEffect(() => {
        updateTile();
    }, [debouncedState])

    return (
        <div>
            {challengeState ?
                <div>
                <h1>{challengeState.title}</h1>
                <div>
                    <div className="row">
                        {challengeState.days.slice(0, 7).map(mapTiles)}
                    </div>
                    <div className="row">
                        {challengeState.days.slice(7, 14).map(mapTiles)}
                    </div>
                    <div className="row">
                        {challengeState.days.slice(14, 21).map(mapTiles)}
                    </div>
                    <div className="row">
                        {challengeState.days.slice(21, 28).map(mapTiles)}
                    </div>
                    <div className="row">
                        {challengeState.days.slice(28, 35).map(mapTiles)}
                    </div>
                    <div className="row">
                        {challengeState.days.slice(35, 42).map(mapTiles)}
                    </div>
                    <div className="row">
                        {challengeState.days.slice(42).map(mapTiles)}
                    </div>
                </div>
                </div>
            :
                "" 
            }
        </div>
    );
};

export default ChallengeGrid;
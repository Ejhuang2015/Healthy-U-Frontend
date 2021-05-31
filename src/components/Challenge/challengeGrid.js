import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./style.css"
import useDebounce from "../../utils/debounceHook"

function ChallengeGrid() {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const { user, getAccessTokenSilently } = useAuth0();
    const [challengeState, setChallengeState] = useState();
    const [currentTileState, setCurrentTileState] = useState();
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
            // Get current tile's index value
            const creationDate = new Date(responseData.date);
            const currentIndex = (today - creationDate) / 86400000;
            // Set data
            setChallengeState(responseData);
            setCurrentTileState(responseData.days[currentIndex].finish);
        } catch (err) {
            console.log(err);
        }
    }

    const updateTile = async () => {
        try {
            const data = {
                finish: debouncedState,
                date: new Date(new Date().setHours(0, 0, 0, 0))
            }
            const token = await getAccessTokenSilently();
            await fetch(`${serverUrl}/api/challenge/${user.sub}`, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                method: "PUT",
                body: JSON.stringify(data)
            });
        } catch (err) {
            console.log(err);
        }
    }

    function currentTileClickHandler() {
        setCurrentTileState(!currentTileState);
    }

    function mapTiles(day) {
        const tileDate = new Date(day.date);
        // Past
        if (tileDate - today < 0) {
            return (<div key={tileDate} className={day.finish ? "col border border-dark border-2 challengeSuccess" : "col border border-dark border-2 challengeFail"}>Day {day.day}</div>)
        };
        // Current
        if (tileDate - today === 0) {
            return (<div key={tileDate} onClick={currentTileClickHandler} className={currentTileState ? "col border border-dark border-2 challengeSuccess" : "col border border-dark border-2 challengeFail"}>Day {day.day}</div>)
        };
        // Future
        if (tileDate - today > 0) {
            return (<div key={tileDate} className="col border border-dark border-2 challengeFuture">Day {day.day}</div>)
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
        if (currentTileState !== undefined) {
            updateTile();
        }
    }, [debouncedState])

    return (
        <div>
            {challengeState ?
                <div>
                    <h1>{challengeState.title}</h1>
                    <div className="text-center border border-2 border-dark">
                        <div className="row mx-auto">
                            {challengeState.days.slice(0, 7).map(mapTiles)}
                        </div>
                        <div className="row mx-auto">
                            {challengeState.days.slice(7, 14).map(mapTiles)}
                        </div>
                        <div className="row mx-auto">
                            {challengeState.days.slice(14, 21).map(mapTiles)}
                        </div>
                        <div className="row mx-auto">
                            {challengeState.days.slice(21, 28).map(mapTiles)}
                        </div>
                        <div className="row mx-auto">
                            {challengeState.days.slice(28, 35).map(mapTiles)}
                        </div>
                        <div className="row mx-auto">
                            {challengeState.days.slice(35, 42).map(mapTiles)}
                        </div>
                        <div className="row mx-auto">
                            {challengeState.days.slice(42).map(mapTiles)}
                        </div>
                    </div>
                </div>
                :
                "Loading..."
            }
        </div>
    );
};

export default ChallengeGrid;
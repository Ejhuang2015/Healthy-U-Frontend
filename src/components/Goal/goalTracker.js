import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useDebounce from "../../utils/debounceHook"
import "./style.css"

// Props needs number of checked icons, item, and img src
function GoalTracker(props) {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const { user, getAccessTokenSilently } = useAuth0();
    const [checkedState, setCheckedState] = useState(props.checked);

    const debouncedState = useDebounce(checkedState, 500)

    function addChecked() {
        if (checkedState < 8) {
            setCheckedState(checkedState + 1);
        }
    }
    function subtractChecked() {
        if(checkedState > 0) {
            setCheckedState(checkedState - 1);
        }
    }

    function mapChecked(item, index) {
        return (<img key={index} className="col goalIcon faded" src={props.src} alt={`Checked ${props.item}`} />)
    }
    function mapUnchecked(item, index) {
        return (<img key={index} className="col goalIcon" src={props.src} alt={`Unchecked ${props.item}`} />)
    }

    async function updateDatabase() {
        try {
            const token = await getAccessTokenSilently();
            await fetch(`${serverUrl}/api/goal/${user.sub}`, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                method: "PUT",
                body: JSON.stringify({ key: props.item, value: debouncedState })
            });
        } catch (err){
            console.log(err);
        }
    }

    // Run function only after debounce timer passes
    useEffect(() => {
        updateDatabase();
    }, [debouncedState])

    return (
        <div className="row">
            <div onClick={addChecked}>
                {[...Array(checkedState)].map(mapChecked)}
                {[...Array(8 - checkedState)].map(mapUnchecked)}
            </div>
            <button onClick={subtractChecked}>{`Uncheck ${props.item}`}</button>
        </div>
    )
};

export default GoalTracker;
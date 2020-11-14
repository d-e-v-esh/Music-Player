import {
    faAngleLeft,
    faAngleRight,
    faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
const Player = ({ currentSong }) => {
    return (
        <div className="player">
            <div className="time-control">
                <p>Start Time</p>
                <input type="range" />
                <p>End Time</p>
            </div>
            {/* Icons */}
            <div className="play-control">
                <FontAwesomeIcon
                    className="skip-back"
                    icon={faAngleLeft}
                    size="2x"
                />
                <FontAwesomeIcon
                    onClick={playSongHandler}
                    className="play"
                    icon={faPlay}
                    size="2x"
                />
                <FontAwesomeIcon
                    className="skip-forward"
                    icon={faAngleRight}
                    size="2x" // Maks it 2 times bigger
                />
            </div>
            <audio src={currentSong.audio} />
        </div>
    );
};

export default Player;

import {
    faAngleLeft,
    faAngleRight,
    faPause,
    faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
    const audioRef = useRef(null);

    // When we clink on the button
    // If the song is playing then pause it and change the state to !isPlaying
    // else => the song is paused => Play the song.
    // (!isPlaying) is just toggeling the player on and off. In both cases, we are setting the playing to the opposit of what it was. true<=>false
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    // Updating the time of the song played on the player.
    const timeUpdateHandler = (e) => {
        // Here we have access to the event of the onTimeUpdate
        // This event gives us the current time and the duration of the song.
        const current = e.target.currentTime;
        const duration = e.target.duration;
        // Updating the state of the timer on both sides of the slider
        setSongInfo({ ...songInfo, currentTime: current, duration: duration });

        console.log(current);
    };

    // State
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    });

    const getTime = (time) => {
        // Function that formats numbers in minutes and seconds
        return (
            Math.floor(time / 60) +
            ":" +
            ("0" + Math.floor(time % 60)).slice(-2)
        );
    };
    const dragHandler = (e) => {
        // Here e.target.value gives us where we leave off the slider.
        // We will set that to the current time so that the slider controls the song time.

        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value });
    };
    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input
                    // This is the slider

                    type="range"
                    min={0}
                    // Minimum is always 0
                    max={songInfo.duration}
                    // max would be the length of the
                    value={songInfo.currentTime}
                    // Where we move the slider, dragHandler is going to be called.
                    onChange={dragHandler}
                />
                <p>{getTime(songInfo.duration)}</p>
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
                    // If song is playing then show the pause icon otherwise show the play icon
                    icon={isPlaying ? faPause : faPlay}
                    size="2x"
                />
                <FontAwesomeIcon
                    className="skip-forward"
                    icon={faAngleRight}
                    size="2x" // Maks it 2 times bigger
                />
            </div>
            {/* onTimeUpdate runs everytime the time changes on the audio. */}
            <audio
                ref={audioRef}
                src={currentSong.audio}
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler} // This makes the time load on the screen before we hit the play button otherwise we can't see the time and duration before hitting the play button.
            />
        </div>
    );
};

export default Player;

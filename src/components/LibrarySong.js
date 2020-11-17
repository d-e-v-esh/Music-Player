import React from "react";
import { playAudio } from "../util";
const LibrarySong = ({
    song,
    setCurrentSong,
    songs,
    id,
    audioRef,
    isPlaying,
    setSongs,
}) => {
    // This function is going to run everytime we click on a song in the library.

    const songSelectHandler = () => {
        // We are updating the state of our current song to the song that we clicked on.

        // setCurrentSong is the state that renders the song the player will play
        setCurrentSong(song);

        // Add active state
        // Basically switches the active: true for the song that is playing.
        // We take our song form the state, map over them

        // It will go through every single song in the database.

        // If the current song's id is equal to the id of any song in the database then we turn that song's active to true, Otherwise we change it to false.

        // Whenever I click on any song, it is going to change to true and the rest of them will change to false.

        const newSongs = songs.map((song) => {
            if (song.id === id) {
                return {
                    ...song,
                    active: true,
                };
            } else {
                return {
                    ...song,
                    active: false,
                };
            }
        });
        setSongs(newSongs);

        playAudio(isPlaying, audioRef);
    };

    return (
        // We will set an onClick on the whole div that renders a song in the library.
        // This means that when we click on one particular song then the player well be routed to that song that we clicked on.

        <div
            onClick={songSelectHandler}
            className={`library-song ${song.active ? "selected" : ""}`}>
            {/* The above ternary operator says, if the song is active, set the className to selected otherwise nothing. We do this becuse we can style the selected song to look differently in the library */}

            <img src={song.cover} alt={song.name} />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
};

export default LibrarySong;

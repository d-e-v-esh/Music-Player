import React from "react";
import LibrarySong from "./LibrarySong";
const Library = ({
    songs,
    setCurrentSong,
    audioRef,
    isPlaying,
    setSongs,
    libraryStatus,
}) => {
    return (
        // If library status is true then "active-library" gets activated (class of active-library gets added) else nothing happnes.
        <div className={`library ${libraryStatus ? "active-library" : ""}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map((song) => (
                    <LibrarySong
                        song={song}
                        setCurrentSong={setCurrentSong}
                        songs={songs}
                        id={song.id}
                        key={song.id}
                        audioRef={audioRef}
                        // We pass down is playing because when we click on another song, that song has not been loaded up yet so we need to make a promise which says => when that song is loaded up, play the song.
                        // If we don't do that, we would probably need to click on play twice
                        isPlaying={isPlaying}
                        setSongs={setSongs}
                    />
                ))}
            </div>
        </div>
    );
};

export default Library;

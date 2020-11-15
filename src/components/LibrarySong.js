import React from "react";

const LibrarySong = ({
    song,
    setCurrentSong,
    songs,
    id,
    audioRef,
    isPlaying,
}) => {
    // This function is going to run everytime we click on a song in the library.

    const songSelectHandler = () => {
        // We are updating the state of our current song to the song that we clicked on.

        // setCurrentSong is the state that renders the song the player will play
        setCurrentSong(song);

        // audioRef.current.play();

        if (isPlaying) {
            // We are checking if the song is playing, if that is true, when we change the song, the song should keep playing and not start from a pause.
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then((audio) => {
                    audioRef.current.play();
                });
            }
        }
    };

    return (
        // We will set an onClick on the whole div that renders a song in the library.
        // This means that when we click on one particular song then the player well be routed to that song that we clicked on.

        <div onClick={songSelectHandler} className="library-song">
            <img src={song.cover} alt={song.name} />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
};

export default LibrarySong;

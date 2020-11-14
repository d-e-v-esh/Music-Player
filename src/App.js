import React, { useState } from "react";
// Adding Components
import Library from "./components/Library";
import Player from "./components/Player";
import Song from "./components/Song";
// Importing Styles
import "./styles/app.scss";
// Import Util
import data from "./util";

function App() {
    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSongs] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    // If I run this, all this data functions does is returns the util data.
    return (
        <div className="App">
            <Song currentSong={currentSong} />
            {/* The first currentSong is the name(any name)|| Second current song is we are passing down the state. */}
            <Player
                currentSong={currentSong}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
            />
            <Library songs={songs} />
        </div>
    );
}

export default App;

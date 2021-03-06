import React, { useRef, useState } from "react";
// Adding Components
import Library from "./components/Library";
import Nav from "./components/Nav";
import Player from "./components/Player";
import Song from "./components/Song";
// Import Util
import data from "./data";
// Importing Styles
import "./styles/app.scss";

function App() {
  const audioRef = useRef(null);
  // State
  // Library Status contains the state of the side song bar, if it is open and showing or closed and hidden
  const [libraryStatus, setLibraryStatus] = useState(false);

  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  // Updating the time of the song played on the player.
  const timeUpdateHandler = (e) => {
    // Here we have access to the event of the onTimeUpdate
    // This event gives us the current time and the duration of the song.
    const current = e.target.currentTime;
    const duration = e.target.duration;

    //Calculate Percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    console.log(animation);
    // Updating the state of the timer on both sides of the slider
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
      animationPercentage: animation,
    });
  };

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  };
  // If I run this, all this data functions does is returns the util data.
  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      {/* The first currentSong is the name(any name)|| Second current song is we are passing down the state. */}
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef} // Pass down the audio to the player
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
      />

      {/* Here in the library we are passing down  */}
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        libraryStatus={libraryStatus}
        setSongs={setSongs}
      />
      {/* onTimeUpdate runs everytime the time changes on the audio. */}
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler} // This makes the time load on the screen before we hit the play button otherwise we can't see the time and duration before hitting the play button.
        onEnded={songEndHandler}
        preload="true"
      />
    </div>
  );
}

export default App;

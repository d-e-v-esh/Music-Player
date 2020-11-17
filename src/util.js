export const playAudio = ({ isPlaying, audioRef }) => {
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

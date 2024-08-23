const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist-name');
const playlist = document.getElementById('playlist');
const songs = playlist.getElementsByTagName('li');

let currentSongIndex = 0;

function loadSong(song) {
    audioPlayer.src = song.getAttribute('data-src');
    songTitle.textContent = song.getAttribute('data-title');
    artistName.textContent = song.getAttribute('data-artist');
}

function playSong() {
    audioPlayer.play();
    playPauseBtn.textContent = '⏸';
}

function pauseSong() {
    audioPlayer.pause();
    playPauseBtn.textContent = '▶️';
}

function updateProgress() {
    const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progress.value = progressPercent;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;

    audioPlayer.currentTime = (clickX / width) * duration;
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
}

function setVolume() {
    audioPlayer.volume = volume.value / 100;
}

playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audioPlayer.addEventListener('timeupdate', updateProgress);
progress.addEventListener('click', setProgress);
volume.addEventListener('input', setVolume);

playlist.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        currentSongIndex = Array.from(songs).indexOf(e.target);
        loadSong(e.target);
        playSong();
    }
});

// Load the first song initially
loadSong(songs[currentSongIndex]);

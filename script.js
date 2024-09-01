document.addEventListener("DOMContentLoaded", () => {
    const audioPlayer = document.getElementById('audio-player');
    const playlist = document.getElementById('playlist');
    const songTitle = document.getElementById('song-title');
    const artistName = document.getElementById('artist-name');
    const albumCover = document.getElementById('album-cover');
    const playPauseBtn = document.getElementById('play-pause-btn');
    let isPlaying = false;

    // Load the selected song
    function loadSong(song) {
        const songSrc = song.getAttribute('data-src');
        const title = song.getAttribute('data-title');
        const artist = song.getAttribute('data-artist');
        
        audioPlayer.src = songSrc;
        songTitle.textContent = title;
        artistName.textContent = artist;
        // Update album cover here if needed
    }

    // Play or pause the song
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            audioPlayer.pause();
            playPauseBtn.textContent = '▶️';
        } else {
            audioPlayer.play();
            playPauseBtn.textContent = '⏸';
        }
        isPlaying = !isPlaying;
    });

    // Add click event to each song in the playlist
    playlist.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            loadSong(e.target);
            audioPlayer.play();
            isPlaying = true;
            playPauseBtn.textContent = '⏸';
        }
    });

    // Add new song
    document.getElementById('add-song-btn').addEventListener('click', () => {
        const title = document.getElementById('new-song-title').value;
        const artist = document.getElementById('new-artist-name').value;
        const src = document.getElementById('new-song-src').value;
        
        if (title && artist && src) {
            const li = document.createElement('li');
            li.textContent = title;
            li.setAttribute('data-src', src);
            li.setAttribute('data-title', title);
            li.setAttribute('data-artist', artist);
            document.getElementById('playlist').appendChild(li);
    
            // Clear input fields after adding
            document.getElementById('new-song-title').value = '';
            document.getElementById('new-artist-name').value = '';
            document.getElementById('new-song-src').value = '';
        } else {
            alert('Please fill out all fields');
        }
    });
    

    // Remove selected song
    document.getElementById('remove-song-btn').addEventListener('click', () => {
        const selectedSong = playlist.querySelector('li.selected');
        if (selectedSong) {
            playlist.removeChild(selectedSong);
        } else {
            alert('Please select a song to remove');
        }
    });

    // Select song for deletion
    playlist.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            playlist.querySelectorAll('li').forEach(song => song.classList.remove('selected'));
            e.target.classList.add('selected');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playPauseButton = document.getElementById('play-pause');
    const rewindButton = document.getElementById('rewind');
    const forwardButton = document.getElementById('forward');
    const currentTimeDisplay = document.getElementById('current-time');
    const progressBar = document.getElementById('progress-bar');
    const titlesList = document.getElementById('titles-list');
    const addTitleButton = document.getElementById('add-title');
    const removeTitleButton = document.getElementById('remove-title');
  
    // Example playlist with separate mp3 files
    let playlist = [
        { title: "Father Stretch My Hand - Ye | fsmh.mp3", src: "../../group_assignments/ga3/audio/fsmh.mp3" },
        { title: "Pt.2  - Ye | pt2.mp3", src: "../../group_assignments/ga3/audio/pt2.mp3" },
        { title: "Come To Life - Ye | ctl.mp3", src: "../../group_assignments/ga3/audio/ctl.mp3" },
        { title: "Heaven And Hell - Ye | hnh.mp3", src: "../../group_assignments/ga3/audio/hnh.mp3" },
        { title: "Street Lights - Ye | st.mp3", src: "../../group_assignments/ga3/audio/st.mp3" }
    ];
  
    let currentSongIndex = 0;
  
    // Load a song from the playlist by its index
    function loadSong(index) {
      currentSongIndex = index;
      audio.src = playlist[index].src;
      audio.load();
      // Optionally, update the UI to highlight the current song.
      highlightCurrentSong();
    }
  
    // Render the playlist in the DOM
    function renderPlaylist() {
      titlesList.innerHTML = "";
      playlist.forEach((item, index) => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = item.title;
        button.addEventListener('click', () => {
          loadSong(index);
          audio.play();
          updatePlayPauseIcon();
        });
        li.appendChild(button);
        titlesList.appendChild(li);
      });
      highlightCurrentSong();
    }
  
    // Highlight the currently playing song in the playlist
    function highlightCurrentSong() {
      const buttons = titlesList.querySelectorAll('button');
      buttons.forEach((btn, index) => {
        btn.style.backgroundColor = (index === currentSongIndex) ? '#e0f0ff' : '#fafafa';
      });
    }
  
    // Update play/pause icon based on the audio state
    function updatePlayPauseIcon() {
      const icon = playPauseButton.querySelector('i');
      if (audio.paused) {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
      } else {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
      }
    }
  
    // Toggle play/pause functionality with icon update
    playPauseButton.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
      updatePlayPauseIcon();
    });
  
    // Rewind 5 seconds
    rewindButton.addEventListener('click', () => {
      audio.currentTime = Math.max(0, audio.currentTime - 5);
    });
  
    // Forward 5 seconds
    forwardButton.addEventListener('click', () => {
      audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
    });
  
    // Update current time display and progress bar as the audio plays
    audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = progressPercent + '%';
      }
      currentTimeDisplay.textContent = formatTime(audio.currentTime);
    });
  
    // Format seconds as minutes:seconds
    function formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    }
  
    // When a song ends, automatically load and play the next song
    audio.addEventListener('ended', () => {
      if (currentSongIndex < playlist.length - 1) {
        loadSong(currentSongIndex + 1);
        audio.play();
      } else {
        // Optionally loop back to the first song
        loadSong(0);
        // Loops song
        audio.play();
      }
      updatePlayPauseIcon();
    });
  
    // Add a new song into the playlist after the currently playing song.
    addTitleButton.addEventListener('click', () => {
      const titleName = prompt("Enter the new song title (Ex: Example Music - Example Artist | example.mp3):");
      const src = prompt("Enter the URL or path for the mp3 file (Ex: ../../group_assignments/ga3/audio/xxx.mp3):");
      if (!titleName || !src) return;
      // Insert the new song immediately after the current song.
      playlist.splice(currentSongIndex + 1, 0, { title: titleName, src: src });
      renderPlaylist();
    });
  
    // Remove the currently playing song from the playlist.
    removeTitleButton.addEventListener('click', () => {
      if (playlist.length === 0) return;
      // Remove the current song.
      playlist.splice(currentSongIndex, 1);
      if (playlist.length === 0) {
        audio.pause();
        audio.src = "";
        currentSongIndex = 0;
      } else {
        // If the removed song was not the last, currentSongIndex stays the same.
        // Otherwise, adjust to the new last song.
        currentSongIndex = Math.min(currentSongIndex, playlist.length - 1);
        loadSong(currentSongIndex);
        audio.play();
      }
      renderPlaylist();
    });
  
    // Initialize the playlist display and load the first song (if available)
    renderPlaylist();
    if (playlist.length > 0) {
      loadSong(0);
    }
});
  
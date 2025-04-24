document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playPauseButton = document.getElementById('play-pause');
    const rewindButton = document.getElementById('rewind');
    const forwardButton = document.getElementById('forward');
    const loopButton = document.getElementById('loop');
    const themeToggle = document.getElementById('theme-toggle');
    const currentTimeDisplay = document.getElementById('current-time');
    const progressBar = document.getElementById('progress-bar');
    const titlesList = document.getElementById('titles-list');
    const addTitleButton = document.getElementById('add-title');
    const removeTitleButton = document.getElementById('remove-title');
  
    // Initialize IndexedDB
    let db;
    const request = indexedDB.open('AudioPlayerDB', 1);

    request.onerror = (event) => {
        console.error('Database error:', event.target.error);
    };

    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('songs')) {
            db.createObjectStore('songs', { keyPath: 'id', autoIncrement: true });
        }
    };

    request.onsuccess = (event) => {
        db = event.target.result;
        loadSongsFromDB();
    };

    // Load songs from IndexedDB
    function loadSongsFromDB() {
        const transaction = db.transaction(['songs'], 'readonly');
        const store = transaction.objectStore('songs');
        const request = store.getAll();

        request.onsuccess = () => {
            const storedSongs = request.result;
            // Only add stored songs that aren't already in the playlist
            storedSongs.forEach(storedSong => {
                if (!playlist.some(song => song.title === storedSong.title)) {
                    playlist.push(storedSong);
                }
            });
            renderPlaylist();
            if (playlist.length > 0) {
                loadSong(0);
            }
        };
    }

    // Save song to IndexedDB
    function saveSongToDB(song) {
        const transaction = db.transaction(['songs'], 'readwrite');
        const store = transaction.objectStore('songs');
        store.add(song);
    }

    // Delete song from IndexedDB
    function deleteSongFromDB(id) {
        const transaction = db.transaction(['songs'], 'readwrite');
        const store = transaction.objectStore('songs');
        store.delete(id);
    }

    // Theme handling
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    let isDarkMode = localStorage.getItem('theme') === 'dark' || 
                    (localStorage.getItem('theme') === null && prefersDarkScheme.matches);

    function setTheme(isDark) {
        document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
        themeToggle.innerHTML = `<i class="fas fa-${isDark ? 'sun' : 'moon'}"></i>`;
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        setTheme(isDarkMode);
    });

    setTheme(isDarkMode);

    // Loop functionality
    let isLooping = false;
    loopButton.addEventListener('click', () => {
        isLooping = !isLooping;
        audio.loop = isLooping;
        loopButton.classList.toggle('active', isLooping);
    });
  
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
  
    // Improved song addition with file upload
    addTitleButton.addEventListener('click', () => {
        const form = document.createElement('form');
        form.innerHTML = `
            <div style="margin: 1em 0;">
                <label for="song-title">Song Title:</label>
                <input type="text" id="song-title" required style="width: 100%; padding: 0.5em; margin: 0.5em 0;">
            </div>
            <div style="margin: 1em 0;">
                <label for="song-file">MP3 File:</label>
                <input type="file" id="song-file" accept=".mp3" required style="width: 100%; padding: 0.5em; margin: 0.5em 0;">
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 1em;">
                <button type="submit" style="background-color: var(--primary-color); color: white; padding: 0.5em 1em; border: none; border-radius: 4px;">Add Song</button>
                <button type="button" id="cancel-add" style="background-color: #666; color: white; padding: 0.5em 1em; border: none; border-radius: 4px;">Cancel</button>
            </div>
        `;

        const dialog = document.createElement('div');
        dialog.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--card-bg);
            padding: 2em;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 1000;
            width: 80%;
            max-width: 400px;
        `;

        dialog.appendChild(form);
        document.body.appendChild(dialog);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('song-title').value;
            const fileInput = document.getElementById('song-file');
            const file = fileInput.files[0];

            if (title && file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const song = {
                        title: title,
                        src: e.target.result,
                        id: Date.now() // Unique ID for the song
                    };
                    saveSongToDB(song);
                    playlist.push(song);
                    renderPlaylist();
                    document.body.removeChild(dialog);
                };
                reader.readAsDataURL(file);
            }
        });

        document.getElementById('cancel-add').addEventListener('click', () => {
            document.body.removeChild(dialog);
        });
    });
  
    // Update remove title functionality to also delete from IndexedDB
    removeTitleButton.addEventListener('click', () => {
        if (playlist.length === 0) return;
        
        const songToRemove = playlist[currentSongIndex];
        deleteSongFromDB(songToRemove.id);
        
        playlist.splice(currentSongIndex, 1);
        if (playlist.length === 0) {
            audio.pause();
            audio.src = "";
            currentSongIndex = 0;
        } else {
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
  
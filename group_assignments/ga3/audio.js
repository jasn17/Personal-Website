document.addEventListener("DOMContentLoaded", function(){
    const songs = document.querySelectorAll('.song');
    const playerContainer = document.getElementById('player-container');
  
    songs.forEach(song => {
      song.addEventListener('click', function(){
        createAudioPlayer(song);
      });
    });
  
    function createAudioPlayer(songElement) {
        const title = songElement.getAttribute('data-title');
        const artist = songElement.getAttribute('data-artist');
        const src = songElement.getAttribute('data-src');

        const playerDiv = document.createElement('div');
        playerDiv.classList.add('audio-player');
    
        const header = document.createElement('div');
        header.classList.add('audio-header');
        header.innerHTML = `<strong>${title}</strong> by ${artist}`;
        playerDiv.appendChild(header);
    
        // Instantiate the audio element
        const audio = document.createElement('audio');
        audio.src = src;
        audio.preload = "metadata";
        playerDiv.appendChild(audio);
    
        // Controls (play, pause, volume)
        const controlsDiv = document.createElement('div');
        controlsDiv.classList.add('controls');
    
        // Play button with icon
        const playBtn = document.createElement('button');
        const playIcon = document.createElement('i');
        playIcon.className = "fa fa-play"; // Font Awesome play icon
        playBtn.appendChild(playIcon);
        playBtn.addEventListener('click', () => audio.play());
        controlsDiv.appendChild(playBtn);
    
        // Pause button with icon
        const pauseBtn = document.createElement('button');
        const pauseIcon = document.createElement('i');
        pauseIcon.className = "fa fa-pause"; // Font Awesome pause icon
        pauseBtn.appendChild(pauseIcon);
        pauseBtn.addEventListener('click', () => audio.pause());
        controlsDiv.appendChild(pauseBtn);
    
        // Volume label
        const volLabel = document.createElement('span');
        volLabel.textContent = " Volume: ";
        controlsDiv.appendChild(volLabel);
        
        // Volume slider
        const volumeSlider = document.createElement('input');
        volumeSlider.type = "range";
        volumeSlider.min = "0";
        volumeSlider.max = "1";
        volumeSlider.step = "0.01";
        volumeSlider.value = audio.volume;
        volumeSlider.addEventListener('input', function(){
            audio.volume = volumeSlider.value;
        });
        controlsDiv.appendChild(volumeSlider);
    
        playerDiv.appendChild(controlsDiv);
    
        // Time display (current time and duration)
        const timeDisplay = document.createElement('div');
        timeDisplay.classList.add('time-display');
        timeDisplay.textContent = "0:00 / 0:00";
        playerDiv.appendChild(timeDisplay);
    
        // Update time display once metadata is loaded
        audio.addEventListener('loadedmetadata', function(){
            timeDisplay.textContent = formatTime(0) + " / " + formatTime(audio.duration);
        });
    
        // Update current time as the song plays
        audio.addEventListener('timeupdate', function(){
            timeDisplay.textContent = formatTime(audio.currentTime) + " / " + formatTime(audio.duration);
        });
    
        // Append the new audio player to the right column
        playerContainer.appendChild(playerDiv);
    }
  
    // Helper: convert seconds into minutes:seconds format
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return mins + ":" + (secs < 10 ? "0" : "") + secs;
    }
});

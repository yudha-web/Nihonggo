const songs = [
    '01 Dai 1 Ka - Kaiwa.mp3', '02 Dai 1 Ka - Mondai 1.mp3', '03 Dai 1 Ka - Mondai 2.mp3', '04 Dai 1 Ka - Mondai 3.mp3',
    '05 Dai 2 Ka - Kaiwa.mp3', '06 Dai 2 Ka - Mondai 1.mp3', '07 Dai 2 Ka - Mondai 2.mp3', '08 Dai 2 Ka - Mondai 3.mp3',
    '09 Dai 3 Ka - Kaiwa.mp3', '10 Dai 3 Ka - Mondai 1.mp3', '11 Dai 3 Ka - Mondai 2.mp3', '12 Dai 4 Ka - Kaiwa.mp3',
    '13 Dai 4 Ka - Mondai 1.mp3', '14 Dai 4 Ka - Mondai 2.mp3', '15 Dai 4 Ka - Mondai 3.mp3', '16 Dai 4 Ka - Mondai 4.mp3',
    '17 Dai 5 Ka - Kaiwa.mp3', '18 Dai 5 Ka - Mondai 1.mp3', '19 Dai 5 Ka - Mondai 2.mp3', '20 Dai 5 Ka - Mondai 3.mp3',
    '21 Dai 6 Ka - Kaiwa.mp3', '22 Dai 6 Ka - Mondai 1.mp3', '23 Dai 6 Ka - Mondai 2.mp3', '24 Dai 7 Ka - Kaiwa.mp3',
    '25 Dai 7 Ka - Mondai 1.mp3', '26 Dai 7 Ka - Mondai 2.mp3', '27 Dai 7 Ka - Mondai 3.mp3', '28 Dai 8 Ka - Kaiwa.mp3',
    '29 Dai 8 Ka - Mondai 1.mp3', '30 Dai 8 Ka - Mondai 2.mp3', '31 Dai 8 Ka - Mondai 3.mp3', '32 Dai 9 Ka - Kaiwa.mp3',
    '33 Dai 9 Ka - Mondai 1.mp3', '34 Dai 9 Ka - Mondai 2.mp3', '35 Dai 10 Ka - Kaiwa.mp3', '36 Dai 10 Ka - Mondai 1.mp3',
    '37 Dai 10 Ka - Mondai 2.mp3', '38 Dai 10 Ka - Mondai 3.mp3', '39 Dai 11 Ka - Kaiwa.mp3', '40 Dai 11 Ka - Mondai 1.mp3',
    '41 Dai 11 Ka - Mondai 2.mp3', '42 Dai 11 Ka - Mondai 3.mp3', '43 Dai 12 Ka - Kaiwa.mp3', '44 Dai 12 Ka - Mondai 1.mp3',
    '45 Dai 12 Ka - Mondai 2.mp3', '46 Dai 13 Ka - Kaiwa.mp3', '47 Dai 13 Ka - Mondai 1.mp3', '48 Dai 13 Ka - Mondai 2.mp3',
    '49 Dai 14 Ka - Kaiwa.mp3', '50 Dai 14 Ka - Mondai 1.mp3', '51 Dai 14 Ka - Mondai 2.mp3', '52 Dai 14 Ka - Mondai 3.mp3',
    '53 Dai 15 Ka - Kaiwa.mp3', '54 Dai 15 Ka - Mondai 1.mp3', '55 Dai 15 Ka - Mondai 2.mp3', '56 Dai 16 Ka - Kaiwa.mp3',
    '57 Dai 16 Ka - Mondai 1.mp3', '58 Dai 16 Ka - Mondai 2.mp3', '59 Dai 16 Ka - Mondai 3.mp3', '60 Dai 17 Ka - Kaiwa.mp3',
    '61 Dai 17 Ka - Mondai 1.mp3', '62 Dai 17 Ka - Mondai 2.mp3', '63 Dai 18 Ka - Kaiwa.mp3', '64 Dai 18 Ka - Mondai 1.mp3',
    '65 Dai 18 Ka - Mondai 2.mp3', '66 Dai 19 Ka - Kaiwa.mp3', '67 Dai 19 Ka - Mondai 1.mp3', '68 Dai 19 Ka - Mondai 2.mp3',
    '69 Dai 20 Ka - Kaiwa.mp3', '70 Dai 20 Ka - Mondai 1.mp3', '71 Dai 20 Ka - Mondai 2.mp3', '72 Dai 21 Ka - Kaiwa.mp3',
    '73 Dai 21 Ka - Mondai 1.mp3', '74 Dai 21 Ka - Mondai 2.mp3', '75 Dai 22 Ka - Kaiwa.mp3', '76 Dai 22 Ka - Mondai 1.mp3',
    '77 Dai 22 Ka - Mondai 2.mp3', '78 Dai 23 Ka - Kaiwa.mp3', '79 Dai 23 Ka - Mondai 1.mp3', '80 Dai 23 Ka - Mondai 2.mp3',
    '81 Dai 23 Ka - Mondai 3.mp3', '82 Dai 24 Ka - Kaiwa.mp3', '83 Dai 24 Ka - Mondai 1.mp3', '84 Dai 24 Ka - Mondai 2.mp3',
    '85 Dai 25 Ka - Kaiwa.mp3', '86 Dai 25 Ka - Mondai 1.mp3', '87 Dai 25 Ka - Mondai 2.mp3', '88 Juned.mp3', '89 Yanto.mp3'
];

let currentSongIndex = localStorage.getItem('lastPlayedIndex') || 0;
let isPlaying = false;
const audio = document.getElementById('main-audio');

// UI Elements
const songTbody = document.getElementById('song-tbody');
const playBtn = document.getElementById('play-pause');
const progressBar = document.getElementById('progress-fill');
const progressContainer = document.getElementById('progress-container');

// Easter Egg Logic
let logoClick = 0;
document.getElementById('logo').onclick = () => {
    logoClick++;
    if(logoClick === 5) {
        alert("Mode Rahasia: Aktif! Memutar lagu Yanto...");
        playSong(88); // Index Yanto
        document.documentElement.style.setProperty('--spotify-green', '#ff0055');
        logoClick = 0;
    }
};

// Render Table
function renderSongs(filter = "") {
    songTbody.innerHTML = '';
    songs.forEach((song, index) => {
        if(song.toLowerCase().includes(filter.toLowerCase())) {
            const tr = document.createElement('tr');
            if(index == currentSongIndex) tr.classList.add('active-row');
            
            tr.innerHTML = `
                <td class="col-id">${index == currentSongIndex && isPlaying ? '<i class="fa-solid fa-volume-high anim-bounce"></i>' : index + 1}</td>
                <td>${song.replace('.mp3', '')}</td>
                <td class="col-action">...</td>
            `;
            tr.onclick = () => playSong(index);
            songTbody.appendChild(tr);
        }
    });
}

// Player Functions
function playSong(index) {
    currentSongIndex = index;
    localStorage.setItem('lastPlayedIndex', index);
    audio.src = `audio/${songs[index]}`;
    document.getElementById('player-title').innerText = songs[index].replace('.mp3', '');
    audio.play();
    isPlaying = true;
    updateUI();
}

function updateUI() {
    playBtn.innerHTML = isPlaying ? '<i class="fa-solid fa-circle-pause"></i>' : '<i class="fa-solid fa-circle-play"></i>';
    renderSongs(document.getElementById('search-input').value);
}

playBtn.onclick = () => {
    if(isPlaying) audio.pause(); else audio.play();
    isPlaying = !isPlaying;
    updateUI();
};

document.getElementById('next').onclick = () => {
    currentSongIndex = (parseInt(currentSongIndex) + 1) % songs.length;
    playSong(currentSongIndex);
};

document.getElementById('prev').onclick = () => {
    currentSongIndex = (parseInt(currentSongIndex) - 1 + songs.length) % songs.length;
    playSong(currentSongIndex);
};

// Audio Progress
audio.ontimeupdate = () => {
    const { currentTime, duration } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    document.getElementById('curr-time').innerText = formatTime(currentTime);
    if(duration) document.getElementById('total-time').innerText = formatTime(duration);
};

progressContainer.onclick = (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
};

audio.onended = () => document.getElementById('next').click();

// Volume & Search
document.getElementById('volume-slider').oninput = (e) => audio.volume = e.target.value;
document.getElementById('search-input').oninput = (e) => renderSongs(e.target.value);

function formatTime(time) {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0'+sec : sec}`;
}

// Init
renderSongs();

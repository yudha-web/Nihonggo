<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Audio Player Minna Nihonggo</title>

<style>
/* (CSS kamu tetap, tidak diubah biar ringkas) */
</style>

</head>
<body>

<!-- (HTML kamu tetap sama, hanya tambah tombol A-B dan Repeat One) -->

<!-- TAMBAH DI controlsBottom (sebelah shuffle / loop) -->
<!-- Tambahkan ini di dalam .controlsBottom -->
<button id="repeatOne" class="smbtn" title="Repeat 1">1</button>
<button id="abloop" class="smbtn" title="A-B Loop">A↔B</button>

<audio id="audio"></audio>

<script>

// ==============================
// CONFIG
// ==============================
const files = [
  "01 Dai 1 Ka - Kaiwa.mp3",
  "02 Dai 1 Ka - Mondai 1.mp3"
  // (lanjutkan list kamu)
];

// ==============================
// ELEMENT
// ==============================
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const rwdBtn = document.getElementById('rwd');
const ffwBtn = document.getElementById('ffw');

const repeatBtn = document.getElementById('repeatOne');
const abBtn = document.getElementById('abloop');

// ==============================
// STATE
// ==============================
let current = 0;
let isPlaying = false;

// A-B LOOP
let loopA = null;
let loopB = null;
let isABLoop = false;

// REPEAT ONE
let repeatOne = false;

// ==============================
// CORE
// ==============================
function playIndex(i){
  current = i;
  audio.src = files[i];
  audio.play();
  isPlaying = true;
}

function togglePlay(){
  if(audio.paused){
    audio.play();
  } else {
    audio.pause();
  }
}

// ==============================
// CONTROLS
// ==============================

// ✅ 5 DETIK (SUDAH DIPERBAIKI)
rwdBtn.onclick = ()=>{
  audio.currentTime = Math.max(0, audio.currentTime - 5);
};

ffwBtn.onclick = ()=>{
  audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
};

// ==============================
// A-B LOOP
// ==============================
abBtn.onclick = () => {
  if (loopA === null) {
    loopA = audio.currentTime;
    abBtn.textContent = "A✓";
  } else if (loopB === null) {
    loopB = audio.currentTime;
    isABLoop = true;
    abBtn.textContent = "AB✓";
  } else {
    loopA = null;
    loopB = null;
    isABLoop = false;
    abBtn.textContent = "A↔B";
  }
};

// ==============================
// REPEAT ONE
// ==============================
repeatBtn.onclick = () => {
  repeatOne = !repeatOne;
  repeatBtn.classList.toggle('active-control', repeatOne);
};

// ==============================
// AUDIO EVENT
// ==============================
audio.addEventListener('timeupdate', () => {

  // A-B LOOP
  if (isABLoop && loopA !== null && loopB !== null) {
    if (audio.currentTime >= loopB) {
      audio.currentTime = loopA;
    }
  }

});

audio.addEventListener('ended', () => {

  // PRIORITAS: REPEAT ONE
  if (repeatOne) {
    playIndex(current);
    return;
  }

  // lanjut next
  current = (current + 1) % files.length;
  playIndex(current);
});

// ==============================
// KEYBOARD SHORTCUT
// ==============================
document.addEventListener('keydown', (e) => {

  if (e.code === 'Space') {
    e.preventDefault();
    togglePlay();
  }

  if (e.code === 'ArrowRight') {
    audio.currentTime += 5;
  }

  if (e.code === 'ArrowLeft') {
    audio.currentTime -= 5;
  }

});

</script>

</body>
</html> 
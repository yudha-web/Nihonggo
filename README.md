<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Minna Nihongo Player PRO</title>

<style>
:root{
  --bg:#0f1720;
  --card:#0f1728;
  --accent:#1db954;
  --text:#e6eef3;
}
body{
  margin:0;
  font-family:sans-serif;
  background:var(--bg);
  color:var(--text);
  display:flex;
  justify-content:center;
  padding:20px;
}
.player{
  width:350px;
  background:var(--card);
  border-radius:15px;
  padding:20px;
}
.title{
  text-align:center;
  font-weight:bold;
}
.controls{
  display:flex;
  justify-content:center;
  gap:10px;
  margin-top:15px;
}
button{
  border:none;
  border-radius:50%;
  padding:12px;
  background:#1f2a40;
  color:white;
  cursor:pointer;
}
button:hover{background:var(--accent);}
.big{
  width:60px;height:60px;font-size:18px;
}
.active{
  background:var(--accent);
}
.progress{
  height:10px;
  background:#333;
  margin-top:15px;
  border-radius:10px;
  cursor:pointer;
}
.bar{
  height:100%;
  width:0%;
  background:var(--accent);
  border-radius:10px;
}
.time{
  display:flex;
  justify-content:space-between;
  font-size:12px;
}
</style>
</head>

<body>

<div class="player">
  <div class="title" id="title">Loading...</div>

  <audio id="audio"></audio>

  <!-- CONTROL UTAMA -->
  <div class="controls">
    <button id="rwd">⏪5</button>
    <button id="play" class="big">▶</button>
    <button id="ffw">5⏩</button>
  </div>

  <!-- FITUR BELAJAR -->
  <div class="controls">
    <button id="repeatOne">🔁1</button>
    <button id="abloop">A↔B</button>
  </div>

  <!-- PROGRESS -->
  <div class="progress" id="progress">
    <div class="bar" id="bar"></div>
  </div>
  <div class="time">
    <span id="cur">0:00</span>
    <span id="dur">0:00</span>
  </div>
</div>

<script>

// ================= FILE =================
const files = [
"01 Dai 1 Ka - Kaiwa.mp3",
"02 Dai 1 Ka - Mondai 1.mp3"
];

// ================= ELEMENT =================
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const rwdBtn = document.getElementById('rwd');
const ffwBtn = document.getElementById('ffw');
const repeatBtn = document.getElementById('repeatOne');
const abBtn = document.getElementById('abloop');
const title = document.getElementById('title');
const bar = document.getElementById('bar');
const progress = document.getElementById('progress');
const cur = document.getElementById('cur');
const dur = document.getElementById('dur');

// ================= STATE =================
let current = 0;
let repeatOne = false;

// A-B LOOP
let loopA = null;
let loopB = null;
let isABLoop = false;

// ================= FUNCTION =================
function loadTrack(i){
  current = i;
  audio.src = files[i];
  title.textContent = files[i];
}

function togglePlay(){
  if(audio.paused){
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
}

function format(t){
  if(!t) return "0:00";
  let m = Math.floor(t/60);
  let s = Math.floor(t%60).toString().padStart(2,'0');
  return m+":"+s;
}

// ================= CONTROL =================

// ✅ SKIP 5 DETIK (FIX)
rwdBtn.onclick = ()=>{
  audio.currentTime = Math.max(0, audio.currentTime - 5);
};
ffwBtn.onclick = ()=>{
  audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
};

playBtn.onclick = togglePlay;

// ================= REPEAT =================
repeatBtn.onclick = ()=>{
  repeatOne = !repeatOne;
  repeatBtn.classList.toggle('active', repeatOne);
};

// ================= A-B LOOP =================
abBtn.onclick = ()=>{
  if(loopA === null){
    loopA = audio.currentTime;
    abBtn.textContent = "A✓";
  } else if(loopB === null){
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

// ================= EVENT =================
audio.addEventListener('timeupdate', ()=>{

  // progress
  let p = (audio.currentTime / audio.duration) * 100;
  bar.style.width = p + "%";
  cur.textContent = format(audio.currentTime);
  dur.textContent = format(audio.duration);

  // A-B LOOP
  if(isABLoop && loopA !== null && loopB !== null){
    if(audio.currentTime >= loopB){
      audio.currentTime = loopA;
    }
  }

});

audio.addEventListener('ended', ()=>{

  if(repeatOne){
    audio.currentTime = 0;
    audio.play();
    return;
  }

  current = (current + 1) % files.length;
  loadTrack(current);
  audio.play();
});

// ================= SEEK =================
progress.onclick = (e)=>{
  const rect = progress.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const percent = x / rect.width;
  audio.currentTime = percent * audio.duration;
};

// ================= KEYBOARD =================
document.addEventListener('keydown',(e)=>{
  if(e.code==="Space"){
    e.preventDefault();
    togglePlay();
  }
  if(e.code==="ArrowRight"){
    audio.currentTime += 5;
  }
  if(e.code==="ArrowLeft"){
    audio.currentTime -= 5;
  }
});

// INIT
loadTrack(0);

</script>

</body>
</html>
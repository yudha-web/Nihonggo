<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">

<title>Nihonggo Player</title>

<style>
:root{
  --bg:#020617;
  --card:#0f172a;
  --accent:#ffd54f;
  --accent2:#ffb300;
  --text:#ffffff;
  --muted:#94a3b8;
}

*{
  box-sizing:border-box;
}

body{
  margin:0;
  font-family:system-ui,sans-serif;
  background:
    radial-gradient(circle at top,#172554,#020617 70%);
  color:var(--text);
  min-height:100vh;
  padding:20px;
}

.wrap{
  max-width:420px;
  margin:auto;
}

.player{
  background:rgba(15,23,42,.75);
  backdrop-filter:blur(15px);
  border:1px solid rgba(255,255,255,.08);
  border-radius:28px;
  padding:24px;
  box-shadow:
    0 10px 30px rgba(0,0,0,.5);
}

.cover{
  width:100%;
  aspect-ratio:1;
  border-radius:24px;
  overflow:hidden;
  margin-bottom:20px;
}

.cover img{
  width:100%;
  height:100%;
  object-fit:cover;
}

h2{
  margin:0 0 10px;
  text-align:center;
  font-size:28px;
}

#title{
  text-align:center;
  font-size:18px;
  margin:15px 0 5px;
  font-weight:600;
}

.time{
  display:flex;
  justify-content:space-between;
  font-size:13px;
  color:var(--muted);
}

.progress{
  height:8px;
  background:#1e293b;
  border-radius:999px;
  overflow:hidden;
  margin:10px 0 25px;
  cursor:pointer;
}

.bar{
  height:100%;
  width:0%;
  border-radius:999px;
  background:linear-gradient(
    90deg,
    var(--accent),
    var(--accent2)
  );
  transition:.25s;
}

.controls{
  display:flex;
  justify-content:center;
  align-items:center;
  gap:12px;
  margin-bottom:20px;
}

.bigbtn{
  width:75px;
  height:75px;
  border:none;
  border-radius:50%;
  background:linear-gradient(
    135deg,
    var(--accent),
    var(--accent2)
  );
  color:black;
  font-size:28px;
  font-weight:bold;
  box-shadow:0 5px 20px rgba(255,213,79,.4);
  cursor:pointer;
  transition:.2s;
}

.bigbtn:hover{
  transform:scale(1.05);
}

.smbtn{
  width:50px;
  height:50px;
  border:none;
  border-radius:16px;
  background:#1e293b;
  color:white;
  font-size:18px;
  cursor:pointer;
  transition:.2s;
}

.smbtn:hover{
  transform:scale(1.08);
  background:#334155;
}

#playlist{
  margin-top:10px;
}

.track{
  padding:14px;
  border-radius:14px;
  margin-bottom:8px;
  background:rgba(255,255,255,.03);
  transition:.2s;
  cursor:pointer;
}

.track:hover{
  background:rgba(255,255,255,.08);
}

.track.active{
  background:linear-gradient(
    90deg,
    var(--accent),
    var(--accent2)
  );
  color:black;
  font-weight:bold;
}
</style>
</head>

<body>

<div class="wrap">

<div class="player">

<h2>🎧 Nihonggo Player</h2>

<div class="cover">
  <img src="cover.jpg">
</div>

<div id="title">-</div>

<div class="time">
  <span id="current">0:00</span>
  <span id="duration">0:00</span>
</div>

<div class="progress" id="progress">
  <div class="bar" id="bar"></div>
</div>

<div class="controls">
  <button id="prev" class="smbtn">⏮</button>
  <button id="rwd" class="smbtn">⏪</button>
  <button id="play" class="bigbtn">▶</button>
  <button id="ffw" class="smbtn">⏩</button>
  <button id="next" class="smbtn">⏭</button>
</div>

<div id="playlist"></div>

</div>
</div>

<audio id="audio"></audio>

<script>

// ================= FILE =================
const files = [
"01-Dai-1-Ka-Kaiwa.mp3",
"02-Dai-1-Ka-Mondai-1.mp3"
];

// ================= ELEMENT =================
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const title = document.getElementById("title");
const bar = document.getElementById("bar");
const playlist = document.getElementById("playlist");
const progress = document.getElementById("progress");

const current = document.getElementById("current");
const duration = document.getElementById("duration");

let index = 0;

// ================= LOAD =================
function load(i){

  index = i;

  audio.src = "audio/" + files[i];

  title.textContent = files[i]
    .replace(".mp3","")
    .replaceAll("-"," ");

  highlight();
}

// ================= PLAY =================
function toggle(){

  if(audio.paused){
    audio.play();
  }else{
    audio.pause();
  }
}

// ================= BUTTON ICON =================
audio.onplay = ()=>{
  playBtn.textContent = "⏸";
};

audio.onpause = ()=>{
  playBtn.textContent = "▶";
};

// ================= NEXT PREV =================
function next(){

  index = (index + 1) % files.length;

  load(index);

  audio.play();
}

function prev(){

  index = (index - 1 + files.length)
    % files.length;

  load(index);

  audio.play();
}

// ================= AUTO NEXT =================
audio.onended = ()=>{
  next();
};

// ================= TIME FORMAT =================
function formatTime(sec){

  if(isNaN(sec)) return "0:00";

  let m = Math.floor(sec / 60);

  let s = Math.floor(sec % 60);

  if(s < 10) s = "0" + s;

  return m + ":" + s;
}

// ================= PROGRESS =================
audio.addEventListener("timeupdate",()=>{

  let p =
    (audio.currentTime / audio.duration)
    * 100;

  bar.style.width = p + "%";

  current.textContent =
    formatTime(audio.currentTime);

  duration.textContent =
    formatTime(audio.duration);
});

// ================= SEEK =================
progress.onclick = (e)=>{

  const width = progress.clientWidth;

  const clickX = e.offsetX;

  const duration = audio.duration;

  audio.currentTime =
    (clickX / width) * duration;
};

// ================= SKIP =================
document.getElementById("rwd").onclick=()=>{
  audio.currentTime -= 5;
};

document.getElementById("ffw").onclick=()=>{
  audio.currentTime += 5;
};

// ================= EVENT =================
playBtn.onclick = toggle;

document.getElementById("next").onclick =
  next;

document.getElementById("prev").onclick =
  prev;

// ================= PLAYLIST =================
function build(){

  playlist.innerHTML = "";

  files.forEach((f,i)=>{

    let div =
      document.createElement("div");

    div.className = "track";

    div.textContent = f
      .replace(".mp3","")
      .replaceAll("-"," ");

    div.onclick = ()=>{

      load(i);

      audio.play();
    };

    div.dataset.i = i;

    playlist.appendChild(div);
  });
}

// ================= ACTIVE =================
function highlight(){

  document
    .querySelectorAll(".track")
    .forEach(e=>
      e.classList.remove("active")
    );

  let el =
    document.querySelector(
      `[data-i="${index}"]`
    );

  if(el)
    el.classList.add("active");
}

// ================= ERROR =================
audio.onerror = ()=>{

  alert(
    "Audio tidak ditemukan:\n"
    + audio.src
  );
};

// ================= INIT =================
build();

load(0);

</script>

</body>
</html>
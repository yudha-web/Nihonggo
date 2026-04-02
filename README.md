<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Audio Player Nihonggo</title>

<style>
:root{
  --bg:#0f1720;
  --card:#0f1728;
  --accent:#FFD700; /* KUNING */
  --text:#fff;
}

body{
  margin:0;
  font-family:sans-serif;
  background:var(--bg);
  color:var(--text);
  padding:20px;
}

.wrap{
  max-width:500px;
  margin:auto;
}

button{
  cursor:pointer;
}

/* tombol */
.bigbtn{
  width:70px;height:70px;
  border-radius:50%;
  border:none;
  background:var(--accent);
  font-size:22px;
  font-weight:bold;
}

.smbtn{
  padding:10px;
  border:none;
  border-radius:10px;
  background:#222;
  color:#fff;
}

.smbtn:hover{
  background:var(--accent);
  color:black;
}

/* progress */
.progress{
  height:10px;
  background:#333;
  border-radius:10px;
  margin:10px 0;
}

.bar{
  height:100%;
  width:0%;
  background:var(--accent);
}

/* playlist */
.track{
  padding:10px;
  border-bottom:1px solid #333;
  cursor:pointer;
}

.track:hover{
  background:#222;
}

.track.active{
  background:var(--accent);
  color:black;
}
</style>
</head>

<body>
<div class="wrap">

<h2>🎧 Nihonggo Player</h2>

<div>
  <button id="prev" class="smbtn">⏮</button>
  <button id="rwd" class="smbtn">⏪5s</button>
  <button id="play" class="bigbtn">▶</button>
  <button id="ffw" class="smbtn">5s⏩</button>
  <button id="next" class="smbtn">⏭</button>
</div>

<div id="title">-</div>

<div class="progress" id="progress">
  <div class="bar" id="bar"></div>
</div>

<div id="playlist"></div>

<audio id="audio"></audio>

<script>
// ================== FILE ==================
const files = [
"01-Dai-1-Ka-Kaiwa.mp3",
"02-Dai-1-Ka-Mondai-1.mp3"
];

// ================== ELEMENT ==================
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const title = document.getElementById("title");
const bar = document.getElementById("bar");
const playlist = document.getElementById("playlist");

let index = 0;
let isPlay = false;

// ================== LOAD ==================
function load(i){
  index = i;
  audio.src = "audio/" + files[i]; // FIX PATH
  title.textContent = files[i];
  highlight();
}

// ================== PLAY ==================
function toggle(){
  if(audio.paused){
    audio.play();
    playBtn.textContent = "⏸";
  }else{
    audio.pause();
    playBtn.textContent = "▶";
  }
}

// ================== NEXT PREV ==================
function next(){
  index = (index+1) % files.length;
  load(index);
  audio.play();
}

function prev(){
  index = (index-1+files.length)%files.length;
  load(index);
  audio.play();
}

// ================== SEEK ==================
audio.addEventListener("timeupdate",()=>{
  let p = (audio.currentTime/audio.duration)*100;
  bar.style.width = p+"%";
});

// ================== SKIP 5 DETIK ==================
document.getElementById("rwd").onclick=()=>{
  audio.currentTime -= 5;
};

document.getElementById("ffw").onclick=()=>{
  audio.currentTime += 5;
};

// ================== EVENT ==================
playBtn.onclick = toggle;
document.getElementById("next").onclick = next;
document.getElementById("prev").onclick = prev;

// ================== PLAYLIST ==================
function build(){
  playlist.innerHTML="";
  files.forEach((f,i)=>{
    let div = document.createElement("div");
    div.className="track";
    div.textContent=f;
    div.onclick=()=>{load(i);audio.play();}
    div.dataset.i=i;
    playlist.appendChild(div);
  });
}

function highlight(){
  document.querySelectorAll(".track").forEach(e=>e.classList.remove("active"));
  let el=document.querySelector(`[data-i="${index}"]`);
  if(el) el.classList.add("active");
}

// ================== ERROR DEBUG ==================
audio.onerror = ()=>{
  console.log("ERROR AUDIO:", audio.src);
};

// ================== INIT ==================
build();
load(0);

</script>
</body>
</html>
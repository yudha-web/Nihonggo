const files = [

"01 Dai 1 Ka - Kaiwa.mp3",
"02 Dai 1 Ka - Mondai 1.mp3",
"03 Dai 1 Ka - Mondai 2.mp3",

// dst...

"89 Yanto.mp3"

];

const audio =
document.getElementById("audio");

const play =
document.getElementById("play");

const title =
document.getElementById("title");

const bar =
document.getElementById("bar");

const playlist =
document.getElementById("playlist");

let index = 0;

function load(i){

  index = i;

  audio.src =
  "audio/" + files[i];

  title.textContent =
  files[i];
}

function toggle(){

  if(audio.paused){

    audio.play();

  }else{

    audio.pause();
  }
}

audio.onplay = ()=>{

  play.textContent = "⏸";
};

audio.onpause = ()=>{

  play.textContent = "▶";
};

function next(){

  index++;

  if(index >= files.length){

    index = 0;
  }

  load(index);

  audio.play();
}

function prev(){

  index--;

  if(index < 0){

    index =
    files.length - 1;
  }

  load(index);

  audio.play();
}

audio.addEventListener(
"timeupdate",
()=>{

  let p =
  (audio.currentTime
  /audio.duration)
  *100;

  bar.style.width =
  p + "%";
});

play.onclick = toggle;

document
.getElementById("next")
.onclick = next;

document
.getElementById("prev")
.onclick = prev;

files.forEach((f,i)=>{

  let div =
  document.createElement("div");

  div.className =
  "track";

  div.textContent = f;

  div.onclick = ()=>{

    load(i);

    audio.play();
  };

  playlist.appendChild(div);
});

load(0);
const files = [

"01 Dai 1 Ka - Kaiwa.mp3",
"02 Dai 1 Ka - Mondai 1.mp3",
"03 Dai 1 Ka - Mondai 2.mp3",
"04 Dai 1 Ka - Mondai 3.mp3",
"05 Dai 2 Ka - Kaiwa.mp3",
"06 Dai 2 Ka - Mondai 1.mp3",
"07 Dai 2 Ka - Mondai 2.mp3",
"08 Dai 2 Ka - Mondai 3.mp3",
"09 Dai 3 Ka - Kaiwa.mp3",
"10 Dai 3 Ka - Mondai 1.mp3",
"11 Dai 3 Ka - Mondai 2.mp3",
"12 Dai 4 Ka - Kaiwa.mp3",
"13 Dai 4 Ka - Mondai 1.mp3",
"14 Dai 4 Ka - Mondai 2.mp3",
"15 Dai 4 Ka - Mondai 3.mp3",
"16 Dai 4 Ka - Mondai 4.mp3",
"17 Dai 5 Ka - Kaiwa.mp3",
"18 Dai 5 Ka - Mondai 1.mp3",
"19 Dai 5 Ka - Mondai 2.mp3",
"20 Dai 5 Ka - Mondai 3.mp3",
"21 Dai 6 Ka - Kaiwa.mp3",
"22 Dai 6 Ka - Mondai 1.mp3",
"23 Dai 6 Ka - Mondai 2.mp3",
"24 Dai 7 Ka - Kaiwa.mp3",
"25 Dai 7 Ka - Mondai 1.mp3",
"26 Dai 7 Ka - Mondai 2.mp3",
"27 Dai 7 Ka - Mondai 3.mp3",
"28 Dai 8 Ka - Kaiwa.mp3",
"29 Dai 8 Ka - Mondai 1.mp3",
"30 Dai 8 Ka - Mondai 2.mp3",
"31 Dai 8 Ka - Mondai 3.mp3",
"32 Dai 9 Ka - Kaiwa.mp3",
"33 Dai 9 Ka - Mondai 1.mp3",
"34 Dai 9 Ka - Mondai 2.mp3",
"35 Dai 10 Ka - Kaiwa.mp3",
"36 Dai 10 Ka - Mondai 1.mp3",
"37 Dai 10 Ka - Mondai 2.mp3",
"38 Dai 10 Ka - Mondai 3.mp3",
"39 Dai 11 Ka - Kaiwa.mp3",
"40 Dai 11 Ka - Mondai 1.mp3",
"41 Dai 11 Ka - Mondai 2.mp3",
"42 Dai 11 Ka - Mondai 3.mp3",
"43 Dai 12 Ka - Kaiwa.mp3",
"44 Dai 12 Ka - Mondai 1.mp3",
"45 Dai 12 Ka - Mondai 2.mp3",
"46 Dai 13 Ka - Kaiwa.mp3",
"47 Dai 13 Ka - Mondai 1.mp3",
"48 Dai 13 Ka - Mondai 2.mp3",
"49 Dai 14 Ka - Kaiwa.mp3",
"50 Dai 14 Ka - Mondai 1.mp3",
"51 Dai 14 Ka - Mondai 2.mp3",
"52 Dai 14 Ka - Mondai 3.mp3",
"53 Dai 15 Ka - Kaiwa.mp3",
"54 Dai 15 Ka - Mondai 1.mp3",
"55 Dai 15 Ka - Mondai 2.mp3",
"56 Dai 16 Ka - Kaiwa.mp3",
"57 Dai 16 Ka - Mondai 1.mp3",
"58 Dai 16 Ka - Mondai 2.mp3",
"59 Dai 16 Ka - Mondai 3.mp3",
"60 Dai 17 Ka - Kaiwa.mp3",
"61 Dai 17 Ka - Mondai 1.mp3",
"62 Dai 17 Ka - Mondai 2.mp3",
"63 Dai 18 Ka - Kaiwa.mp3",
"64 Dai 18 Ka - Mondai 1.mp3",
"65 Dai 18 Ka - Mondai 2.mp3",
"66 Dai 19 Ka - Kaiwa.mp3",
"67 Dai 19 Ka - Mondai 1.mp3",
"68 Dai 19 Ka - Mondai 2.mp3",
"69 Dai 20 Ka - Kaiwa.mp3",
"70 Dai 20 Ka - Mondai 1.mp3",
"71 Dai 20 Ka - Mondai 2.mp3",
"72 Dai 21 Ka - Kaiwa.mp3",
"73 Dai 21 Ka - Mondai 1.mp3",
"74 Dai 21 Ka - Mondai 2.mp3",
"75 Dai 22 Ka - Kaiwa.mp3",
"76 Dai 22 Ka - Mondai 1.mp3",
"77 Dai 22 Ka - Mondai 2.mp3",
"78 Dai 23 Ka - Kaiwa.mp3",
"79 Dai 23 Ka - Mondai 1.mp3",
"80 Dai 23 Ka - Mondai 2.mp3",
"81 Dai 23 Ka - Mondai 3.mp3",
"82 Dai 24 Ka - Kaiwa.mp3",
"83 Dai 24 Ka - Mondai 1.mp3",
"84 Dai 24 Ka - Mondai 2.mp3",
"85 Dai 25 Ka - Kaiwa.mp3",
"86 Dai 25 Ka - Mondai 1.mp3",
"87 Dai 25 Ka - Mondai 2.mp3",
"88 Juned.mp3",
"89 Yanto.mp3",

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

const current =
document.getElementById("current");

const duration =
document.getElementById("duration");

const progress =
document.querySelector(".progress");

let index = 0;

/* LOAD */

function load(i){

  index = i;

  audio.src =
  "audio/" + files[i];

  title.textContent =
  files[i];

  highlight();
}

/* PLAY */

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

/* NEXT */

function next(){

  index++;

  if(index >= files.length){

    index = 0;
  }

  load(index);

  audio.play();
}

/* PREV */

function prev(){

  index--;

  if(index < 0){

    index =
    files.length - 1;
  }

  load(index);

  audio.play();
}

/* TIME UPDATE */

audio.addEventListener(
"timeupdate",
()=>{

  let p =

  (
    audio.currentTime
    /
    audio.duration
  ) * 100;

  bar.style.width =
  p + "%";

  // CURRENT

  let cmin =
  Math.floor(
  audio.currentTime / 60
  );

  let csec =
  Math.floor(
  audio.currentTime % 60
  );

  if(csec < 10){

    csec =
    "0" + csec;
  }

  current.textContent =
  cmin + ":" + csec;

  // DURATION

  let dmin =
  Math.floor(
  audio.duration / 60
  );

  let dsec =
  Math.floor(
  audio.duration % 60
  );

  if(dsec < 10){

    dsec =
    "0" + dsec;
  }

  duration.textContent =
  dmin + ":" + dsec;
});

/* SEEK + DRAG */

let dragging = false;

function updateSeek(x){

  let rect =
  progress.getBoundingClientRect();

  let offsetX =
  x - rect.left;

  if(offsetX < 0){

    offsetX = 0;
  }

  if(offsetX > rect.width){

    offsetX = rect.width;
  }

  let percent =

  offsetX / rect.width;

  bar.style.width =

  (percent * 100) + "%";

  audio.currentTime =

  percent * audio.duration;
}

/* CLICK */

progress.addEventListener(
"click",
(e)=>{

  updateSeek(e.clientX);
});

/* DRAG START */

progress.addEventListener(
"mousedown",
(e)=>{

  dragging = true;

  updateSeek(e.clientX);
});

/* DRAG MOVE */

document.addEventListener(
"mousemove",
(e)=>{

  if(dragging){

    updateSeek(e.clientX);
  }
});

/* DRAG END */

document.addEventListener(
"mouseup",
()=>{

  dragging = false;
});

/* MOBILE TOUCH */

progress.addEventListener(
"touchstart",
(e)=>{

  updateSeek(
  e.touches[0].clientX
  );
});

progress.addEventListener(
"touchmove",
(e)=>{

  updateSeek(
  e.touches[0].clientX
  );
});

/* SKIP */

document
.getElementById("ffw")
.onclick = ()=>{

  audio.currentTime += 5;
};

document
.getElementById("rwd")
.onclick = ()=>{

  audio.currentTime -= 5;
};

/* BUTTON */

play.onclick = toggle;

document
.getElementById("next")
.onclick = next;

document
.getElementById("prev")
.onclick = prev;

/* PLAYLIST */

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

  div.dataset.i = i;

  playlist.appendChild(div);
});

/* HIGHLIGHT */

function highlight(){

  document
  .querySelectorAll(".track")
  .forEach(e=>
    e.classList.remove(
    "active"
  ));

  let el =
  document.querySelector(
  `[data-i="${index}"]`
  );

  if(el){

    el.classList.add(
    "active"
    );
  }
}

/* AUTO NEXT */

audio.onended = ()=>{

  next();
};

/* INIT */

load(0);
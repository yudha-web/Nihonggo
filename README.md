<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Audio Player Minna Nihonggo</title>
  <style>
    /*==================================
      0. GLOBAL & VARIABLE DEFINITION
    ==================================*/
    :root{
      --bg:#0f1720; 
      --card:#0f1728; 
      --muted:#9aa6b2; 
      --accent:#1db954; 
      --main-text: #e6eef3;
      /* Neumorphism Shadows */
      --shadow-light: rgba(255, 255, 255, 0.05);
      --shadow-dark: rgba(0, 0, 0, 0.6);
      --glass: rgba(255,255,255,0.03);
    }
    *{box-sizing:border-box}
    body{
      margin:0; 
      font-family:Inter,ui-sans-serif,system-ui,Segoe UI,Roboto,"Helvetica Neue",Arial;
      background:linear-gradient(180deg,#071021 0%, #0b1220 100%); 
      color:var(--main-text);
      -webkit-font-smoothing:antialiased; 
      -moz-osx-font-smoothing:grayscale;
      padding:28px;
    }
    .wrap{
      max-width:500px; 
      margin:0 auto; 
      display:grid; 
      grid-template-columns:1fr; 
      gap:22px
    }

    /*==================================
      1. MAIN PLAYER CARD & HEADER
    ==================================*/
    .main-player-card {
        background: var(--card);
        border-radius: 18px;
        /* Outer Concave Shadow */
        box-shadow: inset 8px 8px 16px var(--shadow-dark), inset -8px -8px 16px var(--shadow-light); 
        overflow: hidden;
        padding-bottom: 20px;
    }
    .visual-header {
      background: linear-gradient(180deg, #1db954 0%, rgba(15, 23, 40, 0) 100%);
      padding: 30px 22px 70px 22px;
      position: relative;
      color: white;
      text-align: center;
    }
    .visual-header h1 {
        font-size: 26px; 
        font-weight: 700; 
        margin: 0;
    }
    .visual-header .meta {
        font-size: 13px;
        color: rgba(255, 255, 255, 0.9);
        margin-top: 4px;
    }

    /*==================================
      2. BUTTONS (NEUMORPHISM)
    ==================================*/
    .player-controls-area {
        position: relative;
        margin-top: -50px;
        z-index: 10;
        padding: 0 22px;
    }
    .main-controls-group {
      display: flex;
      align-items: center;
      justify-content: center; 
      gap: 20px; 
      margin-bottom: 25px;
    }

    /* Big Play Button (Raised/Cembung) */
    .bigbtn{
      width:64px; height:64px; border-radius:999px; border:none;
      background:var(--accent); 
      color:white;
      box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.4), -8px -8px 16px rgba(255, 255, 255, 0.15); 
      display:inline-flex; align-items:center; justify-content:center;
      cursor:pointer; flex-shrink: 0;
      transition: all 0.2s ease-out;
    }
    .bigbtn:hover {
        transform: scale(1.05); 
        box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5), -10px -10px 20px rgba(255, 255, 255, 0.2);
    }
    .bigbtn svg {width: 28px; height: 28px;}

    /* Small Utility Buttons (Slightly Raised) */
    .smbtn{
      width:44px; height:44px; border-radius:999px; border:none;
      background:var(--card);
      color:var(--muted);
      cursor:pointer; display: flex; align-items: center; justify-content: center; 
      flex-shrink: 0; 
      transition: all 0.2s;
      box-shadow: 4px 4px 8px var(--shadow-dark), -4px -4px 8px var(--shadow-light); 
    }
    .smbtn:hover {
        background:var(--glass); 
        color: var(--main-text); 
        box-shadow: 6px 6px 12px var(--shadow-dark), -6px -6px 12px var(--shadow-light); 
    }
    .smbtn:active {
        /* Pressed/Cekung State */
        box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light); 
        transform: scale(0.98);
    }
    .smbtn svg {width: 22px; height: 22px;}
    .smbtn.active-control { 
        color: var(--accent); 
        /* Slightly concave when active */
        box-shadow: inset 2px 2px 5px var(--shadow-dark), inset -2px -2px 5px var(--shadow-light); 
    }

    /*==================================
      3. TRACK INFO & VISUALIZER
    ==================================*/
    .track-info{ 
      text-align: center;
      margin-bottom: 5px; 
    } 
    .title{
        font-weight:600; 
        font-size: 18px; 
        white-space: nowrap; 
        overflow: hidden; 
        text-overflow: ellipsis; 
        margin-bottom: 6px;
    }
    .audio-visualizer {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        margin-top: 5px;
        height: 15px;
        color: var(--muted);
        font-size: 13px;
    }
    .visual-bars-group {
        display: flex;
        align-items: flex-end;
        height: 15px;
        gap: 2px;
    }
    .bar-item {
        width: 3px;
        border-radius: 999px;
        background-color: var(--accent); 
        transition: height 0.05s ease-out; 
    }

    /*==================================
      4. PROGRESS & SEEK BAR
    ==================================*/
    .progress{
        height:12px;
        background:rgba(255,255,255,0.08);
        border-radius:999px;
        cursor:pointer;
        position:relative; 
        margin-bottom: 8px; 
        margin-top: 15px; 
        padding: 2px 0; /* Area sentuh lebih besar */
    }
    .progress > .bar{
        height:100%;
        width:0;
        background:var(--accent);
        border-radius:999px
    }
    .time{
        display:flex;
        justify-content:space-between;
        font-size:12px;
        color:var(--muted); 
        margin-bottom: 10px;
    }

    /*==================================
      5. BOTTOM CONTROLS & SETTINGS
    ==================================*/
    .controlsBottom{
        display:flex; 
        align-items:center; 
        justify-content: space-between; 
        padding-top: 20px; 
        border-top: 1px solid rgba(255,255,255,0.05); 
        margin-top: 10px; 
        margin-bottom: 5px; 
    }
    .settings-group {
        display: flex;
        gap: 25px; 
        align-items: center;
        flex-grow: 1; 
        justify-content: center;
    }
    .speed-control,
    .volume-control {
      display: flex;
      flex-direction: column;
      align-items: center; 
    }
    .label {
        font-size: 12px;
        color: var(--muted);
        margin-bottom: 5px;
        display: block;
        text-align: center;
    }

    /* Speed Dropdown */
    #speed {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-color: var(--card); 
        color: var(--main-text); 
        border: 1px solid rgba(255,255,255,0.1);
        padding: 5px 8px;
        border-radius: 6px;
        cursor: pointer;
        min-width: 60px;
    }
    #speed:focus {
        outline: 1px solid var(--accent);
    }
    /* Volume Range Input */
    .volume-control input[type="range"] {
        width: 80px; 
    }


    /*==================================
      6. PLAYLIST CARD
    ==================================*/
    .playlist-card{
      background:var(--card);
      padding:18px;
      border-radius:12px;
      box-shadow: 8px 8px 16px var(--shadow-dark), -8px -8px 16px var(--shadow-light); 
      display: flex; 
      flex-direction: column; 
    }
    .playlist-scroll-area {
        max-height: 350px; 
        overflow-y: auto; 
        padding-right: 5px; 
    }
    .playlist-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      padding-bottom: 5px;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }

    /* Track Item */
    .track {
        display: flex;
        align-items: center;
        padding: 10px;
        border-radius: 8px;
        margin-bottom: 5px;
        cursor: pointer;
        transition: background-color 0.2s;
        font-size: 14px;
        line-height: 1.2;
    }
    .track:hover {
        background: rgba(255,255,255,0.05);
    }
    .track .num {
        width: 30px; 
        font-weight: 300;
        color: var(--muted);
        flex-shrink: 0;
    }
    .track.active{
        background:rgba(29,185,84,0.1); 
        color: #fff; 
        font-weight: 500;
    }
    .track.active .num {
        color: var(--accent);
        font-weight: 500;
    }
    .equalizer-icon {
        display: none; 
        width: 15px;
        height: 15px;
        align-items: flex-end;
        gap: 2px;
        margin-left: 10px;
        flex-shrink: 0;
    }
    .track.active .equalizer-icon {
        display: flex; 
    }
    .equalizer-icon .eq-bar {
        width: 3px;
        background-color: var(--accent);
        border-radius: 1px;
        height: 5px; 
    }

    /*==================================
      7. FOOTER
    ==================================*/
    .main-player-card .copyright {
        text-align: center;
        padding-top: 10px; 
        border-top: 1px solid rgba(255,255,255,0.03); 
        color: var(--muted);
        font-size: 11px; 
    }
    .instagram-link a {
        color: var(--muted);
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        margin-top: 5px;
    }
    .instagram-link a:hover {
        color: var(--accent);
    }
  </style>
</head>
<body>
  <div class="wrap">

    <section class="main-player-card">
      <div class="visual-header">
          <h1>Minna Nihonggo Audio</h1>
          <div class="meta">Pelajaran Tata Bahasa dan Percakapan</div>
      </div>

      <div class="player-controls-area">

        <div class="main-controls-group">
            <button id="prev" class="smbtn" title="Previous Track">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M12.5 3.25L5.75 8l6.75 4.75V3.25zM3.25 12.75V3.25h1.5v9.5h-1.5z"/></svg>
            </button>

            <button id="rwd" class="smbtn" title="Rewind 10s">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M10.828 2.5a.5.5 0 0 0-1 0V3h-5V2.5a.5.5 0 0 0-1 0V6a.5.5 0 0 0 .5.5h5V6H5v-2h4.5v2.5a.5.5 0 0 0 1 0v-5z"/><path d="M5 6.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1h-5a.5.5 0 0 0-.5.5zm10-5.5a.5.5 0 0 0 0 1h-2a.5.5 0 0 0 0-1h2z"/><path d="M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm.5-4a.5.5 0 0 1 .5.5v1.793l.854.853a.5.5 0 0 1-.708.707L7.5 10.707V8.5a.5.5 0 0 1 .5-.5z"/></svg>
            </button>

            <button id="play" class="bigbtn" title="Play/Pause">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 16 16"><path d="M10.824 8.697l-6.363 3.692C4.015 12.607 3 12.185 3 11.231V4.769c0-.954 1.015-1.376 1.46-.867l6.363 3.692a1.002 1.002 0 0 1 0 1.393z"/></svg>
            </button>

            <button id="ffw" class="smbtn" title="Forward 10s">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M5.172 13.5a.5.5 0 0 0 1 0V13h5v.5a.5.5 0 0 0 1 0V10a.5.5 0 0 0-.5-.5h-5V10h5v-2.5a.5.5 0 0 0-1 0V7H5.5a.5.5 0 0 0-.5.5v5.5z"/><path d="M1 13.5a.5.5 0 0 0 0-1h2a.5.5 0 0 0 0 1H1z"/><path d="M8 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-.5 4a.5.5 0 0 1 .5-.5h1.793l.853-.854a.5.5 0 1 1 .708.708L10.707 9.5H8.5a.5.5 0 0 1-.5-.5z"/></svg>
            </button>

            <button id="next" class="smbtn" title="Next Track">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M3.5 3.25L10.25 8l-6.75 4.75V3.25zM12.75 3.25v9.5h1.5V3.25h-1.5z"/></svg>
            </button>
        </div>

        <div class="track-info">
          <div class="title" id="nowTitle">01 Dai 1 Ka - Kaiwa</div>
          <div class="audio-visualizer" id="audioVisualizer">
              <div class="visual-bars-group">
                <div class="bar-item"></div>
                <div class="bar-item"></div>
                <div class="bar-item"></div>
                <div class="bar-item"></div>
                <div class="bar-item"></div>
                <div class="bar-item"></div>
                <div class="bar-item"></div>
              </div>
          </div>
        </div>

        <div class="progress" id="progress">
          <div class="bar" id="bar"></div>
        </div>
        <div class="time"><span id="current">0:00</span><span id="duration">0:00</span></div>

        <div class="controlsBottom">
          <button id="shuffle" class="smbtn" title="Shuffle">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.256 4.668 2.506a5.492 5.492 0 0 0-.649-1.385C4.358 3.712 3.51 3 2.5 3H.5a.5.5 0 0 1 0-1H2.5C3.656 2 4.5 2.802 5.093 3.512l.708.946-1.895 2.158c-.14.16-.29.317-.45.438-.16.12-.34.21-.52.28-.18.07-.37.1-.56.12-.19.02-.38.03-.57.03H.5a.5.5 0 0 1 0-1H2.5c.29 0 .58-.04.86-.13.28-.09.54-.22.78-.4.24-.18.46-.4.63-.64L6 4.312V13h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H5V5.5c0-.12.01-.24.03-.36.02-.12.06-.23.1-.34.04-.11.1-.22.17-.32l.708-.946C6.673 3.198 7.514 2 9.5 2h4.86c.29 0 .58-.04.86-.13.28-.09.54-.22.78-.4.24-.18.46-.4.63-.64L16 4.312V13h.5a.5.5 0 0 1 0 1H13.5a.5.5 0 0 1 0-1H14V5.5c0-.12-.01-.24-.03-.36-.02-.12-.06-.23-.1-.34-.04-.11-.1-.22-.17-.32l-.708-.946C12.327 3.198 11.486 2 9.5 2H.5z"/></svg>
          </button>

          <div class="settings-group">
            <div class="speed-control">
              <span class="label">Speed</span>
              <select id="speed">
                <option value="0.25">0.25×</option>
                <option value="0.5">0.5×</option>
                <option value="0.75">0.75×</option>
                <option value="1.0" selected>1×</option>
                <option value="1.25">1.25×</option>
                <option value="1.5">1.5×</option>
                <option value="1.75">1.75×</option>
                <option value="2.0">2×</option>
                <option value="2.5">2.5×</option>
                <option value="3.0">3×</option>
              </select>
            </div>

            <div class="volume-control">
              <span class="label">Volume</span>
              <input id="vol" type="range" min="0" max="1" step="0.01" value="1">
            </div>
          </div>

          <button id="loop" class="smbtn" title="Toggle loop">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M11 5v3.5a.5.5 0 0 0 1 0V4.5a.5.5 0 0 0-.5-.5H7a.5.5 0 0 0 0 1h3.5A1.5 1.5 0 0 1 12 7.5V11a.5.5 0 0 0 1 0V7.5A2.5 2.5 0 0 0 10.5 5H4.5a.5.5 0 0 0 0 1H12.5a.5.5 0 0 0 0-1H4.5A2.5 2.5 0 0 0 2 7.5V11a.5.5 0 0 0 1 0V7.5A1.5 1.5 0 0 1 4.5 6H11z"/></svg>
          </button>
        </div>

      </div> 
      <div class="copyright">
        &copy; 2025 Yudha. All rights reserved.
        <div class="instagram-link">
            <a href="https://www.instagram.com/isal_yud" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.269.087 3.85.048 4.703.01 5.555 0 5.827 0 8s.01 2.444.048 3.297c.04.852.174 1.433.372 1.942.205.526.478.96.923 1.417.444.445.877.718 1.417.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.297-.048c.852-.04 1.433-.174 1.942-.372a3.927 3.927 0 0 0 1.417-.923c.445-.444.718-.877.923-1.417.198-.51.333-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.444-.048-3.297c-.04-.852-.174-1.433-.372-1.942a3.917 3.917 0 0 0-.923-1.417A3.927 3.927 0 0 0 13.24 0.42c-.51-.198-1.09-.333-1.942-.372C10.445.01 10.173 0 8 0zm0 2.16c2.115 0 2.385.008 3.232.046.78.035 1.204.166 1.486.275.373.145.64.318.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.038.843.046 1.113.046 3.233 0 2.115-.008 2.385-.046 3.232-.035.78-.166 1.204-.275 1.486a2.59 2.59 0 0 1-.599.92c-.28.28-.546.453-.92.598-.281.11-.705.24-1.485.275-.843.038-1.113.046-3.233.046-2.115 0-2.385-.008-3.232-.046-.78-.035-1.204-.166-1.486-.275a2.59 2.59 0 0 1-.92-.599c-.28-.28-.546-.453-.598-.92-.11-.281-.24-.705-.275-1.485C2.16 10.445 2.152 10.173 2.152 8s.008-2.444.046-3.297c.035-.78.166-1.204.275-1.486.145-.373.318-.64.599-.92.28-.28.546-.453.598-.92.11-.281.24-.705.275-1.485C5.555 2.16 5.827 2.152 8 2.152zm0 3.654a4.111 4.111 0 1 0 0 8.222 4.111 4.111 0 0 0 0-8.222zM8 12a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm5.725-4.522a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"/>
                </svg>
                isal_yud
            </a>
        </div>
      </div>
    </section>

    <aside class="playlist-card">
      <div class="playlist-header">
        <strong>Playlist (87)</strong>
        <div style="font-size:13px;color:var(--muted)"><button id="playAll" class="smbtn" title="Play All">▶ All</button></div>
      </div>

      <div class="playlist-scroll-area">
          <div class="playlist" id="playlist"></div>
      </div>
    </aside>
  </div>

  <audio id="audio" preload="metadata"></audio>

  <script>
    //==================================
    //  CONFIGURATION & ICONS
    //==================================
    const files = [
      "01 Dai 1 Ka - Kaiwa.mp3","02 Dai 1 Ka - Mondai 1.mp3","03 Dai 1 Ka - Mondai 2.mp3","04 Dai 1 Ka - Mondai 3.mp3",
      "05 Dai 2 Ka - Kaiwa.mp3","06 Dai 2 Ka - Mondai 1.mp3","07 Dai 2 Ka - Mondai 2.mp3","08 Dai 2 Ka - Mondai 3.mp3",
      "09 Dai 3 Ka - Kaiwa.mp3","10 Dai 3 Ka - Mondai 1.mp3","11 Dai 3 Ka - Mondai 2.mp3","12 Dai 4 Ka - Kaiwa.mp3",
      "13 Dai 4 Ka - Mondai 1.mp3","14 Dai 4 Ka - Mondai 2.mp3","15 Dai 4 Ka - Mondai 3.mp3","16 Dai 4 Ka - Mondai 4.mp3",
      "17 Dai 5 Ka - Kaiwa.mp3","18 Dai 5 Ka - Mondai 1.mp3","19 Dai 5 Ka - Mondai 2.mp3","20 Dai 5 Ka - Mondai 3.mp3",
      "21 Dai 6 Ka - Kaiwa.mp3","22 Dai 6 Ka - Mondai 1.mp3","23 Dai 6 Ka - Mondai 2.mp3","24 Dai 7 Ka - Kaiwa.mp3",
      "25 Dai 7 Ka - Mondai 1.mp3","26 Dai 7 Ka - Mondai 2.mp3","27 Dai 7 Ka - Mondai 3.mp3","28 Dai 8 Ka - Kaiwa.mp3",
      "29 Dai 8 Ka - Mondai 1.mp3","30 Dai 8 Ka - Mondai 2.mp3","31 Dai 8 Ka - Mondai 3.mp3","32 Dai 9 Ka - Kaiwa.mp3",
      "33 Dai 9 Ka - Mondai 1.mp3","34 Dai 9 Ka - Mondai 2.mp3","35 Dai 10 Ka - Kaiwa.mp3","36 Dai 10 Ka - Mondai 1.mp3",
      "37 Dai 10 Ka - Mondai 2.mp3","38 Dai 10 Ka - Mondai 3.mp3","39 Dai 11 Ka - Kaiwa.mp3","40 Dai 11 Ka - Mondai 1.mp3",
      "41 Dai 11 Ka - Mondai 2.mp3","42 Dai 11 Ka - Mondai 3.mp3","43 Dai 12 Ka - Kaiwa.mp3","44 Dai 12 Ka - Mondai 1.mp3",
      "45 Dai 12 Ka - Mondai 2.mp3","46 Dai 13 Ka - Kaiwa.mp3","47 Dai 13 Ka - Mondai 1.mp3","48 Dai 13 Ka - Mondai 2.mp3",
      "49 Dai 14 Ka - Kaiwa.mp3","50 Dai 14 Ka - Mondai 1.mp3","51 Dai 14 Ka - Mondai 2.mp3","52 Dai 14 Ka - Mondai 3.mp3",
      "53 Dai 15 Ka - Kaiwa.mp3","54 Dai 15 Ka - Mondai 1.mp3","55 Dai 15 Ka - Mondai 2.mp3","56 Dai 16 Ka - Kaiwa.mp3",
      "57 Dai 16 Ka - Mondai 1.mp3","58 Dai 16 Ka - Mondai 2.mp3","59 Dai 16 Ka - Mondai 3.mp3","60 Dai 17 Ka - Kaiwa.mp3",
      "61 Dai 17 Ka - Mondai 1.mp3","62 Dai 17 Ka - Mondai 2.mp3","63 Dai 18 Ka - Kaiwa.mp3","64 Dai 18 Ka - Mondai 1.mp3",
      "65 Dai 18 Ka - Mondai 2.mp3","66 Dai 19 Ka - Kaiwa.mp3","67 Dai 19 Ka - Mondai 1.mp3","68 Dai 19 Ka - Mondai 2.mp3",
      "69 Dai 20 Ka - Kaiwa.mp3","70 Dai 20 Ka - Mondai 1.mp3","71 Dai 20 Ka - Mondai 2.mp3","72 Dai 21 Ka - Kaiwa.mp3",
      "73 Dai 21 Ka - Mondai 1.mp3","74 Dai 21 Ka - Mondai 2.mp3","75 Dai 22 Ka - Kaiwa.mp3","76 Dai 22 Ka - Mondai 1.mp3",
      "77 Dai 22 Ka - Mondai 2.mp3","78 Dai 23 Ka - Kaiwa.mp3","79 Dai 23 Ka - Mondai 1.mp3","80 Dai 23 Ka - Mondai 2.mp3",
      "81 Dai 23 Ka - Mondai 3.mp3","82 Dai 24 Ka - Kaiwa.mp3","83 Dai 24 Ka - Mondai 1.mp3","84 Dai 24 Ka - Mondai 2.mp3",
      "85 Dai 25 Ka - Kaiwa.mp3","86 Dai 25 Ka - Mondai 1.mp3","87 Dai 25 Ka - Mondai 2.mp3"
    ];

    const playIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 16 16"><path d="M10.824 8.697l-6.363 3.692C4.015 12.607 3 12.185 3 11.231V4.769c0-.954 1.015-1.376 1.46-.867l6.363 3.692a1.002 1.002 0 0 1 0 1.393z"/></svg>';
    const pauseIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 16 16"><path d="M5.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4-1a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/></svg>';

    //==================================
    //  DOM ELEMENTS & STATE
    //==================================
    const audio = document.getElementById('audio');
    const playBtn = document.getElementById('play');
    const nowTitle = document.getElementById('nowTitle');
    const bar = document.getElementById('bar');
    const progress = document.getElementById('progress');
    const cur = document.getElementById('current');
    const dur = document.getElementById('duration');
    const speed = document.getElementById('speed');
    const vol = document.getElementById('vol');
    const loopBtn = document.getElementById('loop');
    const shuffleBtn = document.getElementById('shuffle');
    const playlistEl = document.getElementById('playlist');
    const visualBars = [...document.querySelectorAll('.bar-item')]; 
    const rwdBtn = document.getElementById('rwd');
    const ffwBtn = document.getElementById('ffw');

    // Player State
    let current = 0; // Index file saat ini di array `files`
    let isPlaying = false;
    let isLoop = false;
    let isShuffle = false;
    let isSeeking = false;
    // Array `order` menyimpan indeks file. Awalnya [0, 1, 2, 3, ...]
    let order = files.map((_,i)=>i); 
    // Indeks saat ini di dalam array `order`. Awalnya 0.
    let currentOrderIndex = 0;

    // Web Audio API State
    let audioContext;
    let analyser;
    let source;
    let dataArray;


    //==================================
    //  CORE PLAYER FUNCTIONS
    //==================================

    function setupAudioContext() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            analyser.fftSize = 256; 
            analyser.smoothingTimeConstant = 0.8; 

            const bufferLength = analyser.frequencyBinCount; 
            dataArray = new Uint8Array(bufferLength);

            source = audioContext.createMediaElementSource(audio);
            source.connect(analyser);
            analyser.connect(audioContext.destination);

            drawVisualizer();
        }
    }

    function setSource(i){
      // i adalah index di array 'files'
      current = i; 
      const path = encodeURI(files[i]);
      audio.src = path; 
      const fileNameWithoutExtension = files[i].replace(/\.mp3$/, '');
      nowTitle.textContent = fileNameWithoutExtension;
      highlight();
    }

    function playIndex(i){
      // i adalah index di array 'files'

      // Update currentOrderIndex
      currentOrderIndex = order.indexOf(i);
      if (currentOrderIndex === -1) {
          // Kasus fallback jika index 'i' tidak ditemukan di 'order' (misal baru di-shuffle)
          // Cari ulang index lagu saat ini di array 'files' dan set currentOrderIndex
          currentOrderIndex = files.indexOf(files[i]);
      }

      setSource(i);
      setupAudioContext(); 
      if (audioContext.state === 'suspended') {
          audioContext.resume();
      }

      audio.play().catch(error => {
        console.error("Gagal memutar audio:", error);
      });
      isPlaying = true;
      playBtn.innerHTML = pauseIcon;
      drawVisualizer(); 
    }

    function togglePlay(){
        if(!audio.src){ 
            // Jika audio belum pernah diset, set ke track pertama (sesuai order)
            playIndex(order[currentOrderIndex]); 
            return;
        }

        setupAudioContext();

        if(audio.paused){ 
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }

            audio.play().catch(error => console.error("Play failed:", error)); 
            playBtn.innerHTML = pauseIcon; 
            isPlaying=true; 
            drawVisualizer();
        }
        else { 
            audio.pause(); 
            playBtn.innerHTML = playIcon; 
            isPlaying=false; 
            visualBars.forEach(bar => bar.style.height = '6px');
        }
    }


    //==================================
    //  UTILITY FUNCTIONS
    //==================================

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function formatTime(sec){
      if(!sec || isNaN(sec)) return '0:00';
      const s = Math.floor(sec%60).toString().padStart(2,'0');
      const m = Math.floor(sec/60);
      return `${m}:${s}`;
    }

    // Playlist UI update
    function highlight(){
      [...document.querySelectorAll('.track')].forEach(n=>n.classList.remove('active'));
      const el = document.querySelector('.track[data-index="'+current+'"]');
      if(el) el.classList.add('active');

      const scrollArea = document.querySelector('.playlist-scroll-area');
      if (el && scrollArea) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    function buildList(){
      playlistEl.innerHTML = '';
      files.forEach((f,i)=>{
        const tr = document.createElement('div');
        tr.className = 'track';
        tr.dataset.index = i;
        const trackNumber = String(i+1).padStart(2,'0'); 
        const fileNameWithoutExtension = f.replace(/\.mp3$/, '');
        const equalizerIcon = `<div class="equalizer-icon"><div class="eq-bar"></div><div class="eq-bar"></div><div class="eq-bar"></div></div>`;
        tr.innerHTML = `<div class="num">${trackNumber}</div><div class="name">${fileNameWithoutExtension}</div>${equalizerIcon}`;
        // Ketika track diklik, langsung memutar index di array 'files'
        tr.onclick = ()=>{ playIndex(i); };
        playlistEl.appendChild(tr);
      });
      highlight();
    }

    function drawVisualizer() {
        if (!audioContext || !isPlaying) {
            // Hentikan visualizer jika tidak ada konteks audio atau tidak sedang diputar
            return;
        }

        requestAnimationFrame(drawVisualizer);

        analyser.getByteFrequencyData(dataArray);

        const numBars = visualBars.length; 
        const step = Math.floor(dataArray.length / numBars); 

        for (let i = 0; i < numBars; i++) {
            const dataIndex = i * step; 
            let value = dataArray[dataIndex] || 0;

            const normalizedValue = Math.min(value / 255, 1) * 10; 
            const height = Math.max(4, 5 + normalizedValue); 

            visualBars[i].style.height = height + 'px';
        }
    }


    //==================================
    //  EVENT HANDLERS
    //==================================

    // Core Controls
    playBtn.onclick = togglePlay;
    document.getElementById('prev').onclick = ()=>{ 
        currentOrderIndex = (currentOrderIndex - 1 + files.length) % files.length;
        playIndex(order[currentOrderIndex]);
    };
    document.getElementById('next').onclick = ()=>{ 
        currentOrderIndex = (currentOrderIndex + 1) % files.length;
        playIndex(order[currentOrderIndex]);
    };
    rwdBtn.onclick = ()=>{ 
        if (!isNaN(audio.duration)) {
            audio.currentTime = Math.max(0, audio.currentTime - 10);
        }
    };
    ffwBtn.onclick = ()=>{ 
        if (!isNaN(audio.duration)) {
            audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
        }
    };
    document.getElementById('playAll').onclick = ()=>{ 
      // Saat Play All, selalu mulai dari indeks 0 di array order saat ini
      currentOrderIndex = 0;
      playIndex(order[currentOrderIndex]); 
    };

    // Loop/Shuffle Toggle
    loopBtn.onclick = ()=>{ 
        isLoop = !isLoop; 
        loopBtn.classList.toggle('active-control', isLoop); 
        audio.loop = isLoop;
    };

    shuffleBtn.onclick = ()=>{ 
        isShuffle = !isShuffle; 
        shuffleBtn.classList.toggle('active-control', isShuffle); 

        if (isShuffle) {
            // 1. Simpan index file yang sedang diputar
            const currentlyPlayingFileIndex = current;

            // 2. Buat array urutan baru dan acak
            order = files.map((_,i)=>i); 
            shuffleArray(order);

            // 3. Pindahkan file yang sedang diputar ke posisi 0 di array order (agar tidak tiba-tiba berganti)
            const oldIndexInNewOrder = order.indexOf(currentlyPlayingFileIndex);
            if (oldIndexInNewOrder > 0) {
                 order.splice(oldIndexInNewOrder, 1);
                 order.unshift(currentlyPlayingFileIndex);
            } else if (oldIndexInNewOrder === -1) {
                // Kasus darurat, set lagu saat ini sebagai yang pertama
                order.unshift(currentlyPlayingFileIndex);
            }

            // 4. Set currentOrderIndex ke 0 (lagu yang sedang diputar)
            currentOrderIndex = 0; 


        } else {
            // 1. Kembalikan array order ke urutan sequential
            order = files.map((_,i)=>i); 
            // 2. Set currentOrderIndex sesuai indeks 'current' di urutan sequential
            currentOrderIndex = current;
        }

        highlight(); // Update visual playlist jika perlu
    };


    // Audio Events
    audio.addEventListener('timeupdate', ()=>{
      if (!isNaN(audio.duration)){
        const pct = (audio.currentTime / audio.duration) * 100;
        bar.style.width = pct + '%';
        cur.textContent = formatTime(audio.currentTime);
        dur.textContent = formatTime(audio.duration);
      }
      const volPct = audio.volume * 100;
      vol.style.background = `linear-gradient(to right, var(--accent) ${volPct}%, rgba(255,255,255,0.08) ${volPct}%)`;
    });

    audio.addEventListener('ended', ()=>{
        isPlaying = false;
        playBtn.innerHTML = playIcon; 
        visualBars.forEach(bar => bar.style.height = '6px');

        if (isLoop) {
            playIndex(current);
            return; 
        }

        // Logika Next Track menggunakan currentOrderIndex dan array order
        currentOrderIndex = (currentOrderIndex + 1) % files.length;

        // Cek apakah sudah kembali ke awal
        if (currentOrderIndex === 0) {
            // Jika sudah di track pertama (sesuai order), setSource ke track pertama dan berhenti memutar
            setSource(order[0]); 
            return;
        }

        // Putar track berikutnya sesuai urutan (shuffle atau sequential)
        playIndex(order[currentOrderIndex]); 
    });

    // Speed & Volume Controls
    vol.addEventListener('input', ()=>{ audio.volume = vol.value; });
    speed.addEventListener('change', ()=>{ audio.playbackRate = speed.value; });


    // Progress Bar Seek (Slide-Slide/Drag)
    function seekTo(e) {
      if (!audio.duration || isNaN(audio.duration)) return;

      const rect = progress.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : null);

      if (clientX === null) return;

      const offsetX = clientX - rect.left;
      const width = rect.width;
      const safeOffsetX = Math.max(0, Math.min(offsetX, width));

      const seekTime = (safeOffsetX / width) * audio.duration;
      audio.currentTime = seekTime;
    }

    // MOUSE DOWN: Mulai mencari
    progress.addEventListener('mousedown', (e) => {
      isSeeking = true;
      seekTo(e);
      e.preventDefault(); 
    });
    // TOUCH START: Mulai mencari (untuk perangkat seluler)
    progress.addEventListener('touchstart', (e) => {
        isSeeking = true;
        seekTo(e);
        e.preventDefault(); 
    });

    // MOUSE MOVE: Lanjutkan mencari (hanya jika isSeeking true)
    document.addEventListener('mousemove', (e) => {
      if (isSeeking) {
        seekTo(e);
      }
    });
    // TOUCH MOVE: Lanjutkan mencari (untuk perangkat seluler)
    document.addEventListener('touchmove', (e) => {
        if (isSeeking) {
            seekTo(e);
        }
        e.preventDefault(); 
    });

    // MOUSE UP / TOUCH END: Hentikan mencari
    document.addEventListener('mouseup', () => {
      isSeeking = false;
    });
    document.addEventListener('touchend', () => {
        isSeeking = false;
    });


    //==================================
    //  INITIALIZATION
    //==================================

    (function init(){
        buildList();
        setSource(0);
        audio.load();
        playBtn.innerHTML = playIcon; 
        loopBtn.classList.toggle('active-control', isLoop); 
        shuffleBtn.classList.toggle('active-control', isShuffle);
        vol.dispatchEvent(new Event('input')); 
        visualBars.forEach(bar => bar.style.height = '6px'); 
    })();

  </script>
</body>
</html>
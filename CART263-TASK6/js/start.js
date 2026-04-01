window.onload = go_all_stuff;

function go_all_stuff() {
  console.log("go");

  /* ── VIDEO SETUP ── */
  let videoEl = document.getElementById("video-birds");
  window.addEventListener("click", function () {
    if (videoEl.currentTime === 0) {
      videoEl.play();
    }
  });
  videoEl.loop = true;

  /* ── CANVASES & CONTEXTS ── */
  let theCanvases = document.querySelectorAll(".canvases");
  let theContexts = [];
  for (let i = 0; i < theCanvases.length; i++) {
    let context = theCanvases[i].getContext("2d");
    theContexts.push(context);
  }




  let drawingBoardA = new DrawingBoard(theCanvases[0], theContexts[0], theCanvases[0].id);

  // Palette for spawned circles
  let colours = ["#bcc0f9ff", "rgba(134, 175, 246, 1)", "#00d0ffff", "#5100ffff", "#ffdefaff"];

  // Click on canvas A to ADD a new circle at the cursor position
  theCanvases[0].addEventListener("click", function (event) {
    let size = 5 + Math.random() * 20; // random radius 5–25
    let col = colours[Math.floor(Math.random() * colours.length)];
    drawingBoardA.addObj(
      new CircularObj(drawingBoardA.mouseOffsetX, drawingBoardA.mouseOffsetY, size, col, "#E6E6FA", drawingBoardA.context)
    );
  });

  // Press SPACE to REMOVE all circles from canvas A
  window.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
      drawingBoardA.clearObjs();
      console.log("Board A cleared");
    }
  });


  drawingBoardA.addObj(new CircularObj(200, 50, 18, "#00d0ffff", "#E6E6FA", drawingBoardA.context));
  drawingBoardA.display();

  let micVolume = 0; 

  navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(function (stream) {
      let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      let analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;

      let source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      let dataArray = new Uint8Array(analyser.frequencyBinCount);

      function getMicLevel() {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        micVolume = sum / dataArray.length; 
        window.requestAnimationFrame(getMicLevel);
      }
      getMicLevel();
      console.log("Microphone connected");
    })
    .catch(function (err) {
      console.warn("Microphone not available:", err);
    });


  let drawingBoardB = new DrawingBoard(theCanvases[1], theContexts[1], theCanvases[1].id);
  let rectObj = new RectangularObj(100, 100, 50, 70, "#FF5733", "#E6E6FA", drawingBoardB.context);
  drawingBoardB.addObj(rectObj);
  drawingBoardB.display();

  let drawingBoardC = new DrawingBoard(theCanvases[2], theContexts[2], theCanvases[2].id);
  let waveObj = new FreeStyleObj(10, 100, 380, "#CF9FFF", "#CF9FFF", drawingBoardC.context);
  drawingBoardC.addObj(waveObj);
  drawingBoardC.display();


  let drawingBoardD = new DrawingBoard(theCanvases[3], theContexts[3], theCanvases[3].id);
  drawingBoardD.addObj(new VideoObj(0, 0, 400, 300, videoEl, drawingBoardD.context));
  drawingBoardD.display();


  window.requestAnimationFrame(animationLoop);

  function animationLoop() {
    //  circles animate (fall downward, drift)
    drawingBoardA.animate();

    // push mic volume into rect before each frame
    rectObj.micVolume = micVolume;
    drawingBoardB.animate();

    //  push mic volume into wave before each frame
    waveObj.micVolume = micVolume;
    drawingBoardC.animate();

    // video frame rendered each tick
    drawingBoardD.run(videoEl);

    window.requestAnimationFrame(animationLoop);
  }
}

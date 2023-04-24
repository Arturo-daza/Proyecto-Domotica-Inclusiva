let video = null;
let detector = null;
let detections = [];
let videoVisibility = false;
let detecting = false;

const detectionAction = document.getElementById('detectionAction');
const canvasContainer = document.getElementById('canvas-container');


function preload() {
  detector = ml5.objectDetector('cocossd');
}

function setup() {
  createCanvas(0, 0);
  
  
}
function activarVideo() {
  if (detecting) {
    toggleDetecting();
  } else {
    createCanvas(640, 480);
    const canvas = document.getElementById('defaultCanvas0');
    canvasContainer.appendChild(canvas);
    canvas.style.width='400px'
    canvas.style.height='400px'
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();
    video.elt.addEventListener('loadeddata', function () {
      setTimeout(toggleDetecting, 1000);
    });
  }
}

function desactivarVideo() {
  detecting = false;
  video.stop();
  video.remove();
  detections = [];
  detectionAction.innerText = 'Detectar Objetos';
  createCanvas(0, 0);
  const div =  document.querySelector(".vsc-controller");
  div.classList.remove('vsc-controller vsc-nosource')
}

function draw() {
  if (!video || !detecting) return;
  image(video, 0, 0);
  for (let i = 0; i < detections.length; i++) {
    drawResult(detections[i]);
  }
}

function drawResult(object) {
  boundingBox(object);
  drawLabel(object);
}

function boundingBox(object) {
  stroke('blue');
  strokeWeight(6);
  noFill();
  rect(object.x, object.y, object.width, object.height);
}
function drawLabel(object) {
  noStroke();
  fill('white');
  textSize(34);
  text(object.label, object.x + 15, object.y + 34);
}

function onDetected(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;

  if (detecting) {
    detect();
  }
}

function detect() {
  detector.detect(video, onDetected);
}


function toggleDetecting() {
  if (!video || !detector) return;
  if (!detecting) {
    detect();
    detectionAction.innerText = 'Parar...';
  } else {
    desactivarVideo();
  }
  detecting = !detecting;
}


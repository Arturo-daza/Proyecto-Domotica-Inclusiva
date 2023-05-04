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
    detecting = false;
  } else {
    alertShown= false;
    isFirstDetection = true;
    createCanvas(640, 480);
    const canvas = document.getElementById('defaultCanvas0');
    canvasContainer.appendChild(canvas);
    canvas.style.width = '400px'
    canvas.style.height = '400px'
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();
    video.elt.addEventListener('loadeddata', function () {
      setTimeout(toggleDetecting, 1);
    });
  }
}

function desactivarVideo() {
  detecting = false;
  // video.stop();
  video.remove();
  detections = [];
  detectionAction.innerText = 'Detectar Objetos';
  createCanvas(0, 0);
  const div = document.querySelector(".vsc-controller");
  div.classList.remove('vsc-controller')
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


let alertShown = false;
let contador = 0;
let isFirstDetection = true;

function onDetected(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
  const person = results.find(result => result.label === 'person');
  if (person && !alertShown && isFirstDetection) {
    setTimeout(function() {
      convertirTextoAVoz('Se detectó una persona en la entrada');
      alert('Se detectó una persona en la entrada!');
    }, 2000);
    alertShown = true;
    contador = 0;
    isFirstDetection=false;
  } else if (person && contador >= 100 ) {
    convertirTextoAVoz('Se detectó una persona en la entrada')
    contador = 0;
  } else if (person && alertShown) {
    contador += 1;
    console.log(contador);
  } else {
    alertShown = false;
    isFirstDetection=true;
    contador = 0;
  }

  if (detecting) {
    detect();
  }
}




function detect() {
  detector.detect(video, onDetected);
}


function toggleDetecting() {
  // if (!video || !detector) return;
  if (!detecting) {
    detect();
    detectionAction.innerText = 'Parar...';
  } else {
    desactivarVideo();
  }
  detecting = !detecting;
}


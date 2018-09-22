var balls = [];
var canvasContext = null;
var canvasWidth = 0;
var canvasHeight = 0;
var snowflake = getSnowflake();
var scoreEvents = [];
var currentScore = 0;

function startGame() {
  var gameCanvas = $("#gameCanvas");
  var scoreSpan = $("#score");
  canvasWidth = gameCanvas.width;
  canvasHeight = gameCanvas.height;
  canvasContext = gameCanvas[0].getContext("2d");

  sizeCanvasToDisplay(gameCanvas);
  colorCanvas(canvasContext);
  balls.push(new Ball(window.innerWidth/2, window.innerHeight/2, 10, "red",window.innerWidth,  window.innerHeight ));
  balls.push(new Picture(snowflake,window.innerWidth,  window.innerHeight, (window.innerWidth/2) - snowflake.naturalWidth, (window.innerHeight/2) - snowflake.naturalHeight));
  //balls.push(new Picture(snowflake,window.innerWidth,  window.innerHeight,window.innerWidth/2, window.innerHeight/2));
  moveBalls();
  scoreEvents.push((obj)=>{
	  currentScore += 10;
	  scoreSpan.text(currentScore);
  });

  gameCanvas.click((e)=>{
	var clickedObjects = [];
	balls.forEach( (elem) => {
		if ( elem.acceptClick(e) ) {
			clickedObjects.push(elem);
			elem.onClick(e);
		}
	});
	if ( clickedObjects.length == 0 ) {
		balls.push(new Ball(e.clientX, e.clientY, 10, "red",window.innerWidth,  window.innerHeight ));
	} else {
		clickedObjects.forEach( (elem) => {
			var indexOfItem = balls.indexOf(elem);
			if ( indexOfItem != -1 ) {
				var object = balls[indexOfItem];
				scoreEvents.forEach( (scoreFunction) => {
					scoreFunction(object);
				});
				balls.splice(indexOfItem,1);
			}
		});
	}
  });
  //monitorAccelerometer();
  //setInitialValues();
}

function getSnowflake() {
  var img = new Image();
  img.src='images/snowflake-100px.png';
  return img;
}

function moveBalls() {
  colorCanvas(canvasContext);
  balls.forEach((elem)=>{
    elem.update();
    elem.draw(canvasContext);
  });
  window.requestAnimationFrame(()=>{
    moveBalls();
  });
}

function monitorAccelerometer() {
  if ( navigator.accelerometer ) {
    navigator.accelerometer.watchAcceleration(
      (acceleration) => {
        balls.forEach((val, idx)=>{
          val.update(acceleration.x,acceleration.y);
          val.draw(canvasContext);
        });
      },
      (err) => {
        window.alert(err);
      },
      {frequency:100}
    );
  }
}

function sizeCanvasToDisplay(canvas) {
  canvas.attr("width", window.innerWidth +"px");
  canvas.attr("height", window.innerHeight +"px");
}

function colorCanvas(ctx) {
  ctx.fillStyle="rgba(0, 0, 200, 0.5)";
  ctx.fillRect(0, 0, window.innerWidth,  window.innerHeight);
}

function setInitialValues() {
  $("#xval").text("0.00");
  $("#yval").text("0.00");
  $("#zval").text("0.00");
  $("#innerwidth").text(window.innerWidth);
  $("#innerheight").text(window.innerHeight);
  $("#outerwidth").text(window.outerWidth);
  $("#outerheight").text(window.outerHeight);
}

$(document).ready(()=>{
  var isMobileDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/) !== null;
  if ( isMobileDevice ) {
    document.addEventListener("deviceready", onDeviceReady, false);
  } else {
    onDeviceReady();
  }
});

function onDeviceReady() {
  startGame();
}

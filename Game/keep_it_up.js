// global variables associated with game
// frames per second to run game
/*****************************************************************
var FPS = 50;
***********************************************************/
//Area in which game will be played
var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

function loadImage(url){
    // create actual HTML element and note when it finishes loading
    var img = new Image();
    img.onload = function () {
        //numImagesLoaded += 1;
        console.log(url + " loaded");
        // reset so it is only counted once (just in case)
        this.onload = null;
    }
    img.src = url;
    return img;
}

//Player's Score (number of juggles)
var juggles_needed = document.getElementById('level_menu').value;
function level_selection(){
  juggles_needed = document.getElementById('level_menu').value;
}

//Soccer Ball variables
var ball_Img = loadImage('game_images/soccer_ball.gif');
var ball_size = 40;
var x = canvas.width / 2;
var y = ball_size-10;
var dx = 2;
var dy = -2;
var gravity = 0.2;
var grav_speed = 0;
var bounce = 0.6;
/*var gravity = 0.2;*/


// Player variables

var player_Img = loadImage('game_images/boy_player.JPG');
var player_width = 70;
function width_selector(){
  player_width = 140;
}
var player_height = 150;
function height_selector(){
  player_height = 90;
}
var player_speed = 8;
function speedup(){
  player_speed = 15;
}
var player_x = (canvas.width - player_width) / 2;


//key input variables
var left_press = false;
var right_press = false;

function drawBall(){
  if(ball_Img != null){
    ctx.drawImage(ball_Img, x, y, ball_size, ball_size);
  }
  else{
    ctx.beginPath();
    ctx.arc(x, y, ball_size, 0, Math.PI*2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }
}

function drawPlayer(){
  if(player_Img != null){
    ctx.drawImage(player_Img, player_x, canvas.height - player_height, player_width, player_height);
  }
  else{
    ctx.beginPath();
    ctx.rect(player_x, canvas.height, player_width, player_height);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }
}

function drawProgress(){
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Juggles Left: " + juggles_needed, 10, 20)
}

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPlayer();
  drawProgress();
  if(y + dy < 0){
    dy = dy;
  }
  else if (y + dy + ball_size - 5> canvas.height - player_height) {
    if(x+ball_size >= player_x && x-ball_size <= player_x + player_width){
      grav_speed = -(grav_speed * bounce);
      dx = dx + 0.1*(x-player_x);
      //dy = -dy;
      juggles_needed -= 1;
      if(juggles_needed == 0){
        alert("YOU WON!");
        document.location.reload();
      }
    }
    else{
      alert("GAME OVER, YOU LOST!");
      document.location.reload();
    }
  }
  if(x + dx < 0 || x + dx + ball_size - 5> canvas.width){
    dx = -dx;
  }
  grav_speed += gravity;
  x += dx;
  y += dy + grav_speed;

  if(right_press && player_width + player_x <= canvas.width){
    player_x += player_speed;
  }
  else if (left_press && player_x >= 0) {
    player_x -= player_speed;
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e){
  if (e.keyCode == 39) {
    right_press = true;
  }
  if(e.keyCode == 37){
    left_press = true;
  }
}

function keyUpHandler(e){
  if (e.keyCode == 39){
    right_press = false;
  }
  if (e.keyCode == 37){
    left_press = false;
  }
}

var startButton = document.getElementById('start_button');
startButton.onclick = function(){
  document.getElementById('disappear').innerHTML = "";
  setTimeout('setInterval(draw, 20)', 1000);
  //interval = setInterval(draw, 20);
}
//setInterval(draw, 20);

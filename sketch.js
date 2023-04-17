var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;

function preload() {
  bgImg = loadImage("assets/bg.png")

  obsBot1 = loadImage("assets/obsBottom1.png")
  obsBot2 = loadImage("assets/obsBottom2.png")
  obsBot3 = loadImage("assets/obsBottom3.png")

  obsTop1 = loadImage("assets/obsTop1.png")
  obsTop2 = loadImage("assets/obsTop2.png")

  restartImg = loadImage("assets/restart.png")

  gameoverImg = loadImage("assets/gameOver.png")

  balloonImg = loadAnimation("assets/balloon1.png", "assets/balloon2.png", "assets/balloon3.png")
}

function setup() {
  createCanvas(500, 400);
  //background image
  bg = createSprite(165, 485, 1, 1);
  bg.addImage(bgImg);
  bg.scale = 1.3

  //creating top and bottom grounds
  topObstaclesGroup = new Group()
  bottomObstaclesGroup = new Group()

  bottomGround = createSprite(200, 390, 800, 20);
  bottomGround.visible = false;

  topGround = createSprite(200, 10, 800, 20);
  topGround.visible = false;

  //creating balloon     
  balloon = createSprite(100, 200, 20, 50);
  balloon.addAnimation("balloon", balloonImg);
  balloon.scale = 0.2;

  // creating Gameover and Restart sprite
  gameover = createSprite(220, 200);
  gameover.addImage("gameover", gameoverImg);
  gameover.visible = false;

  restart = createSprite(220, 245);
  restart.addImage("restart", restartImg);
  restart.visible = false;
}

function draw() {

  
  if (gameState === PLAY) {

   
    if (keyDown("space")) {
      balloon.velocityY = -6;

    }

    //adding gravity
    balloon.velocityY = balloon.velocityY + 1;
    
    spawnObstacleTop();
    spawnObstacleBottom();

    if (balloon.isTouching(topObstaclesGroup) || balloon.isTouching(bottomObstaclesGroup) || balloon.isTouching(bottomGround) || balloon.isTouching(topGround)) {
      gameState = END;
    }
    
  }

if(gameState === END){
  gameover.visible=true;
  restart.visible=true;
  balloon.velocityX=0;
  balloon.velocityY=0;
  topObstaclesGroup.setVelocityXEach(0);
  bottomObstaclesGroup.setVelocityXEach(0);
if(mousePressedOver(restart)){
  resetFunction();
}
}

  background("black");

  //making the hot air balloon jump


  drawSprites();
  //console.log(gameState);
}

function spawnObstacleTop(){

  
if(World.frameCount%60 === 0){

  obstacleTop = createSprite(400,50,40,50);
  obstacleTop.velocityX=-4;
  obstacleTop.y = random(10,100);
}
}

function spawnObstacleBottom(){

  if(World.frameCount%60 === 0){
obstacleBottom = createSprite(400,350,40,50);
obstacleBottom.velocityX=-4;
obstacleBottom.y = random(300,390);

//obstacleBottom.addImage()
  }


}

function resetFunction(){
gameState = PLAY;
balloon.y=200;
restart.visible=false;
gameover.visible=false;

}
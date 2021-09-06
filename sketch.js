var balloon, database;
var position;

function preload()
{
  bg =loadImage("cityImage.png");
  balloonImg1=loadAnimation("hotairballoon1.png");
  balloonImg2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
  "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
  "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
}

function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(900,500);

  balloon = createSprite(250,250,10,10);
  balloon.addAnimation("balloon",balloonImg1);
  balloon.addAnimation("balloon",balloonImg2);
  balloon.changeAnimation("balloon",balloonImg1);
  balloon.scale = 0.3


  var balloonPosition = database.ref('ball/position');
  balloonPosition.on("value", readPosition, showError);
}

function draw(){
  background(bg);
  
  if(position!==undefined)
  {
    if(keyDown(LEFT_ARROW)){
      writePosition(-10,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(10,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-10);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+10);
    }
  }
    drawSprites();
  fill(0);
  stroke("white");
  textSize(20);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
  
}

function writePosition(x,y){
  var balloonPosition = database.ref('ball/position');
   balloonPosition.set({
    x:position.x+x,
    y:position.y+y
  });
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}

var monkey , monkey_running
var banana ,bananaImage,  obstacleImage,ground
var foodGroup ,ObstacleGroup
var score
var survivalTime=0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage= loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400, 400); 

  monkey=createSprite(100,340,20,50);
  monkey.addAnimation("running",monkey_running)
  monkey.scale=0.1
  
  ground=createSprite(400,350,800,10);
  ground.velocityX=-4
  ground.x=ground.width/2
  
  foodGroup =createGroup();
  ObstacleGroup =createGroup();
}


function draw() {
  background("white")
  
  stroke("black")
  textSize(20)
  fill("black")
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+survivalTime,100,50)
  
    if(keyDown("space") && monkey.y >= 300) {
      monkey.velocityY = -15;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  if(ObstacleGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    ObstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    ObstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  }
  
  monkey.collide(ground);
  
  food();
  obstacles();
  
  drawSprites() 
}

function food(){
  if(frameCount % 80 === 0) {
    var banana = createSprite(600,165,10,40);
    banana.addImage(bananaImage)
    banana.velocityX = -5
    banana.y=Math.round(random(140,200));
    banana.scale=0.11
    banana.lifetime=200
    
    foodGroup.add(banana);
  }
}
function obstacles(){
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(500,320,20,0)
    obstacle.velocityX=-5
    obstacle.addImage(obstacleImage)
    obstacle.scale=0.15
    obstacle.lifetime=150
    
    ObstacleGroup.add(obstacle);
  }
}






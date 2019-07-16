var w = 1000;
var h = 500;

var backgroundCol = 190;

var isMousePressed = false;

var box_x = 230;
var box_y = h-108;
var box_lid_x = 230;
var box_width = 120;
var box_height = 100;

var ghost_top_w = 40;
var ghost_bottom_w = 80;
var ghost_h = 70;
var ghost_margin = 60;
var ghost_x = box_x+box_width/2-ghost_bottom_w/2;
var ghost_y = 400;

var ghost_speed = 2;
var ghost_float_speed = 0.5;

var isLidOpen = false;
var isLightOff = false;
var isGhostUp = false;
var mouseIsOnTheBox = false;
var mouseIsOnTheButton = false;
var mouseIsOntheWindow = false;
var isInTheHouse = true;
var isMorning = true;
var isSunClicked = false;
var mouseIsOnTheGhost = false;
var isGhostRunAway = false;

var window_width = 200;
var window_height = 160;
var window_x = w-window_width-100;
var window_y = 50;

var sun_x = 0;
var sun_y = 0;
var sun_w = 0;
var sun_h = 0;

var sunLine_x = 0;
var sunLine_y = 0;
var sunLine_h = 80-20;
var sunLineLength = 10;
var lineNum = 10;

var lightButton_x = 100;
var lightButton_y = 100;
var lightButton_w = 40;
var lightButton_h = 60;

var roofX = 100;
var roofY = 250;
var roofW = 120;
var roofH = 40;
var houseW = 100;
var houseH = 80;
var houseX = roofX+(roofW-houseW)/2;
var houseY = roofY+roofH;

function preload() {

  img = loadImage('assets/ghost.png'); //200 px

}

function setup() {
  createCanvas(w, h+50);
}

function draw() {
  clear();
  background(backgroundCol);

  stroke(0);

  // drawGhost(ghost_x, ghost_y, 255,150,0,150,5,0,0,ghost_top_w,ghost_bottom_w,ghost_h);
  // drawGhostExtra(ghost_x, ghost_y, 255, 150);

  if(isGhostUp){
    ghost_y += ghost_float_speed;
    if(ghost_y > ghost_margin+ghost_h/2){
      ghost_float_speed = -ghost_float_speed;
    }else if (ghost_y < ghost_margin-ghost_float_speed){
      ghost_float_speed = -ghost_float_speed;
    }
  }else if(isLidOpen){
    if(ghost_y <= ghost_margin){
      isGhostUp = true;
    }else{
      ghost_y -= ghost_speed;
    }
  }

  if(isGhostUp && isGhostRunAway){
    if(ghost_x > w){
      if(!isLidOpen){
        isGhostRunAway = false;
        isGhostUp = false;
        ghost_x = box_x+box_width/2-ghost_bottom_w/2;
        ghost_y = 400;
      }
    }else{
      ghost_x += ghost_speed;
    }
  }

  if(mouseX >= box_x && mouseX <= box_x+box_width && mouseY >= box_y && mouseY <= box_y+box_height){
    mouseIsOnTheBox = true;
  }else{
    mouseIsOnTheBox = false;
  }

  if(mouseX >= lightButton_x+lightButton_w/2-lightButton_w/8 && mouseX <= lightButton_x+lightButton_w/2-lightButton_w/8+lightButton_w/4 && mouseY >= lightButton_y+lightButton_h/2-lightButton_h/8 && mouseY <= lightButton_y+lightButton_h/2-lightButton_h/8+lightButton_w/4){
    mouseIsOnTheButton = true;
  }else if(mouseX >= window_x && mouseX <= window_x+window_width && mouseY >= window_y && mouseY <= window_y+window_height){
    mouseIsOntheWindow = true;
  }else{
    mouseIsOnTheButton = false;
    mouseIsOntheWindow = false;
  }

  if(mouseX >= ghost_x && mouseX <= ghost_x+ghost_bottom_w && mouseY >= ghost_y && mouseY <= ghost_y+ghost_h){
    console.log("mouse is on the ghost");
    mouseIsOnTheGhost = true;
  }else{
    mouseIsOnTheGhost = false;
  }

  if(isMousePressed){
    console.log("mouse clicked");
    if(!isLidOpen && mouseIsOnTheBox){
      box_lid_x -= 120;
      isMousePressed = false;
      isLidOpen = true;
    }else if(isLidOpen && isGhostUp && mouseIsOnTheBox){
      box_lid_x += 120;
      isMousePressed = false;
      isLidOpen = false;
    }else if(!isLightOff && mouseIsOnTheButton){
      isLightOff = true;
      isMousePressed = false;
    }else if(isLightOff && mouseIsOnTheButton){
      isLightOff = false;
      isMousePressed = false;
    }else if(isInTheHouse && mouseIsOnTheGhost){
      console.log("ghost run away");
      isGhostRunAway = true;
    }else if(isInTheHouse && mouseIsOntheWindow){
      isInTheHouse = false;
      isMousePressed = false;
    }else if(!isInTheHouse){
      if(mouseX >= houseX && mouseX <= houseX+houseW && mouseY >= houseY && mouseY <= houseY+houseH){
        isMousePressed = false;
        isInTheHouse = true;
      }else if(dist(sun_x,sun_y,mouseX,mouseY) <=sun_w/2 && mouseY <= h*0.4){
        isSunClicked = true;
        isMousePressed = false;
      }else if(!isMorning && mouseX > 0 && mouseX < w && mouseY > 0 && mouseY < h*0.4){
        console.log("sky clicked");
        isMorning = true;
      }else{
        isMousePressed = false;
      }
    }else{
      isMousePressed = false;
    }
  }

  if(isInTheHouse){ //家の中の描画

    //空と草はら
    noStroke();
    if(!isMorning){
      fill(10,102,105);
      rect(window_x, window_y, window_width, window_height);
      fill(109,235,220);
      rect(window_x, window_y+window_height*0.6, window_width, window_height*0.4);
    }else{
      fill(109,222,235);
      rect(window_x, window_y, window_width, window_height);
      fill(109,235,220);
      rect(window_x, window_y+window_height*0.6, window_width, window_height*0.4);
    }

    stroke(0);
    strokeWeight(4);

    //太陽
    if(isMorning){
      fill(220,160,160);
      sun_x = window_x+window_width/2;
      sun_y = window_y+window_height*0.6;
      sun_w = 80;
      sun_h = 80;
      sunLine_x = sun_x;
      sunLine_y = sun_y;
      sunLine_h = 80-20;
      sunLineLength = 10;
      lineNum = 10;
      arc(sun_x, sun_y, sun_w, sun_h, PI, 0, CHORD);

      for (var i = 0; i < lineNum; i++) {
        var _rad = i / lineNum * -PI;

        var sunLineStart_x = sunLine_h * cos(_rad) + sunLine_x;
        var sunLineStart_y = sunLine_h * sin(_rad) + sunLine_y;
        var sunLineEnd_x = (sunLine_h-sunLineLength) * cos(_rad) + sunLine_x;
        var sunLineEnd_y = (sunLine_h-sunLineLength) * sin(_rad) + sunLine_y;
        line(sunLineStart_x, sunLineStart_y, sunLineEnd_x, sunLineEnd_y);
      }
    }

    //山
    fill(89,205,200);
    quad(window_x, window_y+window_height*0.6, window_x, window_y+window_height*0.4, window_x+50, window_y+window_height*0.2, window_x+100, window_y+window_height*0.6);
    quad(window_x+80, window_y+window_height*0.6, window_x+180, window_y+window_height*0.2, window_x+200, window_y+window_height*0.4, window_x+200, window_y+window_height*0.6);

    //窓枠
    noFill();
    strokeWeight(8);
    rect(window_x, window_y, window_width, window_height);

    strokeWeight(4);
    fill(255);

    //電球
    if(isLightOff){
      fill(255);
      ellipse(w/2, 50, 30, 30);
    }else{
      fill(255,225,0);
      ellipse(w/2, 50, 30, 30);
    }

    //電気シェード
    fill(0);
    line(w/2, 0, w/2, 10);
    triangle(w/2-30, 50, w/2, 10, w/2+30, 50);

    fill(255);

    //電気のスイッチ
    rect(lightButton_x, lightButton_y, lightButton_w, lightButton_h);
    fill(0);
    rect(lightButton_x+lightButton_w/2-lightButton_w/8, lightButton_y+lightButton_h/2-lightButton_h/8, lightButton_w/4, lightButton_h/4);

    //おばけ
    drawGhostExtra(ghost_x, ghost_y, 255, 150);

    //箱のふたと箱
    fill(255);
    rect(box_lid_x, h-108-20, box_width, box_width-box_height);
    rect(box_x, box_y, box_width, box_height);

    //暗さ
    if(isLightOff){
      lightOn(0,150);
    }else{
      lightOn(0,0);
    }
  }else{  //外に出た時の描画

    strokeWeight(8);
    var strokeW = 8;

    //空
    fill(109,222,235);
    rect(-strokeW/2,-strokeW/2,w+strokeW,h*0.4+strokeW);

    //太陽
    fill(220,160,160);
    sun_x = w/2;
    sun_y = h*0.4-strokeW/2;
    sunLine_x = sun_x;
    sunLine_y = sun_y;
    if(!isSunClicked){
      if(isMorning){
        sun_w = 80*5*1/2;
        sun_h = 80*5*1/2;
        sunLine_h = (80-20)*5*1/2+30;
        sunLineLength = 10*4;
      }else{
        fill(10,102,105);
        rect(-strokeW/2,-strokeW/2,w+strokeW,h*0.4+strokeW);
        sun_w = sun_w;
        sun_h = sun_h;
        sunLine_h = sunLine_h;
        sunLineLength = sunLineLength;
      }
    }else{
      if(isMorning){
        if(sunLine_h > 0){
          sun_w -= 1;
          sun_h -= 1;
          sunLine_h -= 1;
          if(sunLineLength > 0){
            sunLineLength -= 1;
          }else{
            sunLineLength = sunLineLength;
          }
        }else{
          sun_w = sun_w;
          sun_h = sun_h;
          sunLine_h = sunLine_h;
          sunLineLength = sunLineLength;
          isSunClicked = false;
          isMorning = false;
          console.log(isMorning);
        }
      }else{
        console.log("night clicked");
        fill(10,102,105);
        rect(-strokeW/2,-strokeW/2,w+strokeW,h*0.4+strokeW);
        isMorning = false;
        if(sunLine_h < 0){
          sun_w += 1;
          sun_h += 1;
          sunLine_h += 1;
          if(sunLineLength < 10*4){
            sunLineLength += 1;
          }else{
            sunLineLength = sunLineLength;
          }
        }else if(sunLine_h <= 80*5*1/2){
          sun_w = sun_w;
          sun_h = sun_h;
          sunLine_h = sunLine_h;
          sunLineLength = sunLineLength;
          isSunClicked = false;
        }else{
          isSunClicked = false;
        }
      }
    }
    lineNum = 10;
    arc(sun_x, sun_y, sun_w, sun_h, PI, 0, CHORD);

    for (var i = 0; i < lineNum; i++) {
      var _rad = i / lineNum * -PI;

      var sunLineStart_x = sunLine_h * cos(_rad) + sunLine_x;
      var sunLineStart_y = sunLine_h * sin(_rad) + sunLine_y;
      var sunLineEnd_x = (sunLine_h-sunLineLength) * cos(_rad) + sunLine_x;
      var sunLineEnd_y = (sunLine_h-sunLineLength) * sin(_rad) + sunLine_y;
      line(sunLineStart_x, sunLineStart_y, sunLineEnd_x, sunLineEnd_y);
    }

    //草はら
    fill(109,235,220);
    rect(-strokeW/2,h*0.4-strokeW/2,w+strokeW,h*0.6+strokeW);

    //山
    fill(89,205,200);
    quad(-strokeW/2, h*0.4-strokeW/2, -strokeW/2, h*0.2-strokeW/2, strokeW+250, h*0.1, strokeW+500, h*0.4-strokeW/2);
    quad(-strokeW/2+80*5, h*0.4-strokeW/2, -strokeW/2+180*5, h*0.1-strokeW/2, 200*5+strokeW, h*0.2-strokeW/2, 200*5+strokeW, h*0.4-strokeW/2);

    //家
    fill(225,105,100);
    triangle(roofX,roofY+roofH,roofX+roofW/2,roofY,roofX+roofW,roofY+roofH);
    fill(225,225,220);
    rect(houseX, houseY, houseW, houseH);
    fill(backgroundCol);
    rect(houseX+houseW*1.5/4, houseY+houseH*1.5/4, houseW/4, houseH/4);

  }
  noStroke();
  fill(255);
  rect(0,h,w,50);
  fill(backgroundCol-50);
  stroke(backgroundCol-50);
  strokeWeight(1);
  textSize(20);
  text('http://web.sfc.keio.ac.jp/~t16384ns/gp19/71643849_final/index.html', 0, h+25);

}

function lightOn(color,a){
  noStroke();
  fill(color,a);
  rect(0,0,w,h);
}

function mousePressed(){
  isMousePressed = true;
}

function drawGhost(x,y,col,a,eyeCol,eyeA,eyeSize,ghostX,ghostY,ghostTopW,ghostBottomW,ghostH){
  strokeWeight(4);
  stroke(0);
  fill(col, a);

  var topX = ghostX+(ghostBottomW-ghostTopW)/2;
  beginShape();
  curveVertex(x+ghostX+ghostBottomW, y+ghostH);
  curveVertex(x+ghostX+ghostBottomW, y+ghostH);
  curveVertex(x+topX+ghostTopW, y+ghostY);
  curveVertex(x+topX, y+ghostY);
  curveVertex(x+ghostX, y+ghostH);
  curveVertex(x+ghostX, y+ghostH);
  endShape();

  fill(eyeCol, eyeA);
  circle(x+topX+eyeSize*2, y+eyeSize*2, eyeSize);
  circle(x+topX+ghostTopW-eyeSize*2, y+eyeSize*2, eyeSize);
}

function drawGhostExtra(x,y,col,a){
  strokeWeight(4);

  fill(col, a);
  beginShape();
  curveVertex(x+80, y+85);
  curveVertex(x+80, y+85);
  curveVertex(x+60, y+15);
  curveVertex(x+20, y+15);
  curveVertex(x+0, y+85);

  curveVertex(x+10, y+75);
  curveVertex(x+20, y+85);
  curveVertex(x+30, y+75);
  curveVertex(x+40, y+85);
  curveVertex(x+50, y+75);
  curveVertex(x+60, y+85);
  curveVertex(x+70, y+75);
  curveVertex(x+80, y+85);
  curveVertex(x+90, y+85);
  endShape();

  fill(0);
  circle(x+30,y+25,5);
  circle(x+50,y+25,5);

}

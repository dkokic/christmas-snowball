window.onload = function() {

  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
  })();

  function animloop() {
    SYSTEM.totalUpdate();
    requestAnimFrame(animloop);
  }
  setTimeout(() => { document.body.style.backgroundColor = "black"; animloop() }, 10000);
  setInterval(() => { SYSTEM.activate(); setTimeout(SYSTEM.deactivate, 7000) }, 60000);

};


SYSTEM = function () {
  var cnv = document.getElementById('canvas');
  var ctx = cnv.getContext('2d');

  var Parent = function (childQuant, radius, xPos, yPos) {
    this.radius   = radius;
    this.xPos     = xPos;
    this.yPos     = yPos;
    this.children = [];
    this.minDist  = 40;
    this.isActive = false;
    this.shapeCoords = [

      //year
      [-85, 105], [-75, 105], [-65, 105], [-35, 105], [-25, 105], [-15, 105], [25, 105], [65, 105], [75, 105], [85, 105],
      [-95, 115], [-55, 115], [-45, 115], [-5, 115], [15, 115], [25, 115], [55, 115], [95, 115],
      [-95, 125], [-55, 125], [-45, 125], [-15, 125], [-5, 125], [25, 125], [55, 125], [95, 125],
      [-65, 135], [-45, 135], [-25, 135], [-5, 135], [25, 135], [65, 135], [75, 135], [85, 135],
      [-75, 145], [-45, 145], [-35, 145], [-5, 145], [25, 145], [55, 145], [95, 145],
      [-85, 155], [-45, 155], [-5, 155], [25, 155], [55, 155], [95, 155],
      [-95, 165], [-85, 165], [-75, 165], [-65, 165], [-55, 165], [-35, 165], [-25, 165], [-15, 165], [15, 165], [25, 165], [35, 165], [65, 165], [75, 165], [85, 165],

      //treee
      [0, -150],
      [-25, -125], [0, -125], [25, -125],
      [-50, -100], [-25, -100], [0, -100], [25, -100], [50, -100],
      [-50, -75, [-50, -100]], [-25, -75], [0, -75], [25, -75], [50, -75, [50, -100]],
      [-75, -50], [-50, -50], [-25, -50], [0, -50], [25, -50], [50, -50], [75, -50],
      [-75, -25, [-75, -50]], [-50, -25], [-25, -25], [0, -25], [25, -25], [50, -25], [75, -25, [75, -50]],
      [-100, 0], [-75, 0], [-50, 0], [-25, 0], [0, 0], [25, 0], [50, 0], [75, 0], [100, 0],
      [-100, 25, [-100, 0]], [-75, 25], [-50, 25], [-25, 25], [0, 25], [25, 25], [50, 25], [75, 25], [100, 25, [100, 0]],
      [-125, 50], [-100, 50], [-75, 50], [-50, 50], [-25, 50], [0, 50], [25, 50], [50, 50], [75, 50], [100, 50], [125, 50],
      [0, 75, [[-25, 105], [-15, 105], [25, 105]]]

    ];


    this.born = function () {
      var maxVelocity = 2.5;

      for (var i = 0; i < childQuant; i++) {
        var angle          = Math.random() * 2 * Math.PI;
        var velocity       = maxVelocity * (0.3 + 0.7 * Math.random());
        var velAngle       = Math.random() * 2 * Math.PI;
        var distFromCenter = Math.random() * this.radius;

        var xPos = (distFromCenter - Child.prototype.RADIUS) * Math.cos(angle);
        var yPos = (distFromCenter - Child.prototype.RADIUS) * Math.sin(angle);
        var velX = velocity * Math.cos(velAngle);
        var velY = velocity * Math.sin(velAngle);

        this.children.push(new Child(xPos, yPos, velX, velY));
      }
    };


    this.drawChildren = function() {
      var color,
          shapes = ParentParticle.shapeCoords.length - 1;

      for (var i = this.children.length - 1; i >= 0; i -= 1) {
        if (i === shapes) {
          color = ParentParticle.isActive ? 'brown' : 'rgb(190,190,190)';
        } else if (i < shapes && i > shapes - 21) {
          color = ParentParticle.isActive ? '#304c02' : 'rgb(190,190,190)';
        } else if (i < shapes - 20 && i > shapes - 37) {
          color = ParentParticle.isActive ? '#547b01' : 'rgb(190,190,190)';
        } else if (i < shapes - 36 && i > shapes - 49) {
          color = ParentParticle.isActive ? '#90a900' : 'rgb(190,190,190)';
        } else if (i < shapes - 48 && i > shapes - 58) {
          color = ParentParticle.isActive ? '#b9c21d' : 'rgb(190,190,190)';
        } else if (i < shapes - 57) {
          color = ParentParticle.isActive ? 'brown' : 'rgb(190,190,190)';
          this.children[i].noCon = true;
          this.children[i].RADIUS = 2;
        } else {
          color = false;
        }
        var drawColor = ParentParticle.isActive ? (color ? color : 'rgba(190, 190, 190, 0.1)') : 'rgba(190, 190, 190, 0.8)';
        this.draw(this.children[i].xPos + this.xPos, this.children[i].yPos + this.yPos, this.children[i].RADIUS, drawColor);  // TODO check the behaviour without drawColor !!!

        for (var j = 0; j < i; j++) {

          if (!this.children[i].noCon) {
            this.drawDistance(this.children[i].xPos, this.children[i].yPos,
                              this.children[j].xPos, this.children[j].yPos, color);

          } else if (typeof this.children[i].noCon === 'boolean') {
            this.drawDistance(this.children[i].xPos, this.children[i].yPos,
                              this.children[j].xPos, this.children[j].yPos, false, 1);

          } else if (!(Math.round(this.children[j].xPos) === this.children[i].noCon[0] &&
                       Math.round(this.children[j].yPos) === this.children[i].noCon[1])) {
            this.drawDistance(this.children[i].xPos, this.children[i].yPos,
                              this.children[j].xPos, this.children[j].yPos, color);
          }
        }

      }
    };


    this.draw = function (x, y, rad, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc( x, y, rad, 0, Math.PI*2, true );
      ctx.fill();
      ctx.closePath();
    };


    this.drawDistance = function (x1, y1, x2, y2, color, minDist) {
      var dist,
          minimDist = minDist ? minDist : this.minDist,
          dx = x1 - x2,
          dy = y1 - y2;

      dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= minimDist) {
        //draw the line

        ctx.beginPath();
        // ctx.strokeStyle = "rgba(111, 112, 39,"+ (1.2-dist / this.minDist) +")";
        if (ParentParticle.isActive && color) {
          ctx.strokeStyle = color;
        } else {
          ctx.strokeStyle = "rgba(100, 100, 100,"+ (1.2 - dist / this.minDist) +")";
        }
        ctx.moveTo(x1 + this.xPos, y1 + this.yPos);
        ctx.lineTo(x2 + this.xPos, y2 + this.yPos);
        ctx.stroke();
        ctx.closePath();
      }

    };


    this.updateChildren = function () {
      var parentRadSquare = this.radius * this.radius,

          sound = document.getElementById('soundHandle'),
          colPointAngle;

      for (var currChild of this.children) {
        if (ParentParticle.isActive && currChild.targetPos) {
          var velStats = getVelocity({ x: currChild.xPos, y: currChild.yPos }, currChild.targetPos);
          currChild.velX = velStats._velX;
          currChild.velY = velStats._velY;
        } else if (currChild.velX === 0 && currChild.velY === 0) {
          currChild.velX = Math.random() * 3;
          currChild.velY = Math.random() * 3;
          currChild.velX = Math.round(currChild.velX, 2) % 2 === 0 ? currChild.velX : -currChild.velX;
        }

        var radSquare = currChild.xPos * currChild.xPos + currChild.yPos * currChild.yPos;

        if (radSquare > parentRadSquare) {
          var lastXPos = currChild.xPos;
          var lastYPos = currChild.yPos;
          var exitX = (lastXPos + currChild.xPos) / 2;
          var exitY = (lastYPos + currChild.yPos) / 2;

          var exitRad = Math.sqrt(exitX * exitX + exitY * exitY);
          exitX   *= this.radius / exitRad;
          exitY   *= this.radius / exitRad;

          currChild.xPos = exitX;
          currChild.yPos = exitY;

          var twiceProjFactor = 2 * (exitX * currChild.velX + exitY * currChild.velY) / parentRadSquare;
          currChild.velX  -= twiceProjFactor * exitX;
          currChild.velY  -= twiceProjFactor * exitY;
        }

        currChild.xPos += currChild.velX;
        currChild.yPos += currChild.velY;
      }

    };
  };


  function getVelocity (currCoord, targCoord) {
    var xDist = (Math.max(currCoord.x, targCoord.x) + 200) - (Math.min(currCoord.x, targCoord.x) + 200);
    var yDist = (Math.max(currCoord.y, targCoord.y) + 200) - (Math.min(currCoord.y, targCoord.y) + 200);
    if(currCoord.x > targCoord.x) {
      xDist = -xDist;
    }
    if (currCoord.y > targCoord.y) {
      yDist = -yDist;
    }

    if (Math.sqrt(xDist * xDist + yDist * yDist) > 0.1) {
      return {
        _velX: xDist / 15,
        _velY: yDist / 15
      };
    } else {
      return {
        _velX: 0,
        _velY: 0
      };
    }
  }

  var Child = function (xPos, yPos, velX, velY) {
    this.xPos   = Math.round(xPos);
    this.yPos   = Math.round(yPos);
    this.velX   = velX;
    this.velY   = velY;
  };

  Child.prototype = {
    RADIUS: 3
  };


  var ParentParticle = new Parent(122, 200, cnv.width / 2, cnv.height / 2);
  ParentParticle.born();


  var calculateMousePos = function (evt) {
    var rect = cnv.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;

    return {
      x: mouseX,
      y: mouseY
    };
  };

  var activate = function () {
    ParentParticle.isActive = true;
    for (var i = 0; i < ParentParticle.shapeCoords.length; i++) {
      if (typeof ParentParticle.shapeCoords[i][ParentParticle.shapeCoords[i].length - 1] === 'object') {
        ParentParticle.children[i].noCon = ParentParticle.shapeCoords[i][ParentParticle.shapeCoords[i].length - 1];
      }
      if (i < 61) {
        ParentParticle.children[i].targetPos = {
          x: ParentParticle.shapeCoords[i][0] / 1.8,
          y: ParentParticle.shapeCoords[i][1] / 1.8 + 60
        };
      } else {
        ParentParticle.children[i].targetPos = {
          x: ParentParticle.shapeCoords[i][0],
          y: ParentParticle.shapeCoords[i][1]
        };
      }
    }
  };

  var deactivate = function () {
    ParentParticle.isActive = false;
    for (var i = 0; i < ParentParticle.children.length; i++) {
      ParentParticle.children[i].targetPos = undefined;
    }
  };

  var mouseMoveListener = function (evt) {
    var mousePos = calculateMousePos(evt);
    var x0 = ParentParticle.xPos - mousePos.x;
    var y0 = ParentParticle.yPos - mousePos.y;
    var mouseToCenterDist = Math.sqrt(x0 * x0 + y0 * y0);

    if (mouseToCenterDist < ParentParticle.radius && !ParentParticle.isActive) {
      activate();
    } else if (mouseToCenterDist > ParentParticle.radius && ParentParticle.isActive){
      deactivate();
    }
  };

  cnv.addEventListener('mousemove', mouseMoveListener);

  var totalUpdate = function() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    this.draw(this.xPos, this.yPos, this.radius, '#232323');
    this.updateChildren();
    this.drawChildren();
  }


  return {
    activate: activate,
    deactivate: deactivate,
    totalUpdate: totalUpdate.bind(ParentParticle)
  };

}();

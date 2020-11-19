function Constellation (canvas) {
  var _this = this,
      context = canvas.getContext('2d'),
      config = {
        star: {
          color: 'rgba(100, 100, 100, .4)',
          width: 3
        },
        line: {
          color: 'rgba(255,255,255, .2)',
          width: 0.5
        },
        position: {
          x: 0,
          y: 0
        },
        width: window.innerWidth,
        height: window.innerHeight,
        length: Math.sqrt( Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2) ) / 10,
        distance: 100,
        radius: 150,
        stars: []
      };

  function Star () {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * config.star.width;

    this.vx = (0.5 - Math.random())/3;
    this.vy = (0.5 - Math.random())/3;

    this.create = function() {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      context.fill();
    };
  }

  this.animate = function() {
    var i;
    for (i = 0; i < config.length; i++) {

      var star = config.stars[i];

      if (star.y < 0 || star.y > canvas.height) {
        star.vy = - star.vy;
      } else if (star.x < 0 || star.x > canvas.width) {
        star.vx = - star.vx;
      }

      star.x += star.vx;
      star.y += star.vy;
    }
  };

  this.line = function() {
    var length = config.length,
        iStar,
        jStar,
        i,
        j;

    for (i = 0; i < length; i++) {
      for (j = 0; j < length; j++) {
        iStar = config.stars[i];
        jStar = config.stars[j];

        if (
          (iStar.x - jStar.x) < config.distance &&
          (iStar.y - jStar.y) < config.distance &&
          (iStar.x - jStar.x) > - config.distance &&
          (iStar.y - jStar.y) > - config.distance
        ) {
          if (
            (iStar.x - config.position.x) < config.radius &&
            (iStar.y - config.position.y) < config.radius &&
            (iStar.x - config.position.x) > - config.radius &&
            (iStar.y - config.position.y) > - config.radius
          ) {
            context.beginPath();
            context.moveTo(iStar.x, iStar.y);
            context.lineTo(jStar.x, jStar.y);
            context.stroke();
            context.closePath();
          }
        }
      }
    }
  };

  this.createStars = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < config.length; i++) {
      config.stars.push(new Star());
      config.stars[i].create();
    }

    _this.animate();
    _this.line();
  };

  this.setCanvas = function () {
    canvas.width = config.width;
    canvas.height = config.height;
  };

  this.setContext = function () {
    context.fillStyle = config.star.color;
    context.strokeStyle = config.line.color;
    context.lineWidth = config.line.width;
  };

  this.loop = function (callback) {
    callback();

    window.requestAnimationFrame(function () {
      _this.loop(callback);
    });
  };

  this.bind = function () {
    document.body.addEventListener("mousemove", function(e){
      config.position.x = e.pageX - canvas.offsetLeft;
      config.position.y = e.pageY - canvas.offsetTop;
    });
  };

  this.init = function () {
    this.setCanvas();
    this.setContext();
    this.loop(this.createStars);
    this.bind();
  };
}

document.addEventListener("DOMContentLoaded", function() {
  var c = new Constellation(document.getElementById('canvas'));
  c.init();
});
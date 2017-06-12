(function(Fly) {
  'use strict';

  var Pipe = function(config) {

    this.imgTop = config.imgTop;
    this.imgBottom = config.imgBottom;
    this.ctx = config.ctx;
    this.x = config.x;
    this.space = config.space;

    this.speed = 0.15;
    this.imgW = this.imgTop.width;
    this.imgH = this.imgTop.height;



    this.topY = 0;
    this.bottomY = 0;

    this.getHeight();

  };

  Pipe.prototype.draw = function(delta) {

    this.x += -this.speed * delta;
    if (this.x < -this.imgW) {
      this.x += 6 * this.imgW * 3;
      this.getHeight();
    }
    // 为每一条管道设置一条路径
    this.ctx.rect(this.x, this.topY, this.imgW, this.imgH);
    this.ctx.rect(this.x, this.bottomY, this.imgW, this.imgH);
    // this.ctx.fill();


    this.ctx.drawImage(this.imgTop, this.x, this.topY);
    this.ctx.drawImage(this.imgBottom, this.x, this.bottomY);

  };
  Pipe.prototype.getHeight = function() {
    var pipeHeight = Math.random() * 200 + 50;
    this.bottomY = pipeHeight + this.space;
    this.topY = pipeHeight - this.imgH;
  }


  Fly.Pipe = Pipe;

})(Fly)
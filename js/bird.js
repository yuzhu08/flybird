(function(Fly) {
  var Bird = function(config) {
    this.img = config.img;
    this.imgW = this.img.width / 3;
    this.imgH = this.img.height;
    this.ctx = config.ctx;
    this.frameCount = 0;
    this.speed = 0;
    this.a = 0.0005;
    this.x = 100;
    this.y = 100;
    this.maxSpeed = 0.3;
    this.maxAngle = 45;
    this.curAngle = 0;
  }

  Bird.prototype = {

    draw: function(delta) {

      this.speed += this.a * delta;
      this.y += this.speed * delta + 1 / 2 * this.a * delta * delta;

      this.curAngle = this.speed / this.maxSpeed * this.maxAngle;

      if (this.curAngle > this.maxAngle) {
        this.curAngle = this.maxAngle;
      }
      if (this.curAngle < -this.maxAngle) {
        this.curAngle = -this.maxAngle;
      }

      this.ctx.translate(this.x, this.y);

      this.ctx.rotate(Math.PI / 180 * (this.curAngle));

      this.ctx.drawImage(this.img, this.imgW * this.frameCount++, 0, this.imgW, this.imgH, -1 / 2 * this.imgW, -1 / 2 * this.imgH, this.imgW, this.imgH);

      this.frameCount %= 3;
    },

    // 改变速度
    changeSpeed: function(speed) {
      this.speed = speed;
    }


  }

  Fly.Bird = Bird;
})(Fly)
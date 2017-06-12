(function(Fly) {
  var Land = function(config) {
    this.img = config.img;
    this.ctx = config.ctx;
    this.x = config.x;
    this.y = config.y;
    this.imgW = this.img.width;
    this.imgH = this.img.height;
    this.speed = 0.15;
  };
  Land.prototype = {
    draw: function(delta) {
      this.x += -this.speed * delta;
      if (this.x < -this.imgW) {
        this.x += 4 * this.imgW;
      }

      this.ctx.drawImage(this.img, this.x, this.y);

    }
  };
  Fly.Land = Land;
})(Fly)
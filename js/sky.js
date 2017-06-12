(function(Fly) {
  'use strict';
  var Sky = function(config) {

    this.img = config.img;
    this.ctx = config.ctx;
    this.skyW = this.img.width;
    this.skyH = this.img.height;
    this.skySpeed = 0.15;
    this.skyX = config.x;
  }

  Sky.prototype = {
    constructor: Sky,
    draw: function(delta) {

      this.skyX += -this.skySpeed * delta;
      if (this.skyX < -this.skyW) {
        this.skyX += 2 * this.skyW;
      }
      this.ctx.drawImage(this.img, this.skyX, 0);

    }
  }

  Fly.Sky = Sky;
})(Fly)
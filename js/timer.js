(function() {
  var Timer = function() {
    this.text = "坚持了0小时0分0秒钟";
    this.time = 0;
  };

  Timer.prototype.draw = function(drawCtx) {
    var ctx = drawCtx.xtx;
    this.time = drawCtx.durationTime / 1000;

    var hours = Math.floor(this.time / 3600);
    var minutes = Math.floor(this.time % 3600 / 60);
    var seconds = Math.floor(this.time % 60);
    var milliseconds = (this.time - seconds).toFixed(3) * 1000;


    this.text = "坚持了" + hours + "小时" + minutes + "分" + seconds + "秒钟" + milliseconds + "毫秒";
  }
})()
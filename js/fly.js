(function(window) {
  'use strict'
  var Fly = {};

  Fly.loadImage = function(srcArr, callback) {
    var allLength = srcArr.length;
    var imgCount = 0;
    var imgObject = {};
    srcArr.forEach(function(srcStr) {
      var img = new Image();
      img.src = "images/" + srcStr + ".png";
      imgObject[srcStr] = img;
      img.onload = function() {
        imgCount++;
        if (imgCount >= allLength) {
          callback(imgObject);
        }
      }
    })
  }
  Fly.factory = function(type, option) {
    switch (type) {
      case "Bird":
        return new Fly.Bird(option);
      case "Sky":
        return new Fly.Sky(option);
      case "Land":
        return new Fly.Land(option);
      case "Pipe":
        return new Fly.Pipe(option);
    }
  }
  window.Fly = Fly;
})(window)
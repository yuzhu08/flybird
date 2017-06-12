(function(Fly) {
  "use strict";
  var Game = function(config) {
    this.imgsArr = ["birds", "land", "pipe1", "pipe2", "sky"];
    this.ctx = config.ctx;
    this.lastFrameTime = new Date();
    this.curFrameTime = 0;;
    this.delta = 0;
    this.isStart = true;
    this.roles = [];
    this.hero = null;
    this.creatCanvas(config.id);
    this.durationTime = 0;
  };
  Game.prototype = {
    constructor: Game,
    // 开始游戏
    start: function() {

      var that = this;

      Fly.loadImage(that.imgsArr, function(imgsList) {
        //  初始化游戏角色
        that.initRoles(imgsList);
        // 渲染游戏
        that.render(imgsList);
        // 绑定事件
        that.bindEvent();
      })
    },


    // 初始化游戏角色
    initRoles: function(imgsList) {

      var context = this.ctx;
      var i;
      this.hero = Fly.factory("Bird", {
        img: imgsList.birds,
        ctx: context
      });
      for (i = 0; i < 2; i++) {
        var sky = Fly.factory("Sky", {
          img: imgsList.sky,
          ctx: context,
          x: i * imgsList.sky.width
        });

        this.roles.push(sky);
      }

      // 创建管道对象
      for (i = 0; i < 6; i++) {
        var pipe = Fly.factory("Pipe", {
          imgTop: imgsList.pipe2,
          imgBottom: imgsList.pipe1,
          ctx: context,
          space: 200,
          x: i * imgsList.pipe1.width * 3 + 300
        })
        this.roles.push(pipe);
      }

      for (i = 0; i < 4; i++) {
        var land = Fly.factory("Land", {
          img: imgsList.land,
          ctx: context,
          x: i * imgsList.land.width,
          y: imgsList.sky.height - imgsList.land.height
        })
        this.roles.push(land);
      }
    },


    // 绑定事件
    bindEvent: function() {
      var that = this;
      that.ctx.canvas.addEventListener("click", function() {
        that.hero.changeSpeed(-0.3);
      })

    },

    // 渲染页面
    render: function(imgsList) {
      var that = this;
      var context = that.ctx;
      var cv = context.canvas;
      var bird = that.hero;
      (function render() {
        // 保存状态
        context.save();
        context.clearRect(0, 0, cv.width, cv.height);
        context.beginPath();
        that.curFrameTime = new Date();
        that.delta = that.curFrameTime - that.lastFrameTime;
        that.lastFrameTime = that.curFrameTime;

        that.durationTime += that.delta;
        // 绘制天空和陆地和管道
        that.roles.forEach(function(val, ind) {
            val.draw(that.delta);
          })
          // 绘制小鸟
        bird.draw(that.delta);
        // 恢复状态
        context.restore();
        // 注册点击事件，小鸟反弹
        if (that.isStart) {
          requestAnimationFrame(render);
        }
        if (bird.y > imgsList.sky.height - imgsList.land.height - 20 || bird.y < 10 || context.isPointInPath(bird.x, bird.y)) {

          that.isStart = false;
        }
      })()

    },
    creatCanvas: function(id) {
      var cv = document.createElement("canvas");
      cv.height = 600;
      cv.width = 800;
      cv.style.border = '1px solid red';
      this.ctx = cv.getContext('2d');
      var container = document.getElementById(id) || document.body;
      container.appendChild(cv);
    }

  }

  // Fly.Game = Game;
  var instace = null;
  Fly.getGame = function(config) {
    if (instace == null) {
      instace = new Game(config);
    }
    return instace;
  }
})(Fly)
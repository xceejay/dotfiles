(function() {
  var CompositeDisposable;

  CompositeDisposable = require("atom").CompositeDisposable;

  module.exports = {
    subscriptions: null,
    key: "activate-power-mode.particles.colours",
    conf: [],
    golden_ratio_conjugate: 0.618033988749895,
    init: function() {
      this.initConfigSubscribers();
      return this.initList();
    },
    disable: function() {
      var ref, ref1;
      if ((ref = this.subscriptions) != null) {
        ref.dispose();
      }
      if ((ref1 = this.colorList) != null) {
        ref1.dispose();
      }
      return this.colorList = null;
    },
    observe: function(key) {
      return this.subscriptions.add(atom.config.observe(this.key + "." + key, (function(_this) {
        return function(value) {
          return _this.conf[key] = value;
        };
      })(this)));
    },
    initConfigSubscribers: function() {
      this.subscriptions = new CompositeDisposable;
      this.observe('type');
      this.observe('fixed');
      return this.observe('randomType');
    },
    hsvToRgb: function(h, s, v) {
      var c, h2, h3, m, x;
      c = v * s;
      h2 = (360.0 * h) / 60.0;
      h3 = Math.abs((h2 % 2) - 1.0);
      x = c * (1.0 - h3);
      m = v - c;
      if ((0 <= h2 && h2 < 1)) {
        return [c + m, x + m, m];
      }
      if ((1 <= h2 && h2 < 2)) {
        return [x + m, c + m, m];
      }
      if ((2 <= h2 && h2 < 3)) {
        return [m, c + m, x + m];
      }
      if ((3 <= h2 && h2 < 4)) {
        return [m, x + m, c + m];
      }
      if ((4 <= h2 && h2 < 5)) {
        return [x + m, m, c + m];
      }
      if ((5 <= h2 && h2 < 6)) {
        return [c + m, m, x + m];
      }
    },
    getFixedColorGenerator: function*() {
      var c, color;
      c = this.conf['fixed'];
      color = "rgb(" + c.red + "," + c.green + "," + c.blue + ")";
      while (true) {
        yield color;
      }
    },
    getRandomBrightColor: function() {
      var b, g, r, rgb;
      this.seed += this.golden_ratio_conjugate;
      this.seed = this.seed - (Math.floor(this.seed / 1));
      rgb = this.hsvToRgb(this.seed, 1, 1);
      r = Math.floor((rgb[0] * 255) / 1);
      g = Math.floor((rgb[1] * 255) / 1);
      b = Math.floor((rgb[2] * 255) / 1);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
    getRandomAllColor: function() {
      var b, g, r;
      r = Math.floor(Math.random() * 256);
      g = Math.floor(Math.random() * 256);
      b = Math.floor(Math.random() * 256);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
    getRandomGenerator: function*() {
      if (this.conf['randomType'] === 'bright') {
        this.seed = Math.random();
        while (true) {
          yield this.getRandomBrightColor();
        }
      } else {
        while (true) {
          yield this.getRandomAllColor();
        }
      }
    },
    getRandomSpawnGenerator: function*() {
      var color;
      if (this.conf['randomType'] === 'bright') {
        this.seed = Math.random();
        color = this.getRandomBrightColor();
      } else {
        color = this.getRandomAllColor();
      }
      while (true) {
        yield color;
      }
    },
    getColorAtCursorGenerator: function*(cursor, editorElement) {
      var color;
      color = this.getColorAtCursor(cursor, editorElement);
      while (true) {
        yield color;
      }
    },
    getColorAtCursor: function(cursor, editorElement) {
      var el, error, scope;
      scope = cursor.getScopeDescriptor();
      scope = scope.toString().replace(/\./g, '.syntax--');
      try {
        el = editorElement.querySelector(scope);
      } catch (error1) {
        error = error1;
        "rgb(255, 255, 255)";
      }
      if (el) {
        return getComputedStyle(el).color;
      } else {
        return "rgb(255, 255, 255)";
      }
    },
    generateColors: function(cursor, editorElement) {
      var colorType;
      colorType = this.conf['type'];
      if (colorType === 'random') {
        return this.getRandomGenerator();
      } else if (colorType === 'fixed') {
        return this.getFixedColorGenerator();
      } else if (colorType === 'randomSpawn') {
        return this.getRandomSpawnGenerator();
      } else {
        return this.getColorAtCursorGenerator(cursor, editorElement);
      }
    },
    selectColor: function(code) {
      return atom.config.set(this.key + ".type", code);
    },
    initList: function() {
      if (this.colorList != null) {
        return;
      }
      this.colorList = require("./color-list");
      this.colorList.init(this);
      return this.subscriptions.add(atom.commands.add("atom-workspace", {
        "activate-power-mode:select-color": (function(_this) {
          return function() {
            return _this.colorList.toggle();
          };
        })(this)
      }));
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvam9lbC8uYXRvbS9wYWNrYWdlcy9hY3RpdmF0ZS1wb3dlci1tb2RlL2xpYi9jb2xvci1oZWxwZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVI7O0VBRXhCLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7SUFBQSxhQUFBLEVBQWUsSUFBZjtJQUNBLEdBQUEsRUFBSyx1Q0FETDtJQUVBLElBQUEsRUFBTSxFQUZOO0lBR0Esc0JBQUEsRUFBd0IsaUJBSHhCO0lBS0EsSUFBQSxFQUFNLFNBQUE7TUFDSixJQUFDLENBQUEscUJBQUQsQ0FBQTthQUNBLElBQUMsQ0FBQSxRQUFELENBQUE7SUFGSSxDQUxOO0lBU0EsT0FBQSxFQUFTLFNBQUE7QUFDUCxVQUFBOztXQUFjLENBQUUsT0FBaEIsQ0FBQTs7O1lBQ1UsQ0FBRSxPQUFaLENBQUE7O2FBQ0EsSUFBQyxDQUFBLFNBQUQsR0FBYTtJQUhOLENBVFQ7SUFjQSxPQUFBLEVBQVMsU0FBQyxHQUFEO2FBQ1AsSUFBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBWixDQUNkLElBQUMsQ0FBQSxHQUFGLEdBQU0sR0FBTixHQUFTLEdBRE0sRUFDQyxDQUFBLFNBQUEsS0FBQTtlQUFBLFNBQUMsS0FBRDtpQkFDaEIsS0FBQyxDQUFBLElBQUssQ0FBQSxHQUFBLENBQU4sR0FBYTtRQURHO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQURELENBQW5CO0lBRE8sQ0FkVDtJQW9CQSxxQkFBQSxFQUF1QixTQUFBO01BQ3JCLElBQUMsQ0FBQSxhQUFELEdBQWlCLElBQUk7TUFDckIsSUFBQyxDQUFBLE9BQUQsQ0FBUyxNQUFUO01BQ0EsSUFBQyxDQUFBLE9BQUQsQ0FBUyxPQUFUO2FBQ0EsSUFBQyxDQUFBLE9BQUQsQ0FBUyxZQUFUO0lBSnFCLENBcEJ2QjtJQTBCQSxRQUFBLEVBQVUsU0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUw7QUFDUixVQUFBO01BQUEsQ0FBQSxHQUFJLENBQUEsR0FBSTtNQUNSLEVBQUEsR0FBSyxDQUFDLEtBQUEsR0FBTSxDQUFQLENBQUEsR0FBVztNQUNoQixFQUFBLEdBQUssSUFBSSxDQUFDLEdBQUwsQ0FBUyxDQUFDLEVBQUEsR0FBRyxDQUFKLENBQUEsR0FBUyxHQUFsQjtNQUNMLENBQUEsR0FBSSxDQUFBLEdBQUksQ0FBQyxHQUFBLEdBQU0sRUFBUDtNQUNSLENBQUEsR0FBSSxDQUFBLEdBQUk7TUFDUixJQUFHLENBQUEsQ0FBQSxJQUFHLEVBQUgsSUFBRyxFQUFILEdBQU0sQ0FBTixDQUFIO0FBQWdCLGVBQU8sQ0FBQyxDQUFBLEdBQUUsQ0FBSCxFQUFLLENBQUEsR0FBRSxDQUFQLEVBQVMsQ0FBVCxFQUF2Qjs7TUFDQSxJQUFHLENBQUEsQ0FBQSxJQUFHLEVBQUgsSUFBRyxFQUFILEdBQU0sQ0FBTixDQUFIO0FBQWdCLGVBQU8sQ0FBQyxDQUFBLEdBQUUsQ0FBSCxFQUFLLENBQUEsR0FBRSxDQUFQLEVBQVMsQ0FBVCxFQUF2Qjs7TUFDQSxJQUFHLENBQUEsQ0FBQSxJQUFHLEVBQUgsSUFBRyxFQUFILEdBQU0sQ0FBTixDQUFIO0FBQWdCLGVBQU8sQ0FBQyxDQUFELEVBQUcsQ0FBQSxHQUFFLENBQUwsRUFBTyxDQUFBLEdBQUUsQ0FBVCxFQUF2Qjs7TUFDQSxJQUFHLENBQUEsQ0FBQSxJQUFHLEVBQUgsSUFBRyxFQUFILEdBQU0sQ0FBTixDQUFIO0FBQWdCLGVBQU8sQ0FBQyxDQUFELEVBQUcsQ0FBQSxHQUFFLENBQUwsRUFBTyxDQUFBLEdBQUUsQ0FBVCxFQUF2Qjs7TUFDQSxJQUFHLENBQUEsQ0FBQSxJQUFHLEVBQUgsSUFBRyxFQUFILEdBQU0sQ0FBTixDQUFIO0FBQWdCLGVBQU8sQ0FBQyxDQUFBLEdBQUUsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFBLEdBQUUsQ0FBVCxFQUF2Qjs7TUFDQSxJQUFHLENB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LENBQUEsU0FBUyxDQUFDLElBQVgsQ0FBZ0IsSUFBaEI7YUFFQSxJQUFDLENBQUEsYUFBYSxDQUFDLEdBQWYsQ0FBbUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFkLENBQWtCLGdCQUFsQixFQUNqQjtRQUFBLGtDQUFBLEVBQW9DLENBQUEsU0FBQSxLQUFBO2lCQUFBLFNBQUE7bUJBQ2xDLEtBQUMsQ0FBQSxTQUFTLENBQUMsTUFBWCxDQUFBO1VBRGtDO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFwQztPQURpQixDQUFuQjtJQU5RLENBeEhWOztBQUhGIiwic291cmNlc0NvbnRlbnQiOlsie0NvbXBvc2l0ZURpc3Bvc2FibGV9ID0gcmVxdWlyZSBcImF0b21cIlxuXG5tb2R1bGUuZXhwb3J0cyA9XG4gIHN1YnNjcmlwdGlvbnM6IG51bGxcbiAga2V5OiBcImFjdGl2YXRlLXBvd2VyLW1vZGUucGFydGljbGVzLmNvbG91cnNcIlxuICBjb25mOiBbXVxuICBnb2xkZW5fcmF0aW9fY29uanVnYXRlOiAwLjYxODAzMzk4ODc0OTg5NVxuXG4gIGluaXQ6IC0+XG4gICAgQGluaXRDb25maWdTdWJzY3JpYmVycygpXG4gICAgQGluaXRMaXN0KClcblxuICBkaXNhYmxlOiAtPlxuICAgIEBzdWJzY3JpcHRpb25zPy5kaXNwb3NlKClcbiAgICBAY29sb3JMaXN0Py5kaXNwb3NlKClcbiAgICBAY29sb3JMaXN0ID0gbnVsbFxuXG4gIG9ic2VydmU6IChrZXkpIC0+XG4gICAgQHN1YnNjcmlwdGlvbnMuYWRkIGF0b20uY29uZmlnLm9ic2VydmUoXG4gICAgICBcIiN7QGtleX0uI3trZXl9XCIsICh2YWx1ZSkgPT5cbiAgICAgICAgQGNvbmZba2V5XSA9IHZhbHVlXG4gICAgKVxuXG4gIGluaXRDb25maWdTdWJzY3JpYmVyczogLT5cbiAgICBAc3Vic2NyaXB0aW9ucyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlXG4gICAgQG9ic2VydmUgJ3R5cGUnXG4gICAgQG9ic2VydmUgJ2ZpeGVkJ1xuICAgIEBvYnNlcnZlICdyYW5kb21UeXBlJ1xuXG4gIGhzdlRvUmdiOiAoaCxzLHYpIC0+ICMgSFNWIHRvIFJHQiBhbGdvcml0aG0sIGFzIHBlciB3aWtpcGVkaWFcbiAgICBjID0gdiAqIHNcbiAgICBoMiA9ICgzNjAuMCpoKSAvNjAuMCAjIEFjY29yZGluZyB0byB3aWtpcGVkaWEsIDA8aDwzNjAuLi5cbiAgICBoMyA9IE1hdGguYWJzKChoMiUyKSAtIDEuMClcbiAgICB4ID0gYyAqICgxLjAgLSBoMylcbiAgICBtID0gdiAtIGNcbiAgICBpZiAwPD1oMjwxIHRoZW4gcmV0dXJuIFtjK20seCttLG1dXG4gICAgaWYgMTw9aDI8MiB0aGVuIHJldHVybiBbeCttLGMrbSxtXVxuICAgIGlmIDI8PWgyPDMgdGhlbiByZXR1cm4gW20sYyttLHgrbV1cbiAgICBpZiAzPD1oMjw0IHRoZW4gcmV0dXJuIFttLHgrbSxjK21dXG4gICAgaWYgNDw9aDI8NSB0aGVuIHJldHVybiBbeCttLG0sYyttXVxuICAgIGlmIDU8PWgyPDYgdGhlbiByZXR1cm4gW2MrbSxtLHgrbV1cblxuICBnZXRGaXhlZENvbG9yR2VuZXJhdG9yOiAtPlxuICAgIGMgPSBAY29uZlsnZml4ZWQnXVxuICAgIGNvbG9yID0gXCJyZ2IoI3tjLnJlZH0sI3tjLmdyZWVufSwje2MuYmx1ZX0pXCJcblxuICAgIGxvb3BcbiAgICAgIHlpZWxkIGNvbG9yXG4gICAgcmV0dXJuXG5cbiAgZ2V0UmFuZG9tQnJpZ2h0Q29sb3I6IC0+XG4gICAgQHNlZWQgKz0gQGdvbGRlbl9yYXRpb19jb25qdWdhdGVcbiAgICBAc2VlZCA9IEBzZWVkIC0gKEBzZWVkLy8xKVxuICAgIHJnYiA9IEBoc3ZUb1JnYihAc2VlZCwxLDEpXG4gICAgciA9IChyZ2JbMF0qMjU1KS8vMVxuICAgIGcgPSAocmdiWzFdKjI1NSkvLzFcbiAgICBiID0gKHJnYlsyXSoyNTUpLy8xXG4gICAgXCJyZ2IoI3tyfSwje2d9LCN7Yn0pXCJcblxuICBnZXRSYW5kb21BbGxDb2xvcjogLT5cbiAgICByID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KVxuICAgIGcgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpXG4gICAgYiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NilcbiAgICBcInJnYigje3J9LCN7Z30sI3tifSlcIlxuXG4gIGdldFJhbmRvbUdlbmVyYXRvcjogLT5cbiAgICBpZiBAY29uZlsncmFuZG9tVHlwZSddID09ICdicmlnaHQnXG4gICAgICBAc2VlZCA9IE1hdGgucmFuZG9tKClcblxuICAgICAgbG9vcFxuICAgICAgICB5aWVsZCBAZ2V0UmFuZG9tQnJpZ2h0Q29sb3IoKVxuICAgICAgcmV0dXJuXG5cbiAgICBlbHNlXG4gICAgICBsb29wXG4gICAgICAgIHlpZWxkIEBnZXRSYW5kb21BbGxDb2xvcigpXG4gICAgICByZXR1cm5cblxuICBnZXRSYW5kb21TcGF3bkdlbmVyYXRvcjogLT5cbiAgICBpZiBAY29uZlsncmFuZG9tVHlwZSddID09ICdicmlnaHQnXG4gICAgICBAc2VlZCA9IE1hdGgucmFuZG9tKClcbiAgICAgIGNvbG9yID0gQGdldFJhbmRvbUJyaWdodENvbG9yKClcbiAgICBlbHNlXG4gICAgICBjb2xvciA9IEBnZXRSYW5kb21BbGxDb2xvcigpXG5cbiAgICBsb29wXG4gICAgICB5aWVsZCBjb2xvclxuICAgIHJldHVyblxuXG4gIGdldENvbG9yQXRDdXJzb3JHZW5lcmF0b3I6IChjdXJzb3IsIGVkaXRvckVsZW1lbnQpIC0+XG4gICAgY29sb3IgPSBAZ2V0Q29sb3JBdEN1cnNvciBjdXJzb3IsIGVkaXRvckVsZW1lbnRcbiAgICBsb29wXG4gICAgICB5aWVsZCBjb2xvclxuICAgIHJldHVyblxuXG4gIGdldENvbG9yQXRDdXJzb3I6IChjdXJzb3IsIGVkaXRvckVsZW1lbnQpIC0+XG4gICAgc2NvcGUgPSBjdXJzb3IuZ2V0U2NvcGVEZXNjcmlwdG9yKClcbiAgICBzY29wZSA9IHNjb3BlLnRvU3RyaW5nKCkucmVwbGFjZSgvXFwuL2csICcuc3ludGF4LS0nKVxuXG4gICAgdHJ5XG4gICAgICBlbCA9IGVkaXRvckVsZW1lbnQucXVlcnlTZWxlY3RvciBzY29wZVxuICAgIGNhdGNoIGVycm9yXG4gICAgICBcInJnYigyNTUsIDI1NSwgMjU1KVwiXG5cbiAgICBpZiBlbFxuICAgICAgZ2V0Q29tcHV0ZWRTdHlsZShlbCkuY29sb3JcbiAgICBlbHNlXG4gICAgICBcInJnYigyNTUsIDI1NSwgMjU1KVwiXG5cbiAgZ2VuZXJhdGVDb2xvcnM6IChjdXJzb3IsIGVkaXRvckVsZW1lbnQpIC0+XG4gICAgY29sb3JUeXBlID0gQGNvbmZbJ3R5cGUnXVxuICAgIGlmIChjb2xvclR5cGUgPT0gJ3JhbmRvbScpXG4gICAgICByZXR1cm4gQGdldFJhbmRvbUdlbmVyYXRvcigpXG4gICAgZWxzZSBpZiBjb2xvclR5cGUgPT0gJ2ZpeGVkJ1xuICAgICAgQGdldEZpeGVkQ29sb3JHZW5lcmF0b3IoKVxuICAgIGVsc2UgaWYgY29sb3JUeXBlID09ICdyYW5kb21TcGF3bidcbiAgICAgIEBnZXRSYW5kb21TcGF3bkdlbmVyYXRvcigpXG4gICAgZWxzZVxuICAgICAgQGdldENvbG9yQXRDdXJzb3JHZW5lcmF0b3IgY3Vyc29yLCBlZGl0b3JFbGVtZW50XG5cbiAgc2VsZWN0Q29sb3I6IChjb2RlKSAtPlxuICAgIGF0b20uY29uZmlnLnNldChcIiN7QGtleX0udHlwZVwiLCBjb2RlKVxuXG4gIGluaXRMaXN0OiAtPlxuICAgIHJldHVybiBpZiBAY29sb3JMaXN0P1xuXG4gICAgQGNvbG9yTGlzdCA9IHJlcXVpcmUgXCIuL2NvbG9yLWxpc3RcIlxuICAgIEBjb2xvckxpc3QuaW5pdCB0aGlzXG5cbiAgICBAc3Vic2NyaXB0aW9ucy5hZGQgYXRvbS5jb21tYW5kcy5hZGQgXCJhdG9tLXdvcmtzcGFjZVwiLFxuICAgICAgXCJhY3RpdmF0ZS1wb3dlci1tb2RlOnNlbGVjdC1jb2xvclwiOiA9PlxuICAgICAgICBAY29sb3JMaXN0LnRvZ2dsZSgpXG4iXX0=

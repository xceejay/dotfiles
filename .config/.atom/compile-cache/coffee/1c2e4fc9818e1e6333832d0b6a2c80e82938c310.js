(function() {
  var CompositeDisposable, colorHelper, random;

  CompositeDisposable = require("atom").CompositeDisposable;

  random = require("lodash.random");

  colorHelper = require("./color-helper");

  module.exports = {
    api: null,
    colorHelper: colorHelper,
    subscriptions: null,
    conf: [],
    phaseStep: 0,
    setEffectRegistry: function(effectRegistry) {
      return this.effectRegistry = effectRegistry;
    },
    enable: function(api) {
      this.api = api;
      this.initConfigSubscribers();
      this.colorHelper.init();
      return this.initResizeObserver();
    },
    init: function() {
      this.effectRegistry.effect.init(this.api);
      return this.animationOn();
    },
    getEffect: function() {
      return this.effectRegistry.effect;
    },
    resetCanvas: function() {
      var ref, ref1;
      this.animationOff();
      if ((ref = this.resizeObserver) != null) {
        ref.disconnect();
      }
      if ((ref1 = this.canvas) != null) {
        ref1.style.display = "none";
      }
      this.editor = null;
      return this.editorElement = null;
    },
    animationOff: function() {
      cancelAnimationFrame(this.animationFrame);
      return this.animationFrame = null;
    },
    animationOn: function() {
      return this.animationFrame = requestAnimationFrame(this.animate.bind(this));
    },
    destroy: function() {
      var ref, ref1, ref2, ref3, ref4;
      this.resetCanvas();
      if ((ref = this.effectRegistry) != null) {
        ref.effect.disable();
      }
      if ((ref1 = this.canvas) != null) {
        ref1.parentNode.removeChild(this.canvas);
      }
      this.canvas = null;
      if ((ref2 = this.subscriptions) != null) {
        ref2.dispose();
      }
      if ((ref3 = this.colorHelper) != null) {
        ref3.disable();
      }
      this.api = null;
      if ((ref4 = this.resizeObserver) != null) {
        ref4.disconnect();
      }
      return this.resizeObserver = null;
    },
    initResizeObserver: function() {
      return this.resizeObserver = new ResizeObserver((function(_this) {
        return function() {
          _this.updateCanvasDimesions();
          return _this.calculateOffsets();
        };
      })(this));
    },
    setupCanvas: function(editor, editorElement) {
      if (!this.canvas) {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.canvas.classList.add("power-mode-canvas");
        this.initConfigSubscribers();
      }
      this.scrollView = editorElement.querySelector(".scroll-view");
      this.scrollView.appendChild(this.canvas);
      this.canvas.style.display = "block";
      this.editorElement = editorElement;
      this.editor = editor;
      this.updateCanvasDimesions();
      this.calculateOffsets();
      this.resizeObserver.observe(this.scrollView);
      return this.init();
    },
    observe: function(key) {
      return this.subscriptions.add(atom.config.observe("activate-power-mode.particles." + key, (function(_this) {
        return function(value) {
          return _this.conf[key] = value;
        };
      })(this)));
    },
    initConfigSubscribers: function() {
      this.subscriptions = new CompositeDisposable;
      this.observe('spawnCount.min');
      this.observe('spawnCount.max');
      this.observe('totalCount.max');
      this.observe('size.min');
      return this.observe('size.max');
    },
    spawn: function(cursor, screenPosition, input, size) {
      var colorGenerate, colorGenerator, position, randomSize;
      position = this.calculatePositions(screenPosition);
      colorGenerator = this.colorHelper.generateColors(cursor, this.editorElement);
      randomSize = (function(_this) {
        return function() {
          return _this.randomSize(size);
        };
      })(this);
      colorGenerate = function() {
        return colorGenerator.next().value;
      };
      return this.effectRegistry.effect.spawn(position, colorGenerate, input, randomSize, this.conf);
    },
    randomSize: function(size) {
      var max, min;
      min = this.conf['size.min'];
      max = this.conf['size.max'];
      if (size === 'max') {
        return random(max - min + 2, max + 2, true);
      } else if (size === 'min') {
        return random(min - 1, max - min, true);
      } else {
        return random(min, max, true);
      }
    },
    calculatePositions: function(screenPosition) {
      var left, ref, top;
      ref = this.editorElement.pixelPositionForScreenPosition(screenPosition), left = ref.left, top = ref.top;
      return {
        left: left + this.offsetLeft - this.editorElement.getScrollLeft(),
        top: top + this.offsetTop - this.editorElement.getScrollTop() + this.editor.getLineHeightInPixels() / 2
      };
    },
    calculateOffsets: function() {
      if (!this.scrollView) {
        return;
      }
      this.offsetLeft = 0;
      return this.offsetTop = this.scrollView.offsetTop;
    },
    updateCanvasDimesions: function() {
      if (!this.editorElement) {
        return;
      }
      this.canvas.width = this.editorElement.offsetWidth;
      this.canvas.height = this.editorElement.offsetHeight;
      this.canvas.style.width = this.editorElement.width;
      return this.canvas.style.height = this.editorElement.height;
    },
    animate: function() {
      this.animationOn();
      this.effectRegistry.effect.update();
      if (this.phaseStep === 0) {
        this.canvas.width = this.canvas.width;
        this.effectRegistry.effect.animate(this.context);
      }
      this.phaseStep++;
      if (this.phaseStep > 2) {
        return this.phaseStep = 0;
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvam9lbC8uYXRvbS9wYWNrYWdlcy9hY3RpdmF0ZS1wb3dlci1tb2RlL2xpYi9jYW52YXMtcmVuZGVyZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVI7O0VBQ3hCLE1BQUEsR0FBUyxPQUFBLENBQVEsZUFBUjs7RUFDVCxXQUFBLEdBQWMsT0FBQSxDQUFRLGdCQUFSOztFQUVkLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7SUFBQSxHQUFBLEVBQUssSUFBTDtJQUNBLFdBQUEsRUFBYSxXQURiO0lBRUEsYUFBQSxFQUFlLElBRmY7SUFHQSxJQUFBLEVBQU0sRUFITjtJQUlBLFNBQUEsRUFBVyxDQUpYO0lBTUEsaUJBQUEsRUFBbUIsU0FBQyxjQUFEO2FBQ2pCLElBQUMsQ0FBQSxjQUFELEdBQWtCO0lBREQsQ0FObkI7SUFTQSxNQUFBLEVBQVEsU0FBQyxHQUFEO01BQ04sSUFBQyxDQUFBLEdBQUQsR0FBTztNQUNQLElBQUMsQ0FBQSxxQkFBRCxDQUFBO01BQ0EsSUFBQyxDQUFBLFdBQVcsQ0FBQyxJQUFiLENBQUE7YUFDQSxJQUFDLENBQUEsa0JBQUQsQ0FBQTtJQUpNLENBVFI7SUFlQSxJQUFBLEVBQU0sU0FBQTtNQUNKLElBQUMsQ0FBQSxjQUFjLENBQUMsTUFBTSxDQUFDLElBQXZCLENBQTRCLElBQUMsQ0FBQSxHQUE3QjthQUNBLElBQUMsQ0FBQSxXQUFELENBQUE7SUFGSSxDQWZOO0lBbUJBLFNBQUEsRUFBVyxTQUFBO2FBQ1QsSUFBQyxDQUFBLGNBQWMsQ0FBQztJQURQLENBbkJYO0lBc0JBLFdBQUEsRUFBYSxTQUFBO0FBQ1gsVUFBQTtNQUFBLElBQUMsQ0FBQSxZQUFELENBQUE7O1dBQ2UsQ0FBRSxVQUFqQixDQUFBOzs7WUFDTyxDQUFFLEtBQUssQ0FBQyxPQUFmLEdBQXlCOztNQUN6QixJQUFDLENBQUEsTUFB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QUEsU0FBRCxLQUFjLENBQWpCO1FBQ0UsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFSLEdBQWdCLElBQUMsQ0FBQSxNQUFNLENBQUM7UUFDeEIsSUFBQyxDQUFBLGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBdkIsQ0FBK0IsSUFBQyxDQUFBLE9BQWhDLEVBRkY7O01BSUEsSUFBQyxDQUFBLFNBQUQ7TUFDQSxJQUFrQixJQUFDLENBQUEsU0FBRCxHQUFhLENBQS9CO2VBQUEsSUFBQyxDQUFBLFNBQUQsR0FBYSxFQUFiOztJQVJPLENBdEhUOztBQUxGIiwic291cmNlc0NvbnRlbnQiOlsie0NvbXBvc2l0ZURpc3Bvc2FibGV9ID0gcmVxdWlyZSBcImF0b21cIlxucmFuZG9tID0gcmVxdWlyZSBcImxvZGFzaC5yYW5kb21cIlxuY29sb3JIZWxwZXIgPSByZXF1aXJlIFwiLi9jb2xvci1oZWxwZXJcIlxuXG5tb2R1bGUuZXhwb3J0cyA9XG4gIGFwaTogbnVsbFxuICBjb2xvckhlbHBlcjogY29sb3JIZWxwZXJcbiAgc3Vic2NyaXB0aW9uczogbnVsbFxuICBjb25mOiBbXVxuICBwaGFzZVN0ZXA6IDBcblxuICBzZXRFZmZlY3RSZWdpc3RyeTogKGVmZmVjdFJlZ2lzdHJ5KSAtPlxuICAgIEBlZmZlY3RSZWdpc3RyeSA9IGVmZmVjdFJlZ2lzdHJ5XG5cbiAgZW5hYmxlOiAoYXBpKSAtPlxuICAgIEBhcGkgPSBhcGlcbiAgICBAaW5pdENvbmZpZ1N1YnNjcmliZXJzKClcbiAgICBAY29sb3JIZWxwZXIuaW5pdCgpXG4gICAgQGluaXRSZXNpemVPYnNlcnZlcigpXG5cbiAgaW5pdDogLT5cbiAgICBAZWZmZWN0UmVnaXN0cnkuZWZmZWN0LmluaXQoQGFwaSlcbiAgICBAYW5pbWF0aW9uT24oKVxuXG4gIGdldEVmZmVjdDogLT5cbiAgICBAZWZmZWN0UmVnaXN0cnkuZWZmZWN0XG5cbiAgcmVzZXRDYW52YXM6IC0+XG4gICAgQGFuaW1hdGlvbk9mZigpXG4gICAgQHJlc2l6ZU9ic2VydmVyPy5kaXNjb25uZWN0KClcbiAgICBAY2FudmFzPy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcbiAgICBAZWRpdG9yID0gbnVsbFxuICAgIEBlZGl0b3JFbGVtZW50ID0gbnVsbFxuXG4gIGFuaW1hdGlvbk9mZjogLT5cbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZShAYW5pbWF0aW9uRnJhbWUpXG4gICAgQGFuaW1hdGlvbkZyYW1lID0gbnVsbFxuXG4gIGFuaW1hdGlvbk9uOiAtPlxuICAgIEBhbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSBAYW5pbWF0ZS5iaW5kKHRoaXMpXG5cbiAgZGVzdHJveTogLT5cbiAgICBAcmVzZXRDYW52YXMoKVxuICAgIEBlZmZlY3RSZWdpc3RyeT8uZWZmZWN0LmRpc2FibGUoKVxuICAgIEBjYW52YXM/LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQgQGNhbnZhc1xuICAgIEBjYW52YXMgPSBudWxsXG4gICAgQHN1YnNjcmlwdGlvbnM/LmRpc3Bvc2UoKVxuICAgIEBjb2xvckhlbHBlcj8uZGlzYWJsZSgpXG4gICAgQGFwaSA9IG51bGxcbiAgICBAcmVzaXplT2JzZXJ2ZXI/LmRpc2Nvbm5lY3QoKVxuICAgIEByZXNpemVPYnNlcnZlciA9IG51bGxcblxuICBpbml0UmVzaXplT2JzZXJ2ZXI6IC0+XG4gICAgQHJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyICgpID0+XG4gICAgICBAdXBkYXRlQ2FudmFzRGltZXNpb25zKClcbiAgICAgIEBjYWxjdWxhdGVPZmZzZXRzKClcblxuICBzZXR1cENhbnZhczogKGVkaXRvciwgZWRpdG9yRWxlbWVudCkgLT5cbiAgICBpZiBub3QgQGNhbnZhc1xuICAgICAgQGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJjYW52YXNcIlxuICAgICAgQGNvbnRleHQgPSBAY2FudmFzLmdldENvbnRleHQgXCIyZFwiXG4gICAgICBAY2FudmFzLmNsYXNzTGlzdC5hZGQgXCJwb3dlci1tb2RlLWNhbnZhc1wiXG4gICAgICBAaW5pdENvbmZpZ1N1YnNjcmliZXJzKClcblxuICAgIEBzY3JvbGxWaWV3ID0gZWRpdG9yRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnNjcm9sbC12aWV3XCIpXG4gICAgQHNjcm9sbFZpZXcuYXBwZW5kQ2hpbGQgQGNhbnZhc1xuICAgIEBjYW52YXMuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIlxuICAgIEBlZGl0b3JFbGVtZW50ID0gZWRpdG9yRWxlbWVudFxuICAgIEBlZGl0b3IgPSBlZGl0b3JcbiAgICBAdXBkYXRlQ2FudmFzRGltZXNpb25zKClcbiAgICBAY2FsY3VsYXRlT2Zmc2V0cygpXG4gICAgQHJlc2l6ZU9ic2VydmVyLm9ic2VydmUoQHNjcm9sbFZpZXcpXG5cbiAgICBAaW5pdCgpXG5cbiAgb2JzZXJ2ZTogKGtleSkgLT5cbiAgICBAc3Vic2NyaXB0aW9ucy5hZGQgYXRvbS5jb25maWcub2JzZXJ2ZSBcImFjdGl2YXRlLXBvd2VyLW1vZGUucGFydGljbGVzLiN7a2V5fVwiLCAodmFsdWUpID0+XG4gICAgICBAY29uZltrZXldID0gdmFsdWVcblxuICBpbml0Q29uZmlnU3Vic2NyaWJlcnM6IC0+XG4gICAgQHN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZVxuICAgIEBvYnNlcnZlICdzcGF3bkNvdW50Lm1pbidcbiAgICBAb2JzZXJ2ZSAnc3Bhd25Db3VudC5tYXgnXG4gICAgQG9ic2VydmUgJ3RvdGFsQ291bnQubWF4J1xuICAgIEBvYnNlcnZlICdzaXplLm1pbidcbiAgICBAb2JzZXJ2ZSAnc2l6ZS5tYXgnXG5cbiAgc3Bhd246IChjdXJzb3IsIHNjcmVlblBvc2l0aW9uLCBpbnB1dCwgc2l6ZSkgLT5cbiAgICBwb3NpdGlvbiA9IEBjYWxjdWxhdGVQb3NpdGlvbnMgc2NyZWVuUG9zaXRpb25cbiAgICBjb2xvckdlbmVyYXRvciA9IEBjb2xvckhlbHBlci5nZW5lcmF0ZUNvbG9ycyBjdXJzb3IsIEBlZGl0b3JFbGVtZW50XG4gICAgcmFuZG9tU2l6ZSA9ID0+IEByYW5kb21TaXplKHNpemUpXG4gICAgY29sb3JHZW5lcmF0ZSA9IC0+IGNvbG9yR2VuZXJhdG9yLm5leHQoKS52YWx1ZVxuXG4gICAgQGVmZmVjdFJlZ2lzdHJ5LmVmZmVjdC5zcGF3biBwb3NpdGlvbiwgY29sb3JHZW5lcmF0ZSwgaW5wdXQsIHJhbmRvbVNpemUsIEBjb25mXG5cbiAgcmFuZG9tU2l6ZTogKHNpemUpIC0+XG4gICAgbWluID0gQGNvbmZbJ3NpemUubWluJ11cbiAgICBtYXggPSBAY29uZlsnc2l6ZS5tYXgnXVxuXG4gICAgaWYgc2l6ZSBpcyAnbWF4J1xuICAgICAgcmFuZG9tIG1heCAtIG1pbiArIDIsIG1heCArIDIsIHRydWVcbiAgICBlbHNlIGlmIHNpemUgaXMgJ21pbidcbiAgICAgIHJhbmRvbSBtaW4gLSAxLCBtYXggLSBtaW4sIHRydWVcbiAgICBlbHNlXG4gICAgICByYW5kb20gbWluLCBtYXgsIHRydWVcblxuICBjYWxjdWxhdGVQb3NpdGlvbnM6IChzY3JlZW5Qb3NpdGlvbikgLT5cbiAgICB7bGVmdCwgdG9wfSA9IEBlZGl0b3JFbGVtZW50LnBpeGVsUG9zaXRpb25Gb3JTY3JlZW5Qb3NpdGlvbiBzY3JlZW5Qb3NpdGlvblxuICAgIGxlZnQ6IGxlZnQgKyBAb2Zmc2V0TGVmdCAtIEBlZGl0b3JFbGVtZW50LmdldFNjcm9sbExlZnQoKVxuICAgIHRvcDogdG9wICsgQG9mZnNldFRvcCAtIEBlZGl0b3JFbGVtZW50LmdldFNjcm9sbFRvcCgpICsgQGVkaXRvci5nZXRMaW5lSGVpZ2h0SW5QaXhlbHMoKSAvIDJcblxuICBjYWxjdWxhdGVPZmZzZXRzOiAtPlxuICAgIHJldHVybiBpZiBub3QgQHNjcm9sbFZpZXdcbiAgICBAb2Zmc2V0TGVmdCA9IDBcbiAgICBAb2Zmc2V0VG9wID0gQHNjcm9sbFZpZXcub2Zmc2V0VG9wXG5cbiAgdXBkYXRlQ2FudmFzRGltZXNpb25zOiAtPlxuICAgIHJldHVybiBpZiBub3QgQGVkaXRvckVsZW1lbnRcbiAgICBAY2FudmFzLndpZHRoID0gQGVkaXRvckVsZW1lbnQub2Zmc2V0V2lkdGhcbiAgICBAY2FudmFzLmhlaWdodCA9IEBlZGl0b3JFbGVtZW50Lm9mZnNldEhlaWdodFxuICAgIEBjYW52YXMuc3R5bGUud2lkdGggPSBAZWRpdG9yRWxlbWVudC53aWR0aFxuICAgIEBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gQGVkaXRvckVsZW1lbnQuaGVpZ2h0XG5cbiAgYW5pbWF0ZTogLT5cbiAgICBAYW5pbWF0aW9uT24oKVxuICAgIEBlZmZlY3RSZWdpc3RyeS5lZmZlY3QudXBkYXRlKClcbiAgICBpZiBAcGhhc2VTdGVwIGlzIDBcbiAgICAgIEBjYW52YXMud2lkdGggPSBAY2FudmFzLndpZHRoXG4gICAgICBAZWZmZWN0UmVnaXN0cnkuZWZmZWN0LmFuaW1hdGUoQGNvbnRleHQpXG5cbiAgICBAcGhhc2VTdGVwKytcbiAgICBAcGhhc2VTdGVwID0gMCBpZiBAcGhhc2VTdGVwID4gMlxuIl19

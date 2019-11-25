(function() {
  var ParticlesEffect, random;

  random = require("lodash.random");

  module.exports = ParticlesEffect = (function() {
    ParticlesEffect.prototype.particles = [];

    function ParticlesEffect(particleManager) {
      this.title = particleManager.title;
      this.description = particleManager.description;
      this.image = particleManager.image;
      this.particleManager = particleManager;
    }

    ParticlesEffect.prototype.init = function() {
      return this.reset();
    };

    ParticlesEffect.prototype.disable = function() {
      return this.reset();
    };

    ParticlesEffect.prototype.reset = function() {
      return this.particles = [];
    };

    ParticlesEffect.prototype.spawn = function(position, colorGenerate, input, randomSize, conf) {
      var base, numParticles, particle, results;
      this.conf = conf;
      numParticles = random(this.conf['spawnCount.min'], this.conf['spawnCount.max']);
      results = [];
      while (numParticles--) {
        if (this.particles.length >= this.conf['totalCount.max']) {
          this.particles.shift();
        }
        if (this.particleManager.create != null) {
          particle = this.particleManager.create(position.left, position.top, colorGenerate, randomSize);
        } else {
          particle = this.createParticle(position.left, position.top, colorGenerate, randomSize);
          if (typeof (base = this.particleManager).init === "function") {
            base.init(particle);
          }
        }
        results.push(this.particles.push(particle));
      }
      return results;
    };

    ParticlesEffect.prototype.createParticle = function(x, y, colorGenerate, randomSize) {
      return {
        x: x,
        y: y,
        alpha: 1,
        color: colorGenerate(),
        size: randomSize(),
        velocity: {
          x: -1 + Math.random() * 2,
          y: -3.5 + Math.random() * 2
        }
      };
    };

    ParticlesEffect.prototype.update = function() {
      var i, j, particle, ref, results;
      if (!this.particles.length) {
        return;
      }
      results = [];
      for (i = j = ref = this.particles.length - 1; ref <= 0 ? j <= 0 : j >= 0; i = ref <= 0 ? ++j : --j) {
        particle = this.particles[i];
        if (this.particleManager.isDone(particle)) {
          this.particles.splice(i, 1);
          continue;
        }
        results.push(this.particleManager.update(particle));
      }
      return results;
    };

    ParticlesEffect.prototype.animate = function(context) {
      var gco, i, j, particle, ref;
      if (!this.particles.length) {
        return;
      }
      gco = context.globalCompositeOperation;
      context.globalCompositeOperation = "lighter";
      for (i = j = ref = this.particles.length - 1; ref <= 0 ? j <= 0 : j >= 0; i = ref <= 0 ? ++j : --j) {
        particle = this.particles[i];
        this.particleManager.draw(particle, context);
      }
      return context.globalCompositeOperation = gco;
    };

    return ParticlesEffect;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvam9lbC8uYXRvbS9wYWNrYWdlcy9hY3RpdmF0ZS1wb3dlci1tb2RlL2xpYi9lZmZlY3QvcGFydGljbGVzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsTUFBQSxHQUFTLE9BQUEsQ0FBUSxlQUFSOztFQUVULE1BQU0sQ0FBQyxPQUFQLEdBQXVCOzhCQUNyQixTQUFBLEdBQVc7O0lBRUUseUJBQUMsZUFBRDtNQUNYLElBQUMsQ0FBQSxLQUFELEdBQVMsZUFBZSxDQUFDO01BQ3pCLElBQUMsQ0FBQSxXQUFELEdBQWUsZUFBZSxDQUFDO01BQy9CLElBQUMsQ0FBQSxLQUFELEdBQVMsZUFBZSxDQUFDO01BQ3pCLElBQUMsQ0FBQSxlQUFELEdBQW1CO0lBSlI7OzhCQU1iLElBQUEsR0FBTSxTQUFBO2FBQ0osSUFBQyxDQUFBLEtBQUQsQ0FBQTtJQURJOzs4QkFHTixPQUFBLEdBQVMsU0FBQTthQUNQLElBQUMsQ0FBQSxLQUFELENBQUE7SUFETzs7OEJBR1QsS0FBQSxHQUFPLFNBQUE7YUFDTCxJQUFDLENBQUEsU0FBRCxHQUFhO0lBRFI7OzhCQUdQLEtBQUEsR0FBTyxTQUFDLFFBQUQsRUFBVyxhQUFYLEVBQTBCLEtBQTFCLEVBQWlDLFVBQWpDLEVBQTZDLElBQTdDO0FBQ0wsVUFBQTtNQUFBLElBQUMsQ0FBQSxJQUFELEdBQVE7TUFDUixZQUFBLEdBQWUsTUFBQSxDQUFPLElBQUMsQ0FBQSxJQUFLLENBQUEsZ0JBQUEsQ0FBYixFQUFnQyxJQUFDLENBQUEsSUFBSyxDQUFBLGdCQUFBLENBQXRDO0FBRWY7YUFBTSxZQUFBLEVBQU47UUFDRSxJQUFzQixJQUFDLENBQUEsU0FBUyxDQUFDLE1BQVgsSUFBcUIsSUFBQyxDQUFBLElBQUssQ0FBQSxnQkFBQSxDQUFqRDtVQUFBLElBQUMsQ0FBQSxTQUFTLENBQUMsS0FBWCxDQUFBLEVBQUE7O1FBQ0EsSUFBRyxtQ0FBSDtVQUNFLFFBQUEsR0FBVyxJQUFDLENBQUEsZUFBZSxDQUFDLE1BQWpCLENBQXdCLFFBQVEsQ0FBQyxJQUFqQyxFQUF1QyxRQUFRLENBQUMsR0FBaEQsRUFBcUQsYUFBckQsRUFBb0UsVUFBcEUsRUFEYjtTQUFBLE1BQUE7VUFHRSxRQUFBLEdBQVcsSUFBQyxDQUFBLGNBQUQsQ0FBZ0IsUUFBUSxDQUFDLElBQXpCLEVBQStCLFFBQVEsQ0FBQyxHQUF4QyxFQUE2QyxhQUE3QyxFQUE0RCxVQUE1RDs7Z0JBQ0ssQ0FBQyxLQUFNO1dBSnpCOztxQkFNQSxJQUFDLENBQUEsU0FBUyxDQUFDLElBQVgsQ0FBZ0IsUUFBaEI7TUFSRixDQUFBOztJQUpLOzs4QkFjUCxjQUFBLEdBQWdCLFNBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxhQUFQLEVBQXNCLFVBQXRCO2FBQ2Q7UUFBQSxDQUFBLEVBQUcsQ0FBSDtRQUNBLENBQUEsRUFBRyxDQURIO1FBRUEsS0FBQSxFQUFPLENBRlA7UUFHQSxLQUFBLEVBQU8sYUFBQSxDQUFBLENBSFA7UUFJQSxJQUFBLEVBQU0sVUFBQSxDQUFBLENBSk47UUFLQSxRQUFBLEVBQ0U7VUFBQSxDQUFBLEVBQUcsQ0FBQyxDQUFELEdBQUssSUFBSSxDQUFDLE1BQUwsQ0FBQSxDQUFBLEdBQWdCLENBQXhCO1VBQ0EsQ0FBQSxFQUFHLENBQUMsR0FBRCxHQUFPLElBQUksQ0FBQyxNQUFMLENBQUEsQ0FBQSxHQUFnQixDQUQxQjtTQU5GOztJQURjOzs4QkFVaEIsTUFBQSxHQUFRLFNBQUE7QUFDTixVQUFBO01BQUEsSUFBVSxDQUFJLElBQUMsQ0FBQSxTQUFTLENBQUMsTUFBekI7QUFBQSxlQUFBOztBQUVBO1dBQVMsNkZBQVQ7UUFDRSxRQUFBLEdBQVcsSUFBQyxDQUFBLFNBQVUsQ0FBQSxDQUFBO1FBRXRCLElBQUcsSUFBQyxDQUFBLGVBQWUsQ0FBQyxNQUFqQixDQUF3QixRQUF4QixDQUFIO1VBQ0UsSUFBQyxDQUFBLFNBQVMsQ0FBQyxNQUFYLENBQWtCLENBQWxCLEVBQXFCLENBQXJCO0FBQ0EsbUJBRkY7O3FCQUlBLElBQUMsQ0FBQSxlQUFlLENBQUMsTUFBakIsQ0FBd0IsUUFBeEI7QUFQRjs7SUFITTs7OEJBWVIsT0FBQSxHQUFTLFNBQUMsT0FBRDtBQUNQLFVBQUE7TUFBQSxJQUFVLENBQUksSUFBQyxDQUFBLFNBQVMsQ0FBQyxNQUF6QjtBQUFBLGVBQUE7O01BRUEsR0FBQSxHQUFNLE9BQU8sQ0FBQztNQUNkLE9BQU8sQ0FBQyx3QkFBUixHQUFtQztBQUVuQyxXQUFTLDZGQUFUO1FBQ0UsUUFBQSxHQUFXLElBQUMsQ0FBQSxTQUFVLENBQUEsQ0FBQTtRQUV0QixJQUFDLENBQUEsZUFBZSxDQUFDLElBQWpCLENBQXNCLFFBQXRCLEVBQWdDLE9BQWhDO0FBSEY7YUFLQSxPQUFPLENBQUMsd0JBQVIsR0FBbUM7SUFYNUI7Ozs7O0FBeERYIiwic291cmNlc0NvbnRlbnQiOlsicmFuZG9tID0gcmVxdWlyZSBcImxvZGFzaC5yYW5kb21cIlxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIFBhcnRpY2xlc0VmZmVjdFxuICBwYXJ0aWNsZXM6IFtdXG5cbiAgY29uc3RydWN0b3I6IChwYXJ0aWNsZU1hbmFnZXIpIC0+XG4gICAgQHRpdGxlID0gcGFydGljbGVNYW5hZ2VyLnRpdGxlXG4gICAgQGRlc2NyaXB0aW9uID0gcGFydGljbGVNYW5hZ2VyLmRlc2NyaXB0aW9uXG4gICAgQGltYWdlID0gcGFydGljbGVNYW5hZ2VyLmltYWdlXG4gICAgQHBhcnRpY2xlTWFuYWdlciA9IHBhcnRpY2xlTWFuYWdlclxuXG4gIGluaXQ6IC0+XG4gICAgQHJlc2V0KClcblxuICBkaXNhYmxlOiAtPlxuICAgIEByZXNldCgpXG5cbiAgcmVzZXQ6IC0+XG4gICAgQHBhcnRpY2xlcyA9IFtdXG5cbiAgc3Bhd246IChwb3NpdGlvbiwgY29sb3JHZW5lcmF0ZSwgaW5wdXQsIHJhbmRvbVNpemUsIGNvbmYpIC0+XG4gICAgQGNvbmYgPSBjb25mXG4gICAgbnVtUGFydGljbGVzID0gcmFuZG9tIEBjb25mWydzcGF3bkNvdW50Lm1pbiddLCBAY29uZlsnc3Bhd25Db3VudC5tYXgnXVxuXG4gICAgd2hpbGUgbnVtUGFydGljbGVzLS1cbiAgICAgIEBwYXJ0aWNsZXMuc2hpZnQoKSBpZiBAcGFydGljbGVzLmxlbmd0aCA+PSBAY29uZlsndG90YWxDb3VudC5tYXgnXVxuICAgICAgaWYgQHBhcnRpY2xlTWFuYWdlci5jcmVhdGU/XG4gICAgICAgIHBhcnRpY2xlID0gQHBhcnRpY2xlTWFuYWdlci5jcmVhdGUgcG9zaXRpb24ubGVmdCwgcG9zaXRpb24udG9wLCBjb2xvckdlbmVyYXRlLCByYW5kb21TaXplXG4gICAgICBlbHNlXG4gICAgICAgIHBhcnRpY2xlID0gQGNyZWF0ZVBhcnRpY2xlIHBvc2l0aW9uLmxlZnQsIHBvc2l0aW9uLnRvcCwgY29sb3JHZW5lcmF0ZSwgcmFuZG9tU2l6ZVxuICAgICAgICBAcGFydGljbGVNYW5hZ2VyLmluaXQ/KHBhcnRpY2xlKVxuXG4gICAgICBAcGFydGljbGVzLnB1c2ggcGFydGljbGVcblxuICBjcmVhdGVQYXJ0aWNsZTogKHgsIHksIGNvbG9yR2VuZXJhdGUsIHJhbmRvbVNpemUpIC0+XG4gICAgeDogeFxuICAgIHk6IHlcbiAgICBhbHBoYTogMVxuICAgIGNvbG9yOiBjb2xvckdlbmVyYXRlKClcbiAgICBzaXplOiByYW5kb21TaXplKClcbiAgICB2ZWxvY2l0eTpcbiAgICAgIHg6IC0xICsgTWF0aC5yYW5kb20oKSAqIDJcbiAgICAgIHk6IC0zLjUgKyBNYXRoLnJhbmRvbSgpICogMlxuXG4gIHVwZGF0ZTogLT5cbiAgICByZXR1cm4gaWYgbm90IEBwYXJ0aWNsZXMubGVuZ3RoXG5cbiAgICBmb3IgaSBpbiBbQHBhcnRpY2xlcy5sZW5ndGggLSAxIC4uMF1cbiAgICAgIHBhcnRpY2xlID0gQHBhcnRpY2xlc1tpXVxuXG4gICAgICBpZiBAcGFydGljbGVNYW5hZ2VyLmlzRG9uZSBwYXJ0aWNsZVxuICAgICAgICBAcGFydGljbGVzLnNwbGljZSBpLCAxXG4gICAgICAgIGNvbnRpbnVlXG5cbiAgICAgIEBwYXJ0aWNsZU1hbmFnZXIudXBkYXRlIHBhcnRpY2xlXG5cbiAgYW5pbWF0ZTogKGNvbnRleHQpIC0+XG4gICAgcmV0dXJuIGlmIG5vdCBAcGFydGljbGVzLmxlbmd0aFxuXG4gICAgZ2NvID0gY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb25cbiAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwibGlnaHRlclwiXG5cbiAgICBmb3IgaSBpbiBbQHBhcnRpY2xlcy5sZW5ndGggLSAxIC4uMF1cbiAgICAgIHBhcnRpY2xlID0gQHBhcnRpY2xlc1tpXVxuXG4gICAgICBAcGFydGljbGVNYW5hZ2VyLmRyYXcgcGFydGljbGUsIGNvbnRleHRcblxuICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gZ2NvXG4iXX0=

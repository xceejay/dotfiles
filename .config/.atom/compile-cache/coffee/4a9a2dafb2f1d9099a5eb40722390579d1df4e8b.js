(function() {
  var CompositeDisposable, random, throttle;

  CompositeDisposable = require("atom").CompositeDisposable;

  throttle = require("lodash.throttle");

  random = require("lodash.random");

  module.exports = {
    enabled: false,
    subscriptions: null,
    conf: [],
    init: function() {
      return this.enableSubscription = atom.config.observe('activate-power-mode.screenShake.enabled', (function(_this) {
        return function(value) {
          _this.enabled = value;
          if (_this.enabled) {
            return _this.enable();
          } else {
            return _this.disable();
          }
        };
      })(this));
    },
    destroy: function() {
      this.enableSubscription.dispose();
      return this.disable();
    },
    enable: function() {
      this.initConfigSubscribers();
      return this.throttledShake = throttle(this.shakeElement.bind(this), 100, {
        trailing: false
      });
    },
    disable: function() {
      var ref;
      return (ref = this.subscriptions) != null ? ref.dispose() : void 0;
    },
    observe: function(key) {
      return this.subscriptions.add(atom.config.observe("activate-power-mode.screenShake." + key, (function(_this) {
        return function(value) {
          return _this.conf[key] = value;
        };
      })(this)));
    },
    initConfigSubscribers: function() {
      this.subscriptions = new CompositeDisposable;
      this.observe('minIntensity');
      return this.observe('maxIntensity');
    },
    shake: function(element, intensity) {
      if (this.enabled) {
        return this.throttledShake(element, intensity);
      }
    },
    shakeElement: function(element, intensity) {
      var max, min, x, y;
      min = this.conf['minIntensity'];
      max = this.conf['maxIntensity'];
      if (intensity === 'max') {
        min = max - min;
        max = max + 2;
      } else if (intensity === 'min') {
        max = max - min;
      }
      x = this.shakeIntensity(min, max);
      y = this.shakeIntensity(min, max);
      element.style.transform = "translate(" + x + "px, " + y + "px)";
      return setTimeout(function() {
        return element.style.transform = "";
      }, 75);
    },
    shakeIntensity: function(min, max) {
      var direction;
      direction = Math.random() > 0.5 ? -1 : 1;
      return random(min, max, true) * direction;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvam9lbC8uYXRvbS9wYWNrYWdlcy9hY3RpdmF0ZS1wb3dlci1tb2RlL2xpYi9zZXJ2aWNlL3NjcmVlbi1zaGFrZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVI7O0VBQ3hCLFFBQUEsR0FBVyxPQUFBLENBQVEsaUJBQVI7O0VBQ1gsTUFBQSxHQUFTLE9BQUEsQ0FBUSxlQUFSOztFQUVULE1BQU0sQ0FBQyxPQUFQLEdBQ0U7SUFBQSxPQUFBLEVBQVMsS0FBVDtJQUNBLGFBQUEsRUFBZSxJQURmO0lBRUEsSUFBQSxFQUFNLEVBRk47SUFJQSxJQUFBLEVBQU0sU0FBQTthQUNKLElBQUMsQ0FBQSxrQkFBRCxHQUFzQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQVosQ0FDcEIseUNBRG9CLEVBQ3VCLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQyxLQUFEO1VBQ3pDLEtBQUMsQ0FBQSxPQUFELEdBQVc7VUFDWCxJQUFHLEtBQUMsQ0FBQSxPQUFKO21CQUNFLEtBQUMsQ0FBQSxNQUFELENBQUEsRUFERjtXQUFBLE1BQUE7bUJBR0UsS0FBQyxDQUFBLE9BQUQsQ0FBQSxFQUhGOztRQUZ5QztNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FEdkI7SUFEbEIsQ0FKTjtJQWNBLE9BQUEsRUFBUyxTQUFBO01BQ1AsSUFBQyxDQUFBLGtCQUFrQixDQUFDLE9BQXBCLENBQUE7YUFDQSxJQUFDLENBQUEsT0FBRCxDQUFBO0lBRk8sQ0FkVDtJQWtCQSxNQUFBLEVBQVEsU0FBQTtNQUNOLElBQUMsQ0FBQSxxQkFBRCxDQUFBO2FBQ0EsSUFBQyxDQUFBLGNBQUQsR0FBa0IsUUFBQSxDQUFTLElBQUMsQ0FBQSxZQUFZLENBQUMsSUFBZCxDQUFtQixJQUFuQixDQUFULEVBQW1DLEdBQW5DLEVBQXdDO1FBQUEsUUFBQSxFQUFVLEtBQVY7T0FBeEM7SUFGWixDQWxCUjtJQXNCQSxPQUFBLEVBQVMsU0FBQTtBQUNQLFVBQUE7cURBQWMsQ0FBRSxPQUFoQixDQUFBO0lBRE8sQ0F0QlQ7SUF5QkEsT0FBQSxFQUFTLFNBQUMsR0FBRDthQUNQLElBQUMsQ0FBQSxhQUFhLENBQUMsR0FBZixDQUFtQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQVosQ0FDakIsa0NBQUEsR0FBbUMsR0FEbEIsRUFDeUIsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFDLEtBQUQ7aUJBQ3hDLEtBQUMsQ0FBQSxJQUFLLENBQUEsR0FBQSxDQUFOLEdBQWE7UUFEMkI7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBRHpCLENBQW5CO0lBRE8sQ0F6QlQ7SUErQkEscUJBQUEsRUFBdUIsU0FBQTtNQUNyQixJQUFDLENBQUEsYUFBRCxHQUFpQixJQUFJO01BQ3JCLElBQUMsQ0FBQSxPQUFELENBQVMsY0FBVDthQUNBLElBQUMsQ0FBQSxPQUFELENBQVMsY0FBVDtJQUhxQixDQS9CdkI7SUFvQ0EsS0FBQSxFQUFPLFNBQUMsT0FBRCxFQUFVLFNBQVY7TUFDTCxJQUF1QyxJQUFDLENBQUEsT0FBeEM7ZUFBQSxJQUFDLENBQUEsY0FBRCxDQUFnQixPQUFoQixFQUF5QixTQUF6QixFQUFBOztJQURLLENBcENQO0lBdUNBLFlBQUEsRUFBYyxTQUFDLE9BQUQsRUFBVSxTQUFWO0FBQ1osVUFBQTtNQUFBLEdBQUEsR0FBTSxJQUFDLENBQUEsSUFBSyxDQUFBLGNBQUE7TUFDWixHQUFBLEdBQU0sSUFBQyxDQUFBLElBQUssQ0FBQSxjQUFBO01BQ1osSUFBRyxTQUFBLEtBQWEsS0FBaEI7UUFDRSxHQUFBLEdBQU0sR0FBQSxHQUFNO1FBQ1osR0FBQSxHQUFNLEdBQUEsR0FBTSxFQUZkO09BQUEsTUFHSyxJQUFHLFNBQUEsS0FBYSxLQUFoQjtRQUNILEdBQUEsR0FBTSxHQUFBLEdBQU0sSUFEVDs7TUFHTCxDQUFBLEdBQUksSUFBQyxDQUFBLGNBQUQsQ0FBZ0IsR0FBaEIsRUFBcUIsR0FBckI7TUFDSixDQUFBLEdBQUksSUFBQyxDQUFBLGNBQUQsQ0FBZ0IsR0FBaEIsRUFBcUIsR0FBckI7TUFFSixPQUFPLENBQUMsS0FBSyxDQUFDLFNBQWQsR0FBMEIsWUFBQSxHQUFhLENBQWIsR0FBZSxNQUFmLEdBQXFCLENBQXJCLEdBQXVCO2FBRWpELFVBQUEsQ0FBVyxTQUFBO2VBQ1QsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFkLEdBQTBCO01BRGpCLENBQVgsRUFFRSxFQUZGO0lBZFksQ0F2Q2Q7SUF5REEsY0FBQSxFQUFnQixTQUFDLEdBQUQsRUFBTSxHQUFOO0FBQ2QsVUFBQTtNQUFBLFNBQUEsR0FBZSxJQUFJLENBQUMsTUFBTCxDQUFBLENBQUEsR0FBZ0IsR0FBbkIsR0FBNEIsQ0FBQyxDQUE3QixHQUFvQzthQUNoRCxNQUFBLENBQU8sR0FBUCxFQUFZLEdBQVosRUFBaUIsSUFBakIsQ0FBQSxHQUF5QjtJQUZYLENBekRoQjs7QUFMRiIsInNvdXJjZXNDb250ZW50IjpbIntDb21wb3NpdGVEaXNwb3NhYmxlfSA9IHJlcXVpcmUgXCJhdG9tXCJcbnRocm90dGxlID0gcmVxdWlyZSBcImxvZGFzaC50aHJvdHRsZVwiXG5yYW5kb20gPSByZXF1aXJlIFwibG9kYXNoLnJhbmRvbVwiXG5cbm1vZHVsZS5leHBvcnRzID1cbiAgZW5hYmxlZDogZmFsc2VcbiAgc3Vic2NyaXB0aW9uczogbnVsbFxuICBjb25mOiBbXVxuXG4gIGluaXQ6IC0+XG4gICAgQGVuYWJsZVN1YnNjcmlwdGlvbiA9IGF0b20uY29uZmlnLm9ic2VydmUoXG4gICAgICAnYWN0aXZhdGUtcG93ZXItbW9kZS5zY3JlZW5TaGFrZS5lbmFibGVkJywgKHZhbHVlKSA9PlxuICAgICAgICBAZW5hYmxlZCA9IHZhbHVlXG4gICAgICAgIGlmIEBlbmFibGVkXG4gICAgICAgICAgQGVuYWJsZSgpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBAZGlzYWJsZSgpXG4gICAgKVxuXG4gIGRlc3Ryb3k6IC0+XG4gICAgQGVuYWJsZVN1YnNjcmlwdGlvbi5kaXNwb3NlKClcbiAgICBAZGlzYWJsZSgpXG5cbiAgZW5hYmxlOiAtPlxuICAgIEBpbml0Q29uZmlnU3Vic2NyaWJlcnMoKVxuICAgIEB0aHJvdHRsZWRTaGFrZSA9IHRocm90dGxlIEBzaGFrZUVsZW1lbnQuYmluZCh0aGlzKSwgMTAwLCB0cmFpbGluZzogZmFsc2VcblxuICBkaXNhYmxlOiAtPlxuICAgIEBzdWJzY3JpcHRpb25zPy5kaXNwb3NlKClcblxuICBvYnNlcnZlOiAoa2V5KSAtPlxuICAgIEBzdWJzY3JpcHRpb25zLmFkZCBhdG9tLmNvbmZpZy5vYnNlcnZlKFxuICAgICAgXCJhY3RpdmF0ZS1wb3dlci1tb2RlLnNjcmVlblNoYWtlLiN7a2V5fVwiLCAodmFsdWUpID0+XG4gICAgICAgIEBjb25mW2tleV0gPSB2YWx1ZVxuICAgIClcblxuICBpbml0Q29uZmlnU3Vic2NyaWJlcnM6IC0+XG4gICAgQHN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZVxuICAgIEBvYnNlcnZlICdtaW5JbnRlbnNpdHknXG4gICAgQG9ic2VydmUgJ21heEludGVuc2l0eSdcblxuICBzaGFrZTogKGVsZW1lbnQsIGludGVuc2l0eSkgLT5cbiAgICBAdGhyb3R0bGVkU2hha2UoZWxlbWVudCwgaW50ZW5zaXR5KSBpZiBAZW5hYmxlZFxuXG4gIHNoYWtlRWxlbWVudDogKGVsZW1lbnQsIGludGVuc2l0eSkgLT5cbiAgICBtaW4gPSBAY29uZlsnbWluSW50ZW5zaXR5J11cbiAgICBtYXggPSBAY29uZlsnbWF4SW50ZW5zaXR5J11cbiAgICBpZiBpbnRlbnNpdHkgaXMgJ21heCdcbiAgICAgIG1pbiA9IG1heCAtIG1pblxuICAgICAgbWF4ID0gbWF4ICsgMlxuICAgIGVsc2UgaWYgaW50ZW5zaXR5IGlzICdtaW4nXG4gICAgICBtYXggPSBtYXggLSBtaW5cblxuICAgIHggPSBAc2hha2VJbnRlbnNpdHkgbWluLCBtYXhcbiAgICB5ID0gQHNoYWtlSW50ZW5zaXR5IG1pbiwgbWF4XG5cbiAgICBlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlKCN7eH1weCwgI3t5fXB4KVwiXG5cbiAgICBzZXRUaW1lb3V0IC0+XG4gICAgICBlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IFwiXCJcbiAgICAsIDc1XG5cbiAgc2hha2VJbnRlbnNpdHk6IChtaW4sIG1heCkgLT5cbiAgICBkaXJlY3Rpb24gPSBpZiBNYXRoLnJhbmRvbSgpID4gMC41IHRoZW4gLTEgZWxzZSAxXG4gICAgcmFuZG9tKG1pbiwgbWF4LCB0cnVlKSAqIGRpcmVjdGlvblxuIl19

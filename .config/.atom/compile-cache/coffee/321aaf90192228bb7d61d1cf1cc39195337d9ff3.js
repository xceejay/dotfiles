(function() {
  var ComboApi;

  module.exports = ComboApi = (function() {
    function ComboApi(comboRenderer) {
      this.combo = comboRenderer;
    }

    ComboApi.prototype.increase = function(n) {
      if (n == null) {
        n = 1;
      }
      if (this.combo.isEnable) {
        return this.combo.modifyStreak(n);
      }
    };

    ComboApi.prototype.decrease = function(n) {
      if (n == null) {
        n = 1;
      }
      if (this.combo.isEnable) {
        return this.combo.modifyStreak(-n);
      }
    };

    ComboApi.prototype.exclame = function(word, type) {
      if (word == null) {
        word = null;
      }
      if (type == null) {
        type = null;
      }
      if (this.combo.isEnable) {
        return this.combo.showExclamation(word, type);
      }
    };

    ComboApi.prototype.resetCounter = function() {
      if (this.combo.isEnable) {
        return this.combo.resetCounter();
      }
    };

    ComboApi.prototype.getLevel = function() {
      if (this.combo.isEnable) {
        return this.combo.getLevel();
      } else {
        return null;
      }
    };

    ComboApi.prototype.getCurrentStreak = function() {
      if (this.combo.isEnable) {
        return this.combo.getCurrentStreak();
      } else {
        return null;
      }
    };

    ComboApi.prototype.isEnable = function() {
      return this.combo.isEnable;
    };

    return ComboApi;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvam9lbC8uYXRvbS9wYWNrYWdlcy9hY3RpdmF0ZS1wb3dlci1tb2RlL2xpYi9zZXJ2aWNlL2NvbWJvLWFwaS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7QUFBQSxNQUFBOztFQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQXVCO0lBQ1Isa0JBQUMsYUFBRDtNQUNYLElBQUMsQ0FBQSxLQUFELEdBQVM7SUFERTs7dUJBR2IsUUFBQSxHQUFVLFNBQUMsQ0FBRDs7UUFBQyxJQUFJOztNQUNiLElBQXlCLElBQUMsQ0FBQSxLQUFLLENBQUMsUUFBaEM7ZUFBQSxJQUFDLENBQUEsS0FBSyxDQUFDLFlBQVAsQ0FBb0IsQ0FBcEIsRUFBQTs7SUFEUTs7dUJBR1YsUUFBQSxHQUFVLFNBQUMsQ0FBRDs7UUFBQyxJQUFJOztNQUNiLElBQTJCLElBQUMsQ0FBQSxLQUFLLENBQUMsUUFBbEM7ZUFBQSxJQUFDLENBQUEsS0FBSyxDQUFDLFlBQVAsQ0FBb0IsQ0FBQyxDQUFyQixFQUFBOztJQURROzt1QkFHVixPQUFBLEdBQVMsU0FBQyxJQUFELEVBQWMsSUFBZDs7UUFBQyxPQUFPOzs7UUFBTSxPQUFPOztNQUM1QixJQUFxQyxJQUFDLENBQUEsS0FBSyxDQUFDLFFBQTVDO2VBQUEsSUFBQyxDQUFBLEtBQUssQ0FBQyxlQUFQLENBQXVCLElBQXZCLEVBQTZCLElBQTdCLEVBQUE7O0lBRE87O3VCQUdULFlBQUEsR0FBYyxTQUFBO01BQ1osSUFBeUIsSUFBQyxDQUFBLEtBQUssQ0FBQyxRQUFoQztlQUFBLElBQUMsQ0FBQSxLQUFLLENBQUMsWUFBUCxDQUFBLEVBQUE7O0lBRFk7O3VCQUdkLFFBQUEsR0FBVSxTQUFBO01BQ1IsSUFBRyxJQUFDLENBQUEsS0FBSyxDQUFDLFFBQVY7ZUFDRSxJQUFDLENBQUEsS0FBSyxDQUFDLFFBQVAsQ0FBQSxFQURGO09BQUEsTUFBQTtlQUdFLEtBSEY7O0lBRFE7O3VCQU1WLGdCQUFBLEdBQWtCLFNBQUE7TUFDaEIsSUFBRyxJQUFDLENBQUEsS0FBSyxDQUFDLFFBQVY7ZUFDRSxJQUFDLENBQUEsS0FBSyxDQUFDLGdCQUFQLENBQUEsRUFERjtPQUFBLE1BQUE7ZUFHRSxLQUhGOztJQURnQjs7dUJBTWxCLFFBQUEsR0FBVSxTQUFBO2FBQ1IsSUFBQyxDQUFBLEtBQUssQ0FBQztJQURDOzs7OztBQTVCWiIsInNvdXJjZXNDb250ZW50IjpbIlxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBDb21ib0FwaVxuICBjb25zdHJ1Y3RvcjogKGNvbWJvUmVuZGVyZXIpIC0+XG4gICAgQGNvbWJvID0gY29tYm9SZW5kZXJlclxuXG4gIGluY3JlYXNlOiAobiA9IDEpIC0+XG4gICAgQGNvbWJvLm1vZGlmeVN0cmVhayBuIGlmIEBjb21iby5pc0VuYWJsZVxuXG4gIGRlY3JlYXNlOiAobiA9IDEpIC0+XG4gICAgQGNvbWJvLm1vZGlmeVN0cmVhaygtbikgaWYgQGNvbWJvLmlzRW5hYmxlXG5cbiAgZXhjbGFtZTogKHdvcmQgPSBudWxsLCB0eXBlID0gbnVsbCkgLT5cbiAgICBAY29tYm8uc2hvd0V4Y2xhbWF0aW9uIHdvcmQsIHR5cGUgaWYgQGNvbWJvLmlzRW5hYmxlXG5cbiAgcmVzZXRDb3VudGVyOiAtPlxuICAgIEBjb21iby5yZXNldENvdW50ZXIoKSBpZiBAY29tYm8uaXNFbmFibGVcblxuICBnZXRMZXZlbDogLT5cbiAgICBpZiBAY29tYm8uaXNFbmFibGVcbiAgICAgIEBjb21iby5nZXRMZXZlbCgpXG4gICAgZWxzZVxuICAgICAgbnVsbFxuXG4gIGdldEN1cnJlbnRTdHJlYWs6IC0+XG4gICAgaWYgQGNvbWJvLmlzRW5hYmxlXG4gICAgICBAY29tYm8uZ2V0Q3VycmVudFN0cmVhaygpXG4gICAgZWxzZVxuICAgICAgbnVsbFxuICAgICAgXG4gIGlzRW5hYmxlOiAtPlxuICAgIEBjb21iby5pc0VuYWJsZVxuIl19

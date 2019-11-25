(function() {
  var CompositeDisposable, ZentabsController, _;

  CompositeDisposable = require('atom').CompositeDisposable;

  _ = require('underscore-plus');

  ZentabsController = require('./zentabs-controller');

  module.exports = {
    activate: function() {
      this.subscriptions = new CompositeDisposable;
      return this.subscriptions.add(atom.workspace.observePanes((function(_this) {
        return function(pane) {
          var zentabController;
          zentabController = new ZentabsController(pane);
          if (_this.zentabsControllers == null) {
            _this.zentabsControllers = [];
          }
          _this.zentabsControllers.push(zentabController);
          _this.subscriptions.add(pane.onDidDestroy(function() {
            return _.remove(_this.zentabsControllers, zentabController);
          }));
          return zentabController;
        };
      })(this)));
    },
    deactivate: function() {
      var i, len, ref, ref1, results, zentabController;
      this.subscriptions.dispose();
      ref1 = (ref = this.zentabsControllers) != null ? ref : [];
      results = [];
      for (i = 0, len = ref1.length; i < len; i++) {
        zentabController = ref1[i];
        results.push(zentabController.remove() && zentabController.destroy());
      }
      return results;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvam9lbC8uYXRvbS9wYWNrYWdlcy96ZW50YWJzL2xpYi96ZW50YWJzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSOztFQUN4QixDQUFBLEdBQUksT0FBQSxDQUFRLGlCQUFSOztFQUNKLGlCQUFBLEdBQW9CLE9BQUEsQ0FBUSxzQkFBUjs7RUFFcEIsTUFBTSxDQUFDLE9BQVAsR0FDRTtJQUFBLFFBQUEsRUFBVSxTQUFBO01BQ1IsSUFBQyxDQUFBLGFBQUQsR0FBaUIsSUFBSTthQUNyQixJQUFDLENBQUEsYUFBYSxDQUFDLEdBQWYsQ0FBbUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFmLENBQTRCLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQyxJQUFEO0FBQzdDLGNBQUE7VUFBQSxnQkFBQSxHQUFtQixJQUFJLGlCQUFKLENBQXNCLElBQXRCOztZQUNuQixLQUFDLENBQUEscUJBQXNCOztVQUN2QixLQUFDLENBQUEsa0JBQWtCLENBQUMsSUFBcEIsQ0FBeUIsZ0JBQXpCO1VBQ0EsS0FBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLElBQUksQ0FBQyxZQUFMLENBQWtCLFNBQUE7bUJBQ25DLENBQUMsQ0FBQyxNQUFGLENBQVMsS0FBQyxDQUFBLGtCQUFWLEVBQThCLGdCQUE5QjtVQURtQyxDQUFsQixDQUFuQjtpQkFFQTtRQU42QztNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBNUIsQ0FBbkI7SUFGUSxDQUFWO0lBVUEsVUFBQSxFQUFZLFNBQUE7QUFDVixVQUFBO01BQUEsSUFBQyxDQUFBLGFBQWEsQ0FBQyxPQUFmLENBQUE7QUFDQTtBQUFBO1dBQUEsc0NBQUE7O3FCQUFBLGdCQUFnQixDQUFDLE1BQWpCLENBQUEsQ0FBQSxJQUE2QixnQkFBZ0IsQ0FBQyxPQUFqQixDQUFBO0FBQTdCOztJQUZVLENBVlo7O0FBTEYiLCJzb3VyY2VzQ29udGVudCI6WyJ7Q29tcG9zaXRlRGlzcG9zYWJsZX0gPSByZXF1aXJlICdhdG9tJ1xuXyA9IHJlcXVpcmUgJ3VuZGVyc2NvcmUtcGx1cydcblplbnRhYnNDb250cm9sbGVyID0gcmVxdWlyZSAnLi96ZW50YWJzLWNvbnRyb2xsZXInXG5cbm1vZHVsZS5leHBvcnRzID1cbiAgYWN0aXZhdGU6IC0+XG4gICAgQHN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZVxuICAgIEBzdWJzY3JpcHRpb25zLmFkZCBhdG9tLndvcmtzcGFjZS5vYnNlcnZlUGFuZXMgKHBhbmUpID0+XG4gICAgICB6ZW50YWJDb250cm9sbGVyID0gbmV3IFplbnRhYnNDb250cm9sbGVyKHBhbmUpXG4gICAgICBAemVudGFic0NvbnRyb2xsZXJzID89IFtdXG4gICAgICBAemVudGFic0NvbnRyb2xsZXJzLnB1c2goemVudGFiQ29udHJvbGxlcilcbiAgICAgIEBzdWJzY3JpcHRpb25zLmFkZCBwYW5lLm9uRGlkRGVzdHJveSA9PlxuICAgICAgICBfLnJlbW92ZShAemVudGFic0NvbnRyb2xsZXJzLCB6ZW50YWJDb250cm9sbGVyKVxuICAgICAgemVudGFiQ29udHJvbGxlclxuXG4gIGRlYWN0aXZhdGU6IC0+XG4gICAgQHN1YnNjcmlwdGlvbnMuZGlzcG9zZSgpXG4gICAgemVudGFiQ29udHJvbGxlci5yZW1vdmUoKSAmJiB6ZW50YWJDb250cm9sbGVyLmRlc3Ryb3koKSBmb3IgemVudGFiQ29udHJvbGxlciBpbiBAemVudGFic0NvbnRyb2xsZXJzID8gW11cbiJdfQ==

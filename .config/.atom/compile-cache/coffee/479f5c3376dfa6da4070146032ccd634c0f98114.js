(function() {
  var ActivatePowerMode, CompositeDisposable, configSchema;

  CompositeDisposable = require("atom").CompositeDisposable;

  configSchema = require("./config-schema");

  module.exports = ActivatePowerMode = {
    config: configSchema,
    subscriptions: null,
    active: false,
    activate: function(state) {
      this.pluginRegistry = require("./plugin-registry");
      this.flowRegistry = require("./flow-registry");
      this.effectRegistry = require("./effect-registry");
      return requestIdleCallback((function(_this) {
        return function() {
          _this.subscriptions = new CompositeDisposable;
          _this.powerEditor = require("./power-editor");
          _this.pluginManager = require("./plugin-manager");
          _this.powerEditor.setPluginManager(_this.pluginManager);
          _this.pluginManager.init(_this.config, _this.pluginRegistry, _this.flowRegistry, _this.effectRegistry);
          _this.subscriptions.add(atom.commands.add("atom-workspace", {
            "activate-power-mode:toggle": function() {
              return _this.toggle();
            },
            "activate-power-mode:enable": function() {
              return _this.enable();
            },
            "activate-power-mode:disable": function() {
              return _this.disable();
            }
          }));
          if (_this.getConfig("autoToggle")) {
            return _this.toggle();
          }
        };
      })(this));
    },
    deactivate: function() {
      var ref;
      if ((ref = this.subscriptions) != null) {
        ref.dispose();
      }
      this.active = false;
      return this.powerEditor.disable();
    },
    getConfig: function(config) {
      return atom.config.get("activate-power-mode." + config);
    },
    toggle: function() {
      if (this.active) {
        return this.disable();
      } else {
        return this.enable();
      }
    },
    enable: function() {
      this.active = true;
      return this.powerEditor.enable();
    },
    disable: function() {
      this.active = false;
      return this.powerEditor.disable();
    },
    provideServiceV1: function() {
      var Service;
      if (!this.service) {
        Service = require("./service");
        this.service = new Service(this.pluginRegistry, this.flowRegistry, this.effectRegistry);
      }
      return this.service;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvam9lbC8uYXRvbS9wYWNrYWdlcy9hY3RpdmF0ZS1wb3dlci1tb2RlL2xpYi9hY3RpdmF0ZS1wb3dlci1tb2RlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSOztFQUN4QixZQUFBLEdBQWUsT0FBQSxDQUFRLGlCQUFSOztFQUVmLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLGlCQUFBLEdBQ2Y7SUFBQSxNQUFBLEVBQVEsWUFBUjtJQUNBLGFBQUEsRUFBZSxJQURmO0lBRUEsTUFBQSxFQUFRLEtBRlI7SUFJQSxRQUFBLEVBQVUsU0FBQyxLQUFEO01BQ1IsSUFBQyxDQUFBLGNBQUQsR0FBa0IsT0FBQSxDQUFRLG1CQUFSO01BQ2xCLElBQUMsQ0FBQSxZQUFELEdBQWdCLE9BQUEsQ0FBUSxpQkFBUjtNQUNoQixJQUFDLENBQUEsY0FBRCxHQUFrQixPQUFBLENBQVEsbUJBQVI7YUFFbEIsbUJBQUEsQ0FBb0IsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFBO1VBQ2xCLEtBQUMsQ0FBQSxhQUFELEdBQWlCLElBQUk7VUFFckIsS0FBQyxDQUFBLFdBQUQsR0FBZSxPQUFBLENBQVEsZ0JBQVI7VUFDZixLQUFDLENBQUEsYUFBRCxHQUFpQixPQUFBLENBQVEsa0JBQVI7VUFDakIsS0FBQyxDQUFBLFdBQVcsQ0FBQyxnQkFBYixDQUE4QixLQUFDLENBQUEsYUFBL0I7VUFDQSxLQUFDLENBQUEsYUFBYSxDQUFDLElBQWYsQ0FBb0IsS0FBQyxDQUFBLE1BQXJCLEVBQTZCLEtBQUMsQ0FBQSxjQUE5QixFQUE4QyxLQUFDLENBQUEsWUFBL0MsRUFBNkQsS0FBQyxDQUFBLGNBQTlEO1VBRUEsS0FBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBZCxDQUFrQixnQkFBbEIsRUFDakI7WUFBQSw0QkFBQSxFQUE4QixTQUFBO3FCQUFHLEtBQUMsQ0FBQSxNQUFELENBQUE7WUFBSCxDQUE5QjtZQUNBLDRCQUFBLEVBQThCLFNBQUE7cUJBQUcsS0FBQyxDQUFBLE1BQUQsQ0FBQTtZQUFILENBRDlCO1lBRUEsNkJBQUEsRUFBK0IsU0FBQTtxQkFBRyxLQUFDLENBQUEsT0FBRCxDQUFBO1lBQUgsQ0FGL0I7V0FEaUIsQ0FBbkI7VUFLQSxJQUFHLEtBQUMsQ0FBQSxTQUFELENBQVcsWUFBWCxDQUFIO21CQUNFLEtBQUMsQ0FBQSxNQUFELENBQUEsRUFERjs7UUFia0I7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXBCO0lBTFEsQ0FKVjtJQXlCQSxVQUFBLEVBQVksU0FBQTtBQUNWLFVBQUE7O1dBQWMsQ0FBRSxPQUFoQixDQUFBOztNQUNBLElBQUMsQ0FBQSxNQUFELEdBQVU7YUFDVixJQUFDLENBQUEsV0FBVyxDQUFDLE9BQWIsQ0FBQTtJQUhVLENBekJaO0lBOEJBLFNBQUEsRUFBVyxTQUFDLE1BQUQ7YUFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0Isc0JBQUEsR0FBdUIsTUFBdkM7SUFEUyxDQTlCWDtJQWlDQSxNQUFBLEVBQVEsU0FBQTtNQUNOLElBQUcsSUFBQyxDQUFBLE1BQUo7ZUFBZ0IsSUFBQyxDQUFBLE9BQUQsQ0FBQSxFQUFoQjtPQUFBLE1BQUE7ZUFBZ0MsSUFBQyxDQUFBLE1BQUQsQ0FBQSxFQUFoQzs7SUFETSxDQWpDUjtJQW9DQSxNQUFBLEVBQVEsU0FBQTtNQUNOLElBQUMsQ0FBQSxNQUFELEdBQVU7YUFDVixJQUFDLENBQUEsV0FBVyxDQUFDLE1BQWIsQ0FBQTtJQUZNLENBcENSO0lBd0NBLE9BQUEsRUFBUyxTQUFBO01BQ1AsSUFBQyxDQUFBLE1BQUQsR0FBVTthQUNWLElBQUMsQ0FBQSxXQUFXLENBQUMsT0FBYixDQUFBO0lBRk8sQ0F4Q1Q7SUE0Q0EsZ0JBQUEsRUFBa0IsU0FBQTtBQUNoQixVQUFBO01BQUEsSUFBRyxDQUFJLElBQUMsQ0FBQSxPQUFSO1FBQ0UsT0FBQSxHQUFVLE9BQUEsQ0FBUSxXQUFSO1FBQ1YsSUFBQyxDQUFBLE9BQUQsR0FBVyxJQUFJLE9BQUosQ0FBWSxJQUFDLENBQUEsY0FBYixFQUE2QixJQUFDLENBQUEsWUFBOUIsRUFBNEMsSUFBQyxDQUFBLGNBQTdDLEVBRmI7O2FBR0EsSUFBQyxDQUFBO0lBSmUsQ0E1Q2xCOztBQUpGIiwic291cmNlc0NvbnRlbnQiOlsie0NvbXBvc2l0ZURpc3Bvc2FibGV9ID0gcmVxdWlyZSBcImF0b21cIlxuY29uZmlnU2NoZW1hID0gcmVxdWlyZSBcIi4vY29uZmlnLXNjaGVtYVwiXG5cbm1vZHVsZS5leHBvcnRzID0gQWN0aXZhdGVQb3dlck1vZGUgPVxuICBjb25maWc6IGNvbmZpZ1NjaGVtYVxuICBzdWJzY3JpcHRpb25zOiBudWxsXG4gIGFjdGl2ZTogZmFsc2VcblxuICBhY3RpdmF0ZTogKHN0YXRlKSAtPlxuICAgIEBwbHVnaW5SZWdpc3RyeSA9IHJlcXVpcmUgXCIuL3BsdWdpbi1yZWdpc3RyeVwiXG4gICAgQGZsb3dSZWdpc3RyeSA9IHJlcXVpcmUgXCIuL2Zsb3ctcmVnaXN0cnlcIlxuICAgIEBlZmZlY3RSZWdpc3RyeSA9IHJlcXVpcmUgXCIuL2VmZmVjdC1yZWdpc3RyeVwiXG5cbiAgICByZXF1ZXN0SWRsZUNhbGxiYWNrID0+XG4gICAgICBAc3Vic2NyaXB0aW9ucyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlXG5cbiAgICAgIEBwb3dlckVkaXRvciA9IHJlcXVpcmUgXCIuL3Bvd2VyLWVkaXRvclwiXG4gICAgICBAcGx1Z2luTWFuYWdlciA9IHJlcXVpcmUgXCIuL3BsdWdpbi1tYW5hZ2VyXCJcbiAgICAgIEBwb3dlckVkaXRvci5zZXRQbHVnaW5NYW5hZ2VyIEBwbHVnaW5NYW5hZ2VyXG4gICAgICBAcGx1Z2luTWFuYWdlci5pbml0IEBjb25maWcsIEBwbHVnaW5SZWdpc3RyeSwgQGZsb3dSZWdpc3RyeSwgQGVmZmVjdFJlZ2lzdHJ5XG5cbiAgICAgIEBzdWJzY3JpcHRpb25zLmFkZCBhdG9tLmNvbW1hbmRzLmFkZCBcImF0b20td29ya3NwYWNlXCIsXG4gICAgICAgIFwiYWN0aXZhdGUtcG93ZXItbW9kZTp0b2dnbGVcIjogPT4gQHRvZ2dsZSgpXG4gICAgICAgIFwiYWN0aXZhdGUtcG93ZXItbW9kZTplbmFibGVcIjogPT4gQGVuYWJsZSgpXG4gICAgICAgIFwiYWN0aXZhdGUtcG93ZXItbW9kZTpkaXNhYmxlXCI6ID0+IEBkaXNhYmxlKClcblxuICAgICAgaWYgQGdldENvbmZpZyBcImF1dG9Ub2dnbGVcIlxuICAgICAgICBAdG9nZ2xlKClcblxuICBkZWFjdGl2YXRlOiAtPlxuICAgIEBzdWJzY3JpcHRpb25zPy5kaXNwb3NlKClcbiAgICBAYWN0aXZlID0gZmFsc2VcbiAgICBAcG93ZXJFZGl0b3IuZGlzYWJsZSgpXG5cbiAgZ2V0Q29uZmlnOiAoY29uZmlnKSAtPlxuICAgIGF0b20uY29uZmlnLmdldCBcImFjdGl2YXRlLXBvd2VyLW1vZGUuI3tjb25maWd9XCJcblxuICB0b2dnbGU6IC0+XG4gICAgaWYgQGFjdGl2ZSB0aGVuIEBkaXNhYmxlKCkgZWxzZSBAZW5hYmxlKClcblxuICBlbmFibGU6IC0+XG4gICAgQGFjdGl2ZSA9IHRydWVcbiAgICBAcG93ZXJFZGl0b3IuZW5hYmxlKClcblxuICBkaXNhYmxlOiAtPlxuICAgIEBhY3RpdmUgPSBmYWxzZVxuICAgIEBwb3dlckVkaXRvci5kaXNhYmxlKClcblxuICBwcm92aWRlU2VydmljZVYxOiAtPlxuICAgIGlmIG5vdCBAc2VydmljZVxuICAgICAgU2VydmljZSA9IHJlcXVpcmUgXCIuL3NlcnZpY2VcIlxuICAgICAgQHNlcnZpY2UgPSBuZXcgU2VydmljZShAcGx1Z2luUmVnaXN0cnksIEBmbG93UmVnaXN0cnksIEBlZmZlY3RSZWdpc3RyeSlcbiAgICBAc2VydmljZVxuIl19

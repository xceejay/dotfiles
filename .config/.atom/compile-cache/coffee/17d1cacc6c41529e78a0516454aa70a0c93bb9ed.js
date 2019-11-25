(function() {
  var CompositeDisposable;

  CompositeDisposable = require("atom").CompositeDisposable;

  module.exports = {
    subscriptions: null,
    flows: [],
    flow: null,
    key: "activate-power-mode.flow",
    enable: function() {
      this.subscriptions = new CompositeDisposable;
      this.observeFlow();
      return this.initList();
    },
    disable: function() {
      var ref, ref1;
      if ((ref = this.subscriptions) != null) {
        ref.dispose();
      }
      if ((ref1 = this.flowList) != null) {
        ref1.dispose();
      }
      return this.flowList = null;
    },
    setDefaultFlow: function(flow) {
      this.flow = flow;
      return this.flows['default'] = flow;
    },
    addFlow: function(code, flow) {
      this.flows[code] = flow;
      if (atom.config.get(this.key) === code) {
        return this.flow = flow;
      }
    },
    removeFlow: function(code) {
      if (atom.config.get(this.key) === code) {
        this.flow = this.flows['default'];
      }
      return delete this.flows[code];
    },
    observeFlow: function() {
      return this.subscriptions.add(atom.config.observe(this.key, (function(_this) {
        return function(code) {
          if (_this.flows[code] != null) {
            return _this.flow = _this.flows[code];
          } else {
            return _this.flow = _this.flows['default'];
          }
        };
      })(this)));
    },
    selectFlow: function(code) {
      return atom.config.set(this.key, code);
    },
    initList: function() {
      if (this.flowList != null) {
        return;
      }
      this.flowList = require("./flow-list");
      this.flowList.init(this);
      return this.subscriptions.add(atom.commands.add("atom-workspace", {
        "activate-power-mode:select-flow": (function(_this) {
          return function() {
            return _this.flowList.toggle();
          };
        })(this)
      }));
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvam9lbC8uYXRvbS9wYWNrYWdlcy9hY3RpdmF0ZS1wb3dlci1tb2RlL2xpYi9mbG93LXJlZ2lzdHJ5LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSOztFQUV4QixNQUFNLENBQUMsT0FBUCxHQUNFO0lBQUEsYUFBQSxFQUFlLElBQWY7SUFDQSxLQUFBLEVBQU8sRUFEUDtJQUVBLElBQUEsRUFBTSxJQUZOO0lBR0EsR0FBQSxFQUFLLDBCQUhMO0lBS0EsTUFBQSxFQUFRLFNBQUE7TUFDTixJQUFDLENBQUEsYUFBRCxHQUFpQixJQUFJO01BQ3JCLElBQUMsQ0FBQSxXQUFELENBQUE7YUFDQSxJQUFDLENBQUEsUUFBRCxDQUFBO0lBSE0sQ0FMUjtJQVVBLE9BQUEsRUFBUyxTQUFBO0FBQ1AsVUFBQTs7V0FBYyxDQUFFLE9BQWhCLENBQUE7OztZQUNTLENBQUUsT0FBWCxDQUFBOzthQUNBLElBQUMsQ0FBQSxRQUFELEdBQVk7SUFITCxDQVZUO0lBZUEsY0FBQSxFQUFnQixTQUFDLElBQUQ7TUFDZCxJQUFDLENBQUEsSUFBRCxHQUFRO2FBQ1IsSUFBQyxDQUFBLEtBQU0sQ0FBQSxTQUFBLENBQVAsR0FBb0I7SUFGTixDQWZoQjtJQW1CQSxPQUFBLEVBQVMsU0FBQyxJQUFELEVBQU8sSUFBUDtNQUNQLElBQUMsQ0FBQSxLQUFNLENBQUEsSUFBQSxDQUFQLEdBQWU7TUFFZixJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixJQUFDLENBQUEsR0FBakIsQ0FBQSxLQUF5QixJQUE1QjtlQUNFLElBQUMsQ0FBQSxJQUFELEdBQVEsS0FEVjs7SUFITyxDQW5CVDtJQXlCQSxVQUFBLEVBQVksU0FBQyxJQUFEO01BQ1YsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsSUFBQyxDQUFBLEdBQWpCLENBQUEsS0FBeUIsSUFBNUI7UUFDRSxJQUFDLENBQUEsSUFBRCxHQUFRLElBQUMsQ0FBQSxLQUFNLENBQUEsU0FBQSxFQURqQjs7YUFHQSxPQUFPLElBQUMsQ0FBQSxLQUFNLENBQUEsSUFBQTtJQUpKLENBekJaO0lBK0JBLFdBQUEsRUFBYSxTQUFBO2FBQ1gsSUFBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBWixDQUNqQixJQUFDLENBQUEsR0FEZ0IsRUFDWCxDQUFBLFNBQUEsS0FBQTtlQUFBLFNBQUMsSUFBRDtVQUNKLElBQUcseUJBQUg7bUJBQ0UsS0FBQyxDQUFBLElBQUQsR0FBUSxLQUFDLENBQUEsS0FBTSxDQUFBLElBQUEsRUFEakI7V0FBQSxNQUFBO21CQUdFLEtBQUMsQ0FBQSxJQUFELEdBQVEsS0FBQyxDQUFBLEtBQU0sQ0FBQSxTQUFBLEVBSGpCOztRQURJO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQURXLENBQW5CO0lBRFcsQ0EvQmI7SUF3Q0EsVUFBQSxFQUFZLFNBQUMsSUFBRDthQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixJQUFDLENBQUEsR0FBakIsRUFBc0IsSUFBdEI7SUFEVSxDQXhDWjtJQTJDQSxRQUFBLEVBQVUsU0FBQTtNQUNSLElBQVUscUJBQVY7QUFBQSxlQUFBOztNQUVBLElBQUMsQ0FBQSxRQUFELEdBQVksT0FBQSxDQUFRLGFBQVI7TUFDWixJQUFDLENBQUEsUUFBUSxDQUFDLElBQVYsQ0FBZSxJQUFmO2FBRUEsSUFBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBZCxDQUFrQixnQkFBbEIsRUFDakI7UUFBQSxpQ0FBQSxFQUFtQyxDQUFBLFNBQUEsS0FBQTtpQkFBQSxTQUFBO21CQUNqQyxLQUFDLENBQUEsUUFBUSxDQUFDLE1BQVYsQ0FBQTtVQURpQztRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbkM7T0FEaUIsQ0FBbkI7SUFOUSxDQTNDVjs7QUFIRiIsInNvdXJjZXNDb250ZW50IjpbIntDb21wb3NpdGVEaXNwb3NhYmxlfSA9IHJlcXVpcmUgXCJhdG9tXCJcblxubW9kdWxlLmV4cG9ydHMgPVxuICBzdWJzY3JpcHRpb25zOiBudWxsXG4gIGZsb3dzOiBbXVxuICBmbG93OiBudWxsXG4gIGtleTogXCJhY3RpdmF0ZS1wb3dlci1tb2RlLmZsb3dcIlxuXG4gIGVuYWJsZTogLT5cbiAgICBAc3Vic2NyaXB0aW9ucyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlXG4gICAgQG9ic2VydmVGbG93KClcbiAgICBAaW5pdExpc3QoKVxuXG4gIGRpc2FibGU6IC0+XG4gICAgQHN1YnNjcmlwdGlvbnM/LmRpc3Bvc2UoKVxuICAgIEBmbG93TGlzdD8uZGlzcG9zZSgpXG4gICAgQGZsb3dMaXN0ID0gbnVsbFxuXG4gIHNldERlZmF1bHRGbG93OiAoZmxvdykgLT5cbiAgICBAZmxvdyA9IGZsb3dcbiAgICBAZmxvd3NbJ2RlZmF1bHQnXSA9IGZsb3dcblxuICBhZGRGbG93OiAoY29kZSwgZmxvdykgLT5cbiAgICBAZmxvd3NbY29kZV0gPSBmbG93XG5cbiAgICBpZiBhdG9tLmNvbmZpZy5nZXQoQGtleSkgaXMgY29kZVxuICAgICAgQGZsb3cgPSBmbG93XG5cbiAgcmVtb3ZlRmxvdzogKGNvZGUpIC0+XG4gICAgaWYgYXRvbS5jb25maWcuZ2V0KEBrZXkpIGlzIGNvZGVcbiAgICAgIEBmbG93ID0gQGZsb3dzWydkZWZhdWx0J11cblxuICAgIGRlbGV0ZSBAZmxvd3NbY29kZV1cblxuICBvYnNlcnZlRmxvdzogLT5cbiAgICBAc3Vic2NyaXB0aW9ucy5hZGQgYXRvbS5jb25maWcub2JzZXJ2ZShcbiAgICAgIEBrZXksIChjb2RlKSA9PlxuICAgICAgICBpZiBAZmxvd3NbY29kZV0/XG4gICAgICAgICAgQGZsb3cgPSBAZmxvd3NbY29kZV1cbiAgICAgICAgZWxzZVxuICAgICAgICAgIEBmbG93ID0gQGZsb3dzWydkZWZhdWx0J11cbiAgICApXG5cbiAgc2VsZWN0RmxvdzogKGNvZGUpIC0+XG4gICAgYXRvbS5jb25maWcuc2V0KEBrZXksIGNvZGUpXG5cbiAgaW5pdExpc3Q6IC0+XG4gICAgcmV0dXJuIGlmIEBmbG93TGlzdD9cblxuICAgIEBmbG93TGlzdCA9IHJlcXVpcmUgXCIuL2Zsb3ctbGlzdFwiXG4gICAgQGZsb3dMaXN0LmluaXQgdGhpc1xuXG4gICAgQHN1YnNjcmlwdGlvbnMuYWRkIGF0b20uY29tbWFuZHMuYWRkIFwiYXRvbS13b3Jrc3BhY2VcIixcbiAgICAgIFwiYWN0aXZhdGUtcG93ZXItbW9kZTpzZWxlY3QtZmxvd1wiOiA9PlxuICAgICAgICBAZmxvd0xpc3QudG9nZ2xlKClcbiJdfQ==

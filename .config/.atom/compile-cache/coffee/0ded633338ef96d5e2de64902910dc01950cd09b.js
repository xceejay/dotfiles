(function() {
  var inputHandler,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  inputHandler = require("./input-handler");

  module.exports = {
    inputHandler: inputHandler,
    enable: function() {
      this.pluginManager.enable();
      this.changePaneSubscription = atom.workspace.onDidStopChangingActivePaneItem((function(_this) {
        return function() {
          return _this.setupPane();
        };
      })(this));
      return this.setupPane();
    },
    disable: function() {
      var ref, ref1, ref2;
      if ((ref = this.changePaneSubscription) != null) {
        ref.dispose();
      }
      if ((ref1 = this.inputSubscription) != null) {
        ref1.dispose();
      }
      if ((ref2 = this.cursorSubscription) != null) {
        ref2.dispose();
      }
      return this.pluginManager.disable();
    },
    setPluginManager: function(pluginManager) {
      return this.pluginManager = pluginManager;
    },
    isExcludedFile: function() {
      var excluded, ref, ref1;
      excluded = this.getConfig("excludedFileTypes.excluded");
      return ref = (ref1 = this.editor.getPath()) != null ? ref1.split('.').pop() : void 0, indexOf.call(excluded, ref) >= 0;
    },
    setupPane: function() {
      var ref, ref1;
      if ((ref = this.inputSubscription) != null) {
        ref.dispose();
      }
      if ((ref1 = this.cursorSubscription) != null) {
        ref1.dispose();
      }
      this.editor = atom.workspace.getActiveTextEditor();
      if (!this.editor || this.isExcludedFile()) {
        this.pluginManager.runOnChangePane();
        return;
      }
      this.editorElement = this.editor.getElement();
      this.inputSubscription = this.editor.getBuffer().onDidChangeText(this.handleInput.bind(this));
      this.cursorSubscription = this.editor.observeCursors(this.handleCursor.bind(this));
      return this.pluginManager.runOnChangePane(this.editor, this.editorElement);
    },
    handleCursor: function(cursor) {
      return this.pluginManager.runOnNewCursor(cursor);
    },
    handleInput: function(e) {
      return requestIdleCallback((function(_this) {
        return function() {
          var cursor, i, input, len, ref, screenPos;
          ref = e.changes;
          for (i = 0, len = ref.length; i < len; i++) {
            input = ref[i];
            _this.inputHandler.handle(input);
            if (_this.inputHandler.isGhost()) {
              return;
            }
            screenPos = _this.editor.screenPositionForBufferPosition(_this.inputHandler.getPosition());
            cursor = _this.editor.getCursorAtScreenPosition(screenPos);
            if (!cursor) {
              return;
            }
            _this.pluginManager.runOnInput(cursor, screenPos, _this.inputHandler);
          }
        };
      })(this));
    },
    getConfig: function(config) {
      return atom.config.get("activate-power-mode." + config);
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvam9lbC8uYXRvbS9wYWNrYWdlcy9hY3RpdmF0ZS1wb3dlci1tb2RlL2xpYi9wb3dlci1lZGl0b3IuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQSxZQUFBO0lBQUE7O0VBQUEsWUFBQSxHQUFlLE9BQUEsQ0FBUSxpQkFBUjs7RUFFZixNQUFNLENBQUMsT0FBUCxHQUNFO0lBQUEsWUFBQSxFQUFjLFlBQWQ7SUFFQSxNQUFBLEVBQVEsU0FBQTtNQUNOLElBQUMsQ0FBQSxhQUFhLENBQUMsTUFBZixDQUFBO01BQ0EsSUFBQyxDQUFBLHNCQUFELEdBQTBCLElBQUksQ0FBQyxTQUFTLENBQUMsK0JBQWYsQ0FBK0MsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFBO2lCQUN2RSxLQUFDLENBQUEsU0FBRCxDQUFBO1FBRHVFO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUEvQzthQUcxQixJQUFDLENBQUEsU0FBRCxDQUFBO0lBTE0sQ0FGUjtJQVNBLE9BQUEsRUFBUyxTQUFBO0FBQ1AsVUFBQTs7V0FBdUIsQ0FBRSxPQUF6QixDQUFBOzs7WUFDa0IsQ0FBRSxPQUFwQixDQUFBOzs7WUFDbUIsQ0FBRSxPQUFyQixDQUFBOzthQUNBLElBQUMsQ0FBQSxhQUFhLENBQUMsT0FBZixDQUFBO0lBSk8sQ0FUVDtJQWVBLGdCQUFBLEVBQWtCLFNBQUMsYUFBRDthQUNoQixJQUFDLENBQUEsYUFBRCxHQUFpQjtJQURELENBZmxCO0lBa0JBLGNBQUEsRUFBZ0IsU0FBQTtBQUNkLFVBQUE7TUFBQSxRQUFBLEdBQVcsSUFBQyxDQUFBLFNBQUQsQ0FBVyw0QkFBWDtnRUFDTSxDQUFFLEtBQW5CLENBQXlCLEdBQXpCLENBQTZCLENBQUMsR0FBOUIsQ0FBQSxVQUFBLEVBQUEsYUFBdUMsUUFBdkMsRUFBQSxHQUFBO0lBRmMsQ0FsQmhCO0lBc0JBLFNBQUEsRUFBVyxTQUFBO0FBQ1QsVUFBQTs7V0FBa0IsQ0FBRSxPQUFwQixDQUFBOzs7WUFDbUIsQ0FBRSxPQUFyQixDQUFBOztNQUNBLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBZixDQUFBO01BRVYsSUFBRyxDQUFJLElBQUMsQ0FBQSxNQUFMLElBQWUsSUFBQyxDQUFBLGNBQUQsQ0FBQSxDQUFsQjtRQUNFLElBQUMsQ0FBQSxhQUFhLENBQUMsZUFBZixDQUFBO0FBQ0EsZUFGRjs7TUFJQSxJQUFDLENBQUEsYUFBRCxHQUFpQixJQUFDLENBQUEsTUFBTSxDQUFDLFVBQVIsQ0FBQTtNQUVqQixJQUFDLENBQUEsaUJBQUQsR0FBcUIsSUFBQyxDQUFBLE1BQU0sQ0FBQyxTQUFSLENBQUEsQ0FBbUIsQ0FBQyxlQUFwQixDQUFvQyxJQUFDLENBQUEsV0FBVyxDQUFDLElBQWIsQ0FBa0IsSUFBbEIsQ0FBcEM7TUFDckIsSUFBQyxDQUFBLGtCQUFELEdBQXNCLElBQUMsQ0FBQSxNQUFNLENBQUMsY0FBUixDQUF1QixJQUFDLENBQUEsWUFBWSxDQUFDLElBQWQsQ0FBbUIsSUFBbkIsQ0FBdkI7YUFFdEIsSUFBQyxDQUFBLGFBQWEsQ0FBQyxlQUFmLENBQStCLElBQUMsQ0FBQSxNQUFoQyxFQUF3QyxJQUFDLENBQUEsYUFBekM7SUFkUyxDQXRCWDtJQXNDQSxZQUFBLEVBQWMsU0FBQyxNQUFEO2FBQ1osSUFBQyxDQUFBLGFBQWEsQ0FBQyxjQUFmLENBQThCLE1BQTlCO0lBRFksQ0F0Q2Q7SUF5Q0EsV0FBQSxFQUFhLFNBQUMsQ0FBRDthQUNYLG1CQUFBLENBQW9CLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtBQUNsQixjQUFBO0FBQUE7QUFBQSxlQUFBLHFDQUFBOztZQUNFLEtBQUMsQ0FBQSxZQUFZLENBQUMsTUFBZCxDQUFxQixLQUFyQjtZQUNBLElBQVUsS0FBQyxDQUFBLFlBQVksQ0FBQyxPQUFkLENBQUEsQ0FBVjtBQUFBLHFCQUFBOztZQUVBLFNBQUEsR0FBWSxLQUFDLENBQUEsTUFBTSxDQUFDLCtCQUFSLENBQXdDLEtBQUMsQ0FBQSxZQUFZLENBQUMsV0FBZCxDQUFBLENBQXhDO1lBQ1osTUFBQSxHQUFTLEtBQUMsQ0FBQSxNQUFNLENBQUMseUJBQVIsQ0FBa0MsU0FBbEM7WUFDVCxJQUFBLENBQWMsTUFBZDtBQUFBLHFCQUFBOztZQUVBLEtBQUMsQ0FBQSxhQUFhLENBQUMsVUFBZixDQUEwQixNQUExQixFQUFrQyxTQUFsQyxFQUE2QyxLQUFDLENBQUEsWUFBOUM7QUFSRjtRQURrQjtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBcEI7SUFEVyxDQXpDYjtJQXFEQSxTQUFBLEVBQVcsU0FBQyxNQUFEO2FBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLHNCQUFBLEdBQXVCLE1BQXZDO0lBRFMsQ0FyRFg7O0FBSEYiLCJzb3VyY2VzQ29udGVudCI6WyJpbnB1dEhhbmRsZXIgPSByZXF1aXJlIFwiLi9pbnB1dC1oYW5kbGVyXCJcblxubW9kdWxlLmV4cG9ydHMgPVxuICBpbnB1dEhhbmRsZXI6IGlucHV0SGFuZGxlclxuXG4gIGVuYWJsZTogLT5cbiAgICBAcGx1Z2luTWFuYWdlci5lbmFibGUoKVxuICAgIEBjaGFuZ2VQYW5lU3Vic2NyaXB0aW9uID0gYXRvbS53b3Jrc3BhY2Uub25EaWRTdG9wQ2hhbmdpbmdBY3RpdmVQYW5lSXRlbSA9PlxuICAgICAgQHNldHVwUGFuZSgpXG5cbiAgICBAc2V0dXBQYW5lKClcblxuICBkaXNhYmxlOiAtPlxuICAgIEBjaGFuZ2VQYW5lU3Vic2NyaXB0aW9uPy5kaXNwb3NlKClcbiAgICBAaW5wdXRTdWJzY3JpcHRpb24/LmRpc3Bvc2UoKVxuICAgIEBjdXJzb3JTdWJzY3JpcHRpb24/LmRpc3Bvc2UoKVxuICAgIEBwbHVnaW5NYW5hZ2VyLmRpc2FibGUoKVxuXG4gIHNldFBsdWdpbk1hbmFnZXI6IChwbHVnaW5NYW5hZ2VyKSAtPlxuICAgIEBwbHVnaW5NYW5hZ2VyID0gcGx1Z2luTWFuYWdlclxuXG4gIGlzRXhjbHVkZWRGaWxlOiAtPlxuICAgIGV4Y2x1ZGVkID0gQGdldENvbmZpZyBcImV4Y2x1ZGVkRmlsZVR5cGVzLmV4Y2x1ZGVkXCJcbiAgICBAZWRpdG9yLmdldFBhdGgoKT8uc3BsaXQoJy4nKS5wb3AoKSBpbiBleGNsdWRlZFxuXG4gIHNldHVwUGFuZTogLT5cbiAgICBAaW5wdXRTdWJzY3JpcHRpb24/LmRpc3Bvc2UoKVxuICAgIEBjdXJzb3JTdWJzY3JpcHRpb24/LmRpc3Bvc2UoKVxuICAgIEBlZGl0b3IgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKClcblxuICAgIGlmIG5vdCBAZWRpdG9yIG9yIEBpc0V4Y2x1ZGVkRmlsZSgpXG4gICAgICBAcGx1Z2luTWFuYWdlci5ydW5PbkNoYW5nZVBhbmUoKVxuICAgICAgcmV0dXJuXG5cbiAgICBAZWRpdG9yRWxlbWVudCA9IEBlZGl0b3IuZ2V0RWxlbWVudCgpXG5cbiAgICBAaW5wdXRTdWJzY3JpcHRpb24gPSBAZWRpdG9yLmdldEJ1ZmZlcigpLm9uRGlkQ2hhbmdlVGV4dCBAaGFuZGxlSW5wdXQuYmluZCh0aGlzKVxuICAgIEBjdXJzb3JTdWJzY3JpcHRpb24gPSBAZWRpdG9yLm9ic2VydmVDdXJzb3JzIEBoYW5kbGVDdXJzb3IuYmluZCh0aGlzKVxuXG4gICAgQHBsdWdpbk1hbmFnZXIucnVuT25DaGFuZ2VQYW5lIEBlZGl0b3IsIEBlZGl0b3JFbGVtZW50XG5cbiAgaGFuZGxlQ3Vyc29yOiAoY3Vyc29yKSAtPlxuICAgIEBwbHVnaW5NYW5hZ2VyLnJ1bk9uTmV3Q3Vyc29yIGN1cnNvclxuXG4gIGhhbmRsZUlucHV0OiAoZSkgLT5cbiAgICByZXF1ZXN0SWRsZUNhbGxiYWNrID0+XG4gICAgICBmb3IgaW5wdXQgaW4gZS5jaGFuZ2VzXG4gICAgICAgIEBpbnB1dEhhbmRsZXIuaGFuZGxlIGlucHV0XG4gICAgICAgIHJldHVybiBpZiBAaW5wdXRIYW5kbGVyLmlzR2hvc3QoKVxuXG4gICAgICAgIHNjcmVlblBvcyA9IEBlZGl0b3Iuc2NyZWVuUG9zaXRpb25Gb3JCdWZmZXJQb3NpdGlvbiBAaW5wdXRIYW5kbGVyLmdldFBvc2l0aW9uKClcbiAgICAgICAgY3Vyc29yID0gQGVkaXRvci5nZXRDdXJzb3JBdFNjcmVlblBvc2l0aW9uIHNjcmVlblBvc1xuICAgICAgICByZXR1cm4gdW5sZXNzIGN1cnNvclxuXG4gICAgICAgIEBwbHVnaW5NYW5hZ2VyLnJ1bk9uSW5wdXQgY3Vyc29yLCBzY3JlZW5Qb3MsIEBpbnB1dEhhbmRsZXJcblxuICBnZXRDb25maWc6IChjb25maWcpIC0+XG4gICAgYXRvbS5jb25maWcuZ2V0IFwiYWN0aXZhdGUtcG93ZXItbW9kZS4je2NvbmZpZ31cIlxuIl19

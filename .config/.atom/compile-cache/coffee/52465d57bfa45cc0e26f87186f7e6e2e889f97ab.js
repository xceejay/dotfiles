(function() {
  var SelectListView;

  SelectListView = require("atom-select-list");

  module.exports = {
    init: function(flowRegistry) {
      this.flowRegistry = flowRegistry;
      this.selectListView = new SelectListView({
        emptyMessage: 'No flows in the registry.',
        itemsClassList: ['mark-active'],
        items: [],
        filterKeyForItem: function(item) {
          return item.title + item.description;
        },
        elementForItem: (function(_this) {
          return function(item) {
            var element, html;
            element = document.createElement('li');
            if (item.flow === _this.currentFlow) {
              element.classList.add('active');
            }
            html = "<b>" + item.title + "</b>";
            if (item.description) {
              html += "<b>:</b> " + item.description;
            }
            element.innerHTML = html;
            return element;
          };
        })(this),
        didConfirmSelection: (function(_this) {
          return function(item) {
            _this.cancel();
            return _this.flowRegistry.selectFlow(item.code);
          };
        })(this),
        didCancelSelection: (function(_this) {
          return function() {
            return _this.cancel();
          };
        })(this)
      });
      return this.selectListView.element.classList.add('flow-list');
    },
    dispose: function() {
      this.cancel();
      return this.selectListView.destroy();
    },
    cancel: function() {
      if (this.panel != null) {
        this.panel.destroy();
      }
      this.panel = null;
      this.currentFlow = null;
      if (this.previouslyFocusedElement) {
        this.previouslyFocusedElement.focus();
        return this.previouslyFocusedElement = null;
      }
    },
    attach: function() {
      this.previouslyFocusedElement = document.activeElement;
      if (this.panel == null) {
        this.panel = atom.workspace.addModalPanel({
          item: this.selectListView
        });
      }
      this.selectListView.focus();
      return this.selectListView.reset();
    },
    toggle: function() {
      var code, flow, flows, ref;
      if (this.panel != null) {
        return this.cancel();
      } else {
        this.currentFlow = this.flowRegistry.flow;
        flows = [];
        ref = this.flowRegistry.flows;
        for (code in ref) {
          flow = ref[code];
          flows.push({
            code: code,
            flow: flow,
            title: flow.title ? flow.title : code,
            description: flow.description
          });
        }
        this.selectListView.update({
          items: flows
        });
        return this.attach();
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvam9lbC8uYXRvbS9wYWNrYWdlcy9hY3RpdmF0ZS1wb3dlci1tb2RlL2xpYi9mbG93LWxpc3QuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQSxjQUFBLEdBQWlCLE9BQUEsQ0FBUSxrQkFBUjs7RUFFakIsTUFBTSxDQUFDLE9BQVAsR0FDRTtJQUFBLElBQUEsRUFBTSxTQUFDLFlBQUQ7TUFDSixJQUFDLENBQUEsWUFBRCxHQUFnQjtNQUNoQixJQUFDLENBQUEsY0FBRCxHQUFrQixJQUFJLGNBQUosQ0FBbUI7UUFDbkMsWUFBQSxFQUFjLDJCQURxQjtRQUVuQyxjQUFBLEVBQWdCLENBQUMsYUFBRCxDQUZtQjtRQUduQyxLQUFBLEVBQU8sRUFINEI7UUFJbkMsZ0JBQUEsRUFBa0IsU0FBQyxJQUFEO2lCQUFVLElBQUksQ0FBQyxLQUFMLEdBQWEsSUFBSSxDQUFDO1FBQTVCLENBSmlCO1FBS25DLGNBQUEsRUFBZ0IsQ0FBQSxTQUFBLEtBQUE7aUJBQUEsU0FBQyxJQUFEO0FBQ2QsZ0JBQUE7WUFBQSxPQUFBLEdBQVUsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsSUFBdkI7WUFDVixJQUFHLElBQUksQ0FBQyxJQUFMLEtBQWEsS0FBQyxDQUFBLFdBQWpCO2NBQ0UsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFsQixDQUFzQixRQUF0QixFQURGOztZQUVBLElBQUEsR0FBTyxLQUFBLEdBQU0sSUFBSSxDQUFDLEtBQVgsR0FBaUI7WUFDeEIsSUFBMEMsSUFBSSxDQUFDLFdBQS9DO2NBQUEsSUFBQSxJQUFRLFdBQUEsR0FBWSxJQUFJLENBQUMsWUFBekI7O1lBQ0EsT0FBTyxDQUFDLFNBQVIsR0FBb0I7bUJBQ3BCO1VBUGM7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBTG1CO1FBYW5DLG1CQUFBLEVBQXFCLENBQUEsU0FBQSxLQUFBO2lCQUFBLFNBQUMsSUFBRDtZQUNuQixLQUFDLENBQUEsTUFBRCxDQUFBO21CQUNBLEtBQUMsQ0FBQSxZQUFZLENBQUMsVUFBZCxDQUF5QixJQUFJLENBQUMsSUFBOUI7VUFGbUI7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBYmM7UUFnQm5DLGtCQUFBLEVBQW9CLENBQUEsU0FBQSxLQUFBO2lCQUFBLFNBQUE7bUJBQ2xCLEtBQUMsQ0FBQSxNQUFELENBQUE7VUFEa0I7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBaEJlO09BQW5CO2FBbUJsQixJQUFDLENBQUEsY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBbEMsQ0FBc0MsV0FBdEM7SUFyQkksQ0FBTjtJQXVCQSxPQUFBLEVBQVMsU0FBQTtNQUNQLElBQUMsQ0FBQSxNQUFELENBQUE7YUFDQSxJQUFDLENBQUEsY0FBYyxDQUFDLE9BQWhCLENBQUE7SUFGTyxDQXZCVDtJQTJCQSxNQUFBLEVBQVEsU0FBQTtNQUNOLElBQUcsa0JBQUg7UUFDRSxJQUFDLENBQUEsS0FBSyxDQUFDLE9BQVAsQ0FBQSxFQURGOztNQUVBLElBQUMsQ0FBQSxLQUFELEdBQVM7TUFDVCxJQUFDLENBQUEsV0FBRCxHQUFlO01BQ2YsSUFBRyxJQUFDLENBQUEsd0JBQUo7UUFDRSxJQUFDLENBQUEsd0JBQXdCLENBQUMsS0FBMUIsQ0FBQTtlQUNBLElBQUMsQ0FBQSx3QkFBRCxHQUE0QixLQUY5Qjs7SUFMTSxDQTNCUjtJQW9DQSxNQUFBLEVBQVEsU0FBQTtNQUNOLElBQUMsQ0FBQSx3QkFBRCxHQUE0QixRQUFRLENBQUM7TUFDckMsSUFBTyxrQkFBUDtRQUNFLElBQUMsQ0FBQSxLQUFELEdBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFmLENBQTZCO1VBQUMsSUFBQSxFQUFNLElBQUMsQ0FBQSxjQUFSO1NBQTdCLEVBRFg7O01BRUEsSUFBQyxDQUFBLGNBQWMsQ0FBQyxLQUFoQixDQUFBO2FBQ0EsSUFBQyxDQUFBLGNBQWMsQ0FBQyxLQUFoQixDQUFBO0lBTE0sQ0FwQ1I7SUEyQ0EsTUFBQSxFQUFRLFNBQUE7QUFDTixVQUFBO01BQUEsSUFBRyxrQkFBSDtlQUNFLElBQUMsQ0FBQSxNQUFELENBQUEsRUFERjtPQUFBLE1BQUE7UUFHRSxJQUFDLENBQUEsV0FBRCxHQUFlLElBQUMsQ0FBQSxZQUFZLENBQUM7UUFDN0IsS0FBQSxHQUFRO0FBQ1I7QUFBQSxhQUFBLFdBQUE7O1VBQ0UsS0FBSyxDQUFDLElBQU4sQ0FBVztZQUNULElBQUEsRUFBTSxJQURHO1lBRVQsSUFBQSxFQUFNLElBRkc7WUFHVCxLQUFBLEVBQVUsSUFBSSxDQUFDLEtBQVIsR0FBbUIsSUFBSSxDQUFDLEtBQXhCLEdBQW1DLElBSGpDO1lBSVQsV0FBQSxFQUFhLElBQUksQ0FBQyxXQUpUO1dBQVg7QUFERjtRQU9BLElBQUMsQ0FBQSxjQUFjLENBQUMsTUFBaEIsQ0FBdUI7VUFBQyxLQUFBLEVBQU8sS0FBUjtTQUF2QjtlQUNBLElBQUMsQ0FBQSxNQUFELENBQUEsRUFiRjs7SUFETSxDQTNDUjs7QUFIRiIsInNvdXJjZXNDb250ZW50IjpbIlNlbGVjdExpc3RWaWV3ID0gcmVxdWlyZSBcImF0b20tc2VsZWN0LWxpc3RcIlxuXG5tb2R1bGUuZXhwb3J0cyA9XG4gIGluaXQ6IChmbG93UmVnaXN0cnkpIC0+XG4gICAgQGZsb3dSZWdpc3RyeSA9IGZsb3dSZWdpc3RyeVxuICAgIEBzZWxlY3RMaXN0VmlldyA9IG5ldyBTZWxlY3RMaXN0Vmlldyh7XG4gICAgICBlbXB0eU1lc3NhZ2U6ICdObyBmbG93cyBpbiB0aGUgcmVnaXN0cnkuJyxcbiAgICAgIGl0ZW1zQ2xhc3NMaXN0OiBbJ21hcmstYWN0aXZlJ10sXG4gICAgICBpdGVtczogW10sXG4gICAgICBmaWx0ZXJLZXlGb3JJdGVtOiAoaXRlbSkgLT4gaXRlbS50aXRsZSArIGl0ZW0uZGVzY3JpcHRpb24sXG4gICAgICBlbGVtZW50Rm9ySXRlbTogKGl0ZW0pID0+XG4gICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdsaSdcbiAgICAgICAgaWYgaXRlbS5mbG93IGlzIEBjdXJyZW50Rmxvd1xuICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCAnYWN0aXZlJ1xuICAgICAgICBodG1sID0gXCI8Yj4je2l0ZW0udGl0bGV9PC9iPlwiXG4gICAgICAgIGh0bWwgKz0gXCI8Yj46PC9iPiAje2l0ZW0uZGVzY3JpcHRpb259XCIgaWYgaXRlbS5kZXNjcmlwdGlvblxuICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IGh0bWxcbiAgICAgICAgZWxlbWVudFxuICAgICAgZGlkQ29uZmlybVNlbGVjdGlvbjogKGl0ZW0pID0+XG4gICAgICAgIEBjYW5jZWwoKVxuICAgICAgICBAZmxvd1JlZ2lzdHJ5LnNlbGVjdEZsb3cgaXRlbS5jb2RlXG4gICAgICBkaWRDYW5jZWxTZWxlY3Rpb246ICgpID0+XG4gICAgICAgIEBjYW5jZWwoKVxuICAgIH0pXG4gICAgQHNlbGVjdExpc3RWaWV3LmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZmxvdy1saXN0JylcblxuICBkaXNwb3NlOiAtPlxuICAgIEBjYW5jZWwoKVxuICAgIEBzZWxlY3RMaXN0Vmlldy5kZXN0cm95KClcblxuICBjYW5jZWw6IC0+XG4gICAgaWYgQHBhbmVsP1xuICAgICAgQHBhbmVsLmRlc3Ryb3koKVxuICAgIEBwYW5lbCA9IG51bGxcbiAgICBAY3VycmVudEZsb3cgPSBudWxsXG4gICAgaWYgQHByZXZpb3VzbHlGb2N1c2VkRWxlbWVudFxuICAgICAgQHByZXZpb3VzbHlGb2N1c2VkRWxlbWVudC5mb2N1cygpXG4gICAgICBAcHJldmlvdXNseUZvY3VzZWRFbGVtZW50ID0gbnVsbFxuXG4gIGF0dGFjaDogLT5cbiAgICBAcHJldmlvdXNseUZvY3VzZWRFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgIGlmIG5vdCBAcGFuZWw/XG4gICAgICBAcGFuZWwgPSBhdG9tLndvcmtzcGFjZS5hZGRNb2RhbFBhbmVsKHtpdGVtOiBAc2VsZWN0TGlzdFZpZXd9KVxuICAgIEBzZWxlY3RMaXN0Vmlldy5mb2N1cygpXG4gICAgQHNlbGVjdExpc3RWaWV3LnJlc2V0KClcblxuICB0b2dnbGU6IC0+XG4gICAgaWYgQHBhbmVsP1xuICAgICAgQGNhbmNlbCgpXG4gICAgZWxzZVxuICAgICAgQGN1cnJlbnRGbG93ID0gQGZsb3dSZWdpc3RyeS5mbG93XG4gICAgICBmbG93cyA9IFtdXG4gICAgICBmb3IgY29kZSwgZmxvdyBvZiBAZmxvd1JlZ2lzdHJ5LmZsb3dzXG4gICAgICAgIGZsb3dzLnB1c2goe1xuICAgICAgICAgIGNvZGU6IGNvZGUsXG4gICAgICAgICAgZmxvdzogZmxvdyxcbiAgICAgICAgICB0aXRsZTogaWYgZmxvdy50aXRsZSB0aGVuIGZsb3cudGl0bGUgZWxzZSBjb2RlLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBmbG93LmRlc2NyaXB0aW9uXG4gICAgICAgIH0pXG4gICAgICBAc2VsZWN0TGlzdFZpZXcudXBkYXRlKHtpdGVtczogZmxvd3N9KVxuICAgICAgQGF0dGFjaCgpXG4iXX0=

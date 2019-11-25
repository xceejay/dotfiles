(function() {
  var SelectListView;

  SelectListView = require("atom-select-list");

  module.exports = {
    init: function(pluginRegistry) {
      this.pluginRegistry = pluginRegistry;
      this.selectListView = new SelectListView({
        emptyMessage: 'No plugins in the registry.',
        itemsClassList: ['mark-active'],
        items: [],
        filterKeyForItem: function(item) {
          return item.title + item.description;
        },
        elementForItem: (function(_this) {
          return function(item) {
            var element, html;
            element = document.createElement('li');
            if (_this.pluginRegistry.enabledPlugins[item.code] != null) {
              element.classList.add('active');
            }
            html = "<b>" + item.title + "</b>";
            if (item.description) {
              html += "<b>:</b> " + item.description;
            }
            if (item.image) {
              html += "<img src=\"" + item.image + "\">";
            }
            element.innerHTML = html;
            return element;
          };
        })(this),
        didConfirmSelection: (function(_this) {
          return function(item) {
            return _this.pluginRegistry.togglePlugin(item.code);
          };
        })(this),
        didCancelSelection: (function(_this) {
          return function() {
            return _this.cancel();
          };
        })(this)
      });
      return this.selectListView.element.classList.add('plugin-list');
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
      var code, plugin, plugins, ref;
      if (this.panel != null) {
        return this.cancel();
      } else {
        plugins = [];
        ref = this.pluginRegistry.plugins;
        for (code in ref) {
          plugin = ref[code];
          plugins.push({
            code: code,
            title: plugin.title ? plugin.title : code,
            description: plugin.description,
            image: plugin.image
          });
        }
        this.selectListView.update({
          items: plugins
        });
        return this.attach();
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvam9lbC8uYXRvbS9wYWNrYWdlcy9hY3RpdmF0ZS1wb3dlci1tb2RlL2xpYi9wbHVnaW4tbGlzdC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFBLGNBQUEsR0FBaUIsT0FBQSxDQUFRLGtCQUFSOztFQUVqQixNQUFNLENBQUMsT0FBUCxHQUNFO0lBQUEsSUFBQSxFQUFNLFNBQUMsY0FBRDtNQUNKLElBQUMsQ0FBQSxjQUFELEdBQWtCO01BQ2xCLElBQUMsQ0FBQSxjQUFELEdBQWtCLElBQUksY0FBSixDQUFtQjtRQUNuQyxZQUFBLEVBQWMsNkJBRHFCO1FBRW5DLGNBQUEsRUFBZ0IsQ0FBQyxhQUFELENBRm1CO1FBR25DLEtBQUEsRUFBTyxFQUg0QjtRQUluQyxnQkFBQSxFQUFrQixTQUFDLElBQUQ7aUJBQVUsSUFBSSxDQUFDLEtBQUwsR0FBYSxJQUFJLENBQUM7UUFBNUIsQ0FKaUI7UUFLbkMsY0FBQSxFQUFnQixDQUFBLFNBQUEsS0FBQTtpQkFBQSxTQUFDLElBQUQ7QUFDZCxnQkFBQTtZQUFBLE9BQUEsR0FBVSxRQUFRLENBQUMsYUFBVCxDQUF1QixJQUF2QjtZQUNWLElBQUcsc0RBQUg7Y0FDRSxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQWxCLENBQXNCLFFBQXRCLEVBREY7O1lBRUEsSUFBQSxHQUFPLEtBQUEsR0FBTSxJQUFJLENBQUMsS0FBWCxHQUFpQjtZQUN4QixJQUEwQyxJQUFJLENBQUMsV0FBL0M7Y0FBQSxJQUFBLElBQVEsV0FBQSxHQUFZLElBQUksQ0FBQyxZQUF6Qjs7WUFDQSxJQUF5QyxJQUFJLENBQUMsS0FBOUM7Y0FBQSxJQUFBLElBQVEsYUFBQSxHQUFjLElBQUksQ0FBQyxLQUFuQixHQUF5QixNQUFqQzs7WUFDQSxPQUFPLENBQUMsU0FBUixHQUFvQjttQkFDcEI7VUFSYztRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FMbUI7UUFjbkMsbUJBQUEsRUFBcUIsQ0FBQSxTQUFBLEtBQUE7aUJBQUEsU0FBQyxJQUFEO21CQUNuQixLQUFDLENBQUEsY0FBYyxDQUFDLFlBQWhCLENBQTZCLElBQUksQ0FBQyxJQUFsQztVQURtQjtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FkYztRQWdCbkMsa0JBQUEsRUFBb0IsQ0FBQSxTQUFBLEtBQUE7aUJBQUEsU0FBQTttQkFDbEIsS0FBQyxDQUFBLE1BQUQsQ0FBQTtVQURrQjtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FoQmU7T0FBbkI7YUFtQmxCLElBQUMsQ0FBQSxjQUFjLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFsQyxDQUFzQyxhQUF0QztJQXJCSSxDQUFOO0lBdUJBLE9BQUEsRUFBUyxTQUFBO01BQ1AsSUFBQyxDQUFBLE1BQUQsQ0FBQTthQUNBLElBQUMsQ0FBQSxjQUFjLENBQUMsT0FBaEIsQ0FBQTtJQUZPLENBdkJUO0lBMkJBLE1BQUEsRUFBUSxTQUFBO01BQ04sSUFBRyxrQkFBSDtRQUNFLElBQUMsQ0FBQSxLQUFLLENBQUMsT0FBUCxDQUFBLEVBREY7O01BRUEsSUFBQyxDQUFBLEtBQUQsR0FBUztNQUNULElBQUcsSUFBQyxDQUFBLHdCQUFKO1FBQ0UsSUFBQyxDQUFBLHdCQUF3QixDQUFDLEtBQTFCLENBQUE7ZUFDQSxJQUFDLENBQUEsd0JBQUQsR0FBNEIsS0FGOUI7O0lBSk0sQ0EzQlI7SUFtQ0EsTUFBQSxFQUFRLFNBQUE7TUFDTixJQUFDLENBQUEsd0JBQUQsR0FBNEIsUUFBUSxDQUFDO01BQ3JDLElBQU8sa0JBQVA7UUFDRSxJQUFDLENBQUEsS0FBRCxHQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBZixDQUE2QjtVQUFDLElBQUEsRUFBTSxJQUFDLENBQUEsY0FBUjtTQUE3QixFQURYOztNQUVBLElBQUMsQ0FBQSxjQUFjLENBQUMsS0FBaEIsQ0FBQTthQUNBLElBQUMsQ0FBQSxjQUFjLENBQUMsS0FBaEIsQ0FBQTtJQUxNLENBbkNSO0lBMENBLE1BQUEsRUFBUSxTQUFBO0FBQ04sVUFBQTtNQUFBLElBQUcsa0JBQUg7ZUFDRSxJQUFDLENBQUEsTUFBRCxDQUFBLEVBREY7T0FBQSxNQUFBO1FBR0UsT0FBQSxHQUFVO0FBQ1Y7QUFBQSxhQUFBLFdBQUE7O1VBQ0UsT0FBTyxDQUFDLElBQVIsQ0FBYTtZQUNYLElBQUEsRUFBTSxJQURLO1lBRVgsS0FBQSxFQUFVLE1BQU0sQ0FBQyxLQUFWLEdBQXFCLE1BQU0sQ0FBQyxLQUE1QixHQUF1QyxJQUZuQztZQUdYLFdBQUEsRUFBYSxNQUFNLENBQUMsV0FIVDtZQUlYLEtBQUEsRUFBTyxNQUFNLENBQUMsS0FKSDtXQUFiO0FBREY7UUFPQSxJQUFDLENBQUEsY0FBYyxDQUFDLE1BQWhCLENBQXVCO1VBQUMsS0FBQSxFQUFPLE9BQVI7U0FBdkI7ZUFDQSxJQUFDLENBQUEsTUFBRCxDQUFBLEVBWkY7O0lBRE0sQ0ExQ1I7O0FBSEYiLCJzb3VyY2VzQ29udGVudCI6WyJTZWxlY3RMaXN0VmlldyA9IHJlcXVpcmUgXCJhdG9tLXNlbGVjdC1saXN0XCJcblxubW9kdWxlLmV4cG9ydHMgPVxuICBpbml0OiAocGx1Z2luUmVnaXN0cnkpIC0+XG4gICAgQHBsdWdpblJlZ2lzdHJ5ID0gcGx1Z2luUmVnaXN0cnlcbiAgICBAc2VsZWN0TGlzdFZpZXcgPSBuZXcgU2VsZWN0TGlzdFZpZXcoe1xuICAgICAgZW1wdHlNZXNzYWdlOiAnTm8gcGx1Z2lucyBpbiB0aGUgcmVnaXN0cnkuJyxcbiAgICAgIGl0ZW1zQ2xhc3NMaXN0OiBbJ21hcmstYWN0aXZlJ10sXG4gICAgICBpdGVtczogW10sXG4gICAgICBmaWx0ZXJLZXlGb3JJdGVtOiAoaXRlbSkgLT4gaXRlbS50aXRsZSArIGl0ZW0uZGVzY3JpcHRpb24sXG4gICAgICBlbGVtZW50Rm9ySXRlbTogKGl0ZW0pID0+XG4gICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdsaSdcbiAgICAgICAgaWYgQHBsdWdpblJlZ2lzdHJ5LmVuYWJsZWRQbHVnaW5zW2l0ZW0uY29kZV0/XG4gICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkICdhY3RpdmUnXG4gICAgICAgIGh0bWwgPSBcIjxiPiN7aXRlbS50aXRsZX08L2I+XCJcbiAgICAgICAgaHRtbCArPSBcIjxiPjo8L2I+ICN7aXRlbS5kZXNjcmlwdGlvbn1cIiBpZiBpdGVtLmRlc2NyaXB0aW9uXG4gICAgICAgIGh0bWwgKz0gXCI8aW1nIHNyYz1cXFwiI3tpdGVtLmltYWdlfVxcXCI+XCIgaWYgaXRlbS5pbWFnZVxuICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IGh0bWxcbiAgICAgICAgZWxlbWVudFxuICAgICAgZGlkQ29uZmlybVNlbGVjdGlvbjogKGl0ZW0pID0+XG4gICAgICAgIEBwbHVnaW5SZWdpc3RyeS50b2dnbGVQbHVnaW4gaXRlbS5jb2RlXG4gICAgICBkaWRDYW5jZWxTZWxlY3Rpb246ICgpID0+XG4gICAgICAgIEBjYW5jZWwoKVxuICAgIH0pXG4gICAgQHNlbGVjdExpc3RWaWV3LmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncGx1Z2luLWxpc3QnKVxuXG4gIGRpc3Bvc2U6IC0+XG4gICAgQGNhbmNlbCgpXG4gICAgQHNlbGVjdExpc3RWaWV3LmRlc3Ryb3koKVxuXG4gIGNhbmNlbDogLT5cbiAgICBpZiBAcGFuZWw/XG4gICAgICBAcGFuZWwuZGVzdHJveSgpXG4gICAgQHBhbmVsID0gbnVsbFxuICAgIGlmIEBwcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnRcbiAgICAgIEBwcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQuZm9jdXMoKVxuICAgICAgQHByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCA9IG51bGxcblxuICBhdHRhY2g6IC0+XG4gICAgQHByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICBpZiBub3QgQHBhbmVsP1xuICAgICAgQHBhbmVsID0gYXRvbS53b3Jrc3BhY2UuYWRkTW9kYWxQYW5lbCh7aXRlbTogQHNlbGVjdExpc3RWaWV3fSlcbiAgICBAc2VsZWN0TGlzdFZpZXcuZm9jdXMoKVxuICAgIEBzZWxlY3RMaXN0Vmlldy5yZXNldCgpXG5cbiAgdG9nZ2xlOiAtPlxuICAgIGlmIEBwYW5lbD9cbiAgICAgIEBjYW5jZWwoKVxuICAgIGVsc2VcbiAgICAgIHBsdWdpbnMgPSBbXVxuICAgICAgZm9yIGNvZGUsIHBsdWdpbiBvZiBAcGx1Z2luUmVnaXN0cnkucGx1Z2luc1xuICAgICAgICBwbHVnaW5zLnB1c2goe1xuICAgICAgICAgIGNvZGU6IGNvZGUsXG4gICAgICAgICAgdGl0bGU6IGlmIHBsdWdpbi50aXRsZSB0aGVuIHBsdWdpbi50aXRsZSBlbHNlIGNvZGUsXG4gICAgICAgICAgZGVzY3JpcHRpb246IHBsdWdpbi5kZXNjcmlwdGlvblxuICAgICAgICAgIGltYWdlOiBwbHVnaW4uaW1hZ2VcbiAgICAgICAgfSlcbiAgICAgIEBzZWxlY3RMaXN0Vmlldy51cGRhdGUoe2l0ZW1zOiBwbHVnaW5zfSlcbiAgICAgIEBhdHRhY2goKVxuIl19

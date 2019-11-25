(function() {
  var SelectListView;

  SelectListView = require("atom-select-list");

  module.exports = {
    init: function(colorHelper) {
      this.colorHelper = colorHelper;
      this.selectListView = new SelectListView({
        emptyMessage: 'No colors options.',
        itemsClassList: ['mark-active'],
        items: [],
        filterKeyForItem: function(item) {
          return item.value + item.description;
        },
        elementForItem: (function(_this) {
          return function(item) {
            var element, html;
            element = document.createElement('li');
            if (item.value === _this.currentColor) {
              element.classList.add('active');
            }
            html = "<b>" + item.description + "</b>";
            element.innerHTML = html;
            return element;
          };
        })(this),
        didConfirmSelection: (function(_this) {
          return function(item) {
            _this.cancel();
            return _this.colorHelper.selectColor(item.value);
          };
        })(this),
        didCancelSelection: (function(_this) {
          return function() {
            return _this.cancel();
          };
        })(this)
      });
      return this.selectListView.element.classList.add('color-list');
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
      this.currentColor = null;
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
      var colorSchema, colors, i, option, ref;
      if (this.panel != null) {
        return this.cancel();
      } else {
        this.currentColor = this.colorHelper.conf['type'];
        colors = [];
        colorSchema = atom.config.getSchema(this.colorHelper.key);
        ref = colorSchema.properties.type["enum"];
        for (i in ref) {
          option = ref[i];
          colors.push(option);
        }
        this.selectListView.update({
          items: colors
        });
        return this.attach();
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvam9lbC8uYXRvbS9wYWNrYWdlcy9hY3RpdmF0ZS1wb3dlci1tb2RlL2xpYi9jb2xvci1saXN0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsY0FBQSxHQUFpQixPQUFBLENBQVEsa0JBQVI7O0VBRWpCLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7SUFBQSxJQUFBLEVBQU0sU0FBQyxXQUFEO01BQ0osSUFBQyxDQUFBLFdBQUQsR0FBZTtNQUNmLElBQUMsQ0FBQSxjQUFELEdBQWtCLElBQUksY0FBSixDQUFtQjtRQUNuQyxZQUFBLEVBQWMsb0JBRHFCO1FBRW5DLGNBQUEsRUFBZ0IsQ0FBQyxhQUFELENBRm1CO1FBR25DLEtBQUEsRUFBTyxFQUg0QjtRQUluQyxnQkFBQSxFQUFrQixTQUFDLElBQUQ7aUJBQVUsSUFBSSxDQUFDLEtBQUwsR0FBYSxJQUFJLENBQUM7UUFBNUIsQ0FKaUI7UUFLbkMsY0FBQSxFQUFnQixDQUFBLFNBQUEsS0FBQTtpQkFBQSxTQUFDLElBQUQ7QUFDZCxnQkFBQTtZQUFBLE9BQUEsR0FBVSxRQUFRLENBQUMsYUFBVCxDQUF1QixJQUF2QjtZQUNWLElBQUcsSUFBSSxDQUFDLEtBQUwsS0FBYyxLQUFDLENBQUEsWUFBbEI7Y0FDRSxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQWxCLENBQXNCLFFBQXRCLEVBREY7O1lBRUEsSUFBQSxHQUFPLEtBQUEsR0FBTSxJQUFJLENBQUMsV0FBWCxHQUF1QjtZQUM5QixPQUFPLENBQUMsU0FBUixHQUFvQjttQkFDcEI7VUFOYztRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FMbUI7UUFZbkMsbUJBQUEsRUFBcUIsQ0FBQSxTQUFBLEtBQUE7aUJBQUEsU0FBQyxJQUFEO1lBQ25CLEtBQUMsQ0FBQSxNQUFELENBQUE7bUJBQ0EsS0FBQyxDQUFBLFdBQVcsQ0FBQyxXQUFiLENBQXlCLElBQUksQ0FBQyxLQUE5QjtVQUZtQjtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FaYztRQWVuQyxrQkFBQSxFQUFvQixDQUFBLFNBQUEsS0FBQTtpQkFBQSxTQUFBO21CQUNsQixLQUFDLENBQUEsTUFBRCxDQUFBO1VBRGtCO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQWZlO09BQW5CO2FBa0JsQixJQUFDLENBQUEsY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBbEMsQ0FBc0MsWUFBdEM7SUFwQkksQ0FBTjtJQXNCQSxPQUFBLEVBQVMsU0FBQTtNQUNQLElBQUMsQ0FBQSxNQUFELENBQUE7YUFDQSxJQUFDLENBQUEsY0FBYyxDQUFDLE9BQWhCLENBQUE7SUFGTyxDQXRCVDtJQTBCQSxNQUFBLEVBQVEsU0FBQTtNQUNOLElBQUcsa0JBQUg7UUFDRSxJQUFDLENBQUEsS0FBSyxDQUFDLE9BQVAsQ0FBQSxFQURGOztNQUVBLElBQUMsQ0FBQSxLQUFELEdBQVM7TUFDVCxJQUFDLENBQUEsWUFBRCxHQUFnQjtNQUNoQixJQUFHLElBQUMsQ0FBQSx3QkFBSjtRQUNFLElBQUMsQ0FBQSx3QkFBd0IsQ0FBQyxLQUExQixDQUFBO2VBQ0EsSUFBQyxDQUFBLHdCQUFELEdBQTRCLEtBRjlCOztJQUxNLENBMUJSO0lBbUNBLE1BQUEsRUFBUSxTQUFBO01BQ04sSUFBQyxDQUFBLHdCQUFELEdBQTRCLFFBQVEsQ0FBQztNQUNyQyxJQUFPLGtCQUFQO1FBQ0UsSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWYsQ0FBNkI7VUFBQyxJQUFBLEVBQU0sSUFBQyxDQUFBLGNBQVI7U0FBN0IsRUFEWDs7TUFFQSxJQUFDLENBQUEsY0FBYyxDQUFDLEtBQWhCLENBQUE7YUFDQSxJQUFDLENBQUEsY0FBYyxDQUFDLEtBQWhCLENBQUE7SUFMTSxDQW5DUjtJQTBDQSxNQUFBLEVBQVEsU0FBQTtBQUNOLFVBQUE7TUFBQSxJQUFHLGtCQUFIO2VBQ0UsSUFBQyxDQUFBLE1BQUQsQ0FBQSxFQURGO09BQUEsTUFBQTtRQUdFLElBQUMsQ0FBQSxZQUFELEdBQWdCLElBQUMsQ0FBQSxXQUFXLENBQUMsSUFBSyxDQUFBLE1BQUE7UUFDbEMsTUFBQSxHQUFTO1FBQ1QsV0FBQSxHQUFjLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBWixDQUFzQixJQUFDLENBQUEsV0FBVyxDQUFDLEdBQW5DO0FBQ2Q7QUFBQSxhQUFBLFFBQUE7O1VBQ0UsTUFBTSxDQUFDLElBQVAsQ0FBWSxNQUFaO0FBREY7UUFFQSxJQUFDLENBQUEsY0FBYyxDQUFDLE1BQWhCLENBQXVCO1VBQUMsS0FBQSxFQUFPLE1BQVI7U0FBdkI7ZUFDQSxJQUFDLENBQUEsTUFBRCxDQUFBLEVBVEY7O0lBRE0sQ0ExQ1I7O0FBSEYiLCJzb3VyY2VzQ29udGVudCI6WyJTZWxlY3RMaXN0VmlldyA9IHJlcXVpcmUgXCJhdG9tLXNlbGVjdC1saXN0XCJcblxubW9kdWxlLmV4cG9ydHMgPVxuICBpbml0OiAoY29sb3JIZWxwZXIpIC0+XG4gICAgQGNvbG9ySGVscGVyID0gY29sb3JIZWxwZXJcbiAgICBAc2VsZWN0TGlzdFZpZXcgPSBuZXcgU2VsZWN0TGlzdFZpZXcoe1xuICAgICAgZW1wdHlNZXNzYWdlOiAnTm8gY29sb3JzIG9wdGlvbnMuJyxcbiAgICAgIGl0ZW1zQ2xhc3NMaXN0OiBbJ21hcmstYWN0aXZlJ10sXG4gICAgICBpdGVtczogW10sXG4gICAgICBmaWx0ZXJLZXlGb3JJdGVtOiAoaXRlbSkgLT4gaXRlbS52YWx1ZSArIGl0ZW0uZGVzY3JpcHRpb24sXG4gICAgICBlbGVtZW50Rm9ySXRlbTogKGl0ZW0pID0+XG4gICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdsaSdcbiAgICAgICAgaWYgaXRlbS52YWx1ZSBpcyBAY3VycmVudENvbG9yXG4gICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkICdhY3RpdmUnXG4gICAgICAgIGh0bWwgPSBcIjxiPiN7aXRlbS5kZXNjcmlwdGlvbn08L2I+XCJcbiAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBodG1sXG4gICAgICAgIGVsZW1lbnRcbiAgICAgIGRpZENvbmZpcm1TZWxlY3Rpb246IChpdGVtKSA9PlxuICAgICAgICBAY2FuY2VsKClcbiAgICAgICAgQGNvbG9ySGVscGVyLnNlbGVjdENvbG9yIGl0ZW0udmFsdWVcbiAgICAgIGRpZENhbmNlbFNlbGVjdGlvbjogKCkgPT5cbiAgICAgICAgQGNhbmNlbCgpXG4gICAgfSlcbiAgICBAc2VsZWN0TGlzdFZpZXcuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjb2xvci1saXN0JylcblxuICBkaXNwb3NlOiAtPlxuICAgIEBjYW5jZWwoKVxuICAgIEBzZWxlY3RMaXN0Vmlldy5kZXN0cm95KClcblxuICBjYW5jZWw6IC0+XG4gICAgaWYgQHBhbmVsP1xuICAgICAgQHBhbmVsLmRlc3Ryb3koKVxuICAgIEBwYW5lbCA9IG51bGxcbiAgICBAY3VycmVudENvbG9yID0gbnVsbFxuICAgIGlmIEBwcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnRcbiAgICAgIEBwcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQuZm9jdXMoKVxuICAgICAgQHByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCA9IG51bGxcblxuICBhdHRhY2g6IC0+XG4gICAgQHByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICBpZiBub3QgQHBhbmVsP1xuICAgICAgQHBhbmVsID0gYXRvbS53b3Jrc3BhY2UuYWRkTW9kYWxQYW5lbCh7aXRlbTogQHNlbGVjdExpc3RWaWV3fSlcbiAgICBAc2VsZWN0TGlzdFZpZXcuZm9jdXMoKVxuICAgIEBzZWxlY3RMaXN0Vmlldy5yZXNldCgpXG5cbiAgdG9nZ2xlOiAtPlxuICAgIGlmIEBwYW5lbD9cbiAgICAgIEBjYW5jZWwoKVxuICAgIGVsc2VcbiAgICAgIEBjdXJyZW50Q29sb3IgPSBAY29sb3JIZWxwZXIuY29uZlsndHlwZSddXG4gICAgICBjb2xvcnMgPSBbXVxuICAgICAgY29sb3JTY2hlbWEgPSBhdG9tLmNvbmZpZy5nZXRTY2hlbWEoQGNvbG9ySGVscGVyLmtleSlcbiAgICAgIGZvciBpLCBvcHRpb24gb2YgY29sb3JTY2hlbWEucHJvcGVydGllcy50eXBlLmVudW1cbiAgICAgICAgY29sb3JzLnB1c2gob3B0aW9uKVxuICAgICAgQHNlbGVjdExpc3RWaWV3LnVwZGF0ZSh7aXRlbXM6IGNvbG9yc30pXG4gICAgICBAYXR0YWNoKClcbiJdfQ==

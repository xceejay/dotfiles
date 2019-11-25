(function() {
  var SelectListView;

  SelectListView = require("atom-select-list");

  module.exports = {
    init: function(effectRegistry) {
      this.effectRegistry = effectRegistry;
      this.selectListView = new SelectListView({
        emptyMessage: 'No effects in the registry.',
        itemsClassList: ['mark-active'],
        items: [],
        filterKeyForItem: function(item) {
          return item.title + item.description;
        },
        elementForItem: (function(_this) {
          return function(item) {
            var element, html;
            element = document.createElement('li');
            if (item.effect === _this.currentEffect) {
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
            _this.cancel();
            return _this.effectRegistry.selectEffect(item.code);
          };
        })(this),
        didCancelSelection: (function(_this) {
          return function() {
            return _this.cancel();
          };
        })(this)
      });
      return this.selectListView.element.classList.add('effect-list');
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
      this.currentEffect = null;
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
      var code, effect, effects, ref;
      if (this.panel != null) {
        return this.cancel();
      } else {
        this.currentEffect = this.effectRegistry.effect;
        effects = [];
        ref = this.effectRegistry.effects;
        for (code in ref) {
          effect = ref[code];
          effects.push({
            code: code,
            effect: effect,
            title: effect.title ? effect.title : code,
            description: effect.description,
            image: effect.image
          });
        }
        this.selectListView.update({
          items: effects
        });
        return this.attach();
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvam9lbC8uYXRvbS9wYWNrYWdlcy9hY3RpdmF0ZS1wb3dlci1tb2RlL2xpYi9lZmZlY3QtbGlzdC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFBLGNBQUEsR0FBaUIsT0FBQSxDQUFRLGtCQUFSOztFQUVqQixNQUFNLENBQUMsT0FBUCxHQUNFO0lBQUEsSUFBQSxFQUFNLFNBQUMsY0FBRDtNQUNKLElBQUMsQ0FBQSxjQUFELEdBQWtCO01BQ2xCLElBQUMsQ0FBQSxjQUFELEdBQWtCLElBQUksY0FBSixDQUFtQjtRQUNuQyxZQUFBLEVBQWMsNkJBRHFCO1FBRW5DLGNBQUEsRUFBZ0IsQ0FBQyxhQUFELENBRm1CO1FBR25DLEtBQUEsRUFBTyxFQUg0QjtRQUluQyxnQkFBQSxFQUFrQixTQUFDLElBQUQ7aUJBQVUsSUFBSSxDQUFDLEtBQUwsR0FBYSxJQUFJLENBQUM7UUFBNUIsQ0FKaUI7UUFLbkMsY0FBQSxFQUFnQixDQUFBLFNBQUEsS0FBQTtpQkFBQSxTQUFDLElBQUQ7QUFDZCxnQkFBQTtZQUFBLE9BQUEsR0FBVSxRQUFRLENBQUMsYUFBVCxDQUF1QixJQUF2QjtZQUNWLElBQUcsSUFBSSxDQUFDLE1BQUwsS0FBZSxLQUFDLENBQUEsYUFBbkI7Y0FDRSxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQWxCLENBQXNCLFFBQXRCLEVBREY7O1lBRUEsSUFBQSxHQUFPLEtBQUEsR0FBTSxJQUFJLENBQUMsS0FBWCxHQUFpQjtZQUN4QixJQUEwQyxJQUFJLENBQUMsV0FBL0M7Y0FBQSxJQUFBLElBQVEsV0FBQSxHQUFZLElBQUksQ0FBQyxZQUF6Qjs7WUFDQSxJQUF5QyxJQUFJLENBQUMsS0FBOUM7Y0FBQSxJQUFBLElBQVEsYUFBQSxHQUFjLElBQUksQ0FBQyxLQUFuQixHQUF5QixNQUFqQzs7WUFDQSxPQUFPLENBQUMsU0FBUixHQUFvQjttQkFDcEI7VUFSYztRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FMbUI7UUFjbkMsbUJBQUEsRUFBcUIsQ0FBQSxTQUFBLEtBQUE7aUJBQUEsU0FBQyxJQUFEO1lBQ25CLEtBQUMsQ0FBQSxNQUFELENBQUE7bUJBQ0EsS0FBQyxDQUFBLGNBQWMsQ0FBQyxZQUFoQixDQUE2QixJQUFJLENBQUMsSUFBbEM7VUFGbUI7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBZGM7UUFpQm5DLGtCQUFBLEVBQW9CLENBQUEsU0FBQSxLQUFBO2lCQUFBLFNBQUE7bUJBQ2xCLEtBQUMsQ0FBQSxNQUFELENBQUE7VUFEa0I7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBakJlO09BQW5CO2FBb0JsQixJQUFDLENBQUEsY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBbEMsQ0FBc0MsYUFBdEM7SUF0QkksQ0FBTjtJQXdCQSxPQUFBLEVBQVMsU0FBQTtNQUNQLElBQUMsQ0FBQSxNQUFELENBQUE7YUFDQSxJQUFDLENBQUEsY0FBYyxDQUFDLE9BQWhCLENBQUE7SUFGTyxDQXhCVDtJQTRCQSxNQUFBLEVBQVEsU0FBQTtNQUNOLElBQUcsa0JBQUg7UUFDRSxJQUFDLENBQUEsS0FBSyxDQUFDLE9BQVAsQ0FBQSxFQURGOztNQUVBLElBQUMsQ0FBQSxLQUFELEdBQVM7TUFDVCxJQUFDLENBQUEsYUFBRCxHQUFpQjtNQUNqQixJQUFHLElBQUMsQ0FBQSx3QkFBSjtRQUNFLElBQUMsQ0FBQSx3QkFBd0IsQ0FBQyxLQUExQixDQUFBO2VBQ0EsSUFBQyxDQUFBLHdCQUFELEdBQTRCLEtBRjlCOztJQUxNLENBNUJSO0lBcUNBLE1BQUEsRUFBUSxTQUFBO01BQ04sSUFBQyxDQUFBLHdCQUFELEdBQTRCLFFBQVEsQ0FBQztNQUNyQyxJQUFPLGtCQUFQO1FBQ0UsSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWYsQ0FBNkI7VUFBQyxJQUFBLEVBQU0sSUFBQyxDQUFBLGNBQVI7U0FBN0IsRUFEWDs7TUFFQSxJQUFDLENBQUEsY0FBYyxDQUFDLEtBQWhCLENBQUE7YUFDQSxJQUFDLENBQUEsY0FBYyxDQUFDLEtBQWhCLENBQUE7SUFMTSxDQXJDUjtJQTRDQSxNQUFBLEVBQVEsU0FBQTtBQUNOLFVBQUE7TUFBQSxJQUFHLGtCQUFIO2VBQ0UsSUFBQyxDQUFBLE1BQUQsQ0FBQSxFQURGO09BQUEsTUFBQTtRQUdFLElBQUMsQ0FBQSxhQUFELEdBQWlCLElBQUMsQ0FBQSxjQUFjLENBQUM7UUFDakMsT0FBQSxHQUFVO0FBQ1Y7QUFBQSxhQUFBLFdBQUE7O1VBQ0UsT0FBTyxDQUFDLElBQVIsQ0FBYTtZQUNYLElBQUEsRUFBTSxJQURLO1lBRVgsTUFBQSxFQUFRLE1BRkc7WUFHWCxLQUFBLEVBQVUsTUFBTSxDQUFDLEtBQVYsR0FBcUIsTUFBTSxDQUFDLEtBQTVCLEdBQXVDLElBSG5DO1lBSVgsV0FBQSxFQUFhLE1BQU0sQ0FBQyxXQUpUO1lBS1gsS0FBQSxFQUFPLE1BQU0sQ0FBQyxLQUxIO1dBQWI7QUFERjtRQVFBLElBQUMsQ0FBQSxjQUFjLENBQUMsTUFBaEIsQ0FBdUI7VUFBQyxLQUFBLEVBQU8sT0FBUjtTQUF2QjtlQUNBLElBQUMsQ0FBQSxNQUFELENBQUEsRUFkRjs7SUFETSxDQTVDUjs7QUFIRiIsInNvdXJjZXNDb250ZW50IjpbIlNlbGVjdExpc3RWaWV3ID0gcmVxdWlyZSBcImF0b20tc2VsZWN0LWxpc3RcIlxuXG5tb2R1bGUuZXhwb3J0cyA9XG4gIGluaXQ6IChlZmZlY3RSZWdpc3RyeSkgLT5cbiAgICBAZWZmZWN0UmVnaXN0cnkgPSBlZmZlY3RSZWdpc3RyeVxuICAgIEBzZWxlY3RMaXN0VmlldyA9IG5ldyBTZWxlY3RMaXN0Vmlldyh7XG4gICAgICBlbXB0eU1lc3NhZ2U6ICdObyBlZmZlY3RzIGluIHRoZSByZWdpc3RyeS4nLFxuICAgICAgaXRlbXNDbGFzc0xpc3Q6IFsnbWFyay1hY3RpdmUnXSxcbiAgICAgIGl0ZW1zOiBbXSxcbiAgICAgIGZpbHRlcktleUZvckl0ZW06IChpdGVtKSAtPiBpdGVtLnRpdGxlICsgaXRlbS5kZXNjcmlwdGlvbixcbiAgICAgIGVsZW1lbnRGb3JJdGVtOiAoaXRlbSkgPT5cbiAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ2xpJ1xuICAgICAgICBpZiBpdGVtLmVmZmVjdCBpcyBAY3VycmVudEVmZmVjdFxuICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCAnYWN0aXZlJ1xuICAgICAgICBodG1sID0gXCI8Yj4je2l0ZW0udGl0bGV9PC9iPlwiXG4gICAgICAgIGh0bWwgKz0gXCI8Yj46PC9iPiAje2l0ZW0uZGVzY3JpcHRpb259XCIgaWYgaXRlbS5kZXNjcmlwdGlvblxuICAgICAgICBodG1sICs9IFwiPGltZyBzcmM9XFxcIiN7aXRlbS5pbWFnZX1cXFwiPlwiIGlmIGl0ZW0uaW1hZ2VcbiAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBodG1sXG4gICAgICAgIGVsZW1lbnRcbiAgICAgIGRpZENvbmZpcm1TZWxlY3Rpb246IChpdGVtKSA9PlxuICAgICAgICBAY2FuY2VsKClcbiAgICAgICAgQGVmZmVjdFJlZ2lzdHJ5LnNlbGVjdEVmZmVjdCBpdGVtLmNvZGVcbiAgICAgIGRpZENhbmNlbFNlbGVjdGlvbjogKCkgPT5cbiAgICAgICAgQGNhbmNlbCgpXG4gICAgfSlcbiAgICBAc2VsZWN0TGlzdFZpZXcuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdlZmZlY3QtbGlzdCcpXG5cbiAgZGlzcG9zZTogLT5cbiAgICBAY2FuY2VsKClcbiAgICBAc2VsZWN0TGlzdFZpZXcuZGVzdHJveSgpXG5cbiAgY2FuY2VsOiAtPlxuICAgIGlmIEBwYW5lbD9cbiAgICAgIEBwYW5lbC5kZXN0cm95KClcbiAgICBAcGFuZWwgPSBudWxsXG4gICAgQGN1cnJlbnRFZmZlY3QgPSBudWxsXG4gICAgaWYgQHByZXZpb3VzbHlGb2N1c2VkRWxlbWVudFxuICAgICAgQHByZXZpb3VzbHlGb2N1c2VkRWxlbWVudC5mb2N1cygpXG4gICAgICBAcHJldmlvdXNseUZvY3VzZWRFbGVtZW50ID0gbnVsbFxuXG4gIGF0dGFjaDogLT5cbiAgICBAcHJldmlvdXNseUZvY3VzZWRFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgIGlmIG5vdCBAcGFuZWw/XG4gICAgICBAcGFuZWwgPSBhdG9tLndvcmtzcGFjZS5hZGRNb2RhbFBhbmVsKHtpdGVtOiBAc2VsZWN0TGlzdFZpZXd9KVxuICAgIEBzZWxlY3RMaXN0Vmlldy5mb2N1cygpXG4gICAgQHNlbGVjdExpc3RWaWV3LnJlc2V0KClcblxuICB0b2dnbGU6IC0+XG4gICAgaWYgQHBhbmVsP1xuICAgICAgQGNhbmNlbCgpXG4gICAgZWxzZVxuICAgICAgQGN1cnJlbnRFZmZlY3QgPSBAZWZmZWN0UmVnaXN0cnkuZWZmZWN0XG4gICAgICBlZmZlY3RzID0gW11cbiAgICAgIGZvciBjb2RlLCBlZmZlY3Qgb2YgQGVmZmVjdFJlZ2lzdHJ5LmVmZmVjdHNcbiAgICAgICAgZWZmZWN0cy5wdXNoKHtcbiAgICAgICAgICBjb2RlOiBjb2RlLFxuICAgICAgICAgIGVmZmVjdDogZWZmZWN0LFxuICAgICAgICAgIHRpdGxlOiBpZiBlZmZlY3QudGl0bGUgdGhlbiBlZmZlY3QudGl0bGUgZWxzZSBjb2RlLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBlZmZlY3QuZGVzY3JpcHRpb25cbiAgICAgICAgICBpbWFnZTogZWZmZWN0LmltYWdlXG4gICAgICAgIH0pXG4gICAgICBAc2VsZWN0TGlzdFZpZXcudXBkYXRlKHtpdGVtczogZWZmZWN0c30pXG4gICAgICBAYXR0YWNoKClcbiJdfQ==

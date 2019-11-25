(function() {
  var $, CompositeDisposable, View, ZentabsController, _, ref,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CompositeDisposable = require('atom').CompositeDisposable;

  ref = require('atom-space-pen-views'), $ = ref.$, View = ref.View;

  _ = require('underscore-plus');

  module.exports = ZentabsController = (function(superClass) {
    extend(ZentabsController, superClass);

    function ZentabsController() {
      this.toggleTab = bind(this.toggleTab, this);
      this.unpinTab = bind(this.unpinTab, this);
      this.pinTab = bind(this.pinTab, this);
      this.destroy = bind(this.destroy, this);
      return ZentabsController.__super__.constructor.apply(this, arguments);
    }

    ZentabsController.content = function() {
      return this.span('');
    };

    ZentabsController.prototype.initialize = function(pane1) {
      var i, item, len, ref1;
      this.pane = pane1;
      this.subscriptions = new CompositeDisposable;
      this.subscriptions.add(atom.commands.add('atom-workspace', 'zentabs:cleanup', (function(_this) {
        return function() {
          return _this.closeOverflowingTabs();
        };
      })(this)));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'zentabs:pintab', this.pinTab));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'zentabs:unpintab', this.unpinTab));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'zentabs:toggletab', this.toggleTab));
      this.items = [];
      this.pinnedItems = [];
      ref1 = this.pane.getItems();
      for (i = 0, len = ref1.length; i < len; i++) {
        item = ref1[i];
        this.pushItem(item);
      }
      this.subscriptions.add(this.pane.onDidDestroy((function(_this) {
        return function(pane) {
          if (pane === _this.pane) {
            return _this.unsubscribe();
          }
        };
      })(this)));
      this.subscriptions.add(this.pane.onDidAddItem((function(_this) {
        return function(arg) {
          var item;
          item = arg.item;
          _this.pushItem(item);
          if (!atom.config.get('zentabs.manualMode')) {
            setTimeout((function() {
              return _this.closeOverflowingTabs(item);
            }), 0);
          }
          return true;
        };
      })(this)));
      this.subscriptions.add(this.pane.onDidRemoveItem((function(_this) {
        return function(arg) {
          var item;
          item = arg.item;
          _.remove(_this.pinnedItems, item);
          _.remove(_this.items, item);
          return true;
        };
      })(this)));
      this.subscriptions.add(this.pane.onDidChangeActiveItem((function(_this) {
        return function() {
          _this.updateActiveTab();
          return true;
        };
      })(this)));
      this.updateActiveTab();
      if (!atom.config.get('zentabs.manualMode')) {
        return this.closeOverflowingTabs();
      }
    };

    ZentabsController.prototype.destroy = function() {
      return this.subscriptions.dispose();
    };

    ZentabsController.prototype.pushItem = function(item) {
      if (!(this.pinnedItems.indexOf(item) > -1)) {
        return this.items.push(item);
      }
    };

    ZentabsController.prototype.updateActiveTab = function() {
      var item;
      item = this.pane.getActiveItem();
      if (!item) {
        return;
      }
      if (this.pinnedItems.indexOf(item) > -1) {
        return;
      }
      _.remove(this.items, item);
      return this.items.push(item);
    };

    ZentabsController.prototype.getRepositories = function() {
      return atom.project.getRepositories();
    };

    ZentabsController.prototype.closeOverflowingTabs = function(newItem) {
      var itemAmount, maxTabs, neverCloseDirty, neverCloseNew, neverCloseUnsaved, tmpItems;
      maxTabs = atom.config.get('zentabs.maximumOpenedTabs');
      neverCloseUnsaved = atom.config.get('zentabs.neverCloseUnsaved');
      neverCloseDirty = atom.config.get('zentabs.neverCloseDirty');
      neverCloseNew = atom.config.get('zentabs.neverCloseNew');
      tmpItems = this.items.slice(0);
      itemAmount = this.items.length;
      return tmpItems.forEach((function(_this) {
        return function(olderItem) {
          var itemPath, preventBecauseDirty, preventBecauseNew, preventBecauseUnsaved, ref1, ref2, ref3;
          if (itemAmount > maxTabs) {
            preventBecauseUnsaved = ((ref1 = olderItem.buffer) != null ? ref1.isModified() : void 0) && neverCloseUnsaved;
            preventBecauseDirty = false;
            preventBecauseNew = false;
            if (itemPath = (ref2 = olderItem.buffer) != null ? (ref3 = ref2.file) != null ? ref3.path : void 0 : void 0) {
              _this.getRepositories().forEach(function(repo) {
                if (!repo) {
                  return;
                }
                preventBecauseDirty = preventBecauseDirty || repo.isPathModified(itemPath) && neverCloseDirty;
                return preventBecauseNew = preventBecauseNew || repo.isPathNew(itemPath) && neverCloseNew;
              });
            }
            if (!(preventBecauseUnsaved || preventBecauseDirty || preventBecauseNew || newItem === olderItem)) {
              _this.pane.destroyItem(olderItem);
              return itemAmount -= 1;
            }
          }
        };
      })(this));
    };

    ZentabsController.prototype.pinTab = function() {
      var item, tab, view;
      tab = $('.tab.right-clicked').first();
      if (tab.size() === 0) {
        return;
      }
      view = atom.views.getView(tab);
      item = view.item;
      _.remove(this.items, item);
      if (!(this.pinnedItems.indexOf(item) > -1)) {
        this.pinnedItems.push(item);
      }
      return tab.addClass('pinned');
    };

    ZentabsController.prototype.unpinTab = function(event) {
      var item, tab, view;
      tab = $('.tab.right-clicked').first();
      if (tab.size() === 0) {
        return;
      }
      view = atom.views.getView(tab);
      item = view.item;
      _.remove(this.pinnedItems, item);
      this.pushItem(item);
      tab.removeClass('pinned');
      return this.closeOverflowingTabs();
    };

    ZentabsController.prototype.toggleTab = function() {
      var item, tab, view;
      tab = $('.tab.active');
      if (!tab) {
        return;
      }
      view = atom.views.getView(tab);
      item = view.item;
      if (tab.hasClass('pinned')) {
        this.pushItem(item);
        tab.removeClass('pinned');
        return this.closeOverflowingTabs();
      } else {
        _.remove(this.items, item);
        if (!(this.pinnedItems.indexOf(item) > -1)) {
          this.pinnedItems.push(item);
        }
        return tab.addClass('pinned');
      }
    };

    return ZentabsController;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvam9lbC8uYXRvbS9wYWNrYWdlcy96ZW50YWJzL2xpYi96ZW50YWJzLWNvbnRyb2xsZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQSx1REFBQTtJQUFBOzs7O0VBQUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSOztFQUN4QixNQUFZLE9BQUEsQ0FBUSxzQkFBUixDQUFaLEVBQUMsU0FBRCxFQUFJOztFQUNKLENBQUEsR0FBSSxPQUFBLENBQVEsaUJBQVI7O0VBRUosTUFBTSxDQUFDLE9BQVAsR0FDTTs7Ozs7Ozs7Ozs7SUFFSixpQkFBQyxDQUFBLE9BQUQsR0FBVSxTQUFBO2FBQ1IsSUFBQyxDQUFBLElBQUQsQ0FBTSxFQUFOO0lBRFE7O2dDQUdWLFVBQUEsR0FBWSxTQUFDLEtBQUQ7QUFDVixVQUFBO01BRFcsSUFBQyxDQUFBLE9BQUQ7TUFDWCxJQUFDLENBQUEsYUFBRCxHQUFpQixJQUFJO01BRXJCLElBQUMsQ0FBQSxhQUFhLENBQUMsR0FBZixDQUFtQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQWQsQ0FBa0IsZ0JBQWxCLEVBQW9DLGlCQUFwQyxFQUF1RCxDQUFBLFNBQUEsS0FBQTtlQUFBLFNBQUE7aUJBQUcsS0FBQyxDQUFBLG9CQUFELENBQUE7UUFBSDtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBdkQsQ0FBbkI7TUFDQSxJQUFDLENBQUEsYUFBYSxDQUFDLEdBQWYsQ0FBbUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFkLENBQWtCLGdCQUFsQixFQUFvQyxnQkFBcEMsRUFBc0QsSUFBQyxDQUFBLE1BQXZELENBQW5CO01BQ0EsSUFBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBZCxDQUFrQixnQkFBbEIsRUFBb0Msa0JBQXBDLEVBQXdELElBQUMsQ0FBQSxRQUF6RCxDQUFuQjtNQUNBLElBQUMsQ0FBQSxh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RUFBdUIsSUFBdkI7TUFFQSxJQUFDLENBQUEsUUFBRCxDQUFVLElBQVY7TUFFQSxHQUFHLENBQUMsV0FBSixDQUFnQixRQUFoQjthQUdBLElBQUMsQ0FBQSxvQkFBRCxDQUFBO0lBZFE7O2dDQWdCVixTQUFBLEdBQVcsU0FBQTtBQUNULFVBQUE7TUFBQSxHQUFBLEdBQU0sQ0FBQSxDQUFFLGFBQUY7TUFDTixJQUFBLENBQWMsR0FBZDtBQUFBLGVBQUE7O01BRUEsSUFBQSxHQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBWCxDQUFtQixHQUFuQjtNQUNQLElBQUEsR0FBTyxJQUFJLENBQUM7TUFDWixJQUFHLEdBQUcsQ0FBQyxRQUFKLENBQWEsUUFBYixDQUFIO1FBQ0UsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFWO1FBQ0EsR0FBRyxDQUFDLFdBQUosQ0FBZ0IsUUFBaEI7ZUFDQSxJQUFDLENBQUEsb0JBQUQsQ0FBQSxFQUhGO09BQUEsTUFBQTtRQUtFLENBQUMsQ0FBQyxNQUFGLENBQVMsSUFBQyxDQUFBLEtBQVYsRUFBaUIsSUFBakI7UUFDQSxJQUFBLENBQUEsQ0FBOEIsSUFBQyxDQUFBLFdBQVcsQ0FBQyxPQUFiLENBQXFCLElBQXJCLENBQUEsR0FBNkIsQ0FBQyxDQUE1RCxDQUFBO1VBQUEsSUFBQyxDQUFBLFdBQVcsQ0FBQyxJQUFiLENBQWtCLElBQWxCLEVBQUE7O2VBQ0EsR0FBRyxDQUFDLFFBQUosQ0FBYSxRQUFiLEVBUEY7O0lBTlM7Ozs7S0E1R21CO0FBTGhDIiwic291cmNlc0NvbnRlbnQiOlsie0NvbXBvc2l0ZURpc3Bvc2FibGV9ID0gcmVxdWlyZSAnYXRvbSdcbnskLCBWaWV3fSA9IHJlcXVpcmUgJ2F0b20tc3BhY2UtcGVuLXZpZXdzJ1xuXyA9IHJlcXVpcmUgJ3VuZGVyc2NvcmUtcGx1cydcblxubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgWmVudGFic0NvbnRyb2xsZXIgZXh0ZW5kcyBWaWV3XG5cbiAgQGNvbnRlbnQ6ICgpLT5cbiAgICBAc3BhbiAnJ1xuXG4gIGluaXRpYWxpemU6IChAcGFuZSkgLT5cbiAgICBAc3Vic2NyaXB0aW9ucyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlXG5cbiAgICBAc3Vic2NyaXB0aW9ucy5hZGQgYXRvbS5jb21tYW5kcy5hZGQgJ2F0b20td29ya3NwYWNlJywgJ3plbnRhYnM6Y2xlYW51cCcsID0+IEBjbG9zZU92ZXJmbG93aW5nVGFicygpXG4gICAgQHN1YnNjcmlwdGlvbnMuYWRkIGF0b20uY29tbWFuZHMuYWRkICdhdG9tLXdvcmtzcGFjZScsICd6ZW50YWJzOnBpbnRhYicsIEBwaW5UYWJcbiAgICBAc3Vic2NyaXB0aW9ucy5hZGQgYXRvbS5jb21tYW5kcy5hZGQgJ2F0b20td29ya3NwYWNlJywgJ3plbnRhYnM6dW5waW50YWInLCBAdW5waW5UYWJcbiAgICBAc3Vic2NyaXB0aW9ucy5hZGQgYXRvbS5jb21tYW5kcy5hZGQgJ2F0b20td29ya3NwYWNlJywgJ3plbnRhYnM6dG9nZ2xldGFiJywgQHRvZ2dsZVRhYlxuXG4gICAgQGl0ZW1zID0gW11cbiAgICBAcGlubmVkSXRlbXMgPSBbXVxuICAgIEBwdXNoSXRlbShpdGVtKSBmb3IgaXRlbSBpbiBAcGFuZS5nZXRJdGVtcygpXG5cbiAgICBAc3Vic2NyaXB0aW9ucy5hZGQgQHBhbmUub25EaWREZXN0cm95IChwYW5lKSA9PlxuICAgICAgQHVuc3Vic2NyaWJlKCkgaWYgcGFuZSBpcyBAcGFuZVxuXG4gICAgQHN1YnNjcmlwdGlvbnMuYWRkIEBwYW5lLm9uRGlkQWRkSXRlbSAoe2l0ZW19KSA9PlxuICAgICAgQHB1c2hJdGVtIGl0ZW1cbiAgICAgIHVubGVzcyBhdG9tLmNvbmZpZy5nZXQgJ3plbnRhYnMubWFudWFsTW9kZSdcbiAgICAgICAgc2V0VGltZW91dCAoPT4gQGNsb3NlT3ZlcmZsb3dpbmdUYWJzKGl0ZW0pKSwgMFxuICAgICAgdHJ1ZVxuXG4gICAgQHN1YnNjcmlwdGlvbnMuYWRkIEBwYW5lLm9uRGlkUmVtb3ZlSXRlbSAoe2l0ZW19KSA9PlxuICAgICAgXy5yZW1vdmUgQHBpbm5lZEl0ZW1zLCBpdGVtXG4gICAgICBfLnJlbW92ZSBAaXRlbXMsIGl0ZW1cbiAgICAgIHRydWVcblxuICAgIEBzdWJzY3JpcHRpb25zLmFkZCBAcGFuZS5vbkRpZENoYW5nZUFjdGl2ZUl0ZW0gPT5cbiAgICAgIEB1cGRhdGVBY3RpdmVUYWIoKVxuICAgICAgdHJ1ZVxuXG4gICAgQHVwZGF0ZUFjdGl2ZVRhYigpXG4gICAgQGNsb3NlT3ZlcmZsb3dpbmdUYWJzKCkgdW5sZXNzIGF0b20uY29uZmlnLmdldCAnemVudGFicy5tYW51YWxNb2RlJ1xuXG4gIGRlc3Ryb3k6ID0+XG4gICAgQHN1YnNjcmlwdGlvbnMuZGlzcG9zZSgpXG5cbiAgcHVzaEl0ZW06IChpdGVtKS0+XG4gICAgQGl0ZW1zLnB1c2ggaXRlbSB1bmxlc3MgQHBpbm5lZEl0ZW1zLmluZGV4T2YoaXRlbSkgPiAtMVxuXG4gIHVwZGF0ZUFjdGl2ZVRhYjogLT5cbiAgICBpdGVtID0gQHBhbmUuZ2V0QWN0aXZlSXRlbSgpXG4gICAgcmV0dXJuIHVubGVzcyBpdGVtXG4gICAgcmV0dXJuIGlmIEBwaW5uZWRJdGVtcy5pbmRleE9mKGl0ZW0pID4gLTEgIyBkbyBub3RoaW5nIGlmIGl0ZW0gaXMgcGlubmVkXG4gICAgXy5yZW1vdmUgQGl0ZW1zLCBpdGVtXG4gICAgQGl0ZW1zLnB1c2ggaXRlbVxuXG4gIGdldFJlcG9zaXRvcmllczogLT4gYXRvbS5wcm9qZWN0LmdldFJlcG9zaXRvcmllcygpXG5cbiAgY2xvc2VPdmVyZmxvd2luZ1RhYnM6IChuZXdJdGVtKS0+XG4gICAgbWF4VGFicyA9IGF0b20uY29uZmlnLmdldCAnemVudGFicy5tYXhpbXVtT3BlbmVkVGFicydcbiAgICBuZXZlckNsb3NlVW5zYXZlZCA9IGF0b20uY29uZmlnLmdldCAnemVudGFicy5uZXZlckNsb3NlVW5zYXZlZCdcbiAgICBuZXZlckNsb3NlRGlydHkgPSBhdG9tLmNvbmZpZy5nZXQgJ3plbnRhYnMubmV2ZXJDbG9zZURpcnR5J1xuICAgIG5ldmVyQ2xvc2VOZXcgPSBhdG9tLmNvbmZpZy5nZXQgJ3plbnRhYnMubmV2ZXJDbG9zZU5ldydcblxuICAgIHRtcEl0ZW1zID0gQGl0ZW1zLnNsaWNlIDBcbiAgICBpdGVtQW1vdW50ID0gQGl0ZW1zLmxlbmd0aFxuICAgIHRtcEl0ZW1zLmZvckVhY2ggKG9sZGVySXRlbSkgPT5cbiAgICAgIGlmIGl0ZW1BbW91bnQgPiBtYXhUYWJzXG4gICAgICAgICMgQ2hlY2sgdGFiIHNhdmVkIHN0YXR1c1xuICAgICAgICBwcmV2ZW50QmVjYXVzZVVuc2F2ZWQgPSBvbGRlckl0ZW0uYnVmZmVyPy5pc01vZGlmaWVkKCkgJiYgbmV2ZXJDbG9zZVVuc2F2ZWRcbiAgICAgICAgcHJldmVudEJlY2F1c2VEaXJ0eSA9IGZhbHNlXG4gICAgICAgIHByZXZlbnRCZWNhdXNlTmV3ID0gZmFsc2VcblxuICAgICAgICBpZiBpdGVtUGF0aCA9IG9sZGVySXRlbS5idWZmZXI/LmZpbGU/LnBhdGhcbiAgICAgICAgICBAZ2V0UmVwb3NpdG9yaWVzKCkuZm9yRWFjaCAocmVwbykgLT5cbiAgICAgICAgICAgIHJldHVybiB1bmxlc3MgcmVwb1xuICAgICAgICAgICAgcHJldmVudEJlY2F1c2VEaXJ0eSA9IHByZXZlbnRCZWNhdXNlRGlydHkgfHwgcmVwby5pc1BhdGhNb2RpZmllZChpdGVtUGF0aCkgJiYgbmV2ZXJDbG9zZURpcnR5XG4gICAgICAgICAgICBwcmV2ZW50QmVjYXVzZU5ldyA9IHByZXZlbnRCZWNhdXNlTmV3IHx8IHJlcG8uaXNQYXRoTmV3KGl0ZW1QYXRoKSAmJiBuZXZlckNsb3NlTmV3XG5cbiAgICAgICAgdW5sZXNzIHByZXZlbnRCZWNhdXNlVW5zYXZlZCB8fCBwcmV2ZW50QmVjYXVzZURpcnR5IHx8IHByZXZlbnRCZWNhdXNlTmV3IHx8IG5ld0l0ZW0gPT0gb2xkZXJJdGVtXG4gICAgICAgICAgQHBhbmUuZGVzdHJveUl0ZW0gb2xkZXJJdGVtXG4gICAgICAgICAgaXRlbUFtb3VudCAtPSAxXG5cbiAgcGluVGFiOiAoKSA9PlxuICAgIHRhYiA9ICQoJy50YWIucmlnaHQtY2xpY2tlZCcpLmZpcnN0KClcbiAgICByZXR1cm4gaWYgdGFiLnNpemUoKSBpcyAwXG5cbiAgICB2aWV3ID0gYXRvbS52aWV3cy5nZXRWaWV3IHRhYlxuICAgIGl0ZW0gPSB2aWV3Lml0ZW1cblxuICAgIF8ucmVtb3ZlIEBpdGVtcywgaXRlbVxuXG4gICAgQHBpbm5lZEl0ZW1zLnB1c2ggaXRlbSB1bmxlc3MgQHBpbm5lZEl0ZW1zLmluZGV4T2YoaXRlbSkgPiAtMVxuXG4gICAgdGFiLmFkZENsYXNzICdwaW5uZWQnXG4gICAgIyB0YWIuZmluZCgnLnRpdGxlJykuYWRkQ2xhc3MgJ2ljb24gaWNvbi1sb2NrJyBpZiBhdG9tLmNvbmZpZy5nZXQgJ3plbnRhYnMuc2hvd1Bpbm5lZEljb24nXG5cbiAgdW5waW5UYWI6IChldmVudCkgPT5cbiAgICB0YWIgPSAkKCcudGFiLnJpZ2h0LWNsaWNrZWQnKS5maXJzdCgpXG4gICAgcmV0dXJuIGlmIHRhYi5zaXplKCkgaXMgMFxuXG4gICAgdmlldyA9IGF0b20udmlld3MuZ2V0VmlldyB0YWJcbiAgICBpdGVtID0gdmlldy5pdGVtXG5cbiAgICBfLnJlbW92ZSBAcGlubmVkSXRlbXMsIGl0ZW1cblxuICAgIEBwdXNoSXRlbSBpdGVtXG5cbiAgICB0YWIucmVtb3ZlQ2xhc3MgJ3Bpbm5lZCdcbiAgICAjIHRhYi5maW5kKCcudGl0bGUnKS5yZW1vdmVDbGFzcyAnaWNvbiBpY29uLWxvY2snXG5cbiAgICBAY2xvc2VPdmVyZmxvd2luZ1RhYnMoKVxuXG4gIHRvZ2dsZVRhYjogPT5cbiAgICB0YWIgPSAkKCcudGFiLmFjdGl2ZScpXG4gICAgcmV0dXJuIHVubGVzcyB0YWJcblxuICAgIHZpZXcgPSBhdG9tLnZpZXdzLmdldFZpZXcgdGFiXG4gICAgaXRlbSA9IHZpZXcuaXRlbVxuICAgIGlmIHRhYi5oYXNDbGFzcygncGlubmVkJylcbiAgICAgIEBwdXNoSXRlbSBpdGVtXG4gICAgICB0YWIucmVtb3ZlQ2xhc3MgJ3Bpbm5lZCdcbiAgICAgIEBjbG9zZU92ZXJmbG93aW5nVGFicygpXG4gICAgZWxzZVxuICAgICAgXy5yZW1vdmUgQGl0ZW1zLCBpdGVtXG4gICAgICBAcGlubmVkSXRlbXMucHVzaCBpdGVtIHVubGVzcyBAcGlubmVkSXRlbXMuaW5kZXhPZihpdGVtKSA+IC0xXG4gICAgICB0YWIuYWRkQ2xhc3MgJ3Bpbm5lZCdcbiJdfQ==

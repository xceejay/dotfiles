(function() {
  var AtomHideTabs, CompositeDisposable;

  CompositeDisposable = require('atom').CompositeDisposable;

  module.exports = AtomHideTabs = {
    subscriptions: null,
    activate: function(state) {
      this.hidden = false;
      this.panes = [];
      this.subscriptions = new CompositeDisposable;
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'atom-hide-tabs:toggle': (function(_this) {
          return function() {
            return _this.toggle();
          };
        })(this)
      }));
      return this.subscriptions.add(atom.workspace.observePanes((function(_this) {
        return function(pane) {
          return _this.handleNewPane(pane);
        };
      })(this)));
    },
    deactivate: function() {
      return this.subscriptions.dispose();
    },
    toggle: function() {
      var i, len, pane, ref, results;
      this.hidden = !this.hidden;
      this.panes = this.panes.filter(function(pane) {
        return pane.alive !== false;
      });
      ref = this.panes;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        pane = ref[i];
        results.push(atom.views.getView(pane).querySelector('.tab-bar').classList.toggle('hide-tabs'));
      }
      return results;
    },
    handleNewPane: function(pane) {
      this.panes.push(pane);
      if (this.hidden) {
        return atom.views.getView(pane).querySelector('.tab-bar').classList.add('hide-tabs');
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvam9lbC8uYXRvbS9wYWNrYWdlcy9hdG9tLWhpZGUtdGFicy9saWIvYXRvbS1oaWRlLXRhYnMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVI7O0VBRXhCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFlBQUEsR0FDZjtJQUFBLGFBQUEsRUFBZSxJQUFmO0lBRUEsUUFBQSxFQUFVLFNBQUMsS0FBRDtNQUVSLElBQUMsQ0FBQSxNQUFELEdBQVU7TUFFVixJQUFDLENBQUEsS0FBRCxHQUFTO01BR1QsSUFBQyxDQUFBLGFBQUQsR0FBaUIsSUFBSTtNQUdyQixJQUFDLENBQUEsYUFBYSxDQUFDLEdBQWYsQ0FBbUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFkLENBQWtCLGdCQUFsQixFQUFvQztRQUFBLHVCQUFBLEVBQXlCLENBQUEsU0FBQSxLQUFBO2lCQUFBLFNBQUE7bUJBQUcsS0FBQyxDQUFBLE1BQUQsQ0FBQTtVQUFIO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF6QjtPQUFwQyxDQUFuQjthQUdBLElBQUMsQ0FBQSxhQUFhLENBQUMsR0FBZixDQUFtQixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQWYsQ0FBNEIsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFDLElBQUQ7aUJBQVUsS0FBQyxDQUFBLGFBQUQsQ0FBZSxJQUFmO1FBQVY7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTVCLENBQW5CO0lBYlEsQ0FGVjtJQWlCQSxVQUFBLEVBQVksU0FBQTthQUNWLElBQUMsQ0FBQSxhQUFhLENBQUMsT0FBZixDQUFBO0lBRFUsQ0FqQlo7SUFvQkEsTUFBQSxFQUFRLFNBQUE7QUFFTixVQUFBO01BQUEsSUFBQyxDQUFBLE1BQUQsR0FBVSxDQUFJLElBQUMsQ0FBQTtNQUdmLElBQUMsQ0FBQSxLQUFELEdBQVMsSUFBQyxDQUFBLEtBQUssQ0FBQyxNQUFQLENBQWMsU0FBQyxJQUFEO2VBQVUsSUFBSSxDQUFDLEtBQUwsS0FBZ0I7TUFBMUIsQ0FBZDtBQUdUO0FBQUE7V0FBQSxxQ0FBQTs7cUJBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLElBQW5CLENBQXdCLENBQUMsYUFBekIsQ0FBdUMsVUFBdkMsQ0FBa0QsQ0FBQyxTQUFTLENBQUMsTUFBN0QsQ0FBb0UsV0FBcEU7QUFERjs7SUFSTSxDQXBCUjtJQStCQSxhQUFBLEVBQWUsU0FBQyxJQUFEO01BQ2IsSUFBQyxDQUFBLEtBQUssQ0FBQyxJQUFQLENBQVksSUFBWjtNQUdBLElBQUcsSUFBQyxDQUFBLE1BQUo7ZUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQVgsQ0FBbUIsSUFBbkIsQ0FBd0IsQ0FBQyxhQUF6QixDQUF1QyxVQUF2QyxDQUFrRCxDQUFDLFNBQVMsQ0FBQyxHQUE3RCxDQUFpRSxXQUFqRSxFQURGOztJQUphLENBL0JmOztBQUhGIiwic291cmNlc0NvbnRlbnQiOlsie0NvbXBvc2l0ZURpc3Bvc2FibGV9ID0gcmVxdWlyZSAnYXRvbSdcblxubW9kdWxlLmV4cG9ydHMgPSBBdG9tSGlkZVRhYnMgPVxuICBzdWJzY3JpcHRpb25zOiBudWxsXG5cbiAgYWN0aXZhdGU6IChzdGF0ZSkgLT5cbiAgICAjIFNldCBkZWZhdWx0IHN0YXRlIHRvIGZhbHNlXG4gICAgQGhpZGRlbiA9IGZhbHNlXG4gICAgIyBBcnJheSBvZiBhbGwgcGFuZXNcbiAgICBAcGFuZXMgPSBbXVxuXG4gICAgIyBFdmVudHMgc3Vic2NyaWJlZCB0byBpbiBhdG9tJ3Mgc3lzdGVtIGNhbiBiZSBlYXNpbHkgY2xlYW5lZCB1cCB3aXRoIGEgQ29tcG9zaXRlRGlzcG9zYWJsZVxuICAgIEBzdWJzY3JpcHRpb25zID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGVcblxuICAgICMgUmVnaXN0ZXIgY29tbWFuZCB0aGF0IHRvZ2dsZXMgdGhpcyB2aWV3XG4gICAgQHN1YnNjcmlwdGlvbnMuYWRkIGF0b20uY29tbWFuZHMuYWRkICdhdG9tLXdvcmtzcGFjZScsICdhdG9tLWhpZGUtdGFiczp0b2dnbGUnOiA9PiBAdG9nZ2xlKClcblxuICAgICMgUmVnaXN0ZXIgY2FsbGJhY2sgd2hpY2ggaGFuZGxlcyBuZXcgcGFuZVxuICAgIEBzdWJzY3JpcHRpb25zLmFkZCBhdG9tLndvcmtzcGFjZS5vYnNlcnZlUGFuZXMgKHBhbmUpID0+IEBoYW5kbGVOZXdQYW5lIHBhbmVcblxuICBkZWFjdGl2YXRlOiAtPlxuICAgIEBzdWJzY3JpcHRpb25zLmRpc3Bvc2UoKVxuXG4gIHRvZ2dsZTogLT5cbiAgICAjIFRvZ2dsZSBpbnRlcm5hbCBzdGF0ZVxuICAgIEBoaWRkZW4gPSBub3QgQGhpZGRlblxuXG4gICAgIyBSZW1vdmUgY2xvc2VkIHBhbmVzXG4gICAgQHBhbmVzID0gQHBhbmVzLmZpbHRlciAocGFuZSkgLT4gcGFuZS5hbGl2ZSBpc250IGZhbHNlXG5cbiAgICAjIFRvZ2dsZSBjbGFzcyBmb3IgYWxsIHBhbmVzXG4gICAgZm9yIHBhbmUgaW4gQHBhbmVzXG4gICAgICBhdG9tLnZpZXdzLmdldFZpZXcocGFuZSkucXVlcnlTZWxlY3RvcignLnRhYi1iYXInKS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlLXRhYnMnKVxuXG4gIGhhbmRsZU5ld1BhbmU6IChwYW5lKSAtPlxuICAgIEBwYW5lcy5wdXNoIHBhbmVcblxuICAgICMgU2V0IGhpZGUtdGFicyBjc3MgY2xhc3MgaWYgdGFicyBhcmUgaGlkZGVuXG4gICAgaWYgQGhpZGRlblxuICAgICAgYXRvbS52aWV3cy5nZXRWaWV3KHBhbmUpLnF1ZXJ5U2VsZWN0b3IoJy50YWItYmFyJykuY2xhc3NMaXN0LmFkZCgnaGlkZS10YWJzJylcbiJdfQ==

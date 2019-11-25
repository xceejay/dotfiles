(function() {
  var CompositeDisposable;

  CompositeDisposable = require("atom").CompositeDisposable;

  module.exports = {
    subscriptions: null,
    effects: [],
    effect: null,
    key: "activate-power-mode.particles.effect",
    enable: function() {
      this.subscriptions = new CompositeDisposable;
      this.observeEffect();
      return this.initList();
    },
    disable: function() {
      var ref, ref1;
      if ((ref = this.subscriptions) != null) {
        ref.dispose();
      }
      if ((ref1 = this.effectList) != null) {
        ref1.dispose();
      }
      return this.effectList = null;
    },
    setDefaultEffect: function(effect) {
      this.effect = effect;
      return this.effects['default'] = effect;
    },
    addEffect: function(code, effect) {
      this.effects[code] = effect;
      if (atom.config.get(this.key) === code) {
        return this.effect = effect;
      }
    },
    removeEffect: function(code) {
      if (atom.config.get(this.key) === code) {
        this.effect.disable();
        this.effect = this.effects['default'];
        this.effect.init();
      }
      return delete this.effects[code];
    },
    observeEffect: function() {
      return this.subscriptions.add(atom.config.observe(this.key, (function(_this) {
        return function(code) {
          var effect;
          if (_this.effects[code] != null) {
            effect = _this.effects[code];
          } else {
            effect = _this.effects['default'];
          }
          _this.effect.disable();
          _this.effect = effect;
          return _this.effect.init();
        };
      })(this)));
    },
    selectEffect: function(code) {
      return atom.config.set(this.key, code);
    },
    initList: function() {
      if (this.effectList != null) {
        return;
      }
      this.effectList = require("./effect-list");
      this.effectList.init(this);
      return this.subscriptions.add(atom.commands.add("atom-workspace", {
        "activate-power-mode:select-effect": (function(_this) {
          return function() {
            return _this.effectList.toggle();
          };
        })(this)
      }));
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvam9lbC8uYXRvbS9wYWNrYWdlcy9hY3RpdmF0ZS1wb3dlci1tb2RlL2xpYi9lZmZlY3QtcmVnaXN0cnkuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVI7O0VBRXhCLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7SUFBQSxhQUFBLEVBQWUsSUFBZjtJQUNBLE9BQUEsRUFBUyxFQURUO0lBRUEsTUFBQSxFQUFRLElBRlI7SUFHQSxHQUFBLEVBQUssc0NBSEw7SUFLQSxNQUFBLEVBQVEsU0FBQTtNQUNOLElBQUMsQ0FBQSxhQUFELEdBQWlCLElBQUk7TUFDckIsSUFBQyxDQUFBLGFBQUQsQ0FBQTthQUNBLElBQUMsQ0FBQSxRQUFELENBQUE7SUFITSxDQUxSO0lBVUEsT0FBQSxFQUFTLFNBQUE7QUFDUCxVQUFBOztXQUFjLENBQUUsT0FBaEIsQ0FBQTs7O1lBQ1csQ0FBRSxPQUFiLENBQUE7O2FBQ0EsSUFBQyxDQUFBLFVBQUQsR0FBYztJQUhQLENBVlQ7SUFlQSxnQkFBQSxFQUFrQixTQUFDLE1BQUQ7TUFDaEIsSUFBQyxDQUFBLE1BQUQsR0FBVTthQUNWLElBQUMsQ0FBQSxPQUFRLENBQUEsU0FBQSxDQUFULEdBQXNCO0lBRk4sQ0FmbEI7SUFtQkEsU0FBQSxFQUFXLFNBQUMsSUFBRCxFQUFPLE1BQVA7TUFDVCxJQUFDLENBQUEsT0FBUSxDQUFBLElBQUEsQ0FBVCxHQUFpQjtNQUVqQixJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixJQUFDLENBQUEsR0FBakIsQ0FBQSxLQUF5QixJQUE1QjtlQUNFLElBQUMsQ0FBQSxNQUFELEdBQVUsT0FEWjs7SUFIUyxDQW5CWDtJQXlCQSxZQUFBLEVBQWMsU0FBQyxJQUFEO01BQ1osSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsSUFBQyxDQUFBLEdBQWpCLENBQUEsS0FBeUIsSUFBNUI7UUFDRSxJQUFDLENBQUEsTUFBTSxDQUFDLE9BQVIsQ0FBQTtRQUNBLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBQyxDQUFBLE9BQVEsQ0FBQSxTQUFBO1FBQ25CLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFBLEVBSEY7O2FBS0EsT0FBTyxJQUFDLENBQUEsT0FBUSxDQUFBLElBQUE7SUFOSixDQXpCZDtJQWlDQSxhQUFBLEVBQWUsU0FBQTthQUNiLElBQUMsQ0FBQSxhQUFhLENBQUMsR0FBZixDQUFtQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQVosQ0FDakIsSUFBQyxDQUFBLEdBRGdCLEVBQ1gsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFDLElBQUQ7QUFDSixjQUFBO1VBQUEsSUFBRywyQkFBSDtZQUNFLE1BQUEsR0FBUyxLQUFDLENBQUEsT0FBUSxDQUFBLElBQUEsRUFEcEI7V0FBQSxNQUFBO1lBR0UsTUFBQSxHQUFTLEtBQUMsQ0FBQSxPQUFRLENBQUEsU0FBQSxFQUhwQjs7VUFJQSxLQUFDLENBQUEsTUFBTSxDQUFDLE9BQVIsQ0FBQTtVQUNBLEtBQUMsQ0FBQSxNQUFELEdBQVU7aUJBQ1YsS0FBQyxDQUFBLE1BQU0sQ0FBQyxJQUFSLENBQUE7UUFQSTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FEVyxDQUFuQjtJQURhLENBakNmO0lBNkNBLFlBQUEsRUFBYyxTQUFDLElBQUQ7YUFDWixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsSUFBQyxDQUFBLEdBQWpCLEVBQXNCLElBQXRCO0lBRFksQ0E3Q2Q7SUFnREEsUUFBQSxFQUFVLFNBQUE7TUFDUixJQUFVLHVCQUFWO0FBQUEsZUFBQTs7TUFFQSxJQUFDLENBQUEsVUFBRCxHQUFjLE9BQUEsQ0FBUSxlQUFSO01BQ2QsSUFBQyxDQUFBLFVBQVUsQ0FBQyxJQUFaLENBQWlCLElBQWpCO2FBRUEsSUFBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBZCxDQUFrQixnQkFBbEIsRUFDakI7UUFBQSxtQ0FBQSxFQUFxQyxDQUFBLFNBQUEsS0FBQTtpQkFBQSxTQUFBO21CQUNuQyxLQUFDLENBQUEsVUFBVSxDQUFDLE1BQVosQ0FBQTtVQURtQztRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBckM7T0FEaUIsQ0FBbkI7SUFOUSxDQWhEVjs7QUFIRiIsInNvdXJjZXNDb250ZW50IjpbIntDb21wb3NpdGVEaXNwb3NhYmxlfSA9IHJlcXVpcmUgXCJhdG9tXCJcblxubW9kdWxlLmV4cG9ydHMgPVxuICBzdWJzY3JpcHRpb25zOiBudWxsXG4gIGVmZmVjdHM6IFtdXG4gIGVmZmVjdDogbnVsbFxuICBrZXk6IFwiYWN0aXZhdGUtcG93ZXItbW9kZS5wYXJ0aWNsZXMuZWZmZWN0XCJcblxuICBlbmFibGU6IC0+XG4gICAgQHN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZVxuICAgIEBvYnNlcnZlRWZmZWN0KClcbiAgICBAaW5pdExpc3QoKVxuXG4gIGRpc2FibGU6IC0+XG4gICAgQHN1YnNjcmlwdGlvbnM/LmRpc3Bvc2UoKVxuICAgIEBlZmZlY3RMaXN0Py5kaXNwb3NlKClcbiAgICBAZWZmZWN0TGlzdCA9IG51bGxcblxuICBzZXREZWZhdWx0RWZmZWN0OiAoZWZmZWN0KSAtPlxuICAgIEBlZmZlY3QgPSBlZmZlY3RcbiAgICBAZWZmZWN0c1snZGVmYXVsdCddID0gZWZmZWN0XG5cbiAgYWRkRWZmZWN0OiAoY29kZSwgZWZmZWN0KSAtPlxuICAgIEBlZmZlY3RzW2NvZGVdID0gZWZmZWN0XG5cbiAgICBpZiBhdG9tLmNvbmZpZy5nZXQoQGtleSkgaXMgY29kZVxuICAgICAgQGVmZmVjdCA9IGVmZmVjdFxuXG4gIHJlbW92ZUVmZmVjdDogKGNvZGUpIC0+XG4gICAgaWYgYXRvbS5jb25maWcuZ2V0KEBrZXkpIGlzIGNvZGVcbiAgICAgIEBlZmZlY3QuZGlzYWJsZSgpXG4gICAgICBAZWZmZWN0ID0gQGVmZmVjdHNbJ2RlZmF1bHQnXVxuICAgICAgQGVmZmVjdC5pbml0KClcblxuICAgIGRlbGV0ZSBAZWZmZWN0c1tjb2RlXVxuXG4gIG9ic2VydmVFZmZlY3Q6IC0+XG4gICAgQHN1YnNjcmlwdGlvbnMuYWRkIGF0b20uY29uZmlnLm9ic2VydmUoXG4gICAgICBAa2V5LCAoY29kZSkgPT5cbiAgICAgICAgaWYgQGVmZmVjdHNbY29kZV0/XG4gICAgICAgICAgZWZmZWN0ID0gQGVmZmVjdHNbY29kZV1cbiAgICAgICAgZWxzZVxuICAgICAgICAgIGVmZmVjdCA9IEBlZmZlY3RzWydkZWZhdWx0J11cbiAgICAgICAgQGVmZmVjdC5kaXNhYmxlKClcbiAgICAgICAgQGVmZmVjdCA9IGVmZmVjdFxuICAgICAgICBAZWZmZWN0LmluaXQoKVxuICAgIClcblxuICBzZWxlY3RFZmZlY3Q6IChjb2RlKSAtPlxuICAgIGF0b20uY29uZmlnLnNldChAa2V5LCBjb2RlKVxuXG4gIGluaXRMaXN0OiAtPlxuICAgIHJldHVybiBpZiBAZWZmZWN0TGlzdD9cblxuICAgIEBlZmZlY3RMaXN0ID0gcmVxdWlyZSBcIi4vZWZmZWN0LWxpc3RcIlxuICAgIEBlZmZlY3RMaXN0LmluaXQgdGhpc1xuXG4gICAgQHN1YnNjcmlwdGlvbnMuYWRkIGF0b20uY29tbWFuZHMuYWRkIFwiYXRvbS13b3Jrc3BhY2VcIixcbiAgICAgIFwiYWN0aXZhdGUtcG93ZXItbW9kZTpzZWxlY3QtZWZmZWN0XCI6ID0+XG4gICAgICAgIEBlZmZlY3RMaXN0LnRvZ2dsZSgpXG4iXX0=

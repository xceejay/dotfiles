(function() {
  module.exports = {
    reset: function() {
      return this.onAll();
    },
    offAll: function() {
      this["default"] = false;
      return this.plugins = [];
    },
    onAll: function() {
      this["default"] = true;
      return this.plugins = [];
    },
    off: function(code) {
      return this.plugins[code] = false;
    },
    on: function(code, data) {
      if (data != null) {
        return this.plugins[code] = data;
      } else {
        return this.plugins[code] = true;
      }
    },
    isOff: function(code) {
      return !this.isOn(code);
    },
    isOn: function(code) {
      if (this.plugins[code] == null) {
        return this["default"];
      } else {
        return true;
      }
    },
    getData: function(code) {
      if ((this.plugins[code] != null) && typeof this.plugins[code] === 'object') {
        return this.plugins[code];
      } else {
        return [];
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvam9lbC8uYXRvbS9wYWNrYWdlcy9hY3RpdmF0ZS1wb3dlci1tb2RlL2xpYi9zd2l0Y2hlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQSxNQUFNLENBQUMsT0FBUCxHQUNFO0lBQUEsS0FBQSxFQUFPLFNBQUE7YUFDTCxJQUFDLENBQUEsS0FBRCxDQUFBO0lBREssQ0FBUDtJQUdBLE1BQUEsRUFBUSxTQUFBO01BQ04sSUFBQyxFQUFBLE9BQUEsRUFBRCxHQUFXO2FBQ1gsSUFBQyxDQUFBLE9BQUQsR0FBVztJQUZMLENBSFI7SUFPQSxLQUFBLEVBQU8sU0FBQTtNQUNMLElBQUMsRUFBQSxPQUFBLEVBQUQsR0FBVzthQUNYLElBQUMsQ0FBQSxPQUFELEdBQVc7SUFGTixDQVBQO0lBV0EsR0FBQSxFQUFLLFNBQUMsSUFBRDthQUNILElBQUMsQ0FBQSxPQUFRLENBQUEsSUFBQSxDQUFULEdBQWlCO0lBRGQsQ0FYTDtJQWNBLEVBQUEsRUFBSSxTQUFDLElBQUQsRUFBTyxJQUFQO01BQ0YsSUFBRyxZQUFIO2VBQ0UsSUFBQyxDQUFBLE9BQVEsQ0FBQSxJQUFBLENBQVQsR0FBaUIsS0FEbkI7T0FBQSxNQUFBO2VBR0UsSUFBQyxDQUFBLE9BQVEsQ0FBQSxJQUFBLENBQVQsR0FBaUIsS0FIbkI7O0lBREUsQ0FkSjtJQW9CQSxLQUFBLEVBQU8sU0FBQyxJQUFEO2FBQ0wsQ0FBSSxJQUFDLENBQUEsSUFBRCxDQUFNLElBQU47SUFEQyxDQXBCUDtJQXVCQSxJQUFBLEVBQU0sU0FBQyxJQUFEO01BQ0osSUFBTywwQkFBUDtlQUNFLElBQUMsRUFBQSxPQUFBLEdBREg7T0FBQSxNQUFBO2VBR0UsS0FIRjs7SUFESSxDQXZCTjtJQTZCQSxPQUFBLEVBQVMsU0FBQyxJQUFEO01BQ1AsSUFBRyw0QkFBQSxJQUFvQixPQUFPLElBQUMsQ0FBQSxPQUFRLENBQUEsSUFBQSxDQUFoQixLQUF5QixRQUFoRDtlQUNFLElBQUMsQ0FBQSxPQUFRLENBQUEsSUFBQSxFQURYO09BQUEsTUFBQTtlQUdFLEdBSEY7O0lBRE8sQ0E3QlQ7O0FBREYiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9XG4gIHJlc2V0OiAtPlxuICAgIEBvbkFsbCgpXG5cbiAgb2ZmQWxsOiAtPlxuICAgIEBkZWZhdWx0ID0gZmFsc2VcbiAgICBAcGx1Z2lucyA9IFtdXG5cbiAgb25BbGw6IC0+XG4gICAgQGRlZmF1bHQgPSB0cnVlXG4gICAgQHBsdWdpbnMgPSBbXVxuXG4gIG9mZjogKGNvZGUpIC0+XG4gICAgQHBsdWdpbnNbY29kZV0gPSBmYWxzZVxuXG4gIG9uOiAoY29kZSwgZGF0YSkgLT5cbiAgICBpZiBkYXRhP1xuICAgICAgQHBsdWdpbnNbY29kZV0gPSBkYXRhXG4gICAgZWxzZVxuICAgICAgQHBsdWdpbnNbY29kZV0gPSB0cnVlXG5cbiAgaXNPZmY6IChjb2RlKSAtPlxuICAgIG5vdCBAaXNPbiBjb2RlXG5cbiAgaXNPbjogKGNvZGUpIC0+XG4gICAgaWYgbm90IEBwbHVnaW5zW2NvZGVdP1xuICAgICAgQGRlZmF1bHRcbiAgICBlbHNlXG4gICAgICB0cnVlXG5cbiAgZ2V0RGF0YTogKGNvZGUpIC0+XG4gICAgaWYgQHBsdWdpbnNbY29kZV0/IGFuZCB0eXBlb2YgQHBsdWdpbnNbY29kZV0gaXMgJ29iamVjdCdcbiAgICAgIEBwbHVnaW5zW2NvZGVdXG4gICAgZWxzZVxuICAgICAgW11cbiJdfQ==

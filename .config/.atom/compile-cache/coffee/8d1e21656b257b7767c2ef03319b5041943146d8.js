(function() {
  module.exports = {
    title: 'Default Flow',
    description: 'Basic flow',
    handle: function(input, switcher, comboLvl) {
      if (comboLvl === 0) {
        switcher.offAll();
        return switcher.on('comboMode');
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvam9lbC8uYXRvbS9wYWNrYWdlcy9hY3RpdmF0ZS1wb3dlci1tb2RlL2xpYi9mbG93L2RlZmF1bHQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtJQUFBLEtBQUEsRUFBTyxjQUFQO0lBQ0EsV0FBQSxFQUFhLFlBRGI7SUFHQSxNQUFBLEVBQVEsU0FBQyxLQUFELEVBQVEsUUFBUixFQUFrQixRQUFsQjtNQUNOLElBQUcsUUFBQSxLQUFZLENBQWY7UUFDRSxRQUFRLENBQUMsTUFBVCxDQUFBO2VBQ0EsUUFBUSxDQUFDLEVBQVQsQ0FBWSxXQUFaLEVBRkY7O0lBRE0sQ0FIUjs7QUFERiIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID1cbiAgdGl0bGU6ICdEZWZhdWx0IEZsb3cnXG4gIGRlc2NyaXB0aW9uOiAnQmFzaWMgZmxvdydcblxuICBoYW5kbGU6IChpbnB1dCwgc3dpdGNoZXIsIGNvbWJvTHZsKSAtPlxuICAgIGlmIGNvbWJvTHZsID09IDBcbiAgICAgIHN3aXRjaGVyLm9mZkFsbCgpXG4gICAgICBzd2l0Y2hlci5vbignY29tYm9Nb2RlJylcbiJdfQ==

(function() {
  module.exports = {
    title: 'Screen Shake',
    description: 'Shakes the screen on typing.',
    enable: function(api) {
      return this.api = api;
    },
    onInput: function(cursor, screenPosition, input, data) {
      return this.api.shakeScreen(data['intensity']);
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvam9lbC8uYXRvbS9wYWNrYWdlcy9hY3RpdmF0ZS1wb3dlci1tb2RlL2xpYi9wbHVnaW4vc2NyZWVuLXNoYWtlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7SUFBQSxLQUFBLEVBQU8sY0FBUDtJQUNBLFdBQUEsRUFBYSw4QkFEYjtJQUdBLE1BQUEsRUFBUSxTQUFDLEdBQUQ7YUFDTixJQUFDLENBQUEsR0FBRCxHQUFPO0lBREQsQ0FIUjtJQU1BLE9BQUEsRUFBUyxTQUFDLE1BQUQsRUFBUyxjQUFULEVBQXlCLEtBQXpCLEVBQWdDLElBQWhDO2FBQ1AsSUFBQyxDQUFBLEdBQUcsQ0FBQyxXQUFMLENBQWlCLElBQUssQ0FBQSxXQUFBLENBQXRCO0lBRE8sQ0FOVDs7QUFERiIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID1cbiAgdGl0bGU6ICdTY3JlZW4gU2hha2UnXG4gIGRlc2NyaXB0aW9uOiAnU2hha2VzIHRoZSBzY3JlZW4gb24gdHlwaW5nLidcblxuICBlbmFibGU6IChhcGkpIC0+XG4gICAgQGFwaSA9IGFwaVxuXG4gIG9uSW5wdXQ6IChjdXJzb3IsIHNjcmVlblBvc2l0aW9uLCBpbnB1dCwgZGF0YSkgLT5cbiAgICBAYXBpLnNoYWtlU2NyZWVuKGRhdGFbJ2ludGVuc2l0eSddKVxuIl19

(function() {
  var throttle;

  throttle = require("lodash.throttle");

  module.exports = {
    api: null,
    setCanvasRenderer: function(canvasRenderer) {
      return this.canvas = canvasRenderer;
    },
    enable: function(api) {
      this.api = api;
      return this.canvas.enable(api);
    },
    disable: function() {
      this.api = null;
      return this.canvas.destroy();
    },
    onChangePane: function(editor, editorElement) {
      var base;
      this.canvas.resetCanvas();
      if (editor) {
        this.canvas.setupCanvas(editor, editorElement);
      }
      return typeof (base = this.canvas.getEffect()).onChangePane === "function" ? base.onChangePane(editor, editorElement) : void 0;
    },
    onNewCursor: function(cursor, screenPosition, input, data) {
      var base;
      cursor.spawn = throttle(this.canvas.spawn.bind(this.canvas), 25, {
        trailing: false
      });
      return typeof (base = this.canvas.getEffect()).onNewCursor === "function" ? base.onNewCursor(cursor, screenPosition, input, data) : void 0;
    },
    onInput: function(cursor, screenPosition, input, data) {
      var base;
      cursor.spawn(cursor, screenPosition, input, data['size']);
      return typeof (base = this.canvas.getEffect()).onInput === "function" ? base.onInput(cursor, screenPosition, input, data) : void 0;
    },
    onComboStartStreak: function() {
      var base;
      return typeof (base = this.canvas.getEffect()).onComboStartStreak === "function" ? base.onComboStartStreak() : void 0;
    },
    onComboLevelChange: function(newLvl, oldLvl) {
      var base;
      return typeof (base = this.canvas.getEffect()).onComboLevelChange === "function" ? base.onComboLevelChange(newLvl, oldLvl) : void 0;
    },
    onComboEndStreak: function() {
      var base;
      return typeof (base = this.canvas.getEffect()).onComboEndStreak === "function" ? base.onComboEndStreak() : void 0;
    },
    onComboExclamation: function(text) {
      var base;
      return typeof (base = this.canvas.getEffect()).onComboExclamation === "function" ? base.onComboExclamation(text) : void 0;
    },
    onComboMaxStreak: function(maxStreak) {
      var base;
      return typeof (base = this.canvas.getEffect()).onComboMaxStreak === "function" ? base.onComboMaxStreak(maxStreak) : void 0;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvam9lbC8uYXRvbS9wYWNrYWdlcy9hY3RpdmF0ZS1wb3dlci1tb2RlL2xpYi9wbHVnaW4vcG93ZXItY2FudmFzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxpQkFBUjs7RUFFWCxNQUFNLENBQUMsT0FBUCxHQUNFO0lBQUEsR0FBQSxFQUFLLElBQUw7SUFFQSxpQkFBQSxFQUFtQixTQUFDLGNBQUQ7YUFDakIsSUFBQyxDQUFBLE1BQUQsR0FBVTtJQURPLENBRm5CO0lBS0EsTUFBQSxFQUFRLFNBQUMsR0FBRDtNQUNOLElBQUMsQ0FBQSxHQUFELEdBQU87YUFDUCxJQUFDLENBQUEsTUFBTSxDQUFDLE1BQVIsQ0FBZSxHQUFmO0lBRk0sQ0FMUjtJQVNBLE9BQUEsRUFBUyxTQUFBO01BQ1AsSUFBQyxDQUFBLEdBQUQsR0FBTzthQUNQLElBQUMsQ0FBQSxNQUFNLENBQUMsT0FBUixDQUFBO0lBRk8sQ0FUVDtJQWFBLFlBQUEsRUFBYyxTQUFDLE1BQUQsRUFBUyxhQUFUO0FBQ1osVUFBQTtNQUFBLElBQUMsQ0FBQSxNQUFNLENBQUMsV0FBUixDQUFBO01BQ0EsSUFBNkMsTUFBN0M7UUFBQSxJQUFDLENBQUEsTUFBTSxDQUFDLFdBQVIsQ0FBb0IsTUFBcEIsRUFBNEIsYUFBNUIsRUFBQTs7dUZBQ21CLENBQUMsYUFBYyxRQUFRO0lBSDlCLENBYmQ7SUFrQkEsV0FBQSxFQUFhLFNBQUMsTUFBRCxFQUFTLGNBQVQsRUFBeUIsS0FBekIsRUFBZ0MsSUFBaEM7QUFDWCxVQUFBO01BQUEsTUFBTSxDQUFDLEtBQVAsR0FBZSxRQUFBLENBQVMsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBZCxDQUFtQixJQUFDLENBQUEsTUFBcEIsQ0FBVCxFQUFzQyxFQUF0QyxFQUEwQztRQUFBLFFBQUEsRUFBVSxLQUFWO09BQTFDO3NGQUNJLENBQUMsWUFBYSxRQUFRLGdCQUFnQixPQUFPO0lBRnJELENBbEJiO0lBc0JBLE9BQUEsRUFBUyxTQUFDLE1BQUQsRUFBUyxjQUFULEVBQXlCLEtBQXpCLEVBQWdDLElBQWhDO0FBQ1AsVUFBQTtNQUFBLE1BQU0sQ0FBQyxLQUFQLENBQWEsTUFBYixFQUFxQixjQUFyQixFQUFxQyxLQUFyQyxFQUE0QyxJQUFLLENBQUEsTUFBQSxDQUFqRDtrRkFDbUIsQ0FBQyxRQUFTLFFBQVEsZ0JBQWdCLE9BQU87SUFGckQsQ0F0QlQ7SUEwQkEsa0JBQUEsRUFBb0IsU0FBQTtBQUNsQixVQUFBOzZGQUFtQixDQUFDO0lBREYsQ0ExQnBCO0lBNkJBLGtCQUFBLEVBQW9CLFNBQUMsTUFBRCxFQUFTLE1BQVQ7QUFDbEIsVUFBQTs2RkFBbUIsQ0FBQyxtQkFBb0IsUUFBUTtJQUQ5QixDQTdCcEI7SUFnQ0EsZ0JBQUEsRUFBa0IsU0FBQTtBQUNoQixVQUFBOzJGQUFtQixDQUFDO0lBREosQ0FoQ2xCO0lBbUNBLGtCQUFBLEVBQW9CLFNBQUMsSUFBRDtBQUNsQixVQUFBOzZGQUFtQixDQUFDLG1CQUFvQjtJQUR0QixDQW5DcEI7SUFzQ0EsZ0JBQUEsRUFBa0IsU0FBQyxTQUFEO0FBQ2hCLFVBQUE7MkZBQW1CLENBQUMsaUJBQWtCO0lBRHRCLENBdENsQjs7QUFIRiIsInNvdXJjZXNDb250ZW50IjpbInRocm90dGxlID0gcmVxdWlyZSBcImxvZGFzaC50aHJvdHRsZVwiXG5cbm1vZHVsZS5leHBvcnRzID1cbiAgYXBpOiBudWxsXG5cbiAgc2V0Q2FudmFzUmVuZGVyZXI6IChjYW52YXNSZW5kZXJlcikgLT5cbiAgICBAY2FudmFzID0gY2FudmFzUmVuZGVyZXJcblxuICBlbmFibGU6IChhcGkpIC0+XG4gICAgQGFwaSA9IGFwaVxuICAgIEBjYW52YXMuZW5hYmxlKGFwaSlcblxuICBkaXNhYmxlOiAtPlxuICAgIEBhcGkgPSBudWxsXG4gICAgQGNhbnZhcy5kZXN0cm95KClcblxuICBvbkNoYW5nZVBhbmU6IChlZGl0b3IsIGVkaXRvckVsZW1lbnQpIC0+XG4gICAgQGNhbnZhcy5yZXNldENhbnZhcygpXG4gICAgQGNhbnZhcy5zZXR1cENhbnZhcyBlZGl0b3IsIGVkaXRvckVsZW1lbnQgaWYgZWRpdG9yXG4gICAgQGNhbnZhcy5nZXRFZmZlY3QoKS5vbkNoYW5nZVBhbmU/KGVkaXRvciwgZWRpdG9yRWxlbWVudClcblxuICBvbk5ld0N1cnNvcjogKGN1cnNvciwgc2NyZWVuUG9zaXRpb24sIGlucHV0LCBkYXRhKSAtPlxuICAgIGN1cnNvci5zcGF3biA9IHRocm90dGxlIEBjYW52YXMuc3Bhd24uYmluZChAY2FudmFzKSwgMjUsIHRyYWlsaW5nOiBmYWxzZVxuICAgIEBjYW52YXMuZ2V0RWZmZWN0KCkub25OZXdDdXJzb3I/KGN1cnNvciwgc2NyZWVuUG9zaXRpb24sIGlucHV0LCBkYXRhKVxuXG4gIG9uSW5wdXQ6IChjdXJzb3IsIHNjcmVlblBvc2l0aW9uLCBpbnB1dCwgZGF0YSkgLT5cbiAgICBjdXJzb3Iuc3Bhd24gY3Vyc29yLCBzY3JlZW5Qb3NpdGlvbiwgaW5wdXQsIGRhdGFbJ3NpemUnXVxuICAgIEBjYW52YXMuZ2V0RWZmZWN0KCkub25JbnB1dD8oY3Vyc29yLCBzY3JlZW5Qb3NpdGlvbiwgaW5wdXQsIGRhdGEpXG5cbiAgb25Db21ib1N0YXJ0U3RyZWFrOiAtPlxuICAgIEBjYW52YXMuZ2V0RWZmZWN0KCkub25Db21ib1N0YXJ0U3RyZWFrPygpXG5cbiAgb25Db21ib0xldmVsQ2hhbmdlOiAobmV3THZsLCBvbGRMdmwpIC0+XG4gICAgQGNhbnZhcy5nZXRFZmZlY3QoKS5vbkNvbWJvTGV2ZWxDaGFuZ2U/KG5ld0x2bCwgb2xkTHZsKVxuXG4gIG9uQ29tYm9FbmRTdHJlYWs6IC0+XG4gICAgQGNhbnZhcy5nZXRFZmZlY3QoKS5vbkNvbWJvRW5kU3RyZWFrPygpXG5cbiAgb25Db21ib0V4Y2xhbWF0aW9uOiAodGV4dCkgLT5cbiAgICBAY2FudmFzLmdldEVmZmVjdCgpLm9uQ29tYm9FeGNsYW1hdGlvbj8odGV4dClcblxuICBvbkNvbWJvTWF4U3RyZWFrOiAobWF4U3RyZWFrKSAtPlxuICAgIEBjYW52YXMuZ2V0RWZmZWN0KCkub25Db21ib01heFN0cmVhaz8obWF4U3RyZWFrKVxuIl19

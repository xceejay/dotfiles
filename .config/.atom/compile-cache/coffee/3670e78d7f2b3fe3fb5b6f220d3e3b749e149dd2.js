(function() {
  module.exports = {
    getEditor: function() {
      return this.editor;
    },
    getEditorElement: function() {
      return this.editorElement;
    },
    getScrollView: function() {
      return this.scrollView;
    },
    setEditor: function(editor) {
      if (editor) {
        this.editor = editor;
        this.editorElement = editor.getElement();
        return this.scrollView = this.editorElement.querySelector(".scroll-view");
      } else {
        return this.editor = this.editorElement = this.scrollView = null;
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvam9lbC8uYXRvbS9wYWNrYWdlcy9hY3RpdmF0ZS1wb3dlci1tb2RlL2xpYi9zZXJ2aWNlL2VkaXRvci1yZWdpc3RyeS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQSxNQUFNLENBQUMsT0FBUCxHQUNFO0lBQUEsU0FBQSxFQUFXLFNBQUE7YUFDVCxJQUFDLENBQUE7SUFEUSxDQUFYO0lBR0EsZ0JBQUEsRUFBa0IsU0FBQTthQUNoQixJQUFDLENBQUE7SUFEZSxDQUhsQjtJQU1BLGFBQUEsRUFBZSxTQUFBO2FBQ2IsSUFBQyxDQUFBO0lBRFksQ0FOZjtJQVNBLFNBQUEsRUFBVyxTQUFDLE1BQUQ7TUFDVCxJQUFHLE1BQUg7UUFDRSxJQUFDLENBQUEsTUFBRCxHQUFVO1FBQ1YsSUFBQyxDQUFBLGFBQUQsR0FBaUIsTUFBTSxDQUFDLFVBQVAsQ0FBQTtlQUNqQixJQUFDLENBQUEsVUFBRCxHQUFjLElBQUMsQ0FBQSxhQUFhLENBQUMsYUFBZixDQUE2QixjQUE3QixFQUhoQjtPQUFBLE1BQUE7ZUFLRSxJQUFDLENBQUEsTUFBRCxHQUFVLElBQUMsQ0FBQSxhQUFELEdBQWlCLElBQUMsQ0FBQSxVQUFELEdBQWMsS0FMM0M7O0lBRFMsQ0FUWDs7QUFERiIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID1cbiAgZ2V0RWRpdG9yOiAtPlxuICAgIEBlZGl0b3JcblxuICBnZXRFZGl0b3JFbGVtZW50OiAtPlxuICAgIEBlZGl0b3JFbGVtZW50XG5cbiAgZ2V0U2Nyb2xsVmlldzogLT5cbiAgICBAc2Nyb2xsVmlld1xuXG4gIHNldEVkaXRvcjogKGVkaXRvcikgLT5cbiAgICBpZiBlZGl0b3JcbiAgICAgIEBlZGl0b3IgPSBlZGl0b3JcbiAgICAgIEBlZGl0b3JFbGVtZW50ID0gZWRpdG9yLmdldEVsZW1lbnQoKVxuICAgICAgQHNjcm9sbFZpZXcgPSBAZWRpdG9yRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnNjcm9sbC12aWV3XCIpXG4gICAgZWxzZVxuICAgICAgQGVkaXRvciA9IEBlZGl0b3JFbGVtZW50ID0gQHNjcm9sbFZpZXcgPSBudWxsXG4iXX0=

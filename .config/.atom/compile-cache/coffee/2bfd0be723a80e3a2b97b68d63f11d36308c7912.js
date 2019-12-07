(function() {
  atom.commands.add('atom-text-editor', 'custom:reformat', function() {
    var editor, oldRanges;
    editor = atom.workspace.getActiveTextEditor();
    oldRanges = editor.getSelectedBufferRanges();
    editor.selectAll();
    atom.commands.dispatch(atom.views.getView(editor), 'editor:auto-indent');
    editor.setSelectedBufferRanges(oldRanges);
    return atom.commands.dispatch(atom.views.getView(atom.workspace), 'atom-hide-tabs:toggle');
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvam9lbC8uYXRvbS9pbml0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBZCxDQUFrQixrQkFBbEIsRUFBc0MsaUJBQXRDLEVBQXlELFNBQUE7QUFDckQsUUFBQTtJQUFBLE1BQUEsR0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFmLENBQUE7SUFDVCxTQUFBLEdBQVksTUFBTSxDQUFDLHVCQUFQLENBQUE7SUFDWixNQUFNLENBQUMsU0FBUCxDQUFBO0lBQ0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBWCxDQUFtQixNQUFuQixDQUF2QixFQUFtRCxvQkFBbkQ7SUFDQSxNQUFNLENBQUMsdUJBQVAsQ0FBK0IsU0FBL0I7V0FDQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLElBQUksQ0FBQyxTQUF4QixDQUF2QixFQUEyRCx1QkFBM0Q7RUFOcUQsQ0FBekQ7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbImF0b20uY29tbWFuZHMuYWRkICdhdG9tLXRleHQtZWRpdG9yJywgJ2N1c3RvbTpyZWZvcm1hdCcsIC0+XG4gICAgZWRpdG9yID0gYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlVGV4dEVkaXRvcigpO1xuICAgIG9sZFJhbmdlcyA9IGVkaXRvci5nZXRTZWxlY3RlZEJ1ZmZlclJhbmdlcygpO1xuICAgIGVkaXRvci5zZWxlY3RBbGwoKTtcbiAgICBhdG9tLmNvbW1hbmRzLmRpc3BhdGNoKGF0b20udmlld3MuZ2V0VmlldyhlZGl0b3IpLCAnZWRpdG9yOmF1dG8taW5kZW50JylcbiAgICBlZGl0b3Iuc2V0U2VsZWN0ZWRCdWZmZXJSYW5nZXMob2xkUmFuZ2VzKTtcbiAgICBhdG9tLmNvbW1hbmRzLmRpc3BhdGNoKGF0b20udmlld3MuZ2V0VmlldyhhdG9tLndvcmtzcGFjZSksICdhdG9tLWhpZGUtdGFiczp0b2dnbGUnKTtcbiJdfQ==
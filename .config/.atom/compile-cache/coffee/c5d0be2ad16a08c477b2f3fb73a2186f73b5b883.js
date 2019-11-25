(function() {
  var Api;

  module.exports = Api = (function() {
    function Api(editorRegistry, comboApi, screenShaker, audioPlayer) {
      this.editorRegistry = editorRegistry;
      this.screenShaker = screenShaker;
      this.audioPlayer = audioPlayer;
      this.combo = comboApi;
    }

    Api.prototype.shakeScreen = function(intensity) {
      if (intensity == null) {
        intensity = null;
      }
      return this.screenShaker.shake(this.editorRegistry.getScrollView(), intensity);
    };

    Api.prototype.playAudio = function(audio) {
      return this.audioPlayer.play(audio);
    };

    Api.prototype.getEditor = function() {
      return this.editorRegistry.getEditor();
    };

    Api.prototype.getEditorElement = function() {
      return this.editorRegistry.getEditorElement();
    };

    Api.prototype.getCombo = function() {
      return this.combo;
    };

    return Api;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvam9lbC8uYXRvbS9wYWNrYWdlcy9hY3RpdmF0ZS1wb3dlci1tb2RlL2xpYi9hcGkuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQSxNQUFNLENBQUMsT0FBUCxHQUF1QjtJQUNSLGFBQUMsY0FBRCxFQUFpQixRQUFqQixFQUEyQixZQUEzQixFQUF5QyxXQUF6QztNQUNYLElBQUMsQ0FBQSxjQUFELEdBQWtCO01BQ2xCLElBQUMsQ0FBQSxZQUFELEdBQWdCO01BQ2hCLElBQUMsQ0FBQSxXQUFELEdBQWU7TUFDZixJQUFDLENBQUEsS0FBRCxHQUFTO0lBSkU7O2tCQU1iLFdBQUEsR0FBYSxTQUFDLFNBQUQ7O1FBQUMsWUFBWTs7YUFDeEIsSUFBQyxDQUFBLFlBQVksQ0FBQyxLQUFkLENBQW9CLElBQUMsQ0FBQSxjQUFjLENBQUMsYUFBaEIsQ0FBQSxDQUFwQixFQUFxRCxTQUFyRDtJQURXOztrQkFHYixTQUFBLEdBQVcsU0FBQyxLQUFEO2FBQ1QsSUFBQyxDQUFBLFdBQVcsQ0FBQyxJQUFiLENBQWtCLEtBQWxCO0lBRFM7O2tCQUdYLFNBQUEsR0FBVyxTQUFBO2FBQ1QsSUFBQyxDQUFBLGNBQWMsQ0FBQyxTQUFoQixDQUFBO0lBRFM7O2tCQUdYLGdCQUFBLEdBQWtCLFNBQUE7YUFDaEIsSUFBQyxDQUFBLGNBQWMsQ0FBQyxnQkFBaEIsQ0FBQTtJQURnQjs7a0JBR2xCLFFBQUEsR0FBVSxTQUFBO2FBQ1IsSUFBQyxDQUFBO0lBRE87Ozs7O0FBbkJaIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBBcGlcbiAgY29uc3RydWN0b3I6IChlZGl0b3JSZWdpc3RyeSwgY29tYm9BcGksIHNjcmVlblNoYWtlciwgYXVkaW9QbGF5ZXIpIC0+XG4gICAgQGVkaXRvclJlZ2lzdHJ5ID0gZWRpdG9yUmVnaXN0cnlcbiAgICBAc2NyZWVuU2hha2VyID0gc2NyZWVuU2hha2VyXG4gICAgQGF1ZGlvUGxheWVyID0gYXVkaW9QbGF5ZXJcbiAgICBAY29tYm8gPSBjb21ib0FwaVxuXG4gIHNoYWtlU2NyZWVuOiAoaW50ZW5zaXR5ID0gbnVsbCkgLT5cbiAgICBAc2NyZWVuU2hha2VyLnNoYWtlIEBlZGl0b3JSZWdpc3RyeS5nZXRTY3JvbGxWaWV3KCksIGludGVuc2l0eVxuXG4gIHBsYXlBdWRpbzogKGF1ZGlvKSAtPlxuICAgIEBhdWRpb1BsYXllci5wbGF5KGF1ZGlvKVxuXG4gIGdldEVkaXRvcjogLT5cbiAgICBAZWRpdG9yUmVnaXN0cnkuZ2V0RWRpdG9yKClcblxuICBnZXRFZGl0b3JFbGVtZW50OiAtPlxuICAgIEBlZGl0b3JSZWdpc3RyeS5nZXRFZGl0b3JFbGVtZW50KClcblxuICBnZXRDb21ibzogLT5cbiAgICBAY29tYm9cbiJdfQ==

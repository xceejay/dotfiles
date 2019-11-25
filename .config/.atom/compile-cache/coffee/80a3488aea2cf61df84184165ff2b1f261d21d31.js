(function() {
  var throttle;

  throttle = require("lodash.throttle");

  module.exports = {
    title: 'Play Audio',
    description: 'Plays selected audio on typing.',
    enable: function(api) {
      this.api = api;
      return this.throttledPlayAudio = throttle(this.api.playAudio.bind(this.api), 100, {
        trailing: false
      });
    },
    onInput: function() {
      return this.throttledPlayAudio();
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvam9lbC8uYXRvbS9wYWNrYWdlcy9hY3RpdmF0ZS1wb3dlci1tb2RlL2xpYi9wbHVnaW4vcGxheS1hdWRpby5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsaUJBQVI7O0VBRVgsTUFBTSxDQUFDLE9BQVAsR0FDRTtJQUFBLEtBQUEsRUFBTyxZQUFQO0lBQ0EsV0FBQSxFQUFhLGlDQURiO0lBR0EsTUFBQSxFQUFRLFNBQUMsR0FBRDtNQUNOLElBQUMsQ0FBQSxHQUFELEdBQU87YUFDUCxJQUFDLENBQUEsa0JBQUQsR0FBc0IsUUFBQSxDQUFTLElBQUMsQ0FBQSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQWYsQ0FBb0IsSUFBQyxDQUFBLEdBQXJCLENBQVQsRUFBb0MsR0FBcEMsRUFBeUM7UUFBQSxRQUFBLEVBQVUsS0FBVjtPQUF6QztJQUZoQixDQUhSO0lBT0EsT0FBQSxFQUFTLFNBQUE7YUFDUCxJQUFDLENBQUEsa0JBQUQsQ0FBQTtJQURPLENBUFQ7O0FBSEYiLCJzb3VyY2VzQ29udGVudCI6WyJ0aHJvdHRsZSA9IHJlcXVpcmUgXCJsb2Rhc2gudGhyb3R0bGVcIlxuXG5tb2R1bGUuZXhwb3J0cyA9XG4gIHRpdGxlOiAnUGxheSBBdWRpbydcbiAgZGVzY3JpcHRpb246ICdQbGF5cyBzZWxlY3RlZCBhdWRpbyBvbiB0eXBpbmcuJ1xuXG4gIGVuYWJsZTogKGFwaSkgLT5cbiAgICBAYXBpID0gYXBpXG4gICAgQHRocm90dGxlZFBsYXlBdWRpbyA9IHRocm90dGxlIEBhcGkucGxheUF1ZGlvLmJpbmQoQGFwaSksIDEwMCwgdHJhaWxpbmc6IGZhbHNlXG5cbiAgb25JbnB1dDogLT5cbiAgICBAdGhyb3R0bGVkUGxheUF1ZGlvKClcbiJdfQ==

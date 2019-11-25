(function() {
  var os, path;

  path = require("path");

  os = require("os");

  module.exports = {
    title: 'User File',
    description: 'Based on user-file located on user\'s home',
    handle: function(input, switcher, comboLvl) {
      var error, filePath;
      if (this.error) {
        return;
      }
      if (!this.file) {
        filePath = path.join(os.homedir(), '/user-flow');
        try {
          this.file = require(filePath);
        } catch (error1) {
          error = error1;
          atom.notifications.addWarning("File " + filePath + " couldn't be open.");
          this.error = true;
          return;
        }
      }
      return this.file.handle(input, switcher, comboLvl);
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvam9lbC8uYXRvbS9wYWNrYWdlcy9hY3RpdmF0ZS1wb3dlci1tb2RlL2xpYi9mbG93L3VzZXItZmlsZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUjs7RUFDUCxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVI7O0VBRUwsTUFBTSxDQUFDLE9BQVAsR0FDRTtJQUFBLEtBQUEsRUFBTyxXQUFQO0lBQ0EsV0FBQSxFQUFhLDRDQURiO0lBR0EsTUFBQSxFQUFRLFNBQUMsS0FBRCxFQUFRLFFBQVIsRUFBa0IsUUFBbEI7QUFDTixVQUFBO01BQUEsSUFBVSxJQUFDLENBQUEsS0FBWDtBQUFBLGVBQUE7O01BQ0EsSUFBRyxDQUFJLElBQUMsQ0FBQSxJQUFSO1FBQ0UsUUFBQSxHQUFXLElBQUksQ0FBQyxJQUFMLENBQVUsRUFBRSxDQUFDLE9BQUgsQ0FBQSxDQUFWLEVBQXdCLFlBQXhCO0FBQ1g7VUFDRSxJQUFDLENBQUEsSUFBRCxHQUFRLE9BQUEsQ0FBUSxRQUFSLEVBRFY7U0FBQSxjQUFBO1VBRU07VUFDSixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQW5CLENBQThCLE9BQUEsR0FBUSxRQUFSLEdBQWlCLG9CQUEvQztVQUNBLElBQUMsQ0FBQSxLQUFELEdBQVM7QUFDVCxpQkFMRjtTQUZGOzthQVNBLElBQUMsQ0FBQSxJQUFJLENBQUMsTUFBTixDQUFhLEtBQWIsRUFBb0IsUUFBcEIsRUFBOEIsUUFBOUI7SUFYTSxDQUhSOztBQUpGIiwic291cmNlc0NvbnRlbnQiOlsicGF0aCA9IHJlcXVpcmUgXCJwYXRoXCJcbm9zID0gcmVxdWlyZSBcIm9zXCJcblxubW9kdWxlLmV4cG9ydHMgPVxuICB0aXRsZTogJ1VzZXIgRmlsZSdcbiAgZGVzY3JpcHRpb246ICdCYXNlZCBvbiB1c2VyLWZpbGUgbG9jYXRlZCBvbiB1c2VyXFwncyBob21lJ1xuXG4gIGhhbmRsZTogKGlucHV0LCBzd2l0Y2hlciwgY29tYm9MdmwpIC0+XG4gICAgcmV0dXJuIGlmIEBlcnJvclxuICAgIGlmIG5vdCBAZmlsZVxuICAgICAgZmlsZVBhdGggPSBwYXRoLmpvaW4ob3MuaG9tZWRpcigpLCAnL3VzZXItZmxvdycpXG4gICAgICB0cnlcbiAgICAgICAgQGZpbGUgPSByZXF1aXJlIGZpbGVQYXRoXG4gICAgICBjYXRjaCBlcnJvclxuICAgICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkV2FybmluZyhcIkZpbGUgI3tmaWxlUGF0aH0gY291bGRuJ3QgYmUgb3Blbi5cIilcbiAgICAgICAgQGVycm9yID0gdHJ1ZVxuICAgICAgICByZXR1cm5cblxuICAgIEBmaWxlLmhhbmRsZShpbnB1dCwgc3dpdGNoZXIsIGNvbWJvTHZsKVxuIl19

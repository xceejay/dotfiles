(function() {
  var CompositeDisposable, path;

  CompositeDisposable = require("atom").CompositeDisposable;

  path = require("path");

  module.exports = {
    enabled: false,
    subscriptions: null,
    conf: [],
    init: function() {
      return this.enableSubscription = atom.config.observe('activate-power-mode.playAudio.enabled', (function(_this) {
        return function(value) {
          _this.enabled = value;
          if (_this.enabled) {
            return _this.enable();
          } else {
            return _this.disable();
          }
        };
      })(this));
    },
    destroy: function() {
      this.enableSubscription.dispose();
      return this.disable();
    },
    enable: function() {
      return this.initConfigSubscribers();
    },
    disable: function() {
      var ref;
      return (ref = this.subscriptions) != null ? ref.dispose() : void 0;
    },
    observe: function(key, loadAudio) {
      if (loadAudio == null) {
        loadAudio = true;
      }
      return this.subscriptions.add(atom.config.observe("activate-power-mode.playAudio." + key, (function(_this) {
        return function(value) {
          _this.conf[key] = value;
          if (loadAudio) {
            return _this.loadAudio();
          }
        };
      })(this)));
    },
    initConfigSubscribers: function() {
      this.subscriptions = new CompositeDisposable;
      this.observe('audioclip');
      this.observe('customAudioclip');
      return this.observe('volume', false);
    },
    loadAudio: function() {
      var pathtoaudio;
      if (this.conf['audioclip'] === 'customAudioclip' && this.conf['customAudioclip']) {
        pathtoaudio = this.conf['customAudioclip'];
      } else {
        pathtoaudio = path.join(__dirname + "/..", this.conf['audioclip']);
      }
      return this.audio = new Audio(pathtoaudio);
    },
    play: function(audio) {
      if (!this.enabled) {
        return;
      }
      if (!audio) {
        audio = this.audio;
      }
      audio.currentTime = 0;
      audio.volume = this.conf['volume'];
      return audio.play();
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvam9lbC8uYXRvbS9wYWNrYWdlcy9hY3RpdmF0ZS1wb3dlci1tb2RlL2xpYi9zZXJ2aWNlL2F1ZGlvLXBsYXllci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFDLHNCQUF1QixPQUFBLENBQVEsTUFBUjs7RUFDeEIsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSOztFQUVQLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7SUFBQSxPQUFBLEVBQVMsS0FBVDtJQUNBLGFBQUEsRUFBZSxJQURmO0lBRUEsSUFBQSxFQUFNLEVBRk47SUFJQSxJQUFBLEVBQU0sU0FBQTthQUNKLElBQUMsQ0FBQSxrQkFBRCxHQUFzQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQVosQ0FDcEIsdUNBRG9CLEVBQ3FCLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQyxLQUFEO1VBQ3ZDLEtBQUMsQ0FBQSxPQUFELEdBQVc7VUFDWCxJQUFHLEtBQUMsQ0FBQSxPQUFKO21CQUNFLEtBQUMsQ0FBQSxNQUFELENBQUEsRUFERjtXQUFBLE1BQUE7bUJBR0UsS0FBQyxDQUFBLE9BQUQsQ0FBQSxFQUhGOztRQUZ1QztNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FEckI7SUFEbEIsQ0FKTjtJQWNBLE9BQUEsRUFBUyxTQUFBO01BQ1AsSUFBQyxDQUFBLGtCQUFrQixDQUFDLE9BQXBCLENBQUE7YUFDQSxJQUFDLENBQUEsT0FBRCxDQUFBO0lBRk8sQ0FkVDtJQWtCQSxNQUFBLEVBQVEsU0FBQTthQUNOLElBQUMsQ0FBQSxxQkFBRCxDQUFBO0lBRE0sQ0FsQlI7SUFxQkEsT0FBQSxFQUFTLFNBQUE7QUFDUCxVQUFBO3FEQUFjLENBQUUsT0FBaEIsQ0FBQTtJQURPLENBckJUO0lBd0JBLE9BQUEsRUFBUyxTQUFDLEdBQUQsRUFBTSxTQUFOOztRQUFNLFlBQVk7O2FBQ3pCLElBQUMsQ0FBQSxhQUFhLENBQUMsR0FBZixDQUFtQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQVosQ0FDakIsZ0NBQUEsR0FBaUMsR0FEaEIsRUFDdUIsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFDLEtBQUQ7VUFDdEMsS0FBQyxDQUFBLElBQUssQ0FBQSxHQUFBLENBQU4sR0FBYTtVQUNiLElBQWdCLFNBQWhCO21CQUFBLEtBQUMsQ0FBQSxTQUFELENBQUEsRUFBQTs7UUFGc0M7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBRHZCLENBQW5CO0lBRE8sQ0F4QlQ7SUErQkEscUJBQUEsRUFBdUIsU0FBQTtNQUNyQixJQUFDLENBQUEsYUFBRCxHQUFpQixJQUFJO01BQ3JCLElBQUMsQ0FBQSxPQUFELENBQVMsV0FBVDtNQUNBLElBQUMsQ0FBQSxPQUFELENBQVMsaUJBQVQ7YUFDQSxJQUFDLENBQUEsT0FBRCxDQUFTLFFBQVQsRUFBbUIsS0FBbkI7SUFKcUIsQ0EvQnZCO0lBcUNBLFNBQUEsRUFBVyxTQUFBO0FBQ1QsVUFBQTtNQUFBLElBQUcsSUFBQyxDQUFBLElBQUssQ0FBQSxXQUFBLENBQU4sS0FBc0IsaUJBQXRCLElBQTRDLElBQUMsQ0FBQSxJQUFLLENBQUEsaUJBQUEsQ0FBckQ7UUFDRSxXQUFBLEdBQWMsSUFBQyxDQUFBLElBQUssQ0FBQSxpQkFBQSxFQUR0QjtPQUFBLE1BQUE7UUFHRSxXQUFBLEdBQWMsSUFBSSxDQUFDLElBQUwsQ0FBYSxTQUFELEdBQVcsS0FBdkIsRUFBNkIsSUFBQyxDQUFBLElBQUssQ0FBQSxXQUFBLENBQW5DLEVBSGhCOzthQUlBLElBQUMsQ0FBQSxLQUFELEdBQVMsSUFBSSxLQUFKLENBQVUsV0FBVjtJQUxBLENBckNYO0lBNENBLElBQUEsRUFBTSxTQUFDLEtBQUQ7TUFDSixJQUFVLENBQUksSUFBQyxDQUFBLE9BQWY7QUFBQSxlQUFBOztNQUVBLElBQWtCLENBQUksS0FBdEI7UUFBQSxLQUFBLEdBQVEsSUFBQyxDQUFBLE1BQVQ7O01BQ0EsS0FBSyxDQUFDLFdBQU4sR0FBb0I7TUFDcEIsS0FBSyxDQUFDLE1BQU4sR0FBZSxJQUFDLENBQUEsSUFBSyxDQUFBLFFBQUE7YUFDckIsS0FBSyxDQUFDLElBQU4sQ0FBQTtJQU5JLENBNUNOOztBQUpGIiwic291cmNlc0NvbnRlbnQiOlsie0NvbXBvc2l0ZURpc3Bvc2FibGV9ID0gcmVxdWlyZSBcImF0b21cIlxucGF0aCA9IHJlcXVpcmUgXCJwYXRoXCJcblxubW9kdWxlLmV4cG9ydHMgPVxuICBlbmFibGVkOiBmYWxzZVxuICBzdWJzY3JpcHRpb25zOiBudWxsXG4gIGNvbmY6IFtdXG5cbiAgaW5pdDogLT5cbiAgICBAZW5hYmxlU3Vic2NyaXB0aW9uID0gYXRvbS5jb25maWcub2JzZXJ2ZShcbiAgICAgICdhY3RpdmF0ZS1wb3dlci1tb2RlLnBsYXlBdWRpby5lbmFibGVkJywgKHZhbHVlKSA9PlxuICAgICAgICBAZW5hYmxlZCA9IHZhbHVlXG4gICAgICAgIGlmIEBlbmFibGVkXG4gICAgICAgICAgQGVuYWJsZSgpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBAZGlzYWJsZSgpXG4gICAgKVxuXG4gIGRlc3Ryb3k6IC0+XG4gICAgQGVuYWJsZVN1YnNjcmlwdGlvbi5kaXNwb3NlKClcbiAgICBAZGlzYWJsZSgpXG5cbiAgZW5hYmxlOiAtPlxuICAgIEBpbml0Q29uZmlnU3Vic2NyaWJlcnMoKVxuXG4gIGRpc2FibGU6IC0+XG4gICAgQHN1YnNjcmlwdGlvbnM/LmRpc3Bvc2UoKVxuXG4gIG9ic2VydmU6IChrZXksIGxvYWRBdWRpbyA9IHRydWUpIC0+XG4gICAgQHN1YnNjcmlwdGlvbnMuYWRkIGF0b20uY29uZmlnLm9ic2VydmUoXG4gICAgICBcImFjdGl2YXRlLXBvd2VyLW1vZGUucGxheUF1ZGlvLiN7a2V5fVwiLCAodmFsdWUpID0+XG4gICAgICAgIEBjb25mW2tleV0gPSB2YWx1ZVxuICAgICAgICBAbG9hZEF1ZGlvKCkgaWYgbG9hZEF1ZGlvXG4gICAgKVxuXG4gIGluaXRDb25maWdTdWJzY3JpYmVyczogLT5cbiAgICBAc3Vic2NyaXB0aW9ucyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlXG4gICAgQG9ic2VydmUgJ2F1ZGlvY2xpcCdcbiAgICBAb2JzZXJ2ZSAnY3VzdG9tQXVkaW9jbGlwJ1xuICAgIEBvYnNlcnZlICd2b2x1bWUnLCBmYWxzZVxuXG4gIGxvYWRBdWRpbzogLT5cbiAgICBpZiBAY29uZlsnYXVkaW9jbGlwJ10gaXMgJ2N1c3RvbUF1ZGlvY2xpcCcgYW5kIEBjb25mWydjdXN0b21BdWRpb2NsaXAnXVxuICAgICAgcGF0aHRvYXVkaW8gPSBAY29uZlsnY3VzdG9tQXVkaW9jbGlwJ11cbiAgICBlbHNlXG4gICAgICBwYXRodG9hdWRpbyA9IHBhdGguam9pbihcIiN7X19kaXJuYW1lfS8uLlwiLCBAY29uZlsnYXVkaW9jbGlwJ10pXG4gICAgQGF1ZGlvID0gbmV3IEF1ZGlvKHBhdGh0b2F1ZGlvKVxuXG4gIHBsYXk6IChhdWRpbykgLT5cbiAgICByZXR1cm4gaWYgbm90IEBlbmFibGVkXG5cbiAgICBhdWRpbyA9IEBhdWRpbyBpZiBub3QgYXVkaW9cbiAgICBhdWRpby5jdXJyZW50VGltZSA9IDBcbiAgICBhdWRpby52b2x1bWUgPSBAY29uZlsndm9sdW1lJ11cbiAgICBhdWRpby5wbGF5KClcbiJdfQ==

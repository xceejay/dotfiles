(function() {
  var CompositeDisposable, debounce, sample;

  CompositeDisposable = require("atom").CompositeDisposable;

  debounce = require("lodash.debounce");

  sample = require("lodash.sample");

  module.exports = {
    subscriptions: null,
    conf: [],
    isEnable: false,
    currentStreak: 0,
    level: 0,
    maxStreakReached: false,
    setPluginManager: function(pluginManager) {
      return this.pluginManager = pluginManager;
    },
    observe: function(key) {
      return this.subscriptions.add(atom.config.observe("activate-power-mode.comboMode." + key, (function(_this) {
        return function(value) {
          return _this.conf[key] = value;
        };
      })(this)));
    },
    enable: function() {
      this.isEnable = true;
      return this.initConfigSubscribers();
    },
    initConfigSubscribers: function() {
      this.subscriptions = new CompositeDisposable;
      this.observe('exclamationEvery');
      this.observe('activationThreshold');
      this.observe('exclamationTexts');
      this.observe('multiplier');
      return this.subscriptions.add(atom.commands.add("atom-workspace", {
        "activate-power-mode:reset-max-combo": (function(_this) {
          return function() {
            return _this.resetMaxStreak();
          };
        })(this)
      }));
    },
    reset: function() {
      var ref, ref1;
      return (ref = this.container) != null ? (ref1 = ref.parentNode) != null ? ref1.removeChild(this.container) : void 0 : void 0;
    },
    destroy: function() {
      var ref, ref1, ref2, ref3;
      this.isEnable = false;
      this.reset();
      if ((ref = this.subscriptions) != null) {
        ref.dispose();
      }
      this.container = null;
      if ((ref1 = this.debouncedEndStreak) != null) {
        ref1.cancel();
      }
      this.debouncedEndStreak = null;
      if ((ref2 = this.streakTimeoutObserver) != null) {
        ref2.dispose();
      }
      if ((ref3 = this.opacityObserver) != null) {
        ref3.dispose();
      }
      this.currentStreak = 0;
      this.level = 0;
      return this.maxStreakReached = false;
    },
    createElement: function(name, parent) {
      this.element = document.createElement("div");
      this.element.classList.add(name);
      if (parent) {
        parent.appendChild(this.element);
      }
      return this.element;
    },
    setup: function(editorElement) {
      var leftTimeout, ref, ref1;
      if (!this.container) {
        this.maxStreak = this.getMaxStreak();
        this.container = this.createElement("streak-container");
        this.container.classList.add("combo-zero");
        this.title = this.createElement("title", this.container);
        this.title.textContent = "Combo";
        this.max = this.createElement("max", this.container);
        this.max.textContent = "Max " + this.maxStreak;
        this.counter = this.createElement("counter", this.container);
        this.bar = this.createElement("bar", this.container);
        this.exclamations = this.createElement("exclamations", this.container);
        if ((ref = this.streakTimeoutObserver) != null) {
          ref.dispose();
        }
        this.streakTimeoutObserver = atom.config.observe('activate-power-mode.comboMode.streakTimeout', (function(_this) {
          return function(value) {
            var ref1;
            _this.streakTimeout = value * 1000;
            _this.endStreak();
            if ((ref1 = _this.debouncedEndStreak) != null) {
              ref1.cancel();
            }
            return _this.debouncedEndStreak = debounce(_this.endStreak.bind(_this), _this.streakTimeout);
          };
        })(this));
        if ((ref1 = this.opacityObserver) != null) {
          ref1.dispose();
        }
        this.opacityObserver = atom.config.observe('activate-power-mode.comboMode.opacity', (function(_this) {
          return function(value) {
            var ref2;
            return (ref2 = _this.container) != null ? ref2.style.opacity = value : void 0;
          };
        })(this));
      }
      this.exclamations.innerHTML = '';
      editorElement.querySelector(".scroll-view").appendChild(this.container);
      if (this.currentStreak) {
        leftTimeout = this.streakTimeout - (performance.now() - this.lastStreak);
        this.refreshStreakBar(leftTimeout);
      }
      return this.renderStreak();
    },
    resetCounter: function() {
      if (this.currentStreak === 0) {
        return;
      }
      this.showExclamation("" + (-this.currentStreak), 'down', false);
      return this.endStreak();
    },
    modifyStreak: function(n) {
      var oldStreak;
      if (this.currentStreak === 0 && n < 0) {
        return;
      }
      this.lastStreak = performance.now();
      this.debouncedEndStreak();
      if (n > 0 && this.conf['multiplier']) {
        n = n * (this.level + 1);
      }
      oldStreak = this.currentStreak;
      this.currentStreak += n;
      if (this.currentStreak < 0) {
        this.currentStreak = 0;
      }
      if (n > 0) {
        this.streakIncreased(n);
      }
      if (n < 0) {
        this.streakDecreased(n);
      }
      if (this.currentStreak === 0) {
        this.endStreak();
      } else {
        this.refreshStreakBar();
      }
      this.renderStreak();
      if (oldStreak === 0 && n > 0) {
        return this.pluginManager.runOnComboStartStreak();
      }
    },
    streakIncreased: function(n) {
      var mod, ref;
      this.container.classList.remove("combo-zero");
      if (this.currentStreak > this.maxStreak) {
        this.increaseMaxStreak();
      }
      if (this.checkLevel()) {
        return;
      }
      if (this.conf['exclamationEvery'] > 0) {
        mod = this.currentStreak % this.conf['exclamationEvery'];
        if (mod === 0 || ((this.currentStreak - n < (ref = this.currentStreak - mod) && ref < this.currentStreak))) {
          return this.showExclamation();
        }
      }
      return this.showExclamation("+" + n, 'up', false);
    },
    streakDecreased: function(n) {
      this.showExclamation("" + n, 'down', false);
      this.checkLevel();
      if (this.currentStreak === 0) {
        return this.container.classList.add("combo-zero");
      }
    },
    checkLevel: function() {
      var i, j, len, level, ref, threshold;
      level = 0;
      ref = this.conf['activationThreshold'];
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        threshold = ref[i];
        if (this.currentStreak < threshold) {
          break;
        }
        level++;
      }
      if (level !== this.level) {
        this.container.classList.remove("level-" + this.level);
        this.container.classList.add("level-" + level);
        if (this.conf['multiplier']) {
          this.showExclamation((level + 1) + "x", 'level', false);
        }
        this.pluginManager.runOnComboLevelChange(level, this.level);
        this.level = level;
        return true;
      }
    },
    getLevel: function() {
      return this.level;
    },
    getCurrentStreak: function() {
      return this.currentStreak;
    },
    endStreak: function() {
      this.currentStreak = 0;
      this.maxStreakReached = false;
      this.container.classList.add("combo-zero");
      this.container.classList.remove("level-" + this.level);
      this.level = 0;
      this.container.classList.add("level-" + this.level);
      this.renderStreak();
      this.refreshStreakBar(0);
      return this.pluginManager.runOnComboEndStreak();
    },
    renderStreak: function() {
      this.counter.textContent = this.currentStreak;
      this.counter.classList.remove("bump");
      return setTimeout((function(_this) {
        return function() {
          return _this.counter.classList.add("bump");
        };
      })(this), 26);
    },
    refreshStreakBar: function(leftTimeout) {
      var scale;
      if (leftTimeout == null) {
        leftTimeout = this.streakTimeout;
      }
      scale = leftTimeout / this.streakTimeout;
      this.bar.style.transition = "none";
      this.bar.style.transform = "scaleX(" + scale + ")";
      return setTimeout((function(_this) {
        return function() {
          _this.bar.style.transform = "";
          return _this.bar.style.transition = "transform " + leftTimeout + "ms linear";
        };
      })(this), 100);
    },
    showExclamation: function(text, type, trigger) {
      var exclamation;
      if (text == null) {
        text = null;
      }
      if (type == null) {
        type = 'message';
      }
      if (trigger == null) {
        trigger = true;
      }
      exclamation = document.createElement("span");
      exclamation.classList.add("exclamation");
      exclamation.classList.add(type);
      if (text === null) {
        text = sample(this.conf['exclamationTexts']);
      }
      exclamation.textContent = text;
      this.exclamations.appendChild(exclamation);
      setTimeout((function(_this) {
        return function() {
          if (exclamation.parentNode === _this.exclamations) {
            return _this.exclamations.removeChild(exclamation);
          }
        };
      })(this), 2000);
      if (trigger) {
        return this.pluginManager.runOnComboExclamation(text);
      }
    },
    getMaxStreak: function() {
      var maxStreak;
      maxStreak = localStorage.getItem("activate-power-mode.maxStreak");
      if (maxStreak === null) {
        maxStreak = 0;
      }
      return maxStreak;
    },
    increaseMaxStreak: function() {
      localStorage.setItem("activate-power-mode.maxStreak", this.currentStreak);
      this.maxStreak = this.currentStreak;
      this.max.textContent = "Max " + this.maxStreak;
      if (this.maxStreakReached === false) {
        this.showExclamation("NEW MAX!!!", 'max-combo', false);
        this.pluginManager.runOnComboMaxStreak(this.maxStreak);
      }
      return this.maxStreakReached = true;
    },
    resetMaxStreak: function() {
      localStorage.setItem("activate-power-mode.maxStreak", 0);
      this.maxStreakReached = false;
      this.maxStreak = 0;
      if (this.max) {
        return this.max.textContent = "Max 0";
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvam9lbC8uYXRvbS9wYWNrYWdlcy9hY3RpdmF0ZS1wb3dlci1tb2RlL2xpYi9jb21iby1yZW5kZXJlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFDLHNCQUF1QixPQUFBLENBQVEsTUFBUjs7RUFDeEIsUUFBQSxHQUFXLE9BQUEsQ0FBUSxpQkFBUjs7RUFDWCxNQUFBLEdBQVMsT0FBQSxDQUFRLGVBQVI7O0VBRVQsTUFBTSxDQUFDLE9BQVAsR0FDRTtJQUFBLGFBQUEsRUFBZSxJQUFmO0lBQ0EsSUFBQSxFQUFNLEVBRE47SUFFQSxRQUFBLEVBQVUsS0FGVjtJQUdBLGFBQUEsRUFBZSxDQUhmO0lBSUEsS0FBQSxFQUFPLENBSlA7SUFLQSxnQkFBQSxFQUFrQixLQUxsQjtJQU9BLGdCQUFBLEVBQWtCLFNBQUMsYUFBRDthQUNoQixJQUFDLENBQUEsYUFBRCxHQUFpQjtJQURELENBUGxCO0lBVUEsT0FBQSxFQUFTLFNBQUMsR0FBRDthQUNQLElBQUMsQ0FBQSxhQUFhLENBQUMsR0FBZixDQUFtQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQVosQ0FDakIsZ0NBQUEsR0FBaUMsR0FEaEIsRUFDdUIsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFDLEtBQUQ7aUJBQ3RDLEtBQUMsQ0FBQSxJQUFLLENBQUEsR0FBQSxDQUFOLEdBQWE7UUFEeUI7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBRHZCLENBQW5CO0lBRE8sQ0FWVDtJQWdCQSxNQUFBLEVBQVEsU0FBQTtNQUNOLElBQUMsQ0FBQSxRQUFELEdBQVk7YUFDWixJQUFDLENBQUEscUJBQUQsQ0FBQTtJQUZNLENBaEJSO0lBb0JBLHFCQUFBLEVBQXVCLFNBQUE7TUFDckIsSUFBQyxDQUFBLGFBQUQsR0FBaUIsSUFBSTtNQUNyQixJQUFDLENBQUEsT0FBRCxDQUFTLGtCQUFUO01BQ0EsSUFBQyxDQUFBLE9BQUQs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LCtCQUFyQixFQUFzRCxDQUF0RDtNQUNBLElBQUMsQ0FBQSxnQkFBRCxHQUFvQjtNQUNwQixJQUFDLENBQUEsU0FBRCxHQUFhO01BQ2IsSUFBRyxJQUFDLENBQUEsR0FBSjtlQUNFLElBQUMsQ0FBQSxHQUFHLENBQUMsV0FBTCxHQUFtQixRQURyQjs7SUFKYyxDQXhOaEI7O0FBTEYiLCJzb3VyY2VzQ29udGVudCI6WyJ7Q29tcG9zaXRlRGlzcG9zYWJsZX0gPSByZXF1aXJlIFwiYXRvbVwiXG5kZWJvdW5jZSA9IHJlcXVpcmUgXCJsb2Rhc2guZGVib3VuY2VcIlxuc2FtcGxlID0gcmVxdWlyZSBcImxvZGFzaC5zYW1wbGVcIlxuXG5tb2R1bGUuZXhwb3J0cyA9XG4gIHN1YnNjcmlwdGlvbnM6IG51bGxcbiAgY29uZjogW11cbiAgaXNFbmFibGU6IGZhbHNlXG4gIGN1cnJlbnRTdHJlYWs6IDBcbiAgbGV2ZWw6IDBcbiAgbWF4U3RyZWFrUmVhY2hlZDogZmFsc2VcblxuICBzZXRQbHVnaW5NYW5hZ2VyOiAocGx1Z2luTWFuYWdlcikgLT5cbiAgICBAcGx1Z2luTWFuYWdlciA9IHBsdWdpbk1hbmFnZXJcblxuICBvYnNlcnZlOiAoa2V5KSAtPlxuICAgIEBzdWJzY3JpcHRpb25zLmFkZCBhdG9tLmNvbmZpZy5vYnNlcnZlKFxuICAgICAgXCJhY3RpdmF0ZS1wb3dlci1tb2RlLmNvbWJvTW9kZS4je2tleX1cIiwgKHZhbHVlKSA9PlxuICAgICAgICBAY29uZltrZXldID0gdmFsdWVcbiAgICApXG5cbiAgZW5hYmxlOiAtPlxuICAgIEBpc0VuYWJsZSA9IHRydWVcbiAgICBAaW5pdENvbmZpZ1N1YnNjcmliZXJzKClcblxuICBpbml0Q29uZmlnU3Vic2NyaWJlcnM6IC0+XG4gICAgQHN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZVxuICAgIEBvYnNlcnZlICdleGNsYW1hdGlvbkV2ZXJ5J1xuICAgIEBvYnNlcnZlICdhY3RpdmF0aW9uVGhyZXNob2xkJ1xuICAgIEBvYnNlcnZlICdleGNsYW1hdGlvblRleHRzJ1xuICAgIEBvYnNlcnZlICdtdWx0aXBsaWVyJ1xuICAgIEBzdWJzY3JpcHRpb25zLmFkZCBhdG9tLmNvbW1hbmRzLmFkZCBcImF0b20td29ya3NwYWNlXCIsXG4gICAgICBcImFjdGl2YXRlLXBvd2VyLW1vZGU6cmVzZXQtbWF4LWNvbWJvXCI6ID0+IEByZXNldE1heFN0cmVhaygpXG5cbiAgcmVzZXQ6IC0+XG4gICAgQGNvbnRhaW5lcj8ucGFyZW50Tm9kZT8ucmVtb3ZlQ2hpbGQgQGNvbnRhaW5lclxuXG4gIGRlc3Ryb3k6IC0+XG4gICAgQGlzRW5hYmxlID0gZmFsc2VcbiAgICBAcmVzZXQoKVxuICAgIEBzdWJzY3JpcHRpb25zPy5kaXNwb3NlKClcbiAgICBAY29udGFpbmVyID0gbnVsbFxuICAgIEBkZWJvdW5jZWRFbmRTdHJlYWs/LmNhbmNlbCgpXG4gICAgQGRlYm91bmNlZEVuZFN0cmVhayA9IG51bGxcbiAgICBAc3RyZWFrVGltZW91dE9ic2VydmVyPy5kaXNwb3NlKClcbiAgICBAb3BhY2l0eU9ic2VydmVyPy5kaXNwb3NlKClcbiAgICBAY3VycmVudFN0cmVhayA9IDBcbiAgICBAbGV2ZWwgPSAwXG4gICAgQG1heFN0cmVha1JlYWNoZWQgPSBmYWxzZVxuXG4gIGNyZWF0ZUVsZW1lbnQ6IChuYW1lLCBwYXJlbnQpLT5cbiAgICBAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJkaXZcIlxuICAgIEBlbGVtZW50LmNsYXNzTGlzdC5hZGQgbmFtZVxuICAgIHBhcmVudC5hcHBlbmRDaGlsZCBAZWxlbWVudCBpZiBwYXJlbnRcbiAgICBAZWxlbWVudFxuXG4gIHNldHVwOiAoZWRpdG9yRWxlbWVudCkgLT5cbiAgICBpZiBub3QgQGNvbnRhaW5lclxuICAgICAgQG1heFN0cmVhayA9IEBnZXRNYXhTdHJlYWsoKVxuICAgICAgQGNvbnRhaW5lciA9IEBjcmVhdGVFbGVtZW50IFwic3RyZWFrLWNvbnRhaW5lclwiXG4gICAgICBAY29udGFpbmVyLmNsYXNzTGlzdC5hZGQgXCJjb21iby16ZXJvXCJcbiAgICAgIEB0aXRsZSA9IEBjcmVhdGVFbGVtZW50IFwidGl0bGVcIiwgQGNvbnRhaW5lclxuICAgICAgQHRpdGxlLnRleHRDb250ZW50ID0gXCJDb21ib1wiXG4gICAgICBAbWF4ID0gQGNyZWF0ZUVsZW1lbnQgXCJtYXhcIiwgQGNvbnRhaW5lclxuICAgICAgQG1heC50ZXh0Q29udGVudCA9IFwiTWF4ICN7QG1heFN0cmVha31cIlxuICAgICAgQGNvdW50ZXIgPSBAY3JlYXRlRWxlbWVudCBcImNvdW50ZXJcIiwgQGNvbnRhaW5lclxuICAgICAgQGJhciA9IEBjcmVhdGVFbGVtZW50IFwiYmFyXCIsIEBjb250YWluZXJcbiAgICAgIEBleGNsYW1hdGlvbnMgPSBAY3JlYXRlRWxlbWVudCBcImV4Y2xhbWF0aW9uc1wiLCBAY29udGFpbmVyXG5cbiAgICAgIEBzdHJlYWtUaW1lb3V0T2JzZXJ2ZXI/LmRpc3Bvc2UoKVxuICAgICAgQHN0cmVha1RpbWVvdXRPYnNlcnZlciA9IGF0b20uY29uZmlnLm9ic2VydmUgJ2FjdGl2YXRlLXBvd2VyLW1vZGUuY29tYm9Nb2RlLnN0cmVha1RpbWVvdXQnLCAodmFsdWUpID0+XG4gICAgICAgIEBzdHJlYWtUaW1lb3V0ID0gdmFsdWUgKiAxMDAwXG4gICAgICAgIEBlbmRTdHJlYWsoKVxuICAgICAgICBAZGVib3VuY2VkRW5kU3RyZWFrPy5jYW5jZWwoKVxuICAgICAgICBAZGVib3VuY2VkRW5kU3RyZWFrID0gZGVib3VuY2UgQGVuZFN0cmVhay5iaW5kKHRoaXMpLCBAc3RyZWFrVGltZW91dFxuXG4gICAgICBAb3BhY2l0eU9ic2VydmVyPy5kaXNwb3NlKClcbiAgICAgIEBvcGFjaXR5T2JzZXJ2ZXIgPSBhdG9tLmNvbmZpZy5vYnNlcnZlICdhY3RpdmF0ZS1wb3dlci1tb2RlLmNvbWJvTW9kZS5vcGFjaXR5JywgKHZhbHVlKSA9PlxuICAgICAgICBAY29udGFpbmVyPy5zdHlsZS5vcGFjaXR5ID0gdmFsdWVcblxuICAgIEBleGNsYW1hdGlvbnMuaW5uZXJIVE1MID0gJydcblxuICAgIGVkaXRvckVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5zY3JvbGwtdmlld1wiKS5hcHBlbmRDaGlsZCBAY29udGFpbmVyXG5cbiAgICBpZiBAY3VycmVudFN0cmVha1xuICAgICAgbGVmdFRpbWVvdXQgPSBAc3RyZWFrVGltZW91dCAtIChwZXJmb3JtYW5jZS5ub3coKSAtIEBsYXN0U3RyZWFrKVxuICAgICAgQHJlZnJlc2hTdHJlYWtCYXIgbGVmdFRpbWVvdXRcblxuICAgIEByZW5kZXJTdHJlYWsoKVxuXG4gIHJlc2V0Q291bnRlcjogLT5cbiAgICByZXR1cm4gaWYgQGN1cnJlbnRTdHJlYWsgaXMgMFxuXG5cbiAgICBAc2hvd0V4Y2xhbWF0aW9uIFwiI3stQGN1cnJlbnRTdHJlYWt9XCIsICdkb3duJywgZmFsc2VcbiAgICBAZW5kU3RyZWFrKClcblxuICBtb2RpZnlTdHJlYWs6IChuKSAtPlxuICAgIHJldHVybiBpZiBAY3VycmVudFN0cmVhayBpcyAwIGFuZCBuIDwgMFxuXG4gICAgQGxhc3RTdHJlYWsgPSBwZXJmb3JtYW5jZS5ub3coKVxuICAgIEBkZWJvdW5jZWRFbmRTdHJlYWsoKVxuXG4gICAgbiA9IG4gKiAoQGxldmVsICsgMSkgaWYgbiA+IDAgYW5kIEBjb25mWydtdWx0aXBsaWVyJ11cblxuICAgIG9sZFN0cmVhayA9IEBjdXJyZW50U3RyZWFrXG4gICAgQGN1cnJlbnRTdHJlYWsgKz0gblxuICAgIEBjdXJyZW50U3RyZWFrID0gMCBpZiBAY3VycmVudFN0cmVhayA8IDBcblxuICAgIEBzdHJlYWtJbmNyZWFzZWQgbiBpZiBuID4gMFxuICAgIEBzdHJlYWtEZWNyZWFzZWQgbiBpZiBuIDwgMFxuXG4gICAgaWYgQGN1cnJlbnRTdHJlYWsgaXMgMFxuICAgICAgQGVuZFN0cmVhaygpXG4gICAgZWxzZVxuICAgICAgQHJlZnJlc2hTdHJlYWtCYXIoKVxuICAgIEByZW5kZXJTdHJlYWsoKVxuXG4gICAgaWYgb2xkU3RyZWFrIGlzIDAgYW5kIG4gPiAwXG4gICAgICBAcGx1Z2luTWFuYWdlci5ydW5PbkNvbWJvU3RhcnRTdHJlYWsoKVxuXG4gIHN0cmVha0luY3JlYXNlZDogKG4pIC0+XG4gICAgQGNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlIFwiY29tYm8temVyb1wiXG4gICAgaWYgQGN1cnJlbnRTdHJlYWsgPiBAbWF4U3RyZWFrXG4gICAgICBAaW5jcmVhc2VNYXhTdHJlYWsoKVxuXG4gICAgcmV0dXJuIGlmIEBjaGVja0xldmVsKClcblxuICAgIGlmIEBjb25mWydleGNsYW1hdGlvbkV2ZXJ5J10gPiAwXG4gICAgICBtb2QgPSBAY3VycmVudFN0cmVhayAlIEBjb25mWydleGNsYW1hdGlvbkV2ZXJ5J11cbiAgICAgIGlmIG1vZCBpcyAwIG9yIChAY3VycmVudFN0cmVhayAtIG4gPCBAY3VycmVudFN0cmVhayAtIG1vZCA8IEBjdXJyZW50U3RyZWFrKVxuICAgICAgICByZXR1cm4gQHNob3dFeGNsYW1hdGlvbigpXG5cbiAgICBAc2hvd0V4Y2xhbWF0aW9uIFwiKyN7bn1cIiwgJ3VwJywgZmFsc2VcblxuICBzdHJlYWtEZWNyZWFzZWQ6IChuKSAtPlxuICAgIEBzaG93RXhjbGFtYXRpb24gXCIje259XCIsICdkb3duJywgZmFsc2VcblxuICAgIEBjaGVja0xldmVsKClcbiAgICBpZiBAY3VycmVudFN0cmVhayA9PSAwXG4gICAgICBAY29udGFpbmVyLmNsYXNzTGlzdC5hZGQgXCJjb21iby16ZXJvXCJcblxuICBjaGVja0xldmVsOiAtPlxuICAgIGxldmVsID0gMFxuICAgIGZvciB0aHJlc2hvbGQsIGkgaW4gQGNvbmZbJ2FjdGl2YXRpb25UaHJlc2hvbGQnXVxuICAgICAgYnJlYWsgaWYgQGN1cnJlbnRTdHJlYWsgPCB0aHJlc2hvbGRcbiAgICAgIGxldmVsKytcblxuICAgIGlmIGxldmVsICE9IEBsZXZlbFxuICAgICAgQGNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlIFwibGV2ZWwtI3tAbGV2ZWx9XCJcbiAgICAgIEBjb250YWluZXIuY2xhc3NMaXN0LmFkZCBcImxldmVsLSN7bGV2ZWx9XCJcbiAgICAgIEBzaG93RXhjbGFtYXRpb24gXCIje2xldmVsKzF9eFwiLCAnbGV2ZWwnLCBmYWxzZSBpZiBAY29uZlsnbXVsdGlwbGllciddXG4gICAgICBAcGx1Z2luTWFuYWdlci5ydW5PbkNvbWJvTGV2ZWxDaGFuZ2UobGV2ZWwsIEBsZXZlbClcbiAgICAgIEBsZXZlbCA9IGxldmVsXG4gICAgICByZXR1cm4gdHJ1ZVxuXG4gIGdldExldmVsOiAtPlxuICAgIEBsZXZlbFxuXG4gIGdldEN1cnJlbnRTdHJlYWs6IC0+XG4gICAgQGN1cnJlbnRTdHJlYWtcblxuICBlbmRTdHJlYWs6IC0+XG4gICAgQGN1cnJlbnRTdHJlYWsgPSAwXG4gICAgQG1heFN0cmVha1JlYWNoZWQgPSBmYWxzZVxuICAgIEBjb250YWluZXIuY2xhc3NMaXN0LmFkZCBcImNvbWJvLXplcm9cIlxuICAgIEBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSBcImxldmVsLSN7QGxldmVsfVwiXG4gICAgQGxldmVsID0gMFxuICAgIEBjb250YWluZXIuY2xhc3NMaXN0LmFkZCBcImxldmVsLSN7QGxldmVsfVwiXG4gICAgQHJlbmRlclN0cmVhaygpXG4gICAgQHJlZnJlc2hTdHJlYWtCYXIoMClcbiAgICBAcGx1Z2luTWFuYWdlci5ydW5PbkNvbWJvRW5kU3RyZWFrKClcblxuICByZW5kZXJTdHJlYWs6IC0+XG4gICAgQGNvdW50ZXIudGV4dENvbnRlbnQgPSBAY3VycmVudFN0cmVha1xuICAgIEBjb3VudGVyLmNsYXNzTGlzdC5yZW1vdmUgXCJidW1wXCJcblxuICAgIHNldFRpbWVvdXQgPT5cbiAgICAgIEBjb3VudGVyLmNsYXNzTGlzdC5hZGQgXCJidW1wXCJcbiAgICAsIDI2XG5cbiAgcmVmcmVzaFN0cmVha0JhcjogKGxlZnRUaW1lb3V0ID0gQHN0cmVha1RpbWVvdXQpIC0+XG4gICAgc2NhbGUgPSBsZWZ0VGltZW91dCAvIEBzdHJlYWtUaW1lb3V0XG4gICAgQGJhci5zdHlsZS50cmFuc2l0aW9uID0gXCJub25lXCJcbiAgICBAYmFyLnN0eWxlLnRyYW5zZm9ybSA9IFwic2NhbGVYKCN7c2NhbGV9KVwiXG5cbiAgICBzZXRUaW1lb3V0ID0+XG4gICAgICBAYmFyLnN0eWxlLnRyYW5zZm9ybSA9IFwiXCJcbiAgICAgIEBiYXIuc3R5bGUudHJhbnNpdGlvbiA9IFwidHJhbnNmb3JtICN7bGVmdFRpbWVvdXR9bXMgbGluZWFyXCJcbiAgICAsIDEwMFxuXG4gIHNob3dFeGNsYW1hdGlvbjogKHRleHQgPSBudWxsLCB0eXBlID0gJ21lc3NhZ2UnLCB0cmlnZ2VyID0gdHJ1ZSkgLT5cbiAgICBleGNsYW1hdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJzcGFuXCJcbiAgICBleGNsYW1hdGlvbi5jbGFzc0xpc3QuYWRkIFwiZXhjbGFtYXRpb25cIlxuICAgIGV4Y2xhbWF0aW9uLmNsYXNzTGlzdC5hZGQgdHlwZVxuICAgIHRleHQgPSBzYW1wbGUgQGNvbmZbJ2V4Y2xhbWF0aW9uVGV4dHMnXSBpZiB0ZXh0IGlzIG51bGxcbiAgICBleGNsYW1hdGlvbi50ZXh0Q29udGVudCA9IHRleHRcblxuICAgIEBleGNsYW1hdGlvbnMuYXBwZW5kQ2hpbGQgZXhjbGFtYXRpb25cbiAgICBzZXRUaW1lb3V0ID0+XG4gICAgICBpZiBleGNsYW1hdGlvbi5wYXJlbnROb2RlIGlzIEBleGNsYW1hdGlvbnNcbiAgICAgICAgQGV4Y2xhbWF0aW9ucy5yZW1vdmVDaGlsZCBleGNsYW1hdGlvblxuICAgICwgMjAwMFxuXG4gICAgaWYgdHJpZ2dlclxuICAgICAgQHBsdWdpbk1hbmFnZXIucnVuT25Db21ib0V4Y2xhbWF0aW9uKHRleHQpXG5cbiAgZ2V0TWF4U3RyZWFrOiAtPlxuICAgIG1heFN0cmVhayA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtIFwiYWN0aXZhdGUtcG93ZXItbW9kZS5tYXhTdHJlYWtcIlxuICAgIG1heFN0cmVhayA9IDAgaWYgbWF4U3RyZWFrIGlzIG51bGxcbiAgICBtYXhTdHJlYWtcblxuICBpbmNyZWFzZU1heFN0cmVhazogLT5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSBcImFjdGl2YXRlLXBvd2VyLW1vZGUubWF4U3RyZWFrXCIsIEBjdXJyZW50U3RyZWFrXG4gICAgQG1heFN0cmVhayA9IEBjdXJyZW50U3RyZWFrXG4gICAgQG1heC50ZXh0Q29udGVudCA9IFwiTWF4ICN7QG1heFN0cmVha31cIlxuICAgIGlmIEBtYXhTdHJlYWtSZWFjaGVkIGlzIGZhbHNlXG4gICAgICBAc2hvd0V4Y2xhbWF0aW9uIFwiTkVXIE1BWCEhIVwiLCAnbWF4LWNvbWJvJywgZmFsc2VcbiAgICAgIEBwbHVnaW5NYW5hZ2VyLnJ1bk9uQ29tYm9NYXhTdHJlYWsoQG1heFN0cmVhaylcbiAgICBAbWF4U3RyZWFrUmVhY2hlZCA9IHRydWVcblxuICByZXNldE1heFN0cmVhazogLT5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSBcImFjdGl2YXRlLXBvd2VyLW1vZGUubWF4U3RyZWFrXCIsIDBcbiAgICBAbWF4U3RyZWFrUmVhY2hlZCA9IGZhbHNlXG4gICAgQG1heFN0cmVhayA9IDBcbiAgICBpZiBAbWF4XG4gICAgICBAbWF4LnRleHRDb250ZW50ID0gXCJNYXggMFwiXG4iXX0=

(function() {
  var Api, ComboApi, ParticlesEffect, audioPlayer, canvasRenderer, comboMode, comboRenderer, defaultEffect, defaultFlow, deleteFlow, editorRegistry, playAudio, powerCanvas, screenShake, screenShaker, switcher, userFileFlow;

  Api = require("./api");

  ParticlesEffect = require("./effect/particles");

  comboRenderer = require("./combo-renderer");

  canvasRenderer = require("./canvas-renderer");

  editorRegistry = require("./service/editor-registry");

  ComboApi = require("./service/combo-api");

  screenShaker = require("./service/screen-shaker");

  audioPlayer = require("./service/audio-player");

  screenShake = require("./plugin/screen-shake");

  playAudio = require("./plugin/play-audio");

  powerCanvas = require("./plugin/power-canvas");

  comboMode = require("./plugin/combo-mode");

  defaultEffect = require("./effect/default");

  defaultFlow = require("./flow/default");

  deleteFlow = require("./flow/delete");

  userFileFlow = require("./flow/user-file");

  switcher = require("./switcher");

  module.exports = {
    comboRenderer: comboRenderer,
    canvasRenderer: canvasRenderer,
    switcher: switcher,
    defaultEffect: defaultEffect,
    defaultFlow: defaultFlow,
    deleteFlow: deleteFlow,
    userFileFlow: userFileFlow,
    editorRegistry: editorRegistry,
    screenShaker: screenShaker,
    audioPlayer: audioPlayer,
    screenShake: screenShake,
    playAudio: playAudio,
    comboMode: comboMode,
    powerCanvas: powerCanvas,
    init: function(config, pluginRegistry, flowRegistry, effectRegistry) {
      this.pluginRegistry = pluginRegistry;
      this.flowRegistry = flowRegistry;
      this.effectRegistry = effectRegistry;
      this.initApi();
      pluginRegistry.init(config, this.api);
      this.initCoreFlows();
      this.initCoreEffects();
      return this.initCorePlugins();
    },
    initApi: function() {
      this.comboRenderer.setPluginManager(this);
      this.comboApi = new ComboApi(this.comboRenderer);
      this.canvasRenderer.setEffectRegistry(this.effectRegistry);
      this.screenShaker.init();
      this.audioPlayer.init();
      return this.api = new Api(this.editorRegistry, this.comboApi, this.screenShaker, this.audioPlayer);
    },
    initCorePlugins: function() {
      this.comboMode.setComboRenderer(this.comboRenderer);
      this.powerCanvas.setCanvasRenderer(this.canvasRenderer);
      this.pluginRegistry.addCorePlugin('particles', this.powerCanvas);
      this.pluginRegistry.addCorePlugin('comboMode', this.comboMode);
      this.pluginRegistry.addPlugin('screenShake', this.screenShake);
      return this.pluginRegistry.addPlugin('playAudio', this.playAudio);
    },
    initCoreFlows: function() {
      this.flowRegistry.setDefaultFlow(this.defaultFlow);
      this.flowRegistry.addFlow('delete', this.deleteFlow);
      return this.flowRegistry.addFlow('user-file', this.userFileFlow);
    },
    initCoreEffects: function() {
      var effect;
      effect = new ParticlesEffect(defaultEffect);
      return this.effectRegistry.setDefaultEffect(effect);
    },
    enable: function() {
      this.pluginRegistry.enable(this.api);
      this.flowRegistry.enable();
      return this.effectRegistry.enable();
    },
    disable: function() {
      this.screenShaker.disable();
      this.audioPlayer.disable();
      this.flowRegistry.disable();
      this.effectRegistry.disable();
      this.pluginRegistry.onEnabled(function(code, plugin) {
        return typeof plugin.disable === "function" ? plugin.disable() : void 0;
      });
      return this.pluginRegistry.disable();
    },
    runOnChangePane: function(editor, editorElement) {
      if (editor == null) {
        editor = null;
      }
      if (editorElement == null) {
        editorElement = null;
      }
      this.editorRegistry.setEditor(editor);
      return this.pluginRegistry.onEnabled(function(code, plugin) {
        return typeof plugin.onChangePane === "function" ? plugin.onChangePane(editor, editorElement) : void 0;
      });
    },
    runOnNewCursor: function(cursor) {
      return this.pluginRegistry.onEnabled(function(code, plugin) {
        return typeof plugin.onNewCursor === "function" ? plugin.onNewCursor(cursor) : void 0;
      });
    },
    runOnInput: function(cursor, screenPosition, input) {
      this.switcher.reset();
      this.flowRegistry.flow.handle(input, this.switcher, this.comboApi.getLevel());
      return this.pluginRegistry.onEnabled((function(_this) {
        return function(code, plugin) {
          if (_this.switcher.isOff(code)) {
            return true;
          }
          return typeof plugin.onInput === "function" ? plugin.onInput(cursor, screenPosition, input, _this.switcher.getData(code)) : void 0;
        };
      })(this));
    },
    runOnComboStartStreak: function() {
      return this.pluginRegistry.onEnabled(function(code, plugin) {
        return typeof plugin.onComboStartStreak === "function" ? plugin.onComboStartStreak() : void 0;
      });
    },
    runOnComboLevelChange: function(newLvl, oldLvl) {
      return this.pluginRegistry.onEnabled(function(code, plugin) {
        return typeof plugin.onComboLevelChange === "function" ? plugin.onComboLevelChange(newLvl, oldLvl) : void 0;
      });
    },
    runOnComboEndStreak: function() {
      return this.pluginRegistry.onEnabled(function(code, plugin) {
        return typeof plugin.onComboEndStreak === "function" ? plugin.onComboEndStreak() : void 0;
      });
    },
    runOnComboExclamation: function(text) {
      return this.pluginRegistry.onEnabled(function(code, plugin) {
        return typeof plugin.onComboExclamation === "function" ? plugin.onComboExclamation(text) : void 0;
      });
    },
    runOnComboMaxStreak: function(maxStreak) {
      return this.pluginRegistry.onEnabled(function(code, plugin) {
        return typeof plugin.onComboMaxStreak === "function" ? plugin.onComboMaxStreak(maxStreak) : void 0;
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvam9lbC8uYXRvbS9wYWNrYWdlcy9hY3RpdmF0ZS1wb3dlci1tb2RlL2xpYi9wbHVnaW4tbWFuYWdlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFBLEdBQUEsR0FBTSxPQUFBLENBQVEsT0FBUjs7RUFDTixlQUFBLEdBQWtCLE9BQUEsQ0FBUSxvQkFBUjs7RUFDbEIsYUFBQSxHQUFnQixPQUFBLENBQVEsa0JBQVI7O0VBQ2hCLGNBQUEsR0FBaUIsT0FBQSxDQUFRLG1CQUFSOztFQUNqQixjQUFBLEdBQWlCLE9BQUEsQ0FBUSwyQkFBUjs7RUFDakIsUUFBQSxHQUFXLE9BQUEsQ0FBUSxxQkFBUjs7RUFDWCxZQUFBLEdBQWUsT0FBQSxDQUFRLHlCQUFSOztFQUNmLFdBQUEsR0FBYyxPQUFBLENBQVEsd0JBQVI7O0VBQ2QsV0FBQSxHQUFjLE9BQUEsQ0FBUSx1QkFBUjs7RUFDZCxTQUFBLEdBQVksT0FBQSxDQUFRLHFCQUFSOztFQUNaLFdBQUEsR0FBYyxPQUFBLENBQVEsdUJBQVI7O0VBQ2QsU0FBQSxHQUFZLE9BQUEsQ0FBUSxxQkFBUjs7RUFDWixhQUFBLEdBQWdCLE9BQUEsQ0FBUSxrQkFBUjs7RUFDaEIsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUjs7RUFDZCxVQUFBLEdBQWEsT0FBQSxDQUFRLGVBQVI7O0VBQ2IsWUFBQSxHQUFlLE9BQUEsQ0FBUSxrQkFBUjs7RUFDZixRQUFBLEdBQVcsT0FBQSxDQUFRLFlBQVI7O0VBRVgsTUFBTSxDQUFDLE9BQVAsR0FDRTtJQUFBLGFBQUEsRUFBZSxhQUFmO0lBQ0EsY0FBQSxFQUFnQixjQURoQjtJQUVBLFFBQUEsRUFBVSxRQUZWO0lBR0EsYUFBQSxFQUFlLGFBSGY7SUFJQSxXQUFBLEVBQWEsV0FKYjtJQUtBLFVBQUEsRUFBWSxVQUxaO0lBTUEsWUFBQSxFQUFjLFlBTmQ7SUFPQSxjQUFBLEVBQWdCLGNB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QVEsZ0JBQWdCLE9BQU8sS0FBQyxDQUFBLFFBQVEsQ0FBQyxPQUFWLENBQWtCLElBQWxCO1FBRmpEO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQURGO0lBSlUsQ0E5RVo7SUF3RkEscUJBQUEsRUFBdUIsU0FBQTthQUNyQixJQUFDLENBQUEsY0FBYyxDQUFDLFNBQWhCLENBQ0UsU0FBQyxJQUFELEVBQU8sTUFBUDtpRUFBa0IsTUFBTSxDQUFDO01BQXpCLENBREY7SUFEcUIsQ0F4RnZCO0lBNkZBLHFCQUFBLEVBQXVCLFNBQUMsTUFBRCxFQUFTLE1BQVQ7YUFDckIsSUFBQyxDQUFBLGNBQWMsQ0FBQyxTQUFoQixDQUNFLFNBQUMsSUFBRCxFQUFPLE1BQVA7aUVBQWtCLE1BQU0sQ0FBQyxtQkFBb0IsUUFBUTtNQUFyRCxDQURGO0lBRHFCLENBN0Z2QjtJQWtHQSxtQkFBQSxFQUFxQixTQUFBO2FBQ25CLElBQUMsQ0FBQSxjQUFjLENBQUMsU0FBaEIsQ0FDRSxTQUFDLElBQUQsRUFBTyxNQUFQOytEQUFrQixNQUFNLENBQUM7TUFBekIsQ0FERjtJQURtQixDQWxHckI7SUF1R0EscUJBQUEsRUFBdUIsU0FBQyxJQUFEO2FBQ3JCLElBQUMsQ0FBQSxjQUFjLENBQUMsU0FBaEIsQ0FDRSxTQUFDLElBQUQsRUFBTyxNQUFQO2lFQUFrQixNQUFNLENBQUMsbUJBQW9CO01BQTdDLENBREY7SUFEcUIsQ0F2R3ZCO0lBNEdBLG1CQUFBLEVBQXFCLFNBQUMsU0FBRDthQUNuQixJQUFDLENBQUEsY0FBYyxDQUFDLFNBQWhCLENBQ0UsU0FBQyxJQUFELEVBQU8sTUFBUDsrREFBa0IsTUFBTSxDQUFDLGlCQUFrQjtNQUEzQyxDQURGO0lBRG1CLENBNUdyQjs7QUFuQkYiLCJzb3VyY2VzQ29udGVudCI6WyJBcGkgPSByZXF1aXJlIFwiLi9hcGlcIlxuUGFydGljbGVzRWZmZWN0ID0gcmVxdWlyZSBcIi4vZWZmZWN0L3BhcnRpY2xlc1wiXG5jb21ib1JlbmRlcmVyID0gcmVxdWlyZSBcIi4vY29tYm8tcmVuZGVyZXJcIlxuY2FudmFzUmVuZGVyZXIgPSByZXF1aXJlIFwiLi9jYW52YXMtcmVuZGVyZXJcIlxuZWRpdG9yUmVnaXN0cnkgPSByZXF1aXJlIFwiLi9zZXJ2aWNlL2VkaXRvci1yZWdpc3RyeVwiXG5Db21ib0FwaSA9IHJlcXVpcmUgXCIuL3NlcnZpY2UvY29tYm8tYXBpXCJcbnNjcmVlblNoYWtlciA9IHJlcXVpcmUgXCIuL3NlcnZpY2Uvc2NyZWVuLXNoYWtlclwiXG5hdWRpb1BsYXllciA9IHJlcXVpcmUgXCIuL3NlcnZpY2UvYXVkaW8tcGxheWVyXCJcbnNjcmVlblNoYWtlID0gcmVxdWlyZSBcIi4vcGx1Z2luL3NjcmVlbi1zaGFrZVwiXG5wbGF5QXVkaW8gPSByZXF1aXJlIFwiLi9wbHVnaW4vcGxheS1hdWRpb1wiXG5wb3dlckNhbnZhcyA9IHJlcXVpcmUgXCIuL3BsdWdpbi9wb3dlci1jYW52YXNcIlxuY29tYm9Nb2RlID0gcmVxdWlyZSBcIi4vcGx1Z2luL2NvbWJvLW1vZGVcIlxuZGVmYXVsdEVmZmVjdCA9IHJlcXVpcmUgXCIuL2VmZmVjdC9kZWZhdWx0XCJcbmRlZmF1bHRGbG93ID0gcmVxdWlyZSBcIi4vZmxvdy9kZWZhdWx0XCJcbmRlbGV0ZUZsb3cgPSByZXF1aXJlIFwiLi9mbG93L2RlbGV0ZVwiXG51c2VyRmlsZUZsb3cgPSByZXF1aXJlIFwiLi9mbG93L3VzZXItZmlsZVwiXG5zd2l0Y2hlciA9IHJlcXVpcmUgXCIuL3N3aXRjaGVyXCJcblxubW9kdWxlLmV4cG9ydHMgPVxuICBjb21ib1JlbmRlcmVyOiBjb21ib1JlbmRlcmVyXG4gIGNhbnZhc1JlbmRlcmVyOiBjYW52YXNSZW5kZXJlclxuICBzd2l0Y2hlcjogc3dpdGNoZXJcbiAgZGVmYXVsdEVmZmVjdDogZGVmYXVsdEVmZmVjdFxuICBkZWZhdWx0RmxvdzogZGVmYXVsdEZsb3dcbiAgZGVsZXRlRmxvdzogZGVsZXRlRmxvd1xuICB1c2VyRmlsZUZsb3c6IHVzZXJGaWxlRmxvd1xuICBlZGl0b3JSZWdpc3RyeTogZWRpdG9yUmVnaXN0cnlcbiAgc2NyZWVuU2hha2VyOiBzY3JlZW5TaGFrZXJcbiAgYXVkaW9QbGF5ZXI6IGF1ZGlvUGxheWVyXG4gIHNjcmVlblNoYWtlOiBzY3JlZW5TaGFrZVxuICBwbGF5QXVkaW86IHBsYXlBdWRpb1xuICBjb21ib01vZGU6IGNvbWJvTW9kZVxuICBwb3dlckNhbnZhczogcG93ZXJDYW52YXNcblxuICBpbml0OiAoY29uZmlnLCBwbHVnaW5SZWdpc3RyeSwgZmxvd1JlZ2lzdHJ5LCBlZmZlY3RSZWdpc3RyeSkgLT5cbiAgICBAcGx1Z2luUmVnaXN0cnkgPSBwbHVnaW5SZWdpc3RyeVxuICAgIEBmbG93UmVnaXN0cnkgPSBmbG93UmVnaXN0cnlcbiAgICBAZWZmZWN0UmVnaXN0cnkgPSBlZmZlY3RSZWdpc3RyeVxuICAgIEBpbml0QXBpKClcbiAgICBwbHVnaW5SZWdpc3RyeS5pbml0IGNvbmZpZywgQGFwaVxuICAgIEBpbml0Q29yZUZsb3dzKClcbiAgICBAaW5pdENvcmVFZmZlY3RzKClcbiAgICBAaW5pdENvcmVQbHVnaW5zKClcblxuICBpbml0QXBpOiAtPlxuICAgIEBjb21ib1JlbmRlcmVyLnNldFBsdWdpbk1hbmFnZXIgdGhpc1xuICAgIEBjb21ib0FwaSA9IG5ldyBDb21ib0FwaShAY29tYm9SZW5kZXJlcilcbiAgICBAY2FudmFzUmVuZGVyZXIuc2V0RWZmZWN0UmVnaXN0cnkgQGVmZmVjdFJlZ2lzdHJ5XG4gICAgQHNjcmVlblNoYWtlci5pbml0KClcbiAgICBAYXVkaW9QbGF5ZXIuaW5pdCgpXG4gICAgQGFwaSA9IG5ldyBBcGkoQGVkaXRvclJlZ2lzdHJ5LCBAY29tYm9BcGksIEBzY3JlZW5TaGFrZXIsIEBhdWRpb1BsYXllcilcblxuICBpbml0Q29yZVBsdWdpbnM6IC0+XG4gICAgQGNvbWJvTW9kZS5zZXRDb21ib1JlbmRlcmVyIEBjb21ib1JlbmRlcmVyXG4gICAgQHBvd2VyQ2FudmFzLnNldENhbnZhc1JlbmRlcmVyIEBjYW52YXNSZW5kZXJlclxuICAgIEBwbHVnaW5SZWdpc3RyeS5hZGRDb3JlUGx1Z2luICdwYXJ0aWNsZXMnLCBAcG93ZXJDYW52YXNcbiAgICBAcGx1Z2luUmVnaXN0cnkuYWRkQ29yZVBsdWdpbiAnY29tYm9Nb2RlJywgQGNvbWJvTW9kZVxuICAgIEBwbHVnaW5SZWdpc3RyeS5hZGRQbHVnaW4gJ3NjcmVlblNoYWtlJywgQHNjcmVlblNoYWtlXG4gICAgQHBsdWdpblJlZ2lzdHJ5LmFkZFBsdWdpbiAncGxheUF1ZGlvJywgQHBsYXlBdWRpb1xuXG4gIGluaXRDb3JlRmxvd3M6IC0+XG4gICAgQGZsb3dSZWdpc3RyeS5zZXREZWZhdWx0RmxvdyBAZGVmYXVsdEZsb3dcbiAgICBAZmxvd1JlZ2lzdHJ5LmFkZEZsb3cgJ2RlbGV0ZScsIEBkZWxldGVGbG93XG4gICAgQGZsb3dSZWdpc3RyeS5hZGRGbG93ICd1c2VyLWZpbGUnLCBAdXNlckZpbGVGbG93XG5cbiAgaW5pdENvcmVFZmZlY3RzOiAtPlxuICAgIGVmZmVjdCA9IG5ldyBQYXJ0aWNsZXNFZmZlY3QoZGVmYXVsdEVmZmVjdClcbiAgICBAZWZmZWN0UmVnaXN0cnkuc2V0RGVmYXVsdEVmZmVjdCBlZmZlY3RcblxuICBlbmFibGU6IC0+XG4gICAgQHBsdWdpblJlZ2lzdHJ5LmVuYWJsZSBAYXBpXG4gICAgQGZsb3dSZWdpc3RyeS5lbmFibGUoKVxuICAgIEBlZmZlY3RSZWdpc3RyeS5lbmFibGUoKVxuXG4gIGRpc2FibGU6IC0+XG4gICAgQHNjcmVlblNoYWtlci5kaXNhYmxlKClcbiAgICBAYXVkaW9QbGF5ZXIuZGlzYWJsZSgpXG4gICAgQGZsb3dSZWdpc3RyeS5kaXNhYmxlKClcbiAgICBAZWZmZWN0UmVnaXN0cnkuZGlzYWJsZSgpXG5cbiAgICBAcGx1Z2luUmVnaXN0cnkub25FbmFibGVkKFxuICAgICAgKGNvZGUsIHBsdWdpbikgLT4gcGx1Z2luLmRpc2FibGU/KClcbiAgICApXG4gICAgQHBsdWdpblJlZ2lzdHJ5LmRpc2FibGUoKVxuXG4gIHJ1bk9uQ2hhbmdlUGFuZTogKGVkaXRvciA9IG51bGwsIGVkaXRvckVsZW1lbnQgPSBudWxsKSAtPlxuICAgIEBlZGl0b3JSZWdpc3RyeS5zZXRFZGl0b3IgZWRpdG9yXG5cbiAgICBAcGx1Z2luUmVnaXN0cnkub25FbmFibGVkKFxuICAgICAgKGNvZGUsIHBsdWdpbikgLT4gcGx1Z2luLm9uQ2hhbmdlUGFuZT8oZWRpdG9yLCBlZGl0b3JFbGVtZW50KVxuICAgIClcblxuICBydW5Pbk5ld0N1cnNvcjogKGN1cnNvcikgLT5cbiAgICBAcGx1Z2luUmVnaXN0cnkub25FbmFibGVkKFxuICAgICAgKGNvZGUsIHBsdWdpbikgLT4gcGx1Z2luLm9uTmV3Q3Vyc29yPyhjdXJzb3IpXG4gICAgKVxuXG4gIHJ1bk9uSW5wdXQ6IChjdXJzb3IsIHNjcmVlblBvc2l0aW9uLCBpbnB1dCkgLT5cbiAgICBAc3dpdGNoZXIucmVzZXQoKVxuICAgIEBmbG93UmVnaXN0cnkuZmxvdy5oYW5kbGUgaW5wdXQsIEBzd2l0Y2hlciwgQGNvbWJvQXBpLmdldExldmVsKClcblxuICAgIEBwbHVnaW5SZWdpc3RyeS5vbkVuYWJsZWQoXG4gICAgICAoY29kZSwgcGx1Z2luKSA9PlxuICAgICAgICByZXR1cm4gdHJ1ZSBpZiBAc3dpdGNoZXIuaXNPZmYgY29kZVxuICAgICAgICBwbHVnaW4ub25JbnB1dD8oY3Vyc29yLCBzY3JlZW5Qb3NpdGlvbiwgaW5wdXQsIEBzd2l0Y2hlci5nZXREYXRhIGNvZGUpXG4gICAgKVxuXG4gIHJ1bk9uQ29tYm9TdGFydFN0cmVhazogLT5cbiAgICBAcGx1Z2luUmVnaXN0cnkub25FbmFibGVkKFxuICAgICAgKGNvZGUsIHBsdWdpbikgLT4gcGx1Z2luLm9uQ29tYm9TdGFydFN0cmVhaz8oKVxuICAgIClcblxuICBydW5PbkNvbWJvTGV2ZWxDaGFuZ2U6IChuZXdMdmwsIG9sZEx2bCkgLT5cbiAgICBAcGx1Z2luUmVnaXN0cnkub25FbmFibGVkKFxuICAgICAgKGNvZGUsIHBsdWdpbikgLT4gcGx1Z2luLm9uQ29tYm9MZXZlbENoYW5nZT8obmV3THZsLCBvbGRMdmwpXG4gICAgKVxuXG4gIHJ1bk9uQ29tYm9FbmRTdHJlYWs6IC0+XG4gICAgQHBsdWdpblJlZ2lzdHJ5Lm9uRW5hYmxlZChcbiAgICAgIChjb2RlLCBwbHVnaW4pIC0+IHBsdWdpbi5vbkNvbWJvRW5kU3RyZWFrPygpXG4gICAgKVxuXG4gIHJ1bk9uQ29tYm9FeGNsYW1hdGlvbjogKHRleHQpIC0+XG4gICAgQHBsdWdpblJlZ2lzdHJ5Lm9uRW5hYmxlZChcbiAgICAgIChjb2RlLCBwbHVnaW4pIC0+IHBsdWdpbi5vbkNvbWJvRXhjbGFtYXRpb24/KHRleHQpXG4gICAgKVxuXG4gIHJ1bk9uQ29tYm9NYXhTdHJlYWs6IChtYXhTdHJlYWspIC0+XG4gICAgQHBsdWdpblJlZ2lzdHJ5Lm9uRW5hYmxlZChcbiAgICAgIChjb2RlLCBwbHVnaW4pIC0+IHBsdWdpbi5vbkNvbWJvTWF4U3RyZWFrPyhtYXhTdHJlYWspXG4gICAgKVxuIl19

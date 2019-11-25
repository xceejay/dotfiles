(function() {
  var CompositeDisposable;

  CompositeDisposable = require("atom").CompositeDisposable;

  module.exports = {
    enabled: false,
    subscriptions: null,
    pluginSubscriptions: [],
    plugins: [],
    corePlugins: [],
    enabledPlugins: [],
    key: 'activate-power-mode.plugins',
    init: function(configSchema, api) {
      this.config = configSchema;
      return this.api = api;
    },
    enable: function() {
      var code, key, plugin, ref, ref1;
      this.subscriptions = new CompositeDisposable;
      this.enabled = true;
      ref = this.corePlugins;
      for (code in ref) {
        plugin = ref[code];
        this.observePlugin(code, plugin, "activate-power-mode." + code + ".enabled");
      }
      ref1 = this.plugins;
      for (code in ref1) {
        plugin = ref1[code];
        key = this.key + "." + code;
        this.addConfigForPlugin(code, plugin, key);
        this.observePlugin(code, plugin, key);
      }
      return this.initList();
    },
    disable: function() {
      var code, i, len, ref, ref1, ref2, subs;
      this.enabled = false;
      if ((ref = this.subscriptions) != null) {
        ref.dispose();
      }
      ref1 = this.pluginSubscriptions;
      for (subs = i = 0, len = ref1.length; i < len; subs = ++i) {
        code = ref1[subs];
        subs.dispose();
      }
      this.pluginSubscriptions = [];
      if ((ref2 = this.pluginList) != null) {
        ref2.dispose();
      }
      return this.pluginList = null;
    },
    addCorePlugin: function(code, plugin) {
      return this.corePlugins[code] = plugin;
    },
    addPlugin: function(code, plugin) {
      var key;
      key = this.key + "." + code;
      this.plugins[code] = plugin;
      if (this.enabled) {
        this.addConfigForPlugin(code, plugin, key);
        return this.observePlugin(code, plugin, key);
      }
    },
    removePlugin: function(code) {
      var base, key;
      key = this.key + "." + code;
      if (this.enabled) {
        this.unobservePlugin(code);
        this.removeConfigForPlugin(code);
      }
      delete this.plugins[code];
      if (this.enabledPlugins[code] != null) {
        if (typeof (base = this.enabledPlugins[code]).disable === "function") {
          base.disable();
        }
        return delete this.enabledPlugins[code];
      }
    },
    addConfigForPlugin: function(code, plugin, key) {
      this.config.plugins.properties[code] = {
        type: 'boolean',
        title: plugin.title,
        description: plugin.description,
        "default": true
      };
      if (atom.config.get(key) === void 0) {
        return atom.config.set(key, this.config.plugins.properties[code]["default"]);
      }
    },
    removeConfigForPlugin: function(code) {
      return delete this.config.plugins.properties[code];
    },
    observePlugin: function(code, plugin, key) {
      return this.pluginSubscriptions[code] = atom.config.observe(key, (function(_this) {
        return function(isEnabled) {
          if (isEnabled) {
            if (typeof plugin.enable === "function") {
              plugin.enable(_this.api);
            }
            return _this.enabledPlugins[code] = plugin;
          } else {
            if (typeof plugin.disable === "function") {
              plugin.disable();
            }
            return delete _this.enabledPlugins[code];
          }
        };
      })(this));
    },
    unobservePlugin: function(code) {
      var ref;
      if ((ref = this.pluginSubscriptions[code]) != null) {
        ref.dispose();
      }
      return delete this.pluginSubscriptions[code];
    },
    onEnabled: function(callback) {
      var code, plugin, ref, results;
      ref = this.enabledPlugins;
      results = [];
      for (code in ref) {
        plugin = ref[code];
        if (callback(code, plugin)) {
          continue;
        } else {
          results.push(void 0);
        }
      }
      return results;
    },
    togglePlugin: function(code) {
      var isEnabled;
      isEnabled = atom.config.get(this.key + "." + code);
      return atom.config.set(this.key + "." + code, !isEnabled);
    },
    initList: function() {
      if (this.pluginList != null) {
        return;
      }
      this.pluginList = require("./plugin-list");
      this.pluginList.init(this);
      return this.subscriptions.add(atom.commands.add("atom-workspace", {
        "activate-power-mode:select-plugin": (function(_this) {
          return function() {
            return _this.pluginList.toggle();
          };
        })(this)
      }));
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvam9lbC8uYXRvbS9wYWNrYWdlcy9hY3RpdmF0ZS1wb3dlci1tb2RlL2xpYi9wbHVnaW4tcmVnaXN0cnkuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVI7O0VBRXhCLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7SUFBQSxPQUFBLEVBQVMsS0FBVDtJQUNBLGFBQUEsRUFBZSxJQURmO0lBRUEsbUJBQUEsRUFBcUIsRUFGckI7SUFHQSxPQUFBLEVBQVMsRUFIVDtJQUlBLFdBQUEsRUFBYSxFQUpiO0lBS0EsY0FBQSxFQUFnQixFQUxoQjtJQU1BLEdBQUEsRUFBSyw2QkFOTDtJQVFBLElBQUEsRUFBTSxTQUFDLFlBQUQsRUFBZSxHQUFmO01BQ0osSUFBQyxDQUFBLE1BQUQsR0FBVTthQUNWLElBQUMsQ0FBQSxHQUFELEdBQU87SUFGSCxDQVJOO0lBWUEsTUFBQSxFQUFRLFNBQUE7QUFDTixVQUFBO01BQUEsSUFBQyxDQUFBLGFBQUQsR0FBaUIsSUFBSTtNQUNyQixJQUFDLENBQUEsT0FBRCxHQUFXO0FBRVg7QUFBQSxXQUFBLFdBQUE7O1FBQ0UsSUFBQyxDQUFBLGFBQUQsQ0FBZSxJQUFmLEVBQXFCLE1BQXJCLEVBQTZCLHNCQUFBLEdBQXVCLElBQXZCLEdBQTRCLFVBQXpEO0FBREY7QUFHQTtBQUFBLFdBQUEsWUFBQTs7UUFDRSxHQUFBLEdBQVMsSUFBQyxDQUFBLEdBQUYsR0FBTSxHQUFOLEdBQVM7UUFDakIsSUFBQyxDQUFBLGtCQUFELENBQW9CLElBQXBCLEVBQTBCLE1BQTFCLEVBQWtDLEdBQWxDO1FBQ0EsSUFBQyxDQUFBLGFBQUQsQ0FBZSxJQUFmLEVBQXFCLE1BQXJCLEVBQTZCLEdBQTdCO0FBSEY7YUFLQSxJQUFDLENBQUEsUUFBRCxDQUFBO0lBWk0sQ0FaUjtJQTBCQSxPQUFBLEVBQVMsU0FBQTtBQUNQLFVBQUE7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QUE1QixDQUFBOzthQUNBLE9BQU8sSUFBQyxDQUFBLG1CQUFvQixDQUFBLElBQUE7SUFGYixDQWxGakI7SUFzRkEsU0FBQSxFQUFXLFNBQUMsUUFBRDtBQUNULFVBQUE7QUFBQTtBQUFBO1dBQUEsV0FBQTs7UUFDRSxJQUFZLFFBQUEsQ0FBUyxJQUFULEVBQWUsTUFBZixDQUFaO0FBQUEsbUJBQUE7U0FBQSxNQUFBOytCQUFBOztBQURGOztJQURTLENBdEZYO0lBMEZBLFlBQUEsRUFBYyxTQUFDLElBQUQ7QUFDWixVQUFBO01BQUEsU0FBQSxHQUFZLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFtQixJQUFDLENBQUEsR0FBRixHQUFNLEdBQU4sR0FBUyxJQUEzQjthQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFtQixJQUFDLENBQUEsR0FBRixHQUFNLEdBQU4sR0FBUyxJQUEzQixFQUFtQyxDQUFDLFNBQXBDO0lBRlksQ0ExRmQ7SUE4RkEsUUFBQSxFQUFVLFNBQUE7TUFDUixJQUFVLHVCQUFWO0FBQUEsZUFBQTs7TUFFQSxJQUFDLENBQUEsVUFBRCxHQUFjLE9BQUEsQ0FBUSxlQUFSO01BQ2QsSUFBQyxDQUFBLFVBQVUsQ0FBQyxJQUFaLENBQWlCLElBQWpCO2FBRUEsSUFBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBZCxDQUFrQixnQkFBbEIsRUFDakI7UUFBQSxtQ0FBQSxFQUFxQyxDQUFBLFNBQUEsS0FBQTtpQkFBQSxTQUFBO21CQUNuQyxLQUFDLENBQUEsVUFBVSxDQUFDLE1BQVosQ0FBQTtVQURtQztRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBckM7T0FEaUIsQ0FBbkI7SUFOUSxDQTlGVjs7QUFIRiIsInNvdXJjZXNDb250ZW50IjpbIntDb21wb3NpdGVEaXNwb3NhYmxlfSA9IHJlcXVpcmUgXCJhdG9tXCJcblxubW9kdWxlLmV4cG9ydHMgPVxuICBlbmFibGVkOiBmYWxzZVxuICBzdWJzY3JpcHRpb25zOiBudWxsXG4gIHBsdWdpblN1YnNjcmlwdGlvbnM6IFtdXG4gIHBsdWdpbnM6IFtdXG4gIGNvcmVQbHVnaW5zOiBbXVxuICBlbmFibGVkUGx1Z2luczogW11cbiAga2V5OiAnYWN0aXZhdGUtcG93ZXItbW9kZS5wbHVnaW5zJ1xuXG4gIGluaXQ6IChjb25maWdTY2hlbWEsIGFwaSkgLT5cbiAgICBAY29uZmlnID0gY29uZmlnU2NoZW1hXG4gICAgQGFwaSA9IGFwaVxuXG4gIGVuYWJsZTogLT5cbiAgICBAc3Vic2NyaXB0aW9ucyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlXG4gICAgQGVuYWJsZWQgPSB0cnVlXG5cbiAgICBmb3IgY29kZSwgcGx1Z2luIG9mIEBjb3JlUGx1Z2luc1xuICAgICAgQG9ic2VydmVQbHVnaW4gY29kZSwgcGx1Z2luLCBcImFjdGl2YXRlLXBvd2VyLW1vZGUuI3tjb2RlfS5lbmFibGVkXCJcblxuICAgIGZvciBjb2RlLCBwbHVnaW4gb2YgQHBsdWdpbnNcbiAgICAgIGtleSA9IFwiI3tAa2V5fS4je2NvZGV9XCJcbiAgICAgIEBhZGRDb25maWdGb3JQbHVnaW4gY29kZSwgcGx1Z2luLCBrZXlcbiAgICAgIEBvYnNlcnZlUGx1Z2luIGNvZGUsIHBsdWdpbiwga2V5XG5cbiAgICBAaW5pdExpc3QoKVxuXG4gIGRpc2FibGU6IC0+XG4gICAgQGVuYWJsZWQgPSBmYWxzZVxuICAgIEBzdWJzY3JpcHRpb25zPy5kaXNwb3NlKClcbiAgICBmb3IgY29kZSwgc3VicyBpbiBAcGx1Z2luU3Vic2NyaXB0aW9uc1xuICAgICAgc3Vicy5kaXNwb3NlKClcbiAgICBAcGx1Z2luU3Vic2NyaXB0aW9ucyA9IFtdXG4gICAgQHBsdWdpbkxpc3Q/LmRpc3Bvc2UoKVxuICAgIEBwbHVnaW5MaXN0ID0gbnVsbFxuXG4gIGFkZENvcmVQbHVnaW46IChjb2RlLCBwbHVnaW4pIC0+XG4gICAgQGNvcmVQbHVnaW5zW2NvZGVdID0gcGx1Z2luXG5cbiAgYWRkUGx1Z2luOiAoY29kZSwgcGx1Z2luKSAtPlxuICAgIGtleSA9IFwiI3tAa2V5fS4je2NvZGV9XCJcbiAgICBAcGx1Z2luc1tjb2RlXSA9IHBsdWdpblxuXG4gICAgaWYgQGVuYWJsZWRcbiAgICAgIEBhZGRDb25maWdGb3JQbHVnaW4gY29kZSwgcGx1Z2luLCBrZXlcbiAgICAgIEBvYnNlcnZlUGx1Z2luIGNvZGUsIHBsdWdpbiwga2V5XG5cbiAgcmVtb3ZlUGx1Z2luOiAoY29kZSkgLT5cbiAgICBrZXkgPSBcIiN7QGtleX0uI3tjb2RlfVwiXG5cbiAgICBpZiBAZW5hYmxlZFxuICAgICAgQHVub2JzZXJ2ZVBsdWdpbiBjb2RlXG4gICAgICBAcmVtb3ZlQ29uZmlnRm9yUGx1Z2luIGNvZGVcblxuICAgIGRlbGV0ZSBAcGx1Z2luc1tjb2RlXVxuICAgIGlmIEBlbmFibGVkUGx1Z2luc1tjb2RlXT9cbiAgICAgIEBlbmFibGVkUGx1Z2luc1tjb2RlXS5kaXNhYmxlPygpXG4gICAgICBkZWxldGUgQGVuYWJsZWRQbHVnaW5zW2NvZGVdXG5cbiAgYWRkQ29uZmlnRm9yUGx1Z2luOiAoY29kZSwgcGx1Z2luLCBrZXkpIC0+XG4gICAgQGNvbmZpZy5wbHVnaW5zLnByb3BlcnRpZXNbY29kZV0gPVxuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgdGl0bGU6IHBsdWdpbi50aXRsZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBwbHVnaW4uZGVzY3JpcHRpb24sXG4gICAgICBkZWZhdWx0OiB0cnVlXG5cbiAgICBpZiBhdG9tLmNvbmZpZy5nZXQoa2V5KSA9PSB1bmRlZmluZWRcbiAgICAgIGF0b20uY29uZmlnLnNldCBrZXksIEBjb25maWcucGx1Z2lucy5wcm9wZXJ0aWVzW2NvZGVdLmRlZmF1bHRcblxuICByZW1vdmVDb25maWdGb3JQbHVnaW46IChjb2RlKSAtPlxuICAgIGRlbGV0ZSBAY29uZmlnLnBsdWdpbnMucHJvcGVydGllc1tjb2RlXVxuXG4gIG9ic2VydmVQbHVnaW46IChjb2RlLCBwbHVnaW4sIGtleSkgLT5cbiAgICBAcGx1Z2luU3Vic2NyaXB0aW9uc1tjb2RlXSA9IGF0b20uY29uZmlnLm9ic2VydmUoXG4gICAgICBrZXksIChpc0VuYWJsZWQpID0+XG4gICAgICAgIGlmIGlzRW5hYmxlZFxuICAgICAgICAgIHBsdWdpbi5lbmFibGU/KEBhcGkpXG4gICAgICAgICAgQGVuYWJsZWRQbHVnaW5zW2NvZGVdID0gcGx1Z2luXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBwbHVnaW4uZGlzYWJsZT8oKVxuICAgICAgICAgIGRlbGV0ZSBAZW5hYmxlZFBsdWdpbnNbY29kZV1cbiAgICApXG5cbiAgdW5vYnNlcnZlUGx1Z2luOiAoY29kZSkgLT5cbiAgICBAcGx1Z2luU3Vic2NyaXB0aW9uc1tjb2RlXT8uZGlzcG9zZSgpXG4gICAgZGVsZXRlIEBwbHVnaW5TdWJzY3JpcHRpb25zW2NvZGVdXG5cbiAgb25FbmFibGVkOiAoY2FsbGJhY2spIC0+XG4gICAgZm9yIGNvZGUsIHBsdWdpbiBvZiBAZW5hYmxlZFBsdWdpbnNcbiAgICAgIGNvbnRpbnVlIGlmIGNhbGxiYWNrIGNvZGUsIHBsdWdpblxuXG4gIHRvZ2dsZVBsdWdpbjogKGNvZGUpIC0+XG4gICAgaXNFbmFibGVkID0gYXRvbS5jb25maWcuZ2V0IFwiI3tAa2V5fS4je2NvZGV9XCJcbiAgICBhdG9tLmNvbmZpZy5zZXQgXCIje0BrZXl9LiN7Y29kZX1cIiwgIWlzRW5hYmxlZFxuXG4gIGluaXRMaXN0OiAtPlxuICAgIHJldHVybiBpZiBAcGx1Z2luTGlzdD9cblxuICAgIEBwbHVnaW5MaXN0ID0gcmVxdWlyZSBcIi4vcGx1Z2luLWxpc3RcIlxuICAgIEBwbHVnaW5MaXN0LmluaXQgdGhpc1xuXG4gICAgQHN1YnNjcmlwdGlvbnMuYWRkIGF0b20uY29tbWFuZHMuYWRkIFwiYXRvbS13b3Jrc3BhY2VcIixcbiAgICAgIFwiYWN0aXZhdGUtcG93ZXItbW9kZTpzZWxlY3QtcGx1Z2luXCI6ID0+XG4gICAgICAgIEBwbHVnaW5MaXN0LnRvZ2dsZSgpXG4iXX0=

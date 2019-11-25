(function() {
  var ParticlesEffect, Service;

  ParticlesEffect = require("./effect/particles");

  module.exports = Service = (function() {
    function Service(pluginRegistry, flowRegistry, effectRegistry) {
      this.pluginRegistry = pluginRegistry;
      this.flowRegistry = flowRegistry;
      this.effectRegistry = effectRegistry;
    }

    Service.prototype.registerPlugin = function(code, plugin) {
      return this.pluginRegistry.addPlugin(code, plugin);
    };

    Service.prototype.registerFlow = function(code, flow) {
      return this.flowRegistry.addFlow(code, flow);
    };

    Service.prototype.registerEffect = function(code, effect) {
      return this.effectRegistry.addEffect(code, effect);
    };

    Service.prototype.unregisterPlugin = function(code) {
      return this.pluginRegistry.removePlugin(code);
    };

    Service.prototype.unregisterFlow = function(code) {
      return this.flowRegistry.removeFlow(code);
    };

    Service.prototype.unregisterEffect = function(code) {
      return this.effectRegistry.removeEffect(code);
    };

    Service.prototype.createParticlesEffect = function(particleManager) {
      return new ParticlesEffect(particleManager);
    };

    return Service;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvam9lbC8uYXRvbS9wYWNrYWdlcy9hY3RpdmF0ZS1wb3dlci1tb2RlL2xpYi9zZXJ2aWNlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsZUFBQSxHQUFrQixPQUFBLENBQVEsb0JBQVI7O0VBRWxCLE1BQU0sQ0FBQyxPQUFQLEdBQXVCO0lBQ1IsaUJBQUMsY0FBRCxFQUFpQixZQUFqQixFQUErQixjQUEvQjtNQUNYLElBQUMsQ0FBQSxjQUFELEdBQWtCO01BQ2xCLElBQUMsQ0FBQSxZQUFELEdBQWdCO01BQ2hCLElBQUMsQ0FBQSxjQUFELEdBQWtCO0lBSFA7O3NCQUtiLGNBQUEsR0FBZ0IsU0FBQyxJQUFELEVBQU8sTUFBUDthQUNkLElBQUMsQ0FBQSxjQUFjLENBQUMsU0FBaEIsQ0FBMEIsSUFBMUIsRUFBZ0MsTUFBaEM7SUFEYzs7c0JBR2hCLFlBQUEsR0FBYyxTQUFDLElBQUQsRUFBTyxJQUFQO2FBQ1osSUFBQyxDQUFBLFlBQVksQ0FBQyxPQUFkLENBQXNCLElBQXRCLEVBQTRCLElBQTVCO0lBRFk7O3NCQUdkLGNBQUEsR0FBZ0IsU0FBQyxJQUFELEVBQU8sTUFBUDthQUNkLElBQUMsQ0FBQSxjQUFjLENBQUMsU0FBaEIsQ0FBMEIsSUFBMUIsRUFBZ0MsTUFBaEM7SUFEYzs7c0JBR2hCLGdCQUFBLEdBQWtCLFNBQUMsSUFBRDthQUNoQixJQUFDLENBQUEsY0FBYyxDQUFDLFlBQWhCLENBQTZCLElBQTdCO0lBRGdCOztzQkFHbEIsY0FBQSxHQUFnQixTQUFDLElBQUQ7YUFDZCxJQUFDLENBQUEsWUFBWSxDQUFDLFVBQWQsQ0FBeUIsSUFBekI7SUFEYzs7c0JBR2hCLGdCQUFBLEdBQWtCLFNBQUMsSUFBRDthQUNoQixJQUFDLENBQUEsY0FBYyxDQUFDLFlBQWhCLENBQTZCLElBQTdCO0lBRGdCOztzQkFHbEIscUJBQUEsR0FBdUIsU0FBQyxlQUFEO2FBQ3JCLElBQUksZUFBSixDQUFvQixlQUFwQjtJQURxQjs7Ozs7QUExQnpCIiwic291cmNlc0NvbnRlbnQiOlsiUGFydGljbGVzRWZmZWN0ID0gcmVxdWlyZSBcIi4vZWZmZWN0L3BhcnRpY2xlc1wiXG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgU2VydmljZVxuICBjb25zdHJ1Y3RvcjogKHBsdWdpblJlZ2lzdHJ5LCBmbG93UmVnaXN0cnksIGVmZmVjdFJlZ2lzdHJ5KSAtPlxuICAgIEBwbHVnaW5SZWdpc3RyeSA9IHBsdWdpblJlZ2lzdHJ5XG4gICAgQGZsb3dSZWdpc3RyeSA9IGZsb3dSZWdpc3RyeVxuICAgIEBlZmZlY3RSZWdpc3RyeSA9IGVmZmVjdFJlZ2lzdHJ5XG5cbiAgcmVnaXN0ZXJQbHVnaW46IChjb2RlLCBwbHVnaW4pIC0+XG4gICAgQHBsdWdpblJlZ2lzdHJ5LmFkZFBsdWdpbiBjb2RlLCBwbHVnaW5cblxuICByZWdpc3RlckZsb3c6IChjb2RlLCBmbG93KSAtPlxuICAgIEBmbG93UmVnaXN0cnkuYWRkRmxvdyBjb2RlLCBmbG93XG5cbiAgcmVnaXN0ZXJFZmZlY3Q6IChjb2RlLCBlZmZlY3QpIC0+XG4gICAgQGVmZmVjdFJlZ2lzdHJ5LmFkZEVmZmVjdCBjb2RlLCBlZmZlY3RcblxuICB1bnJlZ2lzdGVyUGx1Z2luOiAoY29kZSkgLT5cbiAgICBAcGx1Z2luUmVnaXN0cnkucmVtb3ZlUGx1Z2luIGNvZGVcblxuICB1bnJlZ2lzdGVyRmxvdzogKGNvZGUpIC0+XG4gICAgQGZsb3dSZWdpc3RyeS5yZW1vdmVGbG93IGNvZGVcblxuICB1bnJlZ2lzdGVyRWZmZWN0OiAoY29kZSkgLT5cbiAgICBAZWZmZWN0UmVnaXN0cnkucmVtb3ZlRWZmZWN0IGNvZGVcblxuICBjcmVhdGVQYXJ0aWNsZXNFZmZlY3Q6IChwYXJ0aWNsZU1hbmFnZXIpIC0+XG4gICAgbmV3IFBhcnRpY2xlc0VmZmVjdChwYXJ0aWNsZU1hbmFnZXIpXG4iXX0=

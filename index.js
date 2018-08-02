const container = (function() {
  let registry = {};
  let booted = false;

  const solve = function(id) {
    if (!(id in registry)) {
      throw Error(`The service ${id} was not registered`);
    }

    if (registry[id].target) {
      return registry[id].target;
    }

    if (registry[id].dependencies.length === 0) {
      registry[id].target = registry[id].internal
        ? require(registry[id].path)()
        : require(registry[id].path);

      return registry[id].target;
    }

    const solvedDependencies = registry[id].dependencies.map(function(
      dependency
    ) {
      return solve(dependency);
    });
    registry[id].target = require(registry[id].path)(...solvedDependencies);

    return registry[id].target;
  };

  const trimLeadingSlash = function(path) {
    return path.replace(/\/+$/, '');
  };

  return {
    register: function(arr, rootDir) {
      if (booted) {
        throw Error(
          'The container is already booted. You cannot register services anymore'
        );
      }

      if (!rootDir) {
        throw Error(
          'rootDir for internal services must be supplied as second argument'
        );
      }

      rootDir = trimLeadingSlash(rootDir);
      for (let { id, path, dependencies = [] } of arr) {
        registry = {
          ...registry,
          [id]: {
            internal: path.startsWith('./'),
            path: path.startsWith('./') ? `${rootDir}/${path}` : path,
            dependencies: dependencies,
            target: null
          }
        };
      }
    },
    get: function(id) {
      booted = true;

      return solve(id);
    }
  };
})();

module.exports = container;

// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"vyxY":[function(require,module,exports) {
(function () {
  if (typeof Prism === 'undefined' || typeof document === 'undefined') {
    return;
  }
  var callbacks = [];
  var map = {};
  var noop = function () {};
  Prism.plugins.toolbar = {};

  /**
   * @typedef ButtonOptions
   * @property {string} text The text displayed.
   * @property {string} [url] The URL of the link which will be created.
   * @property {Function} [onClick] The event listener for the `click` event of the created button.
   * @property {string} [className] The class attribute to include with element.
   */

  /**
   * Register a button callback with the toolbar.
   *
   * @param {string} key
   * @param {ButtonOptions|Function} opts
   */
  var registerButton = Prism.plugins.toolbar.registerButton = function (key, opts) {
    var callback;
    if (typeof opts === 'function') {
      callback = opts;
    } else {
      callback = function (env) {
        var element;
        if (typeof opts.onClick === 'function') {
          element = document.createElement('button');
          element.type = 'button';
          element.addEventListener('click', function () {
            opts.onClick.call(this, env);
          });
        } else if (typeof opts.url === 'string') {
          element = document.createElement('a');
          element.href = opts.url;
        } else {
          element = document.createElement('span');
        }
        if (opts.className) {
          element.classList.add(opts.className);
        }
        element.textContent = opts.text;
        return element;
      };
    }
    if (key in map) {
      console.warn('There is a button with the key "' + key + '" registered already.');
      return;
    }
    callbacks.push(map[key] = callback);
  };

  /**
   * Returns the callback order of the given element.
   *
   * @param {HTMLElement} element
   * @returns {string[] | undefined}
   */
  function getOrder(element) {
    while (element) {
      var order = element.getAttribute('data-toolbar-order');
      if (order != null) {
        order = order.trim();
        if (order.length) {
          return order.split(/\s*,\s*/g);
        } else {
          return [];
        }
      }
      element = element.parentElement;
    }
  }

  /**
   * Post-highlight Prism hook callback.
   *
   * @param env
   */
  var hook = Prism.plugins.toolbar.hook = function (env) {
    // Check if inline or actual code block (credit to line-numbers plugin)
    var pre = env.element.parentNode;
    if (!pre || !/pre/i.test(pre.nodeName)) {
      return;
    }

    // Autoloader rehighlights, so only do this once.
    if (pre.parentNode.classList.contains('code-toolbar')) {
      return;
    }

    // Create wrapper for <pre> to prevent scrolling toolbar with content
    var wrapper = document.createElement('div');
    wrapper.classList.add('code-toolbar');
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    // Setup the toolbar
    var toolbar = document.createElement('div');
    toolbar.classList.add('toolbar');

    // order callbacks
    var elementCallbacks = callbacks;
    var order = getOrder(env.element);
    if (order) {
      elementCallbacks = order.map(function (key) {
        return map[key] || noop;
      });
    }
    elementCallbacks.forEach(function (callback) {
      var element = callback(env);
      if (!element) {
        return;
      }
      var item = document.createElement('div');
      item.classList.add('toolbar-item');
      item.appendChild(element);
      toolbar.appendChild(item);
    });

    // Add our toolbar to the currently created wrapper of <pre> tag
    wrapper.appendChild(toolbar);
  };
  registerButton('label', function (env) {
    var pre = env.element.parentNode;
    if (!pre || !/pre/i.test(pre.nodeName)) {
      return;
    }
    if (!pre.hasAttribute('data-label')) {
      return;
    }
    var element;
    var template;
    var text = pre.getAttribute('data-label');
    try {
      // Any normal text will blow up this selector.
      template = document.querySelector('template#' + text);
    } catch (e) {/* noop */}
    if (template) {
      element = template.content;
    } else {
      if (pre.hasAttribute('data-url')) {
        element = document.createElement('a');
        element.href = pre.getAttribute('data-url');
      } else {
        element = document.createElement('span');
      }
      element.textContent = text;
    }
    return element;
  });

  /**
   * Register the toolbar with Prism.
   */
  Prism.hooks.add('complete', hook);
})();
},{}]},{},["vyxY"], null)
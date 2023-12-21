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
})({"Ah3k":[function(require,module,exports) {
(function () {
  if (typeof Prism === 'undefined' || typeof document === 'undefined') {
    return;
  }

  /**
   * Plugin name which is used as a class name for <pre> which is activating the plugin
   *
   * @type {string}
   */
  var PLUGIN_NAME = 'line-numbers';

  /**
   * Regular expression used for determining line breaks
   *
   * @type {RegExp}
   */
  var NEW_LINE_EXP = /\n(?!$)/g;

  /**
   * Global exports
   */
  var config = Prism.plugins.lineNumbers = {
    /**
     * Get node for provided line number
     *
     * @param {Element} element pre element
     * @param {number} number line number
     * @returns {Element|undefined}
     */
    getLine: function (element, number) {
      if (element.tagName !== 'PRE' || !element.classList.contains(PLUGIN_NAME)) {
        return;
      }
      var lineNumberRows = element.querySelector('.line-numbers-rows');
      if (!lineNumberRows) {
        return;
      }
      var lineNumberStart = parseInt(element.getAttribute('data-start'), 10) || 1;
      var lineNumberEnd = lineNumberStart + (lineNumberRows.children.length - 1);
      if (number < lineNumberStart) {
        number = lineNumberStart;
      }
      if (number > lineNumberEnd) {
        number = lineNumberEnd;
      }
      var lineIndex = number - lineNumberStart;
      return lineNumberRows.children[lineIndex];
    },
    /**
     * Resizes the line numbers of the given element.
     *
     * This function will not add line numbers. It will only resize existing ones.
     *
     * @param {HTMLElement} element A `<pre>` element with line numbers.
     * @returns {void}
     */
    resize: function (element) {
      resizeElements([element]);
    },
    /**
     * Whether the plugin can assume that the units font sizes and margins are not depended on the size of
     * the current viewport.
     *
     * Setting this to `true` will allow the plugin to do certain optimizations for better performance.
     *
     * Set this to `false` if you use any of the following CSS units: `vh`, `vw`, `vmin`, `vmax`.
     *
     * @type {boolean}
     */
    assumeViewportIndependence: true
  };

  /**
   * Resizes the given elements.
   *
   * @param {HTMLElement[]} elements
   */
  function resizeElements(elements) {
    elements = elements.filter(function (e) {
      var codeStyles = getStyles(e);
      var whiteSpace = codeStyles['white-space'];
      return whiteSpace === 'pre-wrap' || whiteSpace === 'pre-line';
    });
    if (elements.length == 0) {
      return;
    }
    var infos = elements.map(function (element) {
      var codeElement = element.querySelector('code');
      var lineNumbersWrapper = element.querySelector('.line-numbers-rows');
      if (!codeElement || !lineNumbersWrapper) {
        return undefined;
      }

      /** @type {HTMLElement} */
      var lineNumberSizer = element.querySelector('.line-numbers-sizer');
      var codeLines = codeElement.textContent.split(NEW_LINE_EXP);
      if (!lineNumberSizer) {
        lineNumberSizer = document.createElement('span');
        lineNumberSizer.className = 'line-numbers-sizer';
        codeElement.appendChild(lineNumberSizer);
      }
      lineNumberSizer.innerHTML = '0';
      lineNumberSizer.style.display = 'block';
      var oneLinerHeight = lineNumberSizer.getBoundingClientRect().height;
      lineNumberSizer.innerHTML = '';
      return {
        element: element,
        lines: codeLines,
        lineHeights: [],
        oneLinerHeight: oneLinerHeight,
        sizer: lineNumberSizer
      };
    }).filter(Boolean);
    infos.forEach(function (info) {
      var lineNumberSizer = info.sizer;
      var lines = info.lines;
      var lineHeights = info.lineHeights;
      var oneLinerHeight = info.oneLinerHeight;
      lineHeights[lines.length - 1] = undefined;
      lines.forEach(function (line, index) {
        if (line && line.length > 1) {
          var e = lineNumberSizer.appendChild(document.createElement('span'));
          e.style.display = 'block';
          e.textContent = line;
        } else {
          lineHeights[index] = oneLinerHeight;
        }
      });
    });
    infos.forEach(function (info) {
      var lineNumberSizer = info.sizer;
      var lineHeights = info.lineHeights;
      var childIndex = 0;
      for (var i = 0; i < lineHeights.length; i++) {
        if (lineHeights[i] === undefined) {
          lineHeights[i] = lineNumberSizer.children[childIndex++].getBoundingClientRect().height;
        }
      }
    });
    infos.forEach(function (info) {
      var lineNumberSizer = info.sizer;
      var wrapper = info.element.querySelector('.line-numbers-rows');
      lineNumberSizer.style.display = 'none';
      lineNumberSizer.innerHTML = '';
      info.lineHeights.forEach(function (height, lineNumber) {
        wrapper.children[lineNumber].style.height = height + 'px';
      });
    });
  }

  /**
   * Returns style declarations for the element
   *
   * @param {Element} element
   */
  function getStyles(element) {
    if (!element) {
      return null;
    }
    return window.getComputedStyle ? getComputedStyle(element) : element.currentStyle || null;
  }
  var lastWidth = undefined;
  window.addEventListener('resize', function () {
    if (config.assumeViewportIndependence && lastWidth === window.innerWidth) {
      return;
    }
    lastWidth = window.innerWidth;
    resizeElements(Array.prototype.slice.call(document.querySelectorAll('pre.' + PLUGIN_NAME)));
  });
  Prism.hooks.add('complete', function (env) {
    if (!env.code) {
      return;
    }
    var code = /** @type {Element} */env.element;
    var pre = /** @type {HTMLElement} */code.parentNode;

    // works only for <code> wrapped inside <pre> (not inline)
    if (!pre || !/pre/i.test(pre.nodeName)) {
      return;
    }

    // Abort if line numbers already exists
    if (code.querySelector('.line-numbers-rows')) {
      return;
    }

    // only add line numbers if <code> or one of its ancestors has the `line-numbers` class
    if (!Prism.util.isActive(code, PLUGIN_NAME)) {
      return;
    }

    // Remove the class 'line-numbers' from the <code>
    code.classList.remove(PLUGIN_NAME);
    // Add the class 'line-numbers' to the <pre>
    pre.classList.add(PLUGIN_NAME);
    var match = env.code.match(NEW_LINE_EXP);
    var linesNum = match ? match.length + 1 : 1;
    var lineNumbersWrapper;
    var lines = new Array(linesNum + 1).join('<span></span>');
    lineNumbersWrapper = document.createElement('span');
    lineNumbersWrapper.setAttribute('aria-hidden', 'true');
    lineNumbersWrapper.className = 'line-numbers-rows';
    lineNumbersWrapper.innerHTML = lines;
    if (pre.hasAttribute('data-start')) {
      pre.style.counterReset = 'linenumber ' + (parseInt(pre.getAttribute('data-start'), 10) - 1);
    }
    env.element.appendChild(lineNumbersWrapper);
    resizeElements([pre]);
    Prism.hooks.run('line-numbers', env);
  });
  Prism.hooks.add('line-numbers', function (env) {
    env.plugins = env.plugins || {};
    env.plugins.lineNumbers = true;
  });
})();
},{}]},{},["Ah3k"], null)
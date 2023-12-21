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
})({"NdE2":[function(require,module,exports) {
(function () {
  if (typeof Prism === 'undefined' || typeof document === 'undefined') {
    return;
  }
  if (!Prism.plugins.toolbar) {
    console.warn('Copy to Clipboard plugin loaded before Toolbar plugin.');
    return;
  }

  /**
   * When the given elements is clicked by the user, the given text will be copied to clipboard.
   *
   * @param {HTMLElement} element
   * @param {CopyInfo} copyInfo
   *
   * @typedef CopyInfo
   * @property {() => string} getText
   * @property {() => void} success
   * @property {(reason: unknown) => void} error
   */
  function registerClipboard(element, copyInfo) {
    element.addEventListener('click', function () {
      copyTextToClipboard(copyInfo);
    });
  }

  // https://stackoverflow.com/a/30810322/7595472

  /** @param {CopyInfo} copyInfo */
  function fallbackCopyTextToClipboard(copyInfo) {
    var textArea = document.createElement('textarea');
    textArea.value = copyInfo.getText();

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      var successful = document.execCommand('copy');
      setTimeout(function () {
        if (successful) {
          copyInfo.success();
        } else {
          copyInfo.error();
        }
      }, 1);
    } catch (err) {
      setTimeout(function () {
        copyInfo.error(err);
      }, 1);
    }
    document.body.removeChild(textArea);
  }
  /** @param {CopyInfo} copyInfo */
  function copyTextToClipboard(copyInfo) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(copyInfo.getText()).then(copyInfo.success, function () {
        // try the fallback in case `writeText` didn't work
        fallbackCopyTextToClipboard(copyInfo);
      });
    } else {
      fallbackCopyTextToClipboard(copyInfo);
    }
  }

  /**
   * Selects the text content of the given element.
   *
   * @param {Element} element
   */
  function selectElementText(element) {
    // https://stackoverflow.com/a/20079910/7595472
    window.getSelection().selectAllChildren(element);
  }

  /**
   * Traverses up the DOM tree to find data attributes that override the default plugin settings.
   *
   * @param {Element} startElement An element to start from.
   * @returns {Settings} The plugin settings.
   * @typedef {Record<"copy" | "copy-error" | "copy-success" | "copy-timeout", string | number>} Settings
   */
  function getSettings(startElement) {
    /** @type {Settings} */
    var settings = {
      'copy': 'Copy',
      'copy-error': 'Press Ctrl+C to copy',
      'copy-success': 'Copied!',
      'copy-timeout': 5000
    };
    var prefix = 'data-prismjs-';
    for (var key in settings) {
      var attr = prefix + key;
      var element = startElement;
      while (element && !element.hasAttribute(attr)) {
        element = element.parentElement;
      }
      if (element) {
        settings[key] = element.getAttribute(attr);
      }
    }
    return settings;
  }
  Prism.plugins.toolbar.registerButton('copy-to-clipboard', function (env) {
    var element = env.element;
    var settings = getSettings(element);
    var linkCopy = document.createElement('button');
    linkCopy.className = 'copy-to-clipboard-button';
    linkCopy.setAttribute('type', 'button');
    var linkSpan = document.createElement('span');
    linkCopy.appendChild(linkSpan);
    setState('copy');
    registerClipboard(linkCopy, {
      getText: function () {
        return element.textContent;
      },
      success: function () {
        setState('copy-success');
        resetText();
      },
      error: function () {
        setState('copy-error');
        setTimeout(function () {
          selectElementText(element);
        }, 1);
        resetText();
      }
    });
    return linkCopy;
    function resetText() {
      setTimeout(function () {
        setState('copy');
      }, settings['copy-timeout']);
    }

    /** @param {"copy" | "copy-error" | "copy-success"} state */
    function setState(state) {
      linkSpan.textContent = settings[state];
      linkCopy.setAttribute('data-copy-state', state);
    }
  });
})();
},{}]},{},["NdE2"], null)
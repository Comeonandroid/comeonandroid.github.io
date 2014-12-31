(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("initialize", function(exports, require, module) {
$(document).ready(function() {
  var prepare_slider;
  $('body').on('click', '.activate_this', function(e) {
    var target, trigger;
    e.preventDefault();
    trigger = $(this);
    target = $(trigger.data('activate-target'));
    if (trigger.hasClass('active')) {
      trigger.removeClass('active');
      return target.removeClass('active');
    } else {
      trigger.addClass('active');
      return target.addClass('active');
    }
  });
  prepare_slider = function(slider) {
    var slides, slides_count;
    slides = $(slider).find('.push-slide');
    slides_count = slides.length;
    return slides.each(function(key, val) {
      var offset;
      offset = 5 * key;
      $(this).css("-webkit-transform", "translate3d(-" + offset + "px,-" + offset + "px,0)");
      $(this).css("-moz-transform", "translate3d(-" + offset + "px,-" + offset + "px,0)");
      $(this).css("-o-transform", "translate3d(-" + offset + "px,-" + offset + "px,0)");
      $(this).css("transform", "translate3d(-" + offset + "px,-" + offset + "px,0)");
      $(this).css("display", "block");
      $(this).removeClass('active');
      if (!((key + 1) !== slides_count)) {
        return $(this).addClass('active');
      }
    });
  };
  $('.push-slider').each(function() {
    return prepare_slider(this);
  });
  return $('body').on('click', '.push-slider', function(e) {
    var active_slide, next_slide;
    e.preventDefault();
    active_slide = $(this).find('.push-slide.active');
    next_slide = active_slide.prev();
    console.log(next_slide);
    if (next_slide.length > 0) {
      active_slide.removeClass('active');
      active_slide.css('display', 'none');
      return next_slide.addClass('active');
    } else {
      return prepare_slider(this);
    }
  });
});
});

;
//# sourceMappingURL=app.js.map
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
require.register("coffee_modules/scrollSpy", function(exports, require, module) {
var ScrollSpy;

ScrollSpy = (function() {
  ScrollSpy.prototype.inscroll = false;

  ScrollSpy.prototype.currentPosition = {
    top: 0,
    view: 0,
    bottom: 0
  };

  ScrollSpy.prototype.prevPosition = {
    top: 0,
    view: 0,
    bottom: 0
  };

  ScrollSpy.prototype.sections = [];

  ScrollSpy.prototype.nav = null;

  ScrollSpy.prototype.currentSection = {};

  ScrollSpy.prototype.prevSection = {};

  ScrollSpy.prototype.direction = null;

  ScrollSpy.prototype.actions = null;

  function ScrollSpy(sections) {
    setTimeout((function(_this) {
      return function() {
        _this.checkBlockOffset(sections);
        return _this.checkPosition();
      };
    })(this), 400);
  }

  ScrollSpy.prototype.checkBlockOffset = function(sections) {
    var _this;
    _this = this;
    sections.each(function(key, e) {
      return _this.sections[key] = {
        id: $(this).attr('id'),
        offset: $(this).offset(),
        height: $(this).outerHeight(true),
        elem: $(this)
      };
    });
    return console.log(this.sections);
  };

  ScrollSpy.prototype.checkPosition = function() {
    this.prevPosition = _(this.currentPosition).clone();
    this.currentPosition.top = $(window).scrollTop();
    this.currentPosition.view = $(window).scrollTop() + $(window).outerHeight(true) / 2;
    this.currentPosition.bottom = $(window).scrollTop() + $(window).outerHeight(true);
    this.direction = this.currentPosition.top > this.prevPosition.top ? "down" : "up";
    return this.getCurrentSection();
  };

  ScrollSpy.prototype.getCurrentSection = function() {
    var key, section, _i, _len, _ref;
    this.prevSection = _(this.currentSection).clone();
    key = 0;
    _ref = this.sections;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      section = _ref[_i];
      if (this.currentPosition.top >= this.sections[key].offset.top) {
        if ((this.sections[key + 1] != null) && (this.currentPosition.view+100) <= this.sections[key + 1].offset.top) {
          this.currentSection = this.sections[key];
        } else {
          this.currentSection = this.sections[key + 1];
        }
      }
      key++;
    }
    return this.makeActions();
  };

  ScrollSpy.prototype.makeActions = function() {
    var callback, id, _ref, _results;
    if (this.nav !== null) {
      console.log('change active in navbar');
    }
    if (this.currentSection.id !== this.prevSection.id && this.actions !== null) {
      _ref = this.actions;
      _results = [];
      for (id in _ref) {
        callback = _ref[id];
        if (id === this.currentSection.id || id === 'ALL') {
          _results.push(callback(this.currentSection.elem));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  };

  ScrollSpy.prototype.addAction = function(id, callback) {
    if (this.actions === null) {
      this.actions = {};
    }
    return this.actions["" + id] = callback;
  };

  ScrollSpy.prototype.disableUserScroll = function() {
    this.inscroll = true;
    return document.onmousewheel = function(e) {
      return e.preventDefault();
    };
  };

  ScrollSpy.prototype.enableUserScroll = function() {
    this.inscroll = false;
    return document.onmousewheel = function(e) {};
  };

  return ScrollSpy;

})();

$.fn.scrollSpy = function(nav) {
  var scrollSpy;
  if (nav == null) {
    nav = null;
  }
  scrollSpy = new ScrollSpy($(this));
  $(window).scroll(function() {
    return scrollSpy.checkPosition();
  });
  return scrollSpy;
};
});

;require.register("initialize", function(exports, require, module) {
require('./coffee_modules/scrollSpy');

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
  $('body').on('click', '.push-slider', function(e) {
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
  $('section.work').scrollSpy().addAction('ALL', function(elem) {
    $(".menu-item").removeClass('active');
    return $(".menu-item[data-scroll-target=\"" + (elem.attr('id')) + "\"]").addClass('active');
  });
  $('body').on('click', '.menu-item a', function(e) {
    var target;
    e.stopPropagation();
    e.preventDefault();
    target = $($(this).attr('href'));
    return $('body,html').animate({
      scrollTop: target.offset().top - (target.offset().top * 0.07)
    }, 600);
  });
  return $('body').on('click', '.menu-item', function(e) {
    return $(this).find('a').click();
  });
});
});

;
//# sourceMappingURL=app.js.map
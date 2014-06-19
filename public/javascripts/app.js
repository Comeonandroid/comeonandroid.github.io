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
var getAndShowBullshits, monthText, pageId;

$('body').on('keyup', '.very_search_input', function() {
  return $(this).height($(this).height() + $(this).scrollTop());
});

$('body').on('click', '.wow_show_about', function(e) {
  e.preventDefault();
  $(this).css('opacity', 0);
  $('.about').css({
    left: '0px',
    overflow: 'visible'
  });
  return $('.main').css('left', '320px');
});

$('body').on('click', '.wow_hide_about', function(e) {
  e.preventDefault();
  $('.wow_show_about').css('opacity', 1);
  $('.about').css({
    left: '-320px',
    overflow: 'hidden'
  });
  return $('.main').css('left', '0px');
});

$('body').on('click', '.wow_show_search', function(e) {
  e.preventDefault();
  $('.wow_wrapper.search').fadeIn(600);
  $('.wow_wrapper.main').fadeOut(500);
  $('.wow_wrapper.main div').fadeOut(500);
  $('.wow_wrapper.search div[class!=so_sorry]]').fadeIn(600);
  return $('textarea').focus();
});

$('body').on('click', '.wow_hide_search', function(e) {
  e.preventDefault();
  $('.wow_wrapper.search').fadeOut(600);
  $('.wow_wrapper.main').fadeIn(600);
  $('.wow_wrapper.main div').fadeIn(600);
  return $('.wow_wrapper.search div').fadeOut(600);
});

$('body').on('click', '.wow_publish', function(e) {
  var input;
  e.preventDefault();
  input = $(this).parent().find('.very_search_input');
  return $.post('/bullshit', {
    text: input.val()
  }, function(data) {
    var pageId;
    if (data.status === 'success') {
      $('.very_bullshit_container').html('');
      pageId = 0;
      getAndShowBullshits(pageId);
      input.val('');
      $('.wow_wrapper.search').fadeOut(600);
      $('.wow_wrapper.main').fadeIn(600);
      $('.wow_wrapper.main div').fadeIn(600);
      return $('.wow_wrapper.search div').fadeOut(600);
    }
  });
});

pageId = 0;

monthText = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

getAndShowBullshits = function(pageId) {
  return $.get("/bullshits/" + pageId, function(data) {
    var date, dateFormat, day, hours, key, minutes, month, value, year, _results;
    _results = [];
    for (key in data) {
      value = data[key];
      date = new Date(value.date);
      year = date.getFullYear();
      month = monthText[date.getMonth()];
      day = date.getDate();
      hours = date.getHours();
      minutes = date.getMinutes();
      dateFormat = day + ' ' + month + ' ' + year + ' / ' + hours + ':' + minutes;
      _results.push($('.very_bullshit_container').append("<div class='bullshit'><div class='such_bullshit_message'>" + value.text + "</div><div class='many_footer'>[ " + dateFormat + " ] рассказать об этом: Вконтакте / Фейсбук / Твиттер</div></div>"));
    }
    return _results;
  });
};

getAndShowBullshits(pageId);
});

;
//# sourceMappingURL=app.js.map
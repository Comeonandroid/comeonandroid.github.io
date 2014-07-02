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
var date, dateFormat, day, getCookie, hours, htmlEscaper, htmlEscapes, minutes, month, monthText, pageId, pregMatch, reg, rotate, showBullshits, society, str, url, value, year;

htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;'
};

htmlEscaper = /[&<>"'\/]/g;

_.escape = function(string) {
  return ('' + string).replace(htmlEscaper, function(match) {
    return htmlEscapes[match];
  });
};

pageId = 0;

monthText = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

getCookie = function(name) {
  var matches;
  matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
  if (matches) {
    return decodeURIComponent(matches[1]);
  } else {
    return void 0;
  }
};

showBullshits = function(container, data) {
  var date, dateFormat, day, hours, key, minutes, month, pregMatch, reg, rotate, society, str, url, value, year, _results;
  console.log(pageId);
  _results = [];
  for (key in data) {
    value = data[key];
    date = new Date(value.date);
    year = date.getFullYear();
    month = monthText[date.getMonth()];
    day = date.getDate();
    hours = date.getHours();
    minutes = date.getMinutes();
    str = value.text;
    reg = /(([a-z]+:\/\/(www\.)*)*[a-z0-9\-_]+\.[a-z]+[a-z0-9\.\/\-_=\?\&;#%\$\(\)]*)/igm;
    pregMatch = str.match(reg);
    value.text = str.replace(reg, function(s) {
      var msg;
      msg = /:\/\//.exec(s) === null ? "http://" + s : s;
      return "<a href=\"" + msg + "\">" + s + "</a>";
    });
    dateFormat = day + ' ' + month + ' ' + year + ' / ' + hours + ':' + minutes;
    url = window.location.origin + "/bullshit/" + value._id;
    society = "<a href=\"http://vkontakte.ru/share.php?url=" + url + "&title=Bullshit Board&description=" + (_.escape(value.text)) + "\" target=\"_blank\">Вконтакте</a> / <a target=\"_blank\" href=\"http://www.facebook.com/sharer/sharer.php?u=" + url + "\">Фейсбук</a> / <a href=\"https://twitter.com/intent/tweet?text=Bullshit Board. " + (_.escape(value.text)) + "&url=" + url + "\" rel=\"nofollow\" target=\"_blank\">Твиттер</a>";
    if (getCookie('admin') === 'IDKFA') {
      society += " / <span class='wow_del_bullshit' data-id='" + value._id + "'>Участковому</span>";
    }
    rotate = Math.random() * (0.3 - (-0.3)) + -0.3;
    _results.push(container.append("<div class='bullshit' style='transform: rotate(" + rotate + "deg); -webkit-transform: rotate(" + rotate + "deg);-moz-transform: rotate(" + rotate + "deg);-o-transform: rotate(" + rotate + "deg);-ms-transform: rotate(" + rotate + "deg) ;'><div class='such_bullshit_message'>" + value.text + "</div><div class='many_footer'>[ " + dateFormat + " ] рассказать об этом: " + society + "</div></div>"));
  }
  return _results;
};

$.get("/bullshits/" + pageId, function(data) {
  return showBullshits($('.very_bullshit_container'), data);
});

$('body').on('keyup', '.very_search_input', function() {
  var text;
  $(this).height($(this).height() + $(this).scrollTop());
  text = $(this).val();
  if (text.length > 2 && text.length < 400) {
    return $.get("/bullshits/search/" + text, function(data) {
      if (data.length > 0) {
        $('.very_bullshit_search_container').html('');
        showBullshits($('.very_bullshit_search_container'), data);
        return $('.so_sorry').hide();
      } else {
        $('.very_bullshit_search_container').html('');
        return $('.so_sorry').show();
      }
    });
  } else if (text.length > 400) {
    $(this).val(text.slice(0, 400));
    return alert('Помни, краткость сестра таланта');
  } else if (text.length < 2) {
    $('.very_bullshit_search_container').html('');
    return $('.so_sorry').hide();
  }
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
  $(".wow_wrapper.search div[class != 'so_sorry']").fadeIn(600);
  $('textarea').focus();
  return $('.very_bullshit_search_container').html('');
});

$('body').on('click', '.wow_hide_search', function(e) {
  e.preventDefault();
  $('.wow_wrapper.search').fadeOut(600);
  $('.wow_wrapper.main').fadeIn(600);
  $('.wow_wrapper.main div').fadeIn(600);
  return $('.wow_wrapper.search div').fadeOut(600);
});

$('body').on('click', '.wow_publish', function(e) {
  var input, text;
  e.preventDefault();
  input = $(this).parent().find('.very_search_input');
  input.css('text-transform', 'none');
  text = input.val();
  input.css('text-transform', 'uppercase');
  if (text.length < 2) {
    return false;
  }
  return $.post('/bullshit', {
    text: text
  }, function(data) {
    if (data.status === 'success') {
      $('.very_bullshit_container').html('');
      pageId = 0;
      $.get("/bullshits/" + pageId, function(data) {
        $('.very_bullshit_container').html('');
        return showBullshits($('.very_bullshit_container'), data);
      });
      input.val('');
      $('.wow_wrapper.search').fadeOut(600);
      $('.wow_wrapper.main').fadeIn(600);
      $('.wow_wrapper.main div').fadeIn(600);
      return $('.wow_wrapper.search div').fadeOut(600);
    }
  });
});

$('body').on('click', '.wow_del_bullshit', function(e) {
  var bullshit, id;
  id = $(this).attr('data-id');
  bullshit = $(this).parents('.bullshit');
  return $.ajax({
    url: "/bullshit/" + id,
    type: 'DELETE',
    success: function(result) {
      return bullshit.remove();
    }
  });
});

$(document).scroll(function(e) {
  if ($(window).height() + $(window).scrollTop() > $(document).height() - 300) {
    pageId++;
    console.log(pageId);
    return $.get("/bullshits/" + pageId, function(data) {
      return showBullshits($('.very_bullshit_container'), data);
    });
  }
});

date = new Date();

year = date.getFullYear();

month = monthText[date.getMonth()];

day = date.getDate();

hours = date.getHours();

minutes = date.getMinutes() + '';

minutes = minutes.length > 1 ? minutes : '0' + minutes;

dateFormat = day + ' ' + month + ' ' + year + ' / ' + hours + '<span class="blink">:</span>' + minutes;

$('.very_date').html(dateFormat);

if (typeof bullshit !== "undefined" && bullshit !== null) {
  value = bullshit;
  date = new Date(value.date);
  year = date.getFullYear();
  month = monthText[date.getMonth()];
  day = date.getDate();
  hours = date.getHours();
  minutes = date.getMinutes();
  str = value.text;
  reg = /(([a-z]+:\/\/(www\.)*)*[a-z0-9\-_]+\.[a-z]+[a-z0-9\.\/\-_=\?\&;#%\$\(\)]*)/igm;
  pregMatch = str.match(reg);
  value.text = str.replace(reg, function(s) {
    var msg;
    msg = /:\/\//.exec(s) === null ? "http://" + s : s;
    return "<a href=\"" + msg + "\">" + s + "</a>";
  });
  dateFormat = day + ' ' + month + ' ' + year + ' / ' + hours + ':' + minutes;
  url = window.location.origin + "/bullshit/" + value._id;
  society = "<a href=\"http://vkontakte.ru/share.php?url=" + url + "&title=Bullshit Board&description=" + (_.escape(value.text)) + "\" target=\"_blank\">Вконтакте</a> / <a target=\"_blank\" href=\"http://www.facebook.com/sharer/sharer.php?u=" + url + "\">Фейсбук</a> / <a href=\"https://twitter.com/intent/tweet?text=Bullshit Board. " + (_.escape(value.text)) + "&url=" + url + "\" rel=\"nofollow\" target=\"_blank\">Твиттер</a>";
  if (getCookie('admin') === 'IDKFA') {
    society += " / <span class='wow_del_bullshit' data-id='" + value._id + "'>Участковому</span>";
  }
  rotate = Math.random() * (0.3 - (-0.3)) + -0.3;
  $('.very_bullshit_search_container').append("<div class='bullshit' style='transform: rotate(" + rotate + "deg); -webkit-transform: rotate(" + rotate + "deg);-moz-transform: rotate(" + rotate + "deg);-o-transform: rotate(" + rotate + "deg);-ms-transform: rotate(" + rotate + "deg) ;'><div class='such_bullshit_message'>" + value.text + "</div><div class='many_footer'>[ " + dateFormat + " ] рассказать об этом: " + society + "</div></div>");
}
});

;
//# sourceMappingURL=app.js.map
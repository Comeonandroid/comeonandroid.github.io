
htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;'
};

htmlEscaper = /[&<>"'\/]/g

_.escape = (string) ->
  return ('' + string).replace(htmlEscaper, (match) ->
    return htmlEscapes[match];
)



pageId = 0

monthText = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря']

getCookie = (name)->
  matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ))
  if matches then return decodeURIComponent(matches[1]) else return undefined

showBullshits = (container,data) ->
  for key,value of data
    date    = new Date(value.date)
    year    = date.getFullYear()
    month   = monthText[date.getMonth()]
    day     = date.getDate()
    hours   = date.getHours()
    minutes = date.getMinutes()

    dateFormat = day + ' ' + month + ' ' + year + ' / ' + hours + ':' + minutes
    url = window.location.origin + "/bullshit/" + value._id

    society = "<a href=\"http://vkontakte.ru/share.php?url=#{url}&title=Bullshit Board\" target=\"_blank\">Вконтакте</a> / <a target=\"_blank\" href=\"http://www.facebook.com/sharer/sharer.php?u=#{url}\">Фейсбук</a> / <a href=\"https://twitter.com/intent/tweet?text=Bullshit Board. #{_.escape(value.text)}&url=#{url}\" rel=\"nofollow\" target=\"_blank\">Твиттер</a>"

    if getCookie('admin') is 'IDKFA'
      society += " / <span class='wow_del_bullshit' data-id='#{value._id}'>Участковому</span>"

    rotate = Math.random() * (0.3 - (-0.3)) + -0.3

    container.append("<div class='bullshit' style='transform: rotate(#{rotate}deg); -webkit-transform: rotate(#{rotate}deg);-moz-transform: rotate(#{rotate}deg);-o-transform: rotate(#{rotate}deg);-ms-transform: rotate(#{rotate}deg) ;'><div class='such_bullshit_message'>#{value.text}</div><div class='many_footer'>[ #{dateFormat} ] рассказать об этом: #{society}</div></div>")



$.get "/bullshits/#{pageId}", (data)->
  showBullshits($('.very_bullshit_container'),data)




$('body').on 'keyup','.very_search_input', ()->
  $(@).height($(@).height() + $(@).scrollTop())
  if $(@).val().length > 2
    text = $(@).val()
    $.get "/bullshits/search/#{text}", (data)->
      if(data.length > 0)
        $('.very_bullshit_search_container').html('')
        showBullshits($('.very_bullshit_search_container'),data)
        $('.so_sorry').hide()
      else
        $('.very_bullshit_search_container').html('')
        $('.so_sorry').show()
  else
    $('.very_bullshit_search_container').html('')
    $('.so_sorry').hide()

$('body').on 'click','.wow_show_about', (e)->
  e.preventDefault();
  $(@).css 'opacity',0
  $('.about').css {left:'0px',overflow:'visible'}
  $('.main').css 'left','320px'

$('body').on 'click','.wow_hide_about', (e)->
  e.preventDefault();
  $('.wow_show_about').css 'opacity',1
  $('.about').css {left:'-320px',overflow:'hidden'}
  $('.main').css 'left','0px'

$('body').on 'click','.wow_show_search', (e)->
  e.preventDefault();
  $('.wow_wrapper.search').fadeIn(600)
  $('.wow_wrapper.main').fadeOut(500)
  $('.wow_wrapper.main div').fadeOut(500)
  $(".wow_wrapper.search div[class != 'so_sorry']").fadeIn(600)
  $('textarea').focus()
  $('.very_bullshit_search_container').html('')


$('body').on 'click','.wow_hide_search', (e)->
  e.preventDefault();
  $('.wow_wrapper.search').fadeOut(600)
  $('.wow_wrapper.main').fadeIn(600)
  $('.wow_wrapper.main div').fadeIn(600)
  $('.wow_wrapper.search div').fadeOut(600)

$('body').on 'click','.wow_publish', (e)->
  e.preventDefault()

  input = $(this).parent().find('.very_search_input')
  input.css 'text-transform', 'none'
  text = input.val()
  input.css 'text-transform', 'uppercase'

  $.post '/bullshit',{text: text}, (data)->
    if data.status is 'success'
      $('.very_bullshit_container').html('')
      pageId = 0
      $.get "/bullshits/#{pageId}", (data)->
        $('.very_bullshit_container').html('')
        showBullshits($('.very_bullshit_container'),data)
      input.val('');
      $('.wow_wrapper.search').fadeOut(600)
      $('.wow_wrapper.main').fadeIn(600)
      $('.wow_wrapper.main div').fadeIn(600)
      $('.wow_wrapper.search div').fadeOut(600)

$('body').on 'click','.wow_del_bullshit', (e)->
  id = $(@).attr('data-id')
  bullshit = $(@).parents('.bullshit')
  $.ajax({
    url: "/bullshit/#{id}",
    type: 'DELETE',
    success: (result) ->
      bullshit.remove()
  })

$(document).scroll (e)->
  if $(window).height() + $(window).scrollTop() > $(document).height() - 300
    pageId++
    console.log pageId
    $.get "/bullshits/#{pageId}", (data)->
      showBullshits($('.very_bullshit_container'),data)

date    = new Date()
year    = date.getFullYear()
month   = monthText[date.getMonth()]
day     = date.getDate()
hours   = date.getHours()
minutes = date.getMinutes()

dateFormat = day + ' ' + month + ' ' + year + ' / ' + hours + ':' + minutes

$('.very_date').text(dateFormat)


if bullshit?
  value = bullshit

  date    = new Date(value.date)
  year    = date.getFullYear()
  month   = monthText[date.getMonth()]
  day     = date.getDate()
  hours   = date.getHours()
  minutes = date.getMinutes()

  dateFormat = day + ' ' + month + ' ' + year + ' / ' + hours + ':' + minutes

  url = window.location.origin + "/bullshit/" + value._id

  society = "<a href=\"http://vkontakte.ru/share.php?url=#{url}&title=Bullshit Board\" target=\"_blank\">Вконтакте</a> / <a target=\"_blank\" href=\"http://www.facebook.com/sharer/sharer.php?u=#{url}\">Фейсбук</a> / <a href=\"https://twitter.com/intent/tweet?text=Bullshit Board. #{_.escape(value.text)}&url=#{url}\" rel=\"nofollow\" target=\"_blank\">Твиттер</a>"


  $('.very_bullshit_search_container').append("<div class='bullshit'><div class='such_bullshit_message'>#{value.text}</div><div class='many_footer'>[ #{dateFormat} ] рассказать об этом: #{society}</div></div>")


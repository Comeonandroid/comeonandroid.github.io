# Write your code here!
$('body').on 'keyup','.very_search_input', ()->
  $(@).height($(@).height() + $(@).scrollTop())

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
  $('.wow_wrapper.search div[class!=so_sorry]]').fadeIn(600)
  $('textarea').focus()

$('body').on 'click','.wow_hide_search', (e)->
  e.preventDefault();
  $('.wow_wrapper.search').fadeOut(600)
  $('.wow_wrapper.main').fadeIn(600)
  $('.wow_wrapper.main div').fadeIn(600)
  $('.wow_wrapper.search div').fadeOut(600)

$('body').on 'click','.wow_publish', (e)->
  e.preventDefault()
  input = $(this).parent().find('.very_search_input')

  $.post '/bullshit',{text: input.val()}, (data)->
    if data.status is 'success'
      $('.very_bullshit_container').html('')
      pageId = 0
      getAndShowBullshits(pageId)
      input.val('');
      $('.wow_wrapper.search').fadeOut(600)
      $('.wow_wrapper.main').fadeIn(600)
      $('.wow_wrapper.main div').fadeIn(600)
      $('.wow_wrapper.search div').fadeOut(600)




pageId = 0

monthText = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря']

getAndShowBullshits = (pageId)->
  $.get "/bullshits/#{pageId}", (data)->
    for key,value of data
      date    = new Date(value.date)
      year    = date.getFullYear()
      month   = monthText[date.getMonth()]
      day     = date.getDate()
      hours   = date.getHours()
      minutes = date.getMinutes()

      dateFormat = day + ' ' + month + ' ' + year + ' / ' + hours + ':' + minutes

      $('.very_bullshit_container').append("<div class='bullshit'><div class='such_bullshit_message'>#{value.text}</div><div class='many_footer'>[ #{dateFormat} ] рассказать об этом: Вконтакте / Фейсбук / Твиттер</div></div>")

getAndShowBullshits(pageId)

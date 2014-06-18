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
    $('.wow_wrapper.search div').fadeIn(600)
    $('textarea').focus()

$('body').on 'click','.wow_hide_search', (e)->
    e.preventDefault();
    $('.wow_wrapper.search').fadeOut(600)
    $('.wow_wrapper.main').fadeIn(600)
    $('.wow_wrapper.main div').fadeIn(600)
    $('.wow_wrapper.search div').fadeOut(600)
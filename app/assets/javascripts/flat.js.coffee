# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

# "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
window.onload = -> init()
window.onresize = -> scaleSection() if $(window).height() > 550

adjustHeight = (elem) -> $(elem).css height: $(window).height()
scaleSection = -> $('section').map( -> adjustHeight(this))

softScroll = ->
  $ ->
    $("a[href*=#]:not([href=#])").click ->
      if location.pathname.replace(/^\//, "") is @pathname.replace(/^\//, "") and location.hostname is @hostname
        target = $(@hash)
        target = (if target.length then target else $("[name=" + @hash.slice(1) + "]"))
        if target.length
          $("html,body").animate
            scrollTop: target.offset().top
          , 500
          false

init = ->
  scaleSection()
  softScroll()
  true
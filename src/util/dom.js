// Source: https://www.kirupa.com/html5/getting_mouse_click_position.htm
export function getPosition(el) {
  var x = 0
  var y = 0

  while (el) {
    if (el.tagName === 'BODY') {
      // deal with browser quirks with body/window/document and page scroll
      var xScrollPos = el.scrollLeft || document.documentElement.scrollLeft
      var yScrollPos = el.scrollTop || document.documentElement.scrollTop

      x += (el.offsetLeft - xScrollPos + el.clientLeft)
      y += (el.offsetTop - yScrollPos + el.clientTop)
    } else {
      x += (el.offsetLeft - el.scrollLeft + el.clientLeft)
      y += (el.offsetTop - el.scrollTop + el.clientTop)
    }

    el = el.offsetParent
  }

  return { x, y }
}

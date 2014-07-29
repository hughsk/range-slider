var mpos  = require('mouse-position')
var clamp = require('clamp')
var noop  = (function noop(){})

module.exports = createSlider

function createSlider(outer, initial, update) {
  if (!update) update = noop
  if (typeof initial === 'function') {
    update = initial
    initial = 0.5
  }

  var inner    = document.createElement('div')
  var position = getComputedStyle(
    outer
  ).getPropertyValue('position')

  if (!position
    || position === 'static'
    || position === 'inherit'
  ) outer.style.position = 'relative'

  initial = typeof initial === 'number' ? initial : 0.5
  inner.style.width = clamp(initial, 0, 1) * 100 + '%'
  inner.style.height = '100%'
  outer.style.cursor = 'ew-resize'
  outer.appendChild(inner)

  var mouse  = mpos(outer, window)
  var moving = false
  var prev   = -1

  mouse.on('move', function() {
    if (!moving) return

    var bounds = outer.getBoundingClientRect()
    var ratio  = clamp(mouse.x / bounds.width, 0, 1)

    inner.style.width = ratio * 100 + '%'

    if (prev !== ratio) {
      update(prev = ratio)
    }
  })

  outer.addEventListener('mousedown', function(e) {
    moving = true
    updateSelection('none')
  }, false)

  window.addEventListener('mouseup', function(e) {
    moving = false
    updateSelection('initial')
  }, false)

  return inner
}

function updateSelection(value) {
  var b = document.body.style
  b.webkitTouchCallout =
  b.webkitUserSelect =
  b.khtmlUserSelect =
  b.mozUserSelect =
  b.msUserSelect =
  b.userSelect = value
}

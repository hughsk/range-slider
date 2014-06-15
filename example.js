var range = require('./')

var outer = document.createElement('div')
var inner = range(outer, 0.25, update)
var text  = document.createElement('div')

inner.style.background = '#444'

outer.style.height = '24px'
outer.style.padding = '2px'
outer.style.border = '1px solid #aaa'
outer.style.width = '40%'

text.style.marginTop = '48px'
text.style.fontFamily = 'monospace'

;[text, outer].forEach(function(el) {
  el.style.position = 'absolute'
  el.style.top = '50%'
  el.style.left = '50%'
  el.style.webkitTransform =
  el.style.mozTransform =
  el.style.transform = 'translate(-50%, -50%)'
})

document.body.appendChild(outer)
document.body.appendChild(text)

function update(value) {
  text.innerHTML = Math.round(value * 100)
}

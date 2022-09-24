export function zoom(e){
  var zoomer = e.currentTarget;
  e.pageX ? pageX = e.pageX : pageX = e.touches[0].pageX
  e.pageY ? pageY = e.pageY : pageX = e.touches[0].pageX
  x = pageX/zoomer.offsetWidth*100
  y = pageY/zoomer.offsetHeight*100
  zoomer.style.backgroundPosition = x + '% ' + y + '%';
}
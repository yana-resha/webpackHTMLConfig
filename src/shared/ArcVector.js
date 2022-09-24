import '././Scheme2/arcVector.css'

export function ArcVector () {



  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', "0 0 234.02 24.23");

  const groupParent = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  const groupChildren = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.classList.add('vector')
  path.setAttribute('d', 'M272.83,362a313.91,313.91,0,0,1-233.65,1.42');
  path.setAttribute('transform', 'translate(-39 -361.52)')
  const text = document.createElementNS("http://www.w3.org/2000/svg","text");
  text.classList.add('textSvg')
  text.setAttribute('transform', 'translate(97 14.2)')
  const tspan = document.createElementNS("http://www.w3.org/2000/svg","tspan");
  tspan.setAttribute('xml:space',"preserve")
  tspan.textContent = 'Экран'

  text.append(tspan)

  groupChildren.append( text, path)
  groupParent.append(groupChildren)
  svg.append(groupParent)
  return svg;
}


import tippy from 'tippy.js';


export function Sector (fill,  arr, id) {


  let ticketArr = [];
  let cx = -12;
  let cy = -60;
  let cicleArr = arr.map((object, index) => {
    cx += 24.5
    // if (cx === 285) cx = 15.5
    if (cx > 282) cx = 12.5
    if (index % 12 == 0) {
      cy += 60
    }
    const svg = Circle(fill, cy, cx, 9);
    tippy(svg, {content: `ряд: ${object.row} место: ${object.number} цена: ${object.price} `, theme: 'my-theme'});


    svg.addEventListener('click', () => {
      svg.classList.toggle('active');
      ticketArr.push(object)

  })
    svg.id = object.id;
    object.svg = svg;
    return object
  })

  let rowArr = [];
  for (let i = 0; i < 6; ++i) {
    const group = Group();
    rowArr.push(group)
  }
  let numberRow = 0;
  let count = -1;

  for (let j = 0; j < rowArr.length; ++ j) {
    for (let i = 0; i < 12; ++i) {
      count +=1;
      if (count === 12) {
        numberRow += 1;
      }
      if (numberRow === rowArr.length) return

      rowArr[j].append(cicleArr[count].svg)
    }
  }

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.id = id;
  svg.setAttribute('width', '300');
  svg.setAttribute('height', '400');
  svg.setAttribute('viewBox', '0 0 300 300');
  svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
  const polygon = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
  polygon.setAttribute('points', '0,-50 0, 350,300,350 300,-50')

  polygon.setAttribute('fill', 'none')
  svg.append(polygon)
  rowArr.forEach(el => {
    svg.append(el)
  })
  return svg
}

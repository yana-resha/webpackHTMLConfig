import './scheme1.css'
import { Rect, Text, Circle, Path } from "./Scheme2";
import uniqid from 'uniqid';
import { setLocalStoraToTicketForPay } from '../localStorage';
import tippy from 'tippy.js';

function createSectorArr (price) { // эта функция лишняя я ее написала вместо запроса с сервера

  class Place {
    constructor (number, row, status, price) {
      this.number = number;
      this.row = row;
      this.status = status;
      this.price = price;
      this.id = uniqid();
      }
    }

     let arr = [];
     let count = 0;
     let row = 2;
     let free = 'free';

     for (let i = 0; i < 5; ++i) {
      count +=1;
       if (i === 3)  row -= 1;
       let newPlace = new Place(count, row, free , price)
       arr.push(newPlace)
      }

      return arr
  }

export function smartCircle (arr) {
  return arr.map(el => {
    const dropdown = document.querySelector('#opencontent');
    const list = dropdown.querySelector('ul');
    let circle = el.circle();
    circle.addEventListener('click', () => {

      dropdown.classList.add('open-content--show');
      list.innerHTML = '';
      let ticket = [];
      let activeCicle = Array.from(document.querySelectorAll('.active'));
      for (let i = 0; i < arr.length; ++ i) {
        for (let j = 0; j < activeCicle.length; ++j) {
          if (arr[i].infoPlace.id === activeCicle[j].id) {
            ticket.push(arr[i].infoPlace)
          }
        }
      }

      ticket.forEach(el => {
        console.log(ticket)
        const button = document.createElement('button');
        const li = document.createElement('li');
        li.append(button)
        button.textContent = `ряд: ${el.row} место: ${el.number} цена: ${el.price}`;
          list.append(li);
      })
      let notActive = Array.from(document.querySelectorAll("circle:not(.active)"))
      ticket.length >= 5 ? notActive.forEach(el => el.style.pointerEvents = 'none') : notActive.forEach(el => el.style.pointerEvents = 'auto');
      if (ticket.length === 0) dropdown.classList.remove('open-content--show');
      setLocalStoraToTicketForPay(ticket)
    })
    return circle
  })
}

export function Scheme1 () {


  const places = createSectorArr (1000, 3);


  const svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
  svg.setAttribute('viewBox', '0 0 283.82 169.8')
  svg.setAttribute('xmlns',"http://www.w3.org/2000/svg")
  const defs = document.createElementNS("http://www.w3.org/2000/svg", 'defs');
  const style = document.createElementNS("http://www.w3.org/2000/svg", 'style');

  style.innerHTML ='.cls-1,.cls-2,.cls-6{fill:none;stroke-miterlimit:10;}.cls-1{stroke:#1d1d1b;}.cls-2{stroke:#881f7f;}.cls-3{fill:#b04894;}.cls-4{fill:#b24c96;}.cls-5{font-size:12px;fill:#4c225d;font-family:MyriadPro-Regular, Myriad Pro;}.cls-6{stroke:#581849;}'


  defs.append(style)
  const rect = new Rect('cls-2', 110.38, 1.88,  73.75, 264.5, 'translate(273.28 -109.88) rotate(90)').rect();
  const text = new Text("translate(127.66 165.25)",'Экран', "cls-5").text();
  const path = new Path("cls-6", "M291.75,242.5A447.74,447.74,0,0,1,155.26,266a448.25,448.25,0,0,1-147-22.5", "translate(-8.09 -96.75)").path();

  let circle = [
    new Circle('cls-4', "24.91", "15.75", "12.5", places[0]),
    new Circle('cls-4', "140.16", "15.75", "12.5", places[1]),
    new Circle('cls-4', "253.66", "15.75", "12.5", places[2]),
    new Circle('cls-4', "82.16", "49.88", "12.5", places[3]),
    new Circle('cls-4', "202.66", "49.88", "12.5", places[4]),
  ];


   let circleGroup= smartCircle(circle);

   console.log(circleGroup);
  svg.append(defs,rect, text, path);
  circleGroup.forEach(el => svg.append(el))

  return svg

}

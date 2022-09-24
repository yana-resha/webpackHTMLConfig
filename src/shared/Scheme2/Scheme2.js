import './scheme2.css'
import { Sector } from './Sector'
import { ArcVector } from '../ArcVector';
import uniqid from 'uniqid';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { setLocalStoraToTicketForPay } from '../localStorage';

import tippy from 'tippy.js';


function createSectorArr (price, countRow) { // эта функция лишняя я ее написала вместо запроса с сервера

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
   let count = 1;
   let row = 4;
   let free = 'free';

   for (let i = 0; i < countRow; ++i) {
     row -= 1;
     let newPlace = new Place(count, row, free , price)
     arr.push(newPlace)
    }

    return arr
}


export class Rect {
  figure = 'rect';
  constructor (nameClass, x, y, width, heigth, transform) {
    this.nameClass = nameClass;
    this.x = x;
    this.y = y;
    this.width = width;
    this.heigth = heigth;
    this.transform = transform;
  }

  rect() {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", `${this.figure}`);
    rect.setAttribute('x', `${this.x}`);
    rect.setAttribute('y', `${this.y}`);
    rect.setAttribute('width', `${this.width}`);
    rect.setAttribute('heigth', `${this.heigth}`);
    rect.setAttribute('class', `${this.nameClass}`);
    rect.setAttribute('transform', `${this.transform}`)
    return rect
  }
}


export class Text {
  figure = 'text';
  constructor (transform, textContent, className) {
    this.transform = transform;
    this.textContent = textContent;
    this.className = className;
  }

  text() {
    const text = document.createElementNS("http://www.w3.org/2000/svg", `${this.figure}`);
    text.setAttribute('transform', this.transform)
    text.setAttribute('class', this.className);
    text.textContent = `${this.textContent}`
    return text
  }
}
export class Path {
  figure = 'path';
  constructor (className, coordinate, transform) {
    this.className = className;
    this.coordinate = coordinate;
    this.transform = transform;
  }
  path() {
    const path = document.createElementNS("http://www.w3.org/2000/svg", `${this.figure}`);
    path.setAttribute('class', this.className)
    path.setAttribute('d', this.coordinate)
    path.setAttribute('transform', this.transform)

    return path
  }
}


export class Circle {
  figure = 'circle';
  constructor (className, x, y,r, infoPlace) {

    this.className = className;
    this.x = x;
    this.y = y;
    this.r = r;
    this.infoPlace = infoPlace;
  }

  circle() {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", `${this.figure}`);
    circle.setAttribute('cx', this.x);
    circle.setAttribute('id', this.infoPlace.id);
    circle.setAttribute('cy', this.y);
    circle.setAttribute('r', this.r);
    circle.setAttribute('class', this.className);
    tippy(circle, {content: `ряд: ${this.infoPlace.row} место: ${this.infoPlace.number} цена: ${this.infoPlace.price} `, theme: 'my-theme'});
    circle.addEventListener('click', () => {
      circle.classList.toggle('active')
    })
    return circle;
  }
}







export function Scheme2 () {

  const leftPlaces = createSectorArr (500, 4)
  const rigthPlaces = createSectorArr (1000, 4)

  const dropdown = DropdownMenu();
  document.querySelector('header').append(dropdown)

  const svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
  svg.setAttribute('viewBox', '0 0 448.1 370.44')
  svg.setAttribute('xmlns',"http://www.w3.org/2000/svg")
  const defs = document.createElementNS("http://www.w3.org/2000/svg", 'defs');

  const rectleft = new Rect('cls-1', 78.5, 0.5, 110.5, 291, '').rect();
  const rectRigth = new Rect('cls-1', 274.5, 0.5, 110.5, 291, '').rect();

  const text2 = new Text("translate(215 349.46)",'Экран', "cls-3").text();

  let leftSectorCircle = [
    new Circle('cls-7', "133.75", "35.75", "15.62", leftPlaces[0]),
    new Circle('cls-7', "133.75", "135", "15.62", leftPlaces[1]),
    new Circle('cls-7', "133.75", "239.12", "15.62", leftPlaces[2])
  ]


  let rigthSectorCircle = [
    new Circle('cls-0', "329.75", "35.75", "15.62", rigthPlaces[0]),
    new Circle('cls-0', "329.75", "135", "15.62", rigthPlaces[1]),
    new Circle('cls-0', "329.75", "239.12", "15.62", rigthPlaces[2])
  ]

  const path = new Path("cls-4", "M477,342.5A1151.54,1151.54,0,0,1,249.5,365a1152,1152,0,0,1-210-19.5", "translate(-25 0.5)").path();


  let arr =[...leftSectorCircle, ...rigthSectorCircle];

  // это логика для кнопок нужно перенести в отдельную функцию!!!!
  let placeArr = arr.map(el => {
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

  svg.append(defs, rectleft, text2, path, rectRigth)
  placeArr.forEach(el => svg.append(el));




  return svg
}


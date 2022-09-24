import './styles/main.css'
import './styles/normalize.css'
import {Scheme2} from './shared/Scheme2/Scheme2'
import { ajax } from 'jquery';
import $ from "jquery";
import 'jquery';
import Navigo from 'navigo';
import DropdownMenu from './shared/DropdownMenu/DropdownMenu';
const router = new Navigo('/');





class Hall {
  constructor (name, id) {
    this.name = name;
    this.id = id;
  }
}



function createHeader () {
  const header = document.createElement('header');
  header.classList.add('header')
  const container = createContainer();
  container.classList.add('header__container')
  header.append(container)
  const title = document.createElement('h1');
  title.classList.add('header__title')
  title.textContent = 'Кинотеатр Мираж';

  const nav = document.createElement('nav');
  const list = document.createElement('ul');
  const li = document.createElement('li');
  const button = document.createElement('button')
  button.textContent = 'Старт'
  button.id = 'start'
  nav.append(list)
  list.append(li);
  li.append(button)
  container.append(title, nav)
  return header
}

function createSectionContent () {
  const section = document.createElement('section');
  section.classList.add('section-content')
  const container = document.createElement('div')
  container.classList.add('content');
  section.append(container)
  return section
}

function createContainer () {
  const container = document.createElement('div');
  container.classList.add('container')
  return container
}

function createFooter () {
  const footer = document.createElement('footer');
  const block = document.createElement('div');

  block.classList.add('dropdown-pay__block');
  block.id = 'dropdown-pay';
  footer.append(block)

  return footer
}

function getStarted () {
  const header = createHeader();
  const content = createSectionContent ();
  const footer  = createFooter ()

  window.document.body.append(header, content, footer)
  const startButton = $('#start')[0];


  startButton.addEventListener('click', (event) => {
    event.stopPropagation();
    const freeHall = [new Hall('Большой зал', 1), new Hall('Maлый зал', 2)];
    const dropdown = $('.open-content')
    if (dropdown.length === 0) {
      const dropdown = DropdownMenu(freeHall);
      header.append(dropdown);
      dropdown.classList.add('open-content--show');
    } else dropdown[0].classList.toggle('open-content--show');
  })
}


getStarted();

const contentContainer = $('.content');

router.on('/2', function () {
  contentContainer.innerHTML = '';
  $('#start')[0].style.display = 'none';
  contentContainer.append(Scheme2());
});

// router.on('/1', function () {
//   window.document.body.innerHTML = ''
// });


router.resolve();



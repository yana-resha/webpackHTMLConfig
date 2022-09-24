import './dropdownMenu.css'
import {getLocalStorageTicketForPay} from '../localStorage'
import $ from "jquery";
import 'jquery';
import Navigo from 'navigo';
import { Scheme2 } from '../Scheme2/Scheme2';
import { Scheme1 } from '../Scheme2/Scheme1';
const router = new Navigo('/');


 export default function DropdownMenu (content = []) {

  const mainContainer = document.createElement('div');
  const container =  document.createElement('div');
  mainContainer.classList.add('open-content')
  container.classList.add('container', 'dropdown-container')
  mainContainer.id = 'opencontent';
  const hallList = document.createElement('ul');
  hallList.classList.add('dropdown-list')
  const button = document.createElement('button');
  button.id = 'pay'
  button.textContent = 'Оплатить';
  container.append(hallList, button)


  content.forEach(el => {
    const contentButton = document.createElement('button');
    contentButton.textContent = `${el.name}`;
    const li = document.createElement('li');
    button.remove();
    li.append(contentButton);
    contentButton.addEventListener('click', () => {
      router.navigate(`/${el.id}`);
    })
    hallList.append(li);
  });

  button.addEventListener('click', () => {
    mainContainer.classList.remove('open-content--show');
  })
  mainContainer.append(container)
  return mainContainer
}


router.on('/2', function () {
  const contentContainer = $('.content')[0]
  contentContainer.innerHTML = '';
  contentContainer.append(Scheme2());
  // document.querySelector('.content__container').append(Sheme2())

});


router.on('/1', function () {
  const contentContainer = $('.content')[0]
  contentContainer.innerHTML = '';
  contentContainer.append(Scheme1());
  // document.querySelector('.content__container').append(Sheme2())

});


/* Задания на урок:

+1) Удалить все рекламные блоки со страницы (правая часть сайта)

+2) Изменить жанр фильма, поменять "комедия" на "драма"

+3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */
"use strict";

window.addEventListener("DOMContentLoaded", () => {
  const movieDB = {
    movies: [
      "Логан" /*`${"https://images.app.goo.gl/UegTuVMVePjwszHP8"}`*/ ,
      "Лига справедливости" /*`${"https://g.co/kgs/24pzPt"}`*/ ,
      "Ла-ла лэнд",
      "Одержимость",
      "Скотт Пилигрим против...",
    ],
  };
  const advRemove = document.querySelectorAll(".promo__adv img"),
    promo__bg = document.querySelector(".promo__bg"),
    promo__genre = promo__bg.querySelector(".promo__genre"),
    btn = document.querySelector("button"),
    ul = document.querySelector(".promo__interactive-list"),
    inputs = document.querySelector(".adding__input"),
    li = document.querySelectorAll(".promo__interactive-item"),
    delFilm = document.querySelectorAll(".delete"),
    checkFav = document.querySelector("[type=checkbox]");

  advRemove.forEach((item) => {
    item.remove();
  });
  promo__genre.textContent = "драмма";
  promo__bg.style.backgroundImage = 'url("img/bg.jpg")';

  let oldListItem = document.querySelectorAll(".promo__interactive-item");
  let oldUl = document.querySelector(".promo__interactive-list");

  oldUl.innerHTML = "";
  movieDB.movies.sort();

  let newFilm;
  che();
  btn.addEventListener("click", add);
  btn.addEventListener("click", ulReset);
  btn.addEventListener("click", che);
  del();

  function del() {
    ul.addEventListener("click", (e) => {
      li.forEach((item) => {
        if (e.target.className === "delete") {
          console.log(ul.firstElementChild);
          ul.removeChild(e.target.closest("li"));
          movieDB.movies.pop();
        }
      });
    });
  }

  function add(e) {
    e.preventDefault();
    newFilm = inputs.value;

    if (newFilm) {
      if (newFilm.length > 21) {
        newFilm = `${newFilm.substring(0, 21)} ...`;
      }
      movieDB.movies.push(newFilm);
      movieDB.movies.sort();
    } else {
      alert("Пиши фильм");
    }

    if (checkFav.checked) {
      console.log("Добавляем любимый фильм");
    }
    document.forms[1].reset();
  }

  function che() {
    oldUl.innerHTML += "";
    movieDB.movies.forEach((item, i) => {
      oldUl.innerHTML += `
     <li class="promo__interactive-item">${i + 1} ${item}
          <div class="delete"></div>
      </li>
     `;
    });
  }

  function ulReset() {
    oldUl.innerHTML = "";
  }
});
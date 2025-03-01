'use strict';

// DOMContentLoaded — это событие в JavaScript, которое срабатывает, когда весь HTML-документ был полностью загружен и разобран
document.addEventListener('DOMContentLoaded', () => {

    // хранилище данных о фильмах
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ],
    };

    // добавляем переменные из html структуры 
    const adv = document.querySelectorAll('.promo__adv'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]');

    // добавляем новое событие
    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addInput.value;
        const favorite = checkbox.checked;

        if (newFilm) {

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 21)}...`; //— извлекает строку от индекса 0 до 21 (не включая индекс 21), т.е. она будет содержать только первые 21 символ
            }

            if (favorite) {
                console.log("Добавляем любимый фильм");
            }

            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);

            createMovieList(movieDB.movies, movieList);
        }

        event.target.reset();

    });

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove(); // свойство remove удаляем элементы
        });
    };
    
    const makeChanges = () => {
        genre.textContent = 'драма';

        poster.style.backgroundImage = 'url("img/bg.jpg")';
    }

    const sortArr = (arr) => {
        arr.sort(); // сортируем по алфавиту
    }

    movieDB.movies.forEach((film, i) => {
        movieList.innerHTML += `
        <li class="promo__interactive-item">${i + 1} ${film}
            <div class="delete"></div>
        </li>
    `;
    });

    function createMovieList(films, parent) {
        parent.innerHTML = ""; // создаем пустую строку
        sortArr(films); // сортируем по алфавиту

        films.forEach((film, i) => {
            parent.innerHTML += `
        <li class="promo__interactive-item">${i + 1} ${film}
            <div class="delete"></div>
        </li>
    `;
        });
        
        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                createMovieList(films, parent);
            });
        });
    }

    // Вызов функций
    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, movieList);
});

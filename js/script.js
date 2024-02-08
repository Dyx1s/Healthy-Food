window.addEventListener('DOMContentLoaded', () => {
    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsMenu = document.querySelector('.tabheader__items');

    //Скрываем все табы
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade')
        });

        //Удаляем активные табы из header-a
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    };

    //Показываем активные табы, по умолчанию будет первый таб (i = 0 изначально
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    };

    hideTabContent();
    showTabContent();
    //Событие при клике на эл-ты хеда
    //Логика такая. Перебираем tabs и сравниваем, если эл-т tabs совпадает с тем, куда кликнул пользователь, то мы запускаем showTabContent, куда в кач-ве аргумента передаем номер tab.
    tabsMenu.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => { //i - номер таба
                if(target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
                console.log(i);
            })
        }
    });

    //Timer

    const deadline = '2024-02-09';

    function getTimeRemaning(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());
        //Прописываем условие, если deadline уже прошел
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor( (t / (1000*60*60*24)) ),
            hours = Math.floor( (t / (1000*60*60) % 24) ),
            minutes = Math.floor( (t / 1000/60) % 60 ),
            seconds = Math.floor( (t / 1000) % 60 );
        }

        return { //возвращаем элементы из ф-ции наружу
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };
    //Добавляем 0 перед цифрами для красопеты
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }
    //Сам таймер
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector("#days"),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();
        //Обновление таймера
        function updateClock() {
            const t = getTimeRemaning(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        };
    }

    setClock('.timer', deadline);

    //Modal window

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');

    //открытие модалки
    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden'; //откл скролл
        clearInterval(modalTimerId); //Если юзер открыл уже модалку, то modalTimerId вырубается
    };

    // закрытиe модалки
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    modalCloseBtn.addEventListener('click', closeModal);

    //Закрытие модалки по клику на обложку
    modal.addEventListener('click', (event) => {
        if(event.target === modal) {
            closeModal();
        }
    });
    //Закрытие по escape с проверкой открытия модалки на странице
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 5000);
    
    //Появление модалки при прокручивании до конца страницы
    function showModalByScroll() {
        //складываем высоту прокрученного контента и высоту контента на экране и сравниваем с полной высотой документа (-1px ставим, чтоб модалка открылась)
        if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);//чтоб сработало 1 раз
        }
    } 
    //Если пользователь долистал, то мы открываем модалку
    window.addEventListener('scroll', showModalByScroll);


});
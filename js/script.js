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
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor( (t / (1000*60*60*24)) ),
              hours = Math.floor( (t / (1000*60*60) % 24) ),
              minutes = Math.floor( (t / 1000/60) % 60 ),
              seconds = Math.floor( (t / 1000) % 60 );
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector("#days"),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        
        updateClock()

        function updateClock() {
            const t = getTimeRemaning(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);
    
})
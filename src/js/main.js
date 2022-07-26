window.addEventListener('DOMContentLoaded', () => {
  //------------------------------tabs----------------------------------------

    const tabs = document.querySelectorAll('.tabheader__item'),
   tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach(item => {
      //item.style.display = 'none'; переделываем код под классы
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
      //toggle в данном случае использовать не можем

    });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
      
    });
  }
  function showTabContent(i = 0) { // поу умолчанию 0 элемент
    //tabsContent[i].style.display = 'block'; здесь так же меняем под классы
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');

    tabs[i].classList.add('tabheader__item_active');

  }
  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (event) => {
    const target = event.target; //event.target можно переопределить в переменную если часто будем его испльзовать

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item/* каждый таб который перебираем */, i/* номер элемента по порядку */) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });      
    }

  });
  // Не всегда используются inline стили, чаще всего применяются именно классы так же не всем нарвится резкое переключение можно добивить какую то анимацию через css классы

  //------------------------------timer----------------------------------------

  const deadline = '2022-07-23';

  //функция которая будет определять разницу между dedline и текущим временем. Мы должны получасть разницу между датами. Делаем в формате строки '2020-05-11' потому что в будущем такие скрипты мы будем подвязывать к административной панели. Там может быть input с typom даты  и этот инпут возвращает нам такую строку. Мы не можем от такой строки отнять время поэтому мат. операции тут не подходят. Поэтому сначала превращаем в миллисикунды.
  
  
  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date()); // то же самое что просто вызвать date  со строкой но Date.parse применяется чаще, получаем количество милисикунд в нашем конечном времени до которого нужно дойти
    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24)), // в скобках получаем сколько в сутках милисекунд. Общее количество милисекнд делим на результат сколько в сутках милисекунд. получаем скольо дней. Хвостик округлится
      hours = Math.floor(t / (1000 * 60 *60) % 24), // делим на количество миллисикунд которые находятся в одном часе,  в результате получаем общее количество часов до этого таймера далее с помощью % делит на 24 и возвращает нам остаток от деления. Именно так будем поступать и дальше
      minutes = Math.floor((t / 1000 / 60) % 60), // тут процент от 60 так как в минуте  60 секунд
      seconds = Math.floor((t / 1000) % 60);

    }
      
    //создаем объект который будет возвращаться из нашей функции
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
      return `0${num}`; // получаем строку но так как нам все равно так как мы просто помещаем ее на странцу у нас нет ошибки
    } else {
      return num;
    }
  }

  //пишем функцию которая будет устанавливать таймер на страницу

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);
    updateClock(); // вручную запускаем интервал чтобы на ждать 1000 мс при загрузке страницы и не было мигания приобновлении страницы

    function updateClock() {
      const t = getTimeRemaining(endtime);
      

      days.innerHTML = getZero(t.days); // добавляем функцию для добавление 0 на страницу
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if(t.total <= 0) {
        clearInterval(timeInterval);
      }
      //можно дописать условия чтобы вставлялась верстка Акция завершена
      //if (t.total < 0) {
      //  timer.innerHTML = `<h3>Акция завершалась</h3>`;
      //  timer.classlist.add('close');
      //}
    }


  }
  setClock('.timer', deadline);

  //---------------------------------modal------------------------------------------------------------

  const modalTrigger = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal'),
      modalCloseBtn = document.querySelector('[data-close]');
  
  modalTrigger.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.add('show');
      modal.classList.remove('hide');
      document.body.style.overflow = 'hidden'; // убираем прокрутку за модальным окном
  
    });

  });




  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  modalCloseBtn.addEventListener('click', closeModal); //.. тут не нужны скобки

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {

      closeModal(); // тут нужны скобки
    }
  });
  document.addEventListener('keydown', (e) => {
    if(e.code ==='Escape' && modal.classList.contains('show')) {
      closeModal(); 
    }

  });

  //// добавляем закрытие по клику на подложку

  //modal.addEventListener('click', (e) => {
  //  if (e.target === modal) {
  //    modal.classList.remove('show');
  //    modal.classList.add('hide');
  //    document.body.style.overflow = ''; // восстанавливаем скролл на странице
  //  }
  //});
  // Код с ошибкой так делать не следует, не следует писать event.target  а объект события не писать в скобаках
  /*  modal.addEventListener('click', () => {
    if (event.target === modal) {
      modal.classList.remove('show');
      modal.classList.add('hide');
      document.body.style.overflow = ''; // восстанавливаем скролл на странице
    }
  });*/

  //Так как у нас участок кода повторяется мы можем вынести его в отдельную функцию
  





  
  //modalCloseBtn.addEventListener('click', () => {
  //  modal.classList.remove('show');
  //  modal.classList.add('hide');
  //  document.body.style.overflow = ''; // восстанавливаем скролл на странице

  //});

  // В варианте с toggle 

  //modalTrigger.addEventListener('click', () => {
  //  modal.classList.toggle('show');

  //  document.body.style.overflow = 'hidden'; 

  //});
  //modalCloseBtn.addEventListener('click', () => {
  //  modal.classList.toggle('show');

  //  document.body.style.overflow = ''; 

  //});


});






//Вот готовое решение, добавляем теги p с id в html файле.

//И собственно сама функция.

//Но хотел бы посмотреть на реализацию иным способом. Сэнсэй выручай)

//<div class="promotion__timer">
//                <div class="title">Осталось до конца акции:</div>
//                <div class="timer">
//                    <div class="timer__block">
//                        <span id="days">12</span>
//                        <p id="text-days">дней</p>
//                    </div>
//                    <div class="timer__block">
//                        <span id="hours">20</span>
//                        <p id="text-hours">часов</p>
//                    </div>
//                    <div class="timer__block">
//                        <span id="minutes">56</span>
//                        <p id="text-minutes">минут</p>
//                    </div>
//                    <div class="timer__block">
//                        <span id="seconds">20</span>
//                        <p id="text-seconds">секунд</p>
//                    </div>
//                </div>
//            </div>
 
////Таймер
 
//    const deadline = '2021-02-17';
 
//    function getTimeRemaining(endtime) {
//        const t = Date.parse(endtime) - Date.parse(new Date()),
//              days = Math.floor(t / (1000 * 60 * 60 * 24)),
//              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
//              minutes = Math.floor((t / 1000 / 60) % 60),
//              seconds = Math.floor((t / 1000) % 60);
 
//        return {
//            'total': t,
//            'days': days,
//            'hours': hours,
//            'minutes': minutes,
//            'seconds': seconds
//        };
//    }
 
//    function getZero(num) {
//        if (num >= 0 && num <10) {
//            return `0${num}`;
//        } else {
//            return num;
//        }
//    }
 
//    function setClock(selector, endtime) {
//        const timer = document.querySelector(selector),
//              days = timer.querySelector('#days'),
//              hours = timer.querySelector('#hours'),
//              minutes = timer.querySelector('#minutes'),
//              seconds = timer.querySelector('#seconds'),
//              timeInterval = setInterval(updateClock, 1000),
//              textDays = document.querySelector('#text-days'),
//              textHours = document.querySelector('#text-hours'),
//              textMinutes = document.querySelector('#text-minutes'),
//              textSeconds = document.querySelector('#text-seconds');
       
//        updateClock();
//        function updateClock() {
//            const t = getTimeRemaining(endtime);
 
//            days.innerHTML = getZero(t.days);
//            hours.innerHTML = getZero(t.hours);
//            minutes.innerHTML = getZero(t.minutes);
//            seconds.innerHTML = getZero(t.seconds);
 
//            if (t.total <= 0) {
//                clearInterval(timeInterval);
//            }
            
//            function daysCounter(number) {
//                let result = ((((number % 100) >= 11 && number <= 19) || (number = number % 10) >= 5 || number == 0) ? 
//                textDays.innerHTML = ('Дней') : (number == 1 ? textDays.innerHTML = ('День') 
//                : textDays.innerHTML = ('Дня')));
//            }
//            function hoursCounter(number) {
//                let result = ((((number % 100) >= 11 && number <= 19) || (number = number % 10) >= 5 || number == 0) ? 
//                textHours.innerHTML = ('Часов') : (number == 1 ? textHours.innerHTML = ('Час') 
//                : textHours.innerHTML = ('Часа')));
//            }
 
//            function minutesCounter(number) {
//                let result = ((((number % 100) >= 11 && number <= 19) || (number = number % 10) >= 5 || number == 0) ? 
//                textMinutes.innerHTML = ('Минут') : (number == 1 ? textMinutes.innerHTML = ('Минута') 
//                : textMinutes.innerHTML = ('Минуты')));
//            }
 
//            function secondsCounter(number) {
//                let result = ((((number % 100) >= 11 && number <= 19) || (number = number % 10) >= 5 || number == 0) ? 
//                textSeconds.innerHTML = ('Секунд') : (number == 1 ? textSeconds.innerHTML = ('Секунда') 
//                : textSeconds.innerHTML = ('Секунды')));
//            }
 
//            daysCounter(t.days);
//            hoursCounter(t.hours);
//            minutesCounter(t.minutes);
//            secondsCounter(t.seconds);
//        }
        
//    }
 
//    setClock('.timer', deadline);

//Римские часы
//window.addEventListener('DOMContentLoaded', () => {
//  // Tabs

//  let tabs = document.querySelectorAll('.tabheader__item'),
//      tabsContent = document.querySelectorAll('.tabcontent'),
//      tabsParent = document.querySelector('.tabheader__items');

//  function hideTabContent() {
//      tabsContent.forEach(item => {
//          item.classList.add('hide');
//          item.classList.remove('show', 'fade');
//      });

//      /* tabsContent.forEach(item => {
//           item.style.display = 'none';
//       });
//       */

//      tabs.forEach(item => {
//          item.classList.remove('tabheader__item_active');
//      });
//  }

//  function showTabContent(i = 0) {
//      tabsContent[i].classList.add('show', 'fade');
//      tabsContent[i].classList.remove('hide');
//      tabs[i].classList.add('tabheader__item_active');
//  }

//  // tabsContent[i].style.display = "block";
//  // tabs[i].classList.add('tabheader__item_active');
//  hideTabContent();
//  showTabContent();
//  tabsParent.addEventListener('click', (event) => {
//      const target = event.target;

//      if (target && target.classList.contains('tabheader__item')) {
//          tabs.forEach((item, i) => {
//              if (target == item) {
//                  hideTabContent();
//                  showTabContent(i);
//              }
//          });
//      }
//  });
//  //Timer

//  const deadline = '2020-07-11';

//  function getTimeRemaining(endtime) {
//      const t = Date.parse(endtime) - Date.parse(new Date()),
//          days = Math.floor((t / (1000 * 60 * 60 * 24))),
//          hours = Math.floor((t / (1000 * 60 * 60) % 24)),
//          minutes = Math.floor((t / 1000 / 60) % 60),
//          seconds = Math.floor((t / 1000) % 60);
//      return {
//          'total': t,
//          'days': days,
//          'hours': hours,
//          'minutes': minutes,
//          'seconds': seconds

//      };
//  }

//  function getZero(num){
//      if (num >= 0 && num < 10) { 
//          return '0' + num;
//      } else {
//          return num;
//      }
//  }

//  function solution(number) {
//      let result = "";
//      let transform = function (value, roman) {
//          while (number >= value) {
//              result += roman;
//              number -= value;
              
//          }

//      };

//      transform(1000, "M");
//      transform(900, "CM");
//      transform(500, "D");
//      transform(400, "CD");
//      transform(100, "C");
//      transform(90, "XC");
//      transform(50, "L");
//      transform(40, "XL");
//      transform(10, "X");
//      transform(9, "IX");
//      transform(5, "V");
//      transform(4, "IV");
//      transform(1, "I");
      



//      return result;
//  }

//  function setClock(selector, endtime) {
//      const timer = document.querySelector(selector),
//          days = timer.querySelector('#days'),
//          hours = timer.querySelector('#hours'),
//          minutes = timer.querySelector('#minutes'),
//          seconds = timer.querySelector('#seconds'),
//          timeInterval = setInterval(updateClock, 1000);

//      updateClock();

//      function updateClock() {

//          const t = getTimeRemaining(endtime);

//          days.innerHTML = solution(t.days);
//          hours.innerHTML = solution(t.hours);
//          minutes.innerHTML = solution(t.minutes);
//          seconds.innerHTML = solution(t.seconds);

//          if (t.total <= 0) {
//              clearInterval(timeInterval);
//          }

//      }
//  }
//  setClock('.timer', deadline);
//});

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.addEventListener('DOMContentLoaded', () => {
  //------------------------------tabs----------------------------------------
  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach(item => {
      //item.style.display = 'none'; переделываем код под классы
      item.classList.add('hide');
      item.classList.remove('show', 'fade'); //toggle в данном случае использовать не можем
    });
    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    // поу умолчанию 0 элемент
    //tabsContent[i].style.display = 'block'; здесь так же меняем под классы
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();
  tabsParent.addEventListener('click', event => {
    const target = event.target; //event.target можно переопределить в переменную если часто будем его испльзовать

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item
      /* каждый таб который перебираем */
      , i
      /* номер элемента по порядку */
      ) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  }); // Не всегда используются inline стили, чаще всего применяются именно классы так же не всем нарвится резкое переключение можно добивить какую то анимацию через css классы
  //------------------------------timer----------------------------------------

  const deadline = '2022-07-23'; //функция которая будет определять разницу между dedline и текущим временем. Мы должны получасть разницу между датами. Делаем в формате строки '2020-05-11' потому что в будущем такие скрипты мы будем подвязывать к административной панели. Там может быть input с typom даты  и этот инпут возвращает нам такую строку. Мы не можем от такой строки отнять время поэтому мат. операции тут не подходят. Поэтому сначала превращаем в миллисикунды.

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
      hours = Math.floor(t / (1000 * 60 * 60) % 24), // делим на количество миллисикунд которые находятся в одном часе,  в результате получаем общее количество часов до этого таймера далее с помощью % делит на 24 и возвращает нам остаток от деления. Именно так будем поступать и дальше
      minutes = Math.floor(t / 1000 / 60 % 60), // тут процент от 60 так как в минуте  60 секунд
      seconds = Math.floor(t / 1000 % 60);
    } //создаем объект который будет возвращаться из нашей функции


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
  } //пишем функцию которая будет устанавливать таймер на страницу


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

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', deadline);
}); //Вот готовое решение, добавляем теги p с id в html файле.
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

/***/ })

/******/ });
//# sourceMappingURL=script.js.map
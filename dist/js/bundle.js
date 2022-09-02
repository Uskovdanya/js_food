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
/***/ (function(module, exports, __webpack_require__) {

window.addEventListener('DOMContentLoaded', () => {
  const tabs = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js"),
        modal = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js"),
        timer = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js"),
        cards = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js"),
        calc = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js"),
        forms = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js"),
        slider = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
  tabs();
  modal();
  timer();
  cards();
  calc();
  forms();
  slider();


});




/***/ }),

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function calc() {
  
  // Calc

  const result = document.querySelector('.calculating__result span');

  
  let sex, height, weight, age,ratio; 

  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');

  } else {
    sex = 'female';
    localStorage.setItem('sex', 'female');
  }

  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');

  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }

  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.classList.remove(activeClass);
      if (elem.getAttribute('id') === localStorage.getItem('sex')) {
        elem.classList.add(activeClass);
      }
      if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        elem.classList.add(activeClass);
      }
    });
  }

  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '____';
      return;
    }
    if (sex === 'female') {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  }

  calcTotal();

  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', e.target.getAttribute('id'))
          
        }
  
  
        elements.forEach(elem => {
          elem.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
  
        calcTotal();
  
      });

    });


  }


  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

  function getDynamicImformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {

      if(input.value.match(/\D/g)) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      }

      switch(input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }
      calcTotal();

    });
    
    
  }

  getDynamicImformation('#height');
    getDynamicImformation('#weight');
    getDynamicImformation('#age');

}

module.exports= calc;

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function cards() {
  /*--------------Используем классы для карточек--------------------------------------------------------------------*/


  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes; // это массив
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;

    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length == 0) {
        this.classes = 'menu__item';
        element.classList.add(this.classes);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
      <img src=${this.src} alt=${this.alt}>
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">${this.descr}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
      </div>

      `;
      // тут будет див внутри еще одного дива

      this.parent.append(element);

    }
  }

  const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  //getResource('http://localhost:3000/menu')
  //  .then(data => {
  //    data.forEach(({img, altimg, title, descr, price}) => {
  //      new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
  //    });
  //  });
  //getResource('http://localhost:3000/menu')
  //  .then(data => createCard(data));

  //function createCard(data) {
  //  data.forEach(({img, altimg, title, descr, price}) => {
  //    const element = document.createElement('div');
  //    element.classList.add('menu__item');
  //    element.innerHTML = `
  //    <img src=${img} alt=${altimg}>
  //    <h3 class="menu__item-subtitle">${title}</h3>
  //    <div class="menu__item-descr">${descr}</div>
  //    <div class="menu__item-divider"></div>
  //    <div class="menu__item-price">
  //      <div class="menu__item-cost">Цена:</div>
  //      <div class="menu__item-total"><span>${price}</span> грн/день</div>
  //    </div>
  //    `;
  //    document.querySelector('.menu .container').append(element);
  //  });
  //}
  axios.get('http://localhost:3000/menu')
    .then(data => {
        data.data.forEach(({img, altimg, title, descr, price}) => {
        new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
      });
    });

    //интеграция через библиотеку axios
  

}

module.exports = cards;

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function forms() {
  // Forms

  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  forms.forEach(item => {
    bindPostData(item);
  });

  const postData =async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: data
    });

    return await res.json();
  };

  function bindPostData(form) {
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend', statusMessage);
        
        const formData = new FormData(form);
        // обязательно в верстке должен быть атрибут name
        const json = JSON.stringify(Object.fromEntries(formData.entries()));


        postData('http://localhost:3000/requests', json)
        .then(data => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        }).catch(() => {
          showThanksModal(message.failure);
        }).finally(() => {
          form.reset(); // сбрасываем форму чтобы была пуста после отправки
        });
    });

  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
    <div class="modal__content">
      <div class="modal__close" data-close>&times;</div>
      <div class ="modal__title">${message}</div>
    </div>
    `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000);
  }
  

}

module.exports = forms;

/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function slider() {
  // Slider

  const prev = document.querySelector('.offer__slider-prev'),
        slider = document.querySelector('.offer__slider'),
        next = document.querySelector('.offer__slider-next'),
        slides = document.querySelectorAll('.offer__slide'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField =document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;
  
  let slideIndex = `0${1}`;
  //Второй вариант слайдера
  let offset = 0;

  function opacityChange() {
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
  }
  function counterChange() {
    if (slideIndex < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

  }

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;

  }

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide => {
    slide.style.width = width;
  });

  slider.style.position = 'relative';

  const indicators = document.createElement('ol'),
        dots = [];

  indicators.classList.add('carousel-indicators');
  slider.append(indicators);
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
  }

  next.addEventListener('click', () => {
    if (offset == deleteNotDigits(width) * (slides.length -1)) { ///результат это строка допустим 500px
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    counterChange();

    opacityChange();

  });

  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = deleteNotDigits(width) * (slides.length -1);
    } else {
      offset -= deleteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    counterChange();

    opacityChange();

    });
    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');
        
        slideIndex = slideTo;
        offset = deleteNotDigits(width) * (slideTo - 1);

        slidesField.style.transform = `translateX(-${offset}px)`;

        counterChange();

        opacityChange(); 
        


      });
  });



  //Первый вариант слайдера

  //if (slides.length < 10) {
  //  total.textContent = `0${slides.length}`;
  //} else {
  //  total.textContent = slides.length;

  //}

  //showSlides(slideIndex);

  //function showSlides(n) {

  //  if (n > slides.length) {
  //    slideIndex = 1;
  //  }
  //  if (n < 1) {
  //    slideIndex = slides.length;

  //  }

  //  slides.forEach(item => item.style.display = 'none');
    
  //  slides[slideIndex - 1].style.display = 'block';

  //  if (slides.length < 10) {
  //    current.textContent = `0${slideIndex}`;
  //  } else {
  //    current.textContent = slideIndex;
  
  //  }
  //}

  //function plusSlides(n) {
  //  showSlides(slideIndex += n);
  //}

  //prev.addEventListener('click', () => {
  //  plusSlides(-1);
  //});
  //next.addEventListener('click', () => {
  //  plusSlides(1);
  //});


}

module.exports = slider;

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function tabs() {
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
}

module.exports = tabs;

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function timer() {
  //------------------------------timer----------------------------------------

  const deadline = '2022-07-29';

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
}

module.exports = timer;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map
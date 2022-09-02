function timer(id, deadline) {
  //------------------------------timer----------------------------------------



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
  setClock(id, deadline);
}

export default timer;
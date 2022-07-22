window.addEventListener('DOMContentLoaded', () => {

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
});

// Не всегда используются inline стили, чаще всего применяются именно классы так же не всем нарвится резкое переключение можно добивить какую то анимацию через css классы
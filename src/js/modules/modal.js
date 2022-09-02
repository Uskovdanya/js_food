function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}
function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden'; // убираем прокрутку за модальным окном

  console.log(modalTimerId);
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
  clearInterval(modalTimerId); // убираем интервал по вызову модального окна через 3 секунды после захода на сайт так как пользовать уже сам нажал кнопку
  
}


function modal(triggerSelector, modalSelector, modalTimerId) {

  const modalTrigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector);
  
  

  modalTrigger.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));// openModal не должны сразу вызывать то есть ставить скобки чтобы это обойти мы ставим () => стрелочную функцию

  });


  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {

      closeModal(modalSelector); // тут нужны скобки
    }
  });
  document.addEventListener('keydown', (e) => {
    if(e.code ==='Escape' && modal.classList.contains('show')) {
      closeModal(modalSelector); 
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

  //--------------------------Установка модального окна после прокрутки до конца----------------
  

  

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);

    }

  }

  window.addEventListener('scroll', showModalByScroll);

}

export default modal;
export {closeModal};
export {openModal};
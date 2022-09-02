function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  //------------------------------tabs----------------------------------------

  const tabs = document.querySelectorAll(tabsSelector),
  tabsContent = document.querySelectorAll(tabsContentSelector),
   tabsParent = document.querySelector(tabsParentSelector);

 function hideTabContent() {
   tabsContent.forEach(item => {
     //item.style.display = 'none'; переделываем код под классы
     item.classList.add('hide');
     item.classList.remove('show', 'fade');
     //toggle в данном случае использовать не можем

   });

   tabs.forEach(item => {
     item.classList.remove(activeClass);
     
   });
 }
 function showTabContent(i = 0) { // поу умолчанию 0 элемент
   //tabsContent[i].style.display = 'block'; здесь так же меняем под классы
   tabsContent[i].classList.add('show', 'fade');
   tabsContent[i].classList.remove('hide');

   tabs[i].classList.add(activeClass);

 }
 hideTabContent();
 showTabContent();

 tabsParent.addEventListener('click', (event) => {
   const target = event.target; //event.target можно переопределить в переменную если часто будем его испльзовать

   if (target && target.classList.contains(tabsSelector.slice(1))) {
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

export default tabs;
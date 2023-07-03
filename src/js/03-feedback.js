import throttle from 'lodash.throttle'; // Підключаємо бібліотеку throttle

let user = {}; // Створюємо обєкт куди будуть записанні данні з що введе користувач

const form = document.querySelector('.feedback-form'); // Отримуємо доступ до form з допомогою querySelector 
form.addEventListener('input', throttle(handlerInput, 500)); // Встановлюємо прослуховувач на input через бібліотеку throttle викликаємо прослуховувач раз на 500 мс 
form.addEventListener('submit', handlerSubmit); // Встановлюємо прослуховувач на submit та викликаємо функцію handlerSubmit

returnLocStor(); // Викликаємо функцію повернення даних з localStorage

function handlerInput(evt) { // Функція прослуховує інпут 
  user[evt.target.name] = `${evt.target.value}`; //  Передаємо в обєкт user ключ [evt.target.name] та значення ключа `${evt.target.value}`
  localStorage.setItem("feedback-form-state", JSON.stringify(user)); // Передаємо в  localStorage дані ключ feedback-form-state та значення з обєкта JSON.stringify(user)
}


function handlerSubmit(evt) { // Прослуховуємо події Submit 
   evt.preventDefault(); //Скасовуємо дії браузера за замовчуванням
    const {
        elements: { email, message }  // Виконуємо деструктуризацію за допомогою властивості elements
    } = evt.currentTarget;
    if (!email.value.length || !message.value.length) { // В умові if виконуємо перевірку чи відбувся ввід в поля інпут
        alert('Увага всі поля повинні бути заповнені !!!') // В разі якщо нічого не введенно в одне з полів виведемо попередження в alert
    } else {
      console.log(user); // Виводимо в консоль лог обєкт user
      form.reset(); // Очищуємо поля вводу input методом reset
      localStorage.removeItem("feedback-form-state"); // Видаляємо дані в локальному сховищі за ключем feedback-form-state
      user = {}; // Перезаписуємо значення обєкта user
    };
  
};

function returnLocStor() { // Функція повертає значення з локального сховища 
  const savedSettings = localStorage.getItem("feedback-form-state"); // Записуємо данні з локального сховища в змінну savedSettings
  if (savedSettings) { // Якщо savedSettings має данні виконуємо наступні дії 
    user = JSON.parse(savedSettings); // Парсимо її в обєкт user 
    form.elements.email.value = user.email ?? ''; // Передаємо значення з обєкту user.emai в значення форми елементу 
    form.elements.message.value = user.message ?? ''; // Передаємо значення з обєкту user.value в значення форми елементу 
  };
};


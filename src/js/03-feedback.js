import throttle from 'lodash.throttle'; // Підключаємо бібліотеку throttle


const form = document.querySelector('.feedback-form'); // Отримуємо доступ до form з допомогою querySelector 
form.addEventListener('input', throttle(handlerInput, 500)); // Встановлюємо прослуховувач на input 
form.addEventListener('submit', handlerSubmit); // Встановлюємо прослуховувач на submit
form.addEventListener('click', load); // Встановлюємо прослуховувач на click

const user = { // Створюємо обєкт куди будуть записанні данні з що введе користувач 
};
 

function handlerInput(evt) {
user[evt.target.name] = evt.target.value;

localStorage.setItem("feedback-form-state", JSON.stringify(user));
}


function handlerSubmit() {
localStorage.clear()
}

function load (evt) {
    try {
    
    const savedSettings = localStorage.getItem("feedback-form-state");
    const parsedSettings = JSON.parse(savedSettings)

    form.elements.email.value = parsedSettings.email 
    form.elements.message.value = parsedSettings.message  

  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};





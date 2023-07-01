import Player from '@vimeo/player'; // Підключаємо бібліотеку @vimeo
import throttle from 'lodash.throttle'; // Підключаємо бібліотеку throttle


const iframe = document.querySelector('iframe'); // Отримуємо доступ до iframe з допомогою querySelector

const player = new Player(iframe); // Ініціалізуємо бібліотеку  

const onPlay = function (data) { // Створюємо функцію яка буде записувати дані localStorage (локальне сховище)
        localStorage.setItem("videoplayer-current-time", JSON.stringify(data.seconds));// Використовуємо JSON.stringify для перетворення числа на строку 
};

player.on('timeupdate', throttle(onPlay, 1000)); // Викликаємо метод on() бібліотеки @vimeo в якій викликаємо подію timeupdate
// На виклик функції onPlay вішаємо функцію throttle для виклику функції через певний проміжок часу  задаємо проміжок часу 1000 мс

player.setCurrentTime(Number(localStorage.getItem("videoplayer-current-time"))); // Повертаємо в setCurrentTime значення з localStorage для запуску відео з моменту його зупинки 

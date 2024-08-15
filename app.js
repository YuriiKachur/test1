const express = require('express');
const app = express();
const port = 3000;

// Пример данных меню
const menu = [
  { day: 'Понеділок', items: ['Суп', 'Салат', 'Хліб', 'Печене яблучко'] },
  { day: 'Вівторок', items: ['Паста', 'Соус', 'Сир', 'Банан'] },
  { day: 'Середа', items: ['Курка', 'Рис', 'Овочі тушковані', 'Апельсин'] },
  { day: 'Четвер', items: ['Риба', 'Картопля фрі', 'зелені боби', 'Персик'] },
  { day: 'Пятниця', items: ['Піцца', 'Морквяні палички', 'Йогурт', 'Естерхазі'] }
];

// Маршрут для главной страницы
app.get('/', (req, res) => {
  let menuHtml = '<h1>Меню шкільної їдальні "Джерельце"</h1><ul>';
  menu.forEach(dayMenu => {
    menuHtml += `<li><h2>${dayMenu.day}</h2><ul>`;
    dayMenu.items.forEach(item => {
      menuHtml += `<li>${item}</li>`;
    });
    menuHtml += '</ul></li>';
  });
  menuHtml += '</ul>';
  res.send(menuHtml);
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

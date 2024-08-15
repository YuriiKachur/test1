const express = require('express');
const app = express();
const port = 3000;

// Настройка директории для статических файлов
app.use(express.static('public'));

// Пример данных меню
const menu = [
  { day: 'Понеділок', items: ['Суп', 'Салат', 'Хліб', 'Печене яблучко'] },
  { day: 'Вівторок', items: ['Паста', 'Соус', 'Сир', 'Банан'] },
  { day: 'Середа', items: ['Курка', 'Рис', 'Овочі тушковані', 'Апельсин'] },
  { day: 'Четвер', items: ['Риба', 'Картопля фрі', 'зелені боби', 'Персик'] },
  { day: 'Пятниця', items: ['Піца', 'Морквяні палички', 'Йогурт', 'Естерхазі'] }
];

// Маршрут для главной страницы
app.get('/', (req, res) => {
  let menuHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Меню шкільної їдальні "Джерельце"</title>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <h1>Меню шкільної їдальні "Джерельце</h1>
      <ul>
  `;
  menu.forEach(dayMenu => {
    menuHtml += `<li><h2>${dayMenu.day}</h2><ul>`;
    dayMenu.items.forEach(item => {
      menuHtml += `<li>${item}</li>`;
    });
    menuHtml += '</ul></li>';
  });
  menuHtml += '</ul></body></html>';
  res.send(menuHtml);
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

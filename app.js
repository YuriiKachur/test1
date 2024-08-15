const express = require('express');
const app = express();
const port = 3000;

// Пример данных меню
const menu = [
  { day: 'Monday', items: ['Soup', 'Salad', 'Bread', 'Apple'] },
  { day: 'Tuesday', items: ['Pasta', 'Tomato Sauce', 'Cheese', 'Banana'] },
  { day: 'Wednesday', items: ['Chicken', 'Rice', 'Vegetables', 'Orange'] },
  { day: 'Thursday', items: ['Fish', 'Potatoes', 'Green Beans', 'Pear'] },
  { day: 'Friday', items: ['Pizza', 'Carrot Sticks', 'Yogurt', 'Grapes'] }
];

// Маршрут для главной страницы
app.get('/', (req, res) => {
  let menuHtml = '<h1>Menu of School Canteen</h1><ul>';
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

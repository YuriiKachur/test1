const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

// Настройка директории для статичних файлів
app.use(express.static('public'));

// Middleware для обробки POST-запитів з форм
app.use(express.urlencoded({ extended: true }));

// Приклад даних меню
const menu = [
  { day: 'Понеділок', items: ['Суп', 'Салат', 'Хліб', 'Печене яблучко'] },
  { day: 'Вівторок', items: ['Паста', 'Соус', 'Сир', 'Банан'] },
  { day: 'Середа', items: ['Курка', 'Рис', 'Овочі тушковані', 'Апельсин'] },
  { day: 'Четвер', items: ['Риба', 'Картопля фрі', 'Зелені боби', 'Персик'] },
  { day: 'П\'ятниця', items: ['Піца', 'Морквяні палички', 'Йогурт', 'Естерхазі'] }
];

// Налаштування транспорту для nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Ваш email
    pass: 'your-email-password'    // Ваш пароль (запросіть додаткову інформацію, як використовувати App Passwords, якщо 2FA увімкнено)
  }
});

// Маршрут для головної сторінки
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
      <h1>Меню шкільної їдальні "Джерельце"</h1>
      <form action="/order" method="post">
        <h2>Виберіть страви:</h2>
        <ul>
  `;
  
  menu.forEach(dayMenu => {
    menuHtml += `<li><h3>${dayMenu.day}</h3><ul>`;
    dayMenu.items.forEach(item => {
      menuHtml += `
        <li>
          <label>
            <input type="checkbox" name="items" value="${item}">
            ${item}
          </label>
        </li>
      `;
    });
    menuHtml += '</ul></li>';
  });
  
  menuHtml += `
        </ul>
        <button type="submit">Замовити</button>
      </form>
    </body>
    </html>
  `;
  
  res.send(menuHtml);
});

// Маршрут для обробки замовлення
app.post('/order', (req, res) => {
  const selectedItems = req.body.items; // Вибрані страви
  let responseHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Ваше замовлення</title>
    </head>
    <body>
      <h1>Ваше замовлення</h1>
      <h2>Вибрані страви:</h2>
      <ul>
  `;
  
  if (Array.isArray(selectedItems)) {
    selectedItems.forEach(item => {
      responseHtml += `<li>${item}</li>`;
    });
  } else if (selectedItems) {
    responseHtml += `<li>${selectedItems}</li>`;
  }
  
  responseHtml += `
      </ul>
      <a href="/">Назад до меню</a>
    </body>
    </html>
  `;
  
  // Надсилання електронного листа
  transporter.sendMail({
    from: 'your-email@gmail.com',
    to: 'kachur.vy@gmail.com',
    subject: 'Нове замовлення з меню',
    html: responseHtml
  }, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      res.send('Сталася помилка при надсиланні замовлення.');
    } else {
      console.log('Email sent:', info.response);
      res.send('Ваше замовлення надіслано!');
    }
  });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

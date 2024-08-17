const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

// Настройка директории для статичних файлов
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
      <h1>Меню шкільної їдальні "Джер

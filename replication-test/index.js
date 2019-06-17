"use strict";

// импорт библиотеки для взаимодействия с СУБД
const pg = require('pg');

// функция создания нового клиента к СУБД
function createNewClient() {
    return new pg.Client({
        user: 'postgres',
        host: 'localhost',
        database: 'base',
        password: '12345',
        port: 5432
    });
}

// функция отправки запроса в СУБД
function sendQuery(query, arr, callback) {
    // создаем нового клиента
    const client = createNewClient();

    // открываем соединение с СУБД
    console.log("Open connection");
    client.connect();

    // отправляем запрос в СУБД
    client.query(query, arr, (err, res) => {
        // при получении ответа от СУБД

        // закрываем соединение с СУБД
        console.log("Close connection");
        client.end();

        // если НЕ было ошибки при обработке запроса
        if(!err) {
            // вызываем функцию обратного вызова от ответа
            callback(res.rows);
        } else {
            // сообщение об ошибке
            console.log("Error of Database");
            // вызываем функцию обратного вызова от NULL
            callback(null);
        }
    });
}

// библиотека для работы с сетью
const express = require("express");

// поднимаем сервер на порте под номером 5000
const app = express();
const port = 5000;
app.listen(port);
console.log("Server port: " + port);

// библиотека для работы с файлами
const fs = require("fs");

// инициализация базы данных
app.get("/api/base/init", function(request, response) {
    // получаем содержимое файла
    fs.readFile("codeSQL.sql", "utf8", function(err, content) {
        // получаем код SQL
        const sqlCode = content + "";
        // отправляем запрос на инициализацию базы данных
        sendQuery(sqlCode, [], () => {
            // отправляем ответ клиенту
            response.end("OK");
        });
    });
});

// получение содержимого базы данных
app.get("/api/base/get", function(request, response) {
    // запрос на выборку данных из таблицы
    const query = " SELECT * FROM people ORDER BY people_id DESC; ";
    // отправляем запрос на выборку
    sendQuery(query, [], (arr) => {
        // формирование ответа
        const answer = JSON.stringify(arr, null, 4);
        // отправляем ответ клиенту
        response.end(answer);
    });
});


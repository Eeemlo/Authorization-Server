# API för inloggning
Detta repository innehåller kod för ett enklare REST API som hanterar auktorisering och autentisering på en webbplats. API:et är byggt med NodeJs, Express, mongoDB och bcrypt. Grundläggande funktionalitet för CRUD (Create, Read, Update, Delete) är implementerad.

## Länk
En liveversion av APIet finns tillgänglig på följande URL: https://authorization-server-abgv.onrender.com/api/users

## Installation, databas
APIet använder en mongoDB-databas. Klona ner källkodsfilerna, kör kommando npm install för att installera nödvändiga npm-paket. Kör installations-skriptet server.js. 

## Användning
Nedan finns beskrivet hur man når APIet på olika vis:

| Metod         | Ändpunkt     | Beskrivning |
|--------------|-----------|------------|
| GET | /users      | Hämtar alla användare    |
| POST      | /register  | Skapar en ny användare       |
| POST | /login |Loggar in en användare|


const express = require("express");
const { engine } = require('express-handlebars');
const path = require("path");

const app = express();
const port = 3002;

// Handlebars einrichten
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); // wichtig!

// Statische Dateien bereitstellen
app.use(express.static(path.join(__dirname, "public_html")));

// Dummy-Daten
const shelves = [
  { name: 'Bookshelf', description: 'A shelf full of books' },
];

// Routen
app.get("/", function (req, res) {
    res.send(`
        <h1>Welcome!</h1>
        <p>Visit the <a href="/hello">hello page</a> or <a href="/shelf">the shelf page</a>.</p>
    `);
});

app.get("/hello", function (req, res) {
    res.send("Hello IMIs!");
});

app.get("/shelf", (req, res) => {
    res.render("shelf", { title: 'My Shelf Collection', shelves });
});

// Server starten
app.listen(port, function () {
    console.log("Express listening on http://localhost:" + port);
});

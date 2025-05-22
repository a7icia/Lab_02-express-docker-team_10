const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const Handlebars = require("handlebars"); 

Handlebars.registerHelper('array', function() {
return Array.prototype.slice.call(arguments, 0, -1);
});

Handlebars.registerHelper('lte', function(a, b) {
    return a <= b;
});

const app = express();
const port = 3002;

app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname, "public_html")));
app.use(express.urlencoded({ extended: true }));


const shelves = [
    { name: "Bookshelf", description: "A shelf full of books" },
];


const readBooks = [
    { title: "The complete Developer", author: "Martin Krause", rating: 5},
    { title: "Basiswissen Informatik", author: "Eckert Zitzler", rating: 3 },
    { title: "Harry Potter und der Stein der Weisen", author: "J. K. Rowling", rating: 4 },
];


app.get('/shelf/read', (req, res) => {
res.render('shelf_read', { 
layout: "main",
title: "Gelesene Bücher",
books: readBooks 
});
});


app.post('/shelf/read/add', (req, res) => {
const { title, author } = req.body;
if (title && author) {
readBooks.push({
    title,
    author,
    rating: 3 
});
}
res.redirect('/shelf/read');
});



app.get("/", (req, res) => {
    res.render("lists", {
        layout: "main",
        title: "Meine Bücherregale",
        shelves,
    });
});

app.get("/hello", (req, res) => {
    res.send("Hello IMIs!");
});



app.get("/shelf/create", (req, res) => {
    res.render("createShelf", {
        layout: "main",
        title: "Regal erstellen",
    });
});
app.post("/shelf/create", (req, res) => {
    const { name, description } = req.body;
    shelves.push({ name, description });
    res.redirect("/");
});


app.listen(port, () => {
    console.log("Express listening on http://localhost:" + port);
}); 

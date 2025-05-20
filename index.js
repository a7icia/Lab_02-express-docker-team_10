const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");

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

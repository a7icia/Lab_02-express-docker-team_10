const express = require("express");
const path = require("path");
const server = express();
const port = 3002;

server.use(express.static(path.join(__dirname, "public_html")));

server.get("/", function (req, res) {
    res.send(`
        <h1>Welcome!</h1>
        <p>Visit the <a href="/hello">hello page</a>.</p>
    `);
});

server.get("/hello", function (req, res) {
    res.send("Hello IMIs!");
});

server.listen(port, function () {
    console.log("Express listening on http://localhost:" + port);
});
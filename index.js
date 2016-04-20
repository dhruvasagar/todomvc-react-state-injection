var express = require("express");

var app = express();

app.set("view engine", "jade");
app.set("views", "./app/views");

app.get("/", function(request, response){
  response.render("index");
});

var port = process.env.PORT || 3000;
console.log("App listening on port " + port);
app.listen(port);

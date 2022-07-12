// creates Expression application 
const express = require("express"),
       app = express(),
       port = process.env.PORT || 3420,
       cors = require("cors"); // Node.js package that provides a Connect/Express middleware
const bodyParser = require('body-parser'); //body-parser: Node.js body parsing middleware
const fs = require("fs");

// sets up express application and returns message to console when application runs
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.listen(port, () => console.log("Backend server live on " + port));

// returns a message when a GET request to the specified route is made
app.get("/", (req, res) => {
    res.send({ message: "Connected to Backend server!" });
});

// makes call to addItem function when a POST request to the specified route is made 
app.post("/add/item", addItem)

// takes in a request body from Todo List Application, representing a todo item
function addItem (request, response) {
    let id = request.body.jsonObject.id
    let task = request.body.jsonObject.task
    let curDate = request.body.jsonObject.currentDate
    let dueDate = request.body.jsonObject.dueDate
    var newTask = {
      ID: id,
      Task: task,
      Current_date: curDate,
      Due_date: dueDate
    }
    const jsonString = JSON.stringify(newTask) // request body is converted to a new json object (represents new todo item)
    
    var data = fs.readFileSync('database.json');
    var json = JSON.parse(data);
    json.push(newTask);
    fs.writeFile("database.json", JSON.stringify(json), function(err, result) {
      if (err) { console.log('error', err) }
      else { console.log('Successfully wrote to file') }
    }); // json object is appended to json list in database.json (todos list)
    response.send(200)
}
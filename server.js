/**
 * Created by Ujjaval on 8/3/2016.
 */
//======================================
//          set up
//======================================
var express = require("express");
var app = express();                            // create an app with express
var mongoose = require("mongoose");             //mongoose for mongodb
var morgan = require("morgan");                 // log request to the console (express4)
var bodyParser = require("body-parser");        //pull information from HTML POST (express4)
var methodOverride = require("method-override");//simulate DELET and PUT (express4)

//======================================
//          configuration
//======================================

mongoose.connect('mongodb://todo_database:tododata@ds139725.mlab.com:39725/mydb_acquiring_new_knowledge');   //connect to mongoDB database on mLab

app.use(express.static(__dirname + '/app'));                 //set the static file location /app
app.use(morgan('dev'));                                      //log every request to the console
app.use(bodyParser.urlencoded({"extended" : "true"}))        //parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                  //parse application/json
app.use(bodyParser.json({ type: "application/vnd.api+json"}))//parse application/vnd.api+json ass json
app.use(methodOverride());

//======================================
// define model
//======================================
var Todo = mongoose.model("Todo", {
    text : String
});

//======================================
// routes
//======================================

//apis
//get all the todos
app.get('/api/todos',function(req,res) {
   //use mongoose to get all todos in the database
    Todo.find(function(err, todos){
       //if there is an error retrieving, send the error. nothing after res.send(err) will excecuate
        if(err){
            res.send(err);
        }
        res.json(todos);   //return all todos in JSON format
    });

});

//creat newtodo and send back all todos after creation
app.post('/api/todos', function (req, res) {
    //create a todo, information comes from AJAX request from angular
    Todo.create({
        text : req.body.text,
        done: false
     }, function(err, todo){
        if(err){
            res.send(err);
        }

        //get and return all the todos after you create another
        Todo.find(function(err, todos){
            if(err)
                res.send(err);

            res.json(todos);
        });
    });
});

//delete a todo
app.delete('/api/todos/:todo_id', function(req, res){
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        if(err)
            res.send(err);

        //get and return all the todos after you create another
        Todo.find(function(err, todos){
            if(err)
                res.send(err);
            res.json(todos);
        });
    });
});

//======================================
// Application route front-end
//======================================
app.get("*", function(req, res){
    res.sendfile("./app/index.html");
});


//======================================
// listen (start app with node serve.sj)
//======================================
app.listen(1000);
console.log("app listening on prt 1000");


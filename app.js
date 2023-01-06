const express = require("express");
const bodyParser = require("body-parser");

var app = express();
app.set("view engine","ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://vishwajeet112:1zDW8kCpUiBRsbrj@cluster0.5xeb502.mongodb.net/todo");
const trySchema = new mongoose.Schema({
    name:String
});

const item = mongoose.model("task",trySchema);

app.get("/",function(req,res){
    item.find({},function(err,foundItems){
        if(err){
            console.log(err);
        }
        else{
            res.render("list",{ejes : foundItems});
        }
    })
});

app.post("/",function(req,res){
    const itemName = req.body.ele1;
    const todo4 = new item({
        name: itemName
    });
    todo4.save();
    res.redirect("/");
});

app.post("/delete",function(req,res){
    const checked = req.body.checkbox1;
    item.findByIdAndRemove(checked, function(err){
        if(!err){
            console.log("deleted");
            res.redirect("/");
        }
    })
});


app.listen("3000",function(){
    console.log("Server Started");
});
var express=require("express");
var bodyParser=require("body-parser");
var control=require("./controllers/controller.js");


var app=express();
app.set('view engine', 'ejs')

//serving static files=================
app.use("/public",express.static('public'));

//parser=================================
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//routes=================================
app.use(control);
app.use((err,req,res,next)=>{
    res.end("error-something went wrong");
})

app.listen(3000,function(){
    console.log("listening to 3000");
})
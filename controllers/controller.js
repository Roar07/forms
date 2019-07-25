var express=require("express");
const mongoose =require("mongoose");
var express=require("express");
const bcrypt=require("bcrypt");
var session = require('express-session');
var app=express();

//session settings=============================================
app.use(session({
    formid:String,
    secret: 'somerandomstring',
    resave: true,
    saveUninitialized: false,   //false for only login user cookies and true for every time
    //cookie: { secure: true }
}));


const saltRounds = 10;  
var router=express.Router();

//database connection===========================================
mongoose.connect('mongodb://localhost/FormUsers',{ useNewUrlParser: true },function(err){
  if(err)throw err;
});

mongoose.connection.once('open',function(err){
    if(err) throw err;
    console.log("connected to database");   
});

// creating schema 

//schema of form=====
var form=mongoose.Schema({

})

var details=mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    form:[{
        details:{},
        response:[{}]
    }],
})



//creating model=======
var User=mongoose.model("User",details);

//routes=======================================

router.get("/",(req,res)=>{
    res.render("login");
});



router.get("/signup",(req,res)=>{
    res.render("signup");
})


router.post("/",(req,res)=>{
    User.findOne({userName:req.body.name},(err,result)=>{
      //  console.log(result);
        if(result!=null){
            bcrypt.compare(req.body.password,result.password, function(err, res1) {
                if(res1){
                    session.user=result._id;
                    res.redirect("/home");
                }else{
                    res.end("incorrect UserName or Passwomrd---validiction code yet to be added")
                }
            });
        }else{
            res.end("incorrect UserName or Password---validiction code yet to be added")
        }
    })
})

router.post("/signup",(req,res)=>{

    console.log(req.body)
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        let nUser= new User({
            userName:req.body.name,
            email:req.body.email,
            password:hash,
    });
    
    nUser.save((err)=>{
        if(err)throw err;
        console.log("new user added");
    })  
    })
    
    res.end("ur now a user");
})

router.get("/home",(req,res,next)=>{
        User.findById(session.user,(err,result) =>{
            if(err) next();
          res.render("home",{result});
      
        });
      
      
    
});

router.get("/create",(req,res)=>{
    console.log(session.user)
    User.findById(session.user,(err,result) =>{
    
        res.render("create",{result});
    
      });    

})




router.post("/create",(req,res)=>{
    var formid;
    User.findById(session.user,(err,result) =>{
        result.form.push({details:req.body});
        result.save();
        formid=result.form[result.form.length-1].id;
      res.redirect("/form/"+formid);
      }); 
})




router.get("/form/:id",(req,res)=>{
   // console.log(req.params.id);
    User.findById(session.user,(err,result)=>{
     //   console.log(session.user)
        for(i=0;i<result.form.length;++i){


           if(result.form[i]._id==req.params.id){
        //    res.end(form[i]);
         let fid=result.form[i].id;
         let details=result.form[i].details;
            
         //  console.log(details);
            session.formid=req.params.id;
            res.render("edit",{fid,details});
           }
        }
    })

    
 //   res.redirect("/home");
})


router.get("/getform",(req,res)=>{
    User.findById(session.user,(err,result)=>{
        for(i=0;i<result.form.length;++i){

            if(result.form[i]._id==session.formid){
                let details=result.form[i].details;
              //  console.log(details);
                res.end(JSON.stringify(details));
            }
        }
    })
})


router.post("/form/edit",(req,res)=>{

    User.findById(session.user,(err,result)=>{

        for(i=0;i<result.form.length;++i){

            if(result.form[i]._id==session.formid){
                result.form[i].details={};
                result.form[i].details=req.body;
                result.save();
            }
        }
    })
    
    res.redirect("/form/"+session.formid);
})


router.get("/url",(req,res)=>{
    let payload={
        user:session.user,
        form:session.formid
    }
    res.end(JSON.stringify(payload));
})


router.get("/response/:user/:form",(req,res)=>{
    User.findById(req.params.user,(err,result)=>{
        for(i=0;i<result.form.length;++i){

            if(result.form[i]._id==req.params.form){
                let details=result.form[i].details;
                res.render("takeResponse",{details});
            }
        }
    })
})

router.post("/response/:user/:form",(req,res)=>{
    User.findById(req.params.user,(err,result)=>{

        result.form.findById(req.params.form,(err,res1)=>{
            console.log(res1);
        })
        for(i=0;i<result.form.length;++i){

            if(result.form[i]._id==req.params.form){
                console.log(" response recieved");
                console.log(req.body);
               result.form[i].response.push(req.body);
               result.save();
            }
        }
    })
})



module.exports=router;
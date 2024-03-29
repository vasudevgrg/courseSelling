const express= require("express");

const cors= require("cors");
const bodyparser= require("body-parser");
const jwt= require("jsonwebtoken");
const mongoose= require("mongoose");

const app= express();

app.use(bodyparser.json());

mongoose.connect("mongodb+srv://vasudevgarg7:vasudevgarg7@cluster0.ucwxkxw.mongodb.net/").then(()=>{console.log("connected")}).catch(()=>{console.log("error")});

const admin= new mongoose.Schema({
    username:String,
    password: String,
    token: String
});

const user= new mongoose.Schema({
    username: String,
    password: String,
    token: String
});

const Admin= new mongoose.model("Admin", admin);


const secret= "secret";
const authenticate=(req, res, next)=>{

    jwt.verify(req.headers.token, secret, (err, decoded)=>{
        if(err){
            res.status(404).send("invalid token");
        }else{
            next();
        }
    })
};

const duplicateValue=async(req, res, next)=>{
        const {username, password}= req.body;

Admin.find().then(e=>console.log(e));
  

        const val=Admin.exists({username},function(err, result) {
            if (err) {
              res.send(err);
            } else {
              res.send(result);
            }
          });
        
        // console.log(val);

        // if(val){
        //     res.status(404).send("user allready exists");
        // }else{
        //     next();
        // }
}

app.post("/admin/signup",async(req, res)=>{

    const {username, password}= req.body;

    jwt.sign({username, password}, secret,async (err, token)=>{
        try{
        const admin= new Admin({username: username, password: password, token: token});
        await admin.save();
        res.send("user created");}
        catch{
            res.send("error");
        }
    })
    
} );

app.listen(5000, ()=>console.log("listening to 5000"));

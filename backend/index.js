const express= require("express");

const cors= require("cors");
const bodyparser= require("body-parser");
const jwt= require("jsonwebtoken");
const mongoose= require("mongoose");

const app= express();

app.use(cors({
    origin: '*', // use your actual domain name (or localhost), using * is not recommended
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
}))

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

const course= new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String
});

const Admin= new mongoose.model("Admin", admin);
const Course= new mongoose.model("Course", course);


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

app.post("/admin/createcourse", async (req, res)=>{

    const {title, description, price, imageLink}= req.body;

    try{
    const course= new Course({title, description, price, imageLink});
    await course.save();
    res.json({message: "course created", course: course});
    }catch{
        res.send({message: "error in creating course"});
    }
});

app.get("/admin/courses", async (req, res)=>{
    try{
    const arr= await Course.find();
    res.send({courses: arr});}
    catch{
        res.send("error");
    }
})

app.listen(5002, ()=>console.log("listening to 5002"));

const express = require("express");

const cors = require("cors");
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const app = express();

app.use(
  cors({
    origin: "*", // use your actual domain name (or localhost), using * is not recommended
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Origin",
      "X-Requested-With",
      "Accept",
      "x-client-key",
      "x-client-token",
      "x-client-secret",
      "Authorization",
      "token",
    ],
    credentials: true,
  })
);

app.use(bodyparser.json());

mongoose
  .connect(
    "mongodb+srv://vasudevgarg7:vasudevgarg7@cluster0.ucwxkxw.mongodb.net/"
  )
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("error");
  });

const admin = new mongoose.Schema({
  username: String,
  password: String,
  token: String,
});
const course = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
});

const Admin = new mongoose.model("Admin", admin);
const Course = new mongoose.model("Course", course);

const user = new mongoose.Schema({
  username: String,
  password: String,
  token: String,
  courses: [
    {
      courseID: String,
      count: Number,
    },
  ],
});

const User = new mongoose.model("User", user);

const secret = "secret";
const authenticate = (req, res, next) => {
  jwt.verify(req.headers.token, secret, (err, decoded) => {
    if (err) {
      res.status(404).send("invalid token");
    } else {
      next();
    }
  });
};

const duplicateValue = async (req, res, next) => {
  const { username, password } = req.body;

  Admin.find().then((e) => console.log(e));

  const val = Admin.exists({ username }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  jwt.sign({ username, password }, secret, async (err, token) => {
    try {
        if(username==="admin"){
      const admin = new Admin({
        username: username,
        password: password,
        token: token,
      });
      await admin.save();
      res.send("user created");
    }else{
        const user= new User({
            username: username,
            passwors: password,
            token: token,
            courses:[]
        });

        await user.save();
        res.send({
            user: user
        })
    }
    } catch {
      res.send("error");
    }
  });
});

app.post("/login", async (req, res) => {
  console.log(req.body.username);
  const { username, password } = req.body;
  console.log(username + " " + password);
  try {
    let val = await Admin.findOne({ username, password });
  if(username==="admin"){
    res.send({
        token: val.token,
        type: "admin"
    })
  }else{
    res.send({
        token: val.token,
        type: "user"
    })
  }

  } catch {}
});

app.post("/admin/createcourse", async (req, res) => {
  const { title, description, price, image } = req.body;

  try {
    const course = new Course({ title, description, price, image });
    await course.save();
    res.json({ message: "course created", course: course });
  } catch {
    res.send({ message: "error in creating course" });
  }
});

app.get(
  "/admin/courses",
  // ,authenticate
  async (req, res) => {
    try {
      const arr = await Course.find();
      res.send({ courses: arr });
    } catch {
      res.send("error");
    }
  }
);

app.put("/admin/course/:id", authenticate, async (req, res) => {
  console.log("hello put request");
  try {
    const id = req.params.id;
    console.log(id);
    let { title, description, price, image } = req.body;

    const val = Course.findOne({ _id: id });

    if (title == "") {
      title = val.title;
    } else if (description === "") {
      description = val.description;
    } else if (price === "") {
      price = val.price;
    } else if (image == "") {
      image = val.image;
    }

    await Course.findOneAndUpdate(
      { _id: id },
      { title, description, price, image }
    );
    let arr = await Course.find();
    console.log(arr);
    res.send({ message: "item updated", arr: arr });
  } catch {
    res.status(401).send("error");
  }
});

app.delete("/admin/course/:id", authenticate, async (req, res) => {
  try {
    const id = req.params.id;

    await Course.deleteOne({ _id: id });
    let arr = await Course.find();
    console.log(arr);
    res.send({ message: "item deleeted", arr: arr });
  } catch {
    res.send("error in deleting");
  }
});

//apis for users

app.post("/user/addtocart/increment", async (req, res) => {
  //i will get token, course id, count through headers
  const user = await User.find({ token: req.headers.token });
  const checkCourse = user.courses.filter(
    (e) => e.courseID === req.headers.courseID
  );

  let { username, password, token, courses } = user;
  let arr = courses;

  if (checkCourse) {
    let idx = arr.findIndex((e) => e.courseID === req.headers.courseID);
    arr[idx].count += 1;
  } else {
    arr.push({
      courseID: req.headers.courseID,
    });
  }

  await User.updateOne(
    { _id: req.headers.token },
    { username, password, token, arr }
  );
});

app.listen(5002, () => console.log("listening to 5002"));

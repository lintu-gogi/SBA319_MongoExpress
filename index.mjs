import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";


import bodyParser from "express";

//const methodOverride = require('method-override');
//import methodOverride from "method-override";
//path for pug

//const path = require('path');
import path from "path";
// These are now route imports, not database imports!
//const users = require("./routes/users");
import users from "./routes/users.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import UserModel from "./models/userdata.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = 5051;
//Connection to database through mongoose
const MONGOURL=process.env.ATLAS_URI;
const options ={
    dbName:'task_list',
};

await mongoose.connect(MONGOURL,options).then(()=>{
    console.log("Database connected");
})
.catch((error)=>
console.log(error));

const app = express();
app.use(express.json());
// Parsing Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Middleware to override method
//app.use(methodOverride('_method'));
// Set Pug as the template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Logging Middlewaare
app.use((req, res, next) => {
  const time = new Date();

  console.log(
    `-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
  );
  if (Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});




// Use our Routes
app.use("/new",users);

//const UserModel=mongoose.model("userslists",userSchema);
//const newuser= await UserModel.create({name:"Mina",phone_no:1236789});
//newuser.save();

app.get("/getUsers", async(req,res)=>{
    const ur=await UserModel.find();
    //console.log(ur);
    res.json(ur);
})
app.get("/base", async(req,res)=>{
    const ur=await UserModel.find();
    //console.log(ur);
  res.render('indexview',{title:'ToDo List Page',ur});
})
app.get("/form", async(req,res)=>{
  const ur=await UserModel.find();
  //console.log(ur);
  res.render('form', { title: 'Add Task' });
})
app.post("/submit", async(req,res)=>{
  if (req.body.task) {
    /*if (usertodo.find((u) => u.list == req.body.task)) {
      res.json({ error: "List Already Added" });
      return;
    }*/
    const newuser= await UserModel.create({name:req.body.task});
    //console.log(newuser);
    //newuser.save();
    res.redirect('/base');
  } else res.status(400).render('form', { title: 'Add Task', error: 'Task is required' });
})
app.get("/getUsers/:name",async(req,res)=>{
    const userbyname= await UserModel.find({name:req.params.name})
    //console.log(userbyname);
    res.json(userbyname);
})
app.post("/deleteItem/:id",async(req,res)=>{ 
    const taskid=req.params.id;
    console.log(taskid);
    const deletedItem= await UserModel.findByIdAndDelete(taskid);
    console.log(deletedItem);
    res.redirect('/base');
})
app.get("/updateview",async(req,res)=>{
  const ur=await UserModel.find();
  res.render('updateview',{title:'Update ToDo List Page',ur});

})
app.post("/updateItem/:id",async(req,res)=>{ 

  const taskid=req.params.id;
  console.log(taskid);
  const uItemFromForm=req.body.upname;
  console.log(uItemFromForm);
  const updatedItem= await UserModel.findByIdAndUpdate(taskid,{"name": uItemFromForm});
  console.log(updatedItem); 
})
/*app.post("/updateItem/:id",async(req,res)=>{ 

  const taskid=req.params.id;
  console.log(taskid);
  const updatedItem= await UserModel.findByIdAndUpdate(taskid,{"name": "Great Dane"});
  console.log(updatedItem); 
})*/
  // Global error handling
  app.use((err, _req, res, next) => {
    res.status(500).send("Seems like we messed up somewhere...");
  });
  
  // Start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
  
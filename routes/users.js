//const express = require("express");
import express from "express";
const router = express.Router();

//const tasks = require("../data/users");
//import tasks from "../data/users.js";
//const usertodo= require("../usertodo/udata"); 
//import usertodo from "../usertodo/udata.js";
const usertodo=[
    {
      uid: 1,
      list: "Fishing"
    },
    {
      uid: 2, 
      list: "Reading"
    },
    {
        uid: 3, 
        list: "Writing"
      }
    
  ];
/*router
.route("/")
.get((req, res) => {
  res.render('indexview',{title:'ToDo List Page',usertodo},
  );
  
});*/
router
.route("/form")
.get((req, res) => {
  res.render('form', { title: 'Add Task' });
});

router
.route("/submit")
.post((req, res) => {
  
      if (req.body.task) {
        if (usertodo.find((u) => u.list == req.body.task)) {
          res.json({ error: "List Already Added" });
          return;
        }
        const ta = {
          uid: usertodo[usertodo.length - 1].uid + 1,
          list: req.body.task
        };
  
        usertodo.push(ta);
        res.redirect('/');
      } else res.status(400).render('form', { title: 'Add Task', error: 'Task is required' });
});

router
.route("/deleteItem/:id")
.post((req,res)=>{
    const taskid=req.params.id;
    console.log(taskid);

})
//Get all users using the todo list
router
  .route("/users")
  .get((req,res,next)=>{
    res.json(tasks);
  })
//Search the user by id through route
router
  .route("/users/:id")
  .get((req, res, next) => {
    const user = tasks.find((u) => u.id == req.params.id);
    if (user) res.json(user);
    else next();
  });
//Search the user by name through route using query params
router
  .route("/users/Name")
  .get((req, res, next) => {
    console.log(req.query.name);
    const user = tasks.find((u) => u.name == req.query.name);
    if (user) res.json(user);
    else next();
  });
 router
  .route("/users/de/:id")
  .delete((req, res, next) => {
    const user = tasks.find((u, i) => {
      if (u.id == req.params.id) {
        tasks.splice(i, 1);
        return true;
      }
    });

    if (user) res.json(user);
    else next();
  });
 router
 .route("/users/pa/:id")
  .patch((req, res, next) => {
    const user = tasks.find((u, i) => {
      if (u.id == req.params.id) {
        for (const key in req.body) {
          tasks[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (user) res.json(user);
    else next();
  })
  

export default router;
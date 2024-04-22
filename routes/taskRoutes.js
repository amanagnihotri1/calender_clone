const express=require("express");
const router=express.Router();
const{createTask,deleteTask,getAllTasks,updateTask}=require("../controller/taskController");
router.get("/allTasks",getAllTasks);
router.post("/createTask",createTask);
router.get("/removeTask",deleteTask);
router.get('/updateTask',updateTask);
module.exports=router;
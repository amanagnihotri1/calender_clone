require('dotenv').config()
const express=require("express");
const taskRoutes=require("./routes/taskRoutes");
const cors=require("cors");
const {pool} = require('./dbConfig/dbConnect');
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })
  app.use("/api",taskRoutes);
app.listen(process.env.PORT,(err)=>
{
  if(err)
  {
    throw new Error(err);
  }
  else{
    console.log("server started successfully at port",process.env.PORT);
  }  
})
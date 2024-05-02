const {pool}=require("../dbConfig/dbConnect");
const createTask=async(req,res,next)=>{
try{
    const data=req.body;
    const createTaskquery=await pool.query('INSERT INTO TaskData(tasktype,taskname,taskstartdate,taskenddate,taskstatus) VALUES($1,$2,$3,$4,$5)',[data.tasktype,data.taskname,data.taskstartdate,data.taskenddate,data.taskstatus]);
    if(!createTaskquery)
    {
        next(err);
    }
        res.status(200).json({message:'success',data:createTaskquery});  
}catch(err)
{
    next(err);
}
}
const deleteTask=async(req,res,next)=>{
try{
    const {taskId}=req.query;
    const deleteQuery=await pool.query(`DELETE FROM TaskData WHERE taskId=$1`,[taskId]);
    if(!deleteQuery)
    {
        next(new Error("delete query not working"));
    }
    res.status(200).json({message:"success",data:deleteQuery});
}
catch(err){
  next(err);  
}
}
const updateTask=async(req,res,next)=>{
  try{
    const{taskId,taskStatus}=req.query;
    const queryResult=await pool.query('UPDATE TaskData SET taskStatus=$2 WHERE taskId=$1',[taskId,taskStatus.toLower()]); 
    res.status(200).json({message:"success",data:queryResult});
  }catch(err){
    next(err);
  }
}
const getAllTasks=async(req,res,next)=>{
 try{
     const data=await pool.query('SELECT * FROM TaskData');
     if(!data)
     {
         return next(new Error("no data found"));
     } 
     res.status(200).json({message:'success',data:data.rows});   
    }catch(err){
       next(err); 
    }

}
module.exports={createTask,deleteTask,getAllTasks,updateTask};

let monthVal=parseInt(new Date().toLocaleDateString().split('/')[1]);
function openModal(id) {
    document.getElementById(id).classList.add('open');
}
// close currently open modal
function closeModal() {
    document.getElementById('myModal').classList.remove('open');
}
const getAllTasks=async()=>{
const myHeaders=new Headers({
    "Content-Type": "application/json",
    "Accept":"*/*",
});
const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
    const res=await fetch('http://localhost:5000/api/allTasks',requestOptions);
 const finalData=await res.text();
return finalData;
}
window.addEventListener('load', function() {  
    document.addEventListener('click', event => {
        if(event.target.classList.contains('jw-modal.open')) {
            closeModal();
        }
    });
});
function Task(taskName,startDate,endDate,taskType,taskStatus)
{
  this.taskname=taskName;
  this.taskstartdate=startDate;
  this.taskenddate=endDate;
  this.tasktype=taskType;
  this.taskstatus=taskStatus;
}
const createTask=async()=>
{
    const taskEndDate=document.querySelector('.endDate').value;
    console.log(taskEndDate)
    const taskNameValue=document.querySelector(".tasknameInput").value;
     console.log(taskNameValue);
     const taskStartDate=document.querySelector('.startDate').value;
     const taskType=document.getElementById('taskType').value;
     console.log(taskType)
     console.log(taskStartDate);
     const taskStatus=document.getElementById('taskStatus').value;
     console.log(taskStatus);
     if(!taskEndDate || !taskStartDate || !taskType || !taskNameValue || !taskStatus)
     {
        document.querySelector(".errorBox").innerHTML="Error,field missing";
     }
    const newTask= new Task(taskNameValue,taskStartDate,taskEndDate,taskType,taskStatus);
    const data=await fetch("http://localhost:5000/api/createTask",{method:"POST",mode:"cors",headers:{
    "Content-Type": "application/json",       
},body:JSON.stringify(newTask)});
   console.log(await data.json());
   newTask && closeModal();  
}
document.getElementById('right').addEventListener("click",async()=>{
const st=new Date();
let removePrev=document.querySelectorAll("div.taskBox");
console.log(monthVal);
for(let i of removePrev){
    i.remove();
}
const nextDate=new Date(st.setMonth(monthVal));
console.log(nextDate);
monthVal=nextDate.toLocaleDateString().split('/')[1];
console.log(monthVal);
const s=document.querySelector(".monthLabel").textContent=monthVal;
await assignTaskonCalender(monthVal);
})
document.getElementById("left").addEventListener("click",async()=>{
    const st=new Date();
    let removePrev=document.querySelectorAll("div.taskBox");
    console.log(monthVal);
    for(let i of removePrev){
        i.remove();
    }
    if(monthVal==0){
     monthVal=12; 
    }
    monthVal--;
    const nextDate=new Date(st.setMonth(monthVal));
    monthVal=nextDate.toLocaleDateString().split('/')[1];
    const s=document.querySelector(".monthLabel").textContent=monthVal;
    await assignTaskonCalender(monthVal);
    })
window.addEventListener("DOMContentLoaded",async()=>
{
    await getAllTasks(new Date().getMonth());
    await assignTaskonCalender(monthVal);
    const textNode=document.createTextNode(new Date().toLocaleDateString().split('/')[1]);
    document.querySelector('.monthLabel').appendChild(textNode);
});
const assignTaskonCalender=async(val)=>{
    const allTasks=await getAllTasks();
    const newData=JSON.parse(allTasks);
    console.log(newData.data);
    console.log(monthVal);
    for(let i=1;i<=30;i++)
    {  
    const dayTasks=await newData.data.filter((item)=>(parseInt(item.taskstartdate.substr(5,2))==val && parseInt(item.taskstartdate.substr(8,2))==i));
    console.log(dayTasks);
    if(dayTasks.length>0)
    {   
        const taskWrapper=document.getElementById(i);
        for(let j=0;j<dayTasks.length;j++)
        {
            const taskContent=document.createElement('div');
            taskContent.setAttribute('draggable',true);
            taskContent.classList.add('taskBox');
            taskContent.innerHTML=dayTasks[j].taskname;
            taskWrapper.appendChild(taskContent);
        }
    }
    }
    }  
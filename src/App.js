import {useState } from "react";
import "./App.css"

function App() {
  // use state to store task 
  const[task,setTask]=useState({message:"",id:""})
  // use state to store all tasks in array 
  const[list,setList]=useState([])
  
    // use state to store task 
  const[editState,setEditState]=useState({status:false,id:""})
  
  
  // add task function 
  function addTask(){
    const newTask={
      text:task.message,
      id:task.id
    }
    setList([
      ...list,newTask
    ])
    setTask({
      message:"",
      id:""
    })
  }
  // change task function
  function changeTask(e){
    setTask({
      message:e.target.value,
      id:new Date().getTime().toString()
    })
  }
  // delete task function
  function deleteTask(id){
    const newList=list.filter((each)=>{
      return each.id!=id
    })
    setList(newList);
    
    
  }
  // edit task function
  function editTask(id){
    console.log(list);
    setEditState({
      status:true,
      id:id
    })
    const item=list.find((each)=>each.id===id)
    setTask({
      message:item.text,
      id:item.id
    })
  }
function addEdit(){
  const afterEditItems=list.map((each)=>{
// console.log(editState.id);
    // console.log(each.id);
    if(each.id===editState.id){
      return (
        {text:task.message,id:editState.id}
      )
    }
    else{
      return each
    }
  })
  setList(afterEditItems);
  setEditState({
    status:false,
    id:""
  })
  setTask({
    message:"",
    id:""
  })
}

  // main Component
  return (
    <div>
      <h1>To Do List</h1>
      <input type="text" name="task" 
      id="task" value={task.message}
      onChange={changeTask}
      placeholder="Enter task"/>
      {
        editState.status?<button onClick={addEdit}>Edit</button>:<button onClick={addTask}>Add</button>
      }
      <hr/>
      {
        list.length==0 &&<h1>List is empty</h1>
      }
       <ul>
        {
          list.map((each)=>{
            const{text,id}=each
            return(
              <li key={id}>
                <span>{text}</span>
                <button onClick={()=>deleteTask(id)}>deleteTask</button>
                <button onClick={()=>editTask(id)}>editTask</button>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;

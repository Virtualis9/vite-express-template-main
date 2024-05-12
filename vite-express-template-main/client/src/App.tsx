import React, { useEffect, useState, useRef } from "react"
import "./App.css";

interface IProject {
  id: number, 
  name: string,
  state: boolean,
};

interface IProgress {
  id: number, 
  name: string,
  state: boolean,
};

function App() {
  //rendering using useState
  const toDoListInputRef = useRef<any>(null);
  const projectInputRef = useRef<any>(null);
  const [projects, setProjects] = useState<IProject[] | null>(null);
  const [newProjects, setNewProjects] = useState("")
  const [progressList, setProgressList] = useState<any>(null);
  const [toDoList, setToDoList] = useState<any>("");
  
  
  // api fetching with useEffect
  useEffect(() => {
    console.log('getting projects');
    fetch('api/projects').then(res => res.json()).then(data => setProjects(data));
  }, []);

  if(!projects){
    return <></>
  }

 
  const handleInputChange = (event:any) =>{
    setNewProjects(event.target.value);
  }

  const handleProgressChange = (event:any) =>{
    setToDoList(event.target.value)
  }

  const addToDoList = () => {
    console.log(toDoList)
    if(!toDoListInputRef.current.value || toDoList.trim() === "" ) return;
    setToDoList(prevToDoList => [...prevToDoList, toDoList])
    setToDoList("")
  }
 
 
  const addProject = ()=>{
    if (!projectInputRef.current.value || newProjects.trim() === "") return;
    
    const newProject: IProject = {
      id: projects.length + 1,
      name: newProjects,
      state: true, 
    };
    setProjects(prevProjects => [...prevProjects, newProject]);
    setNewProjects("")
  }

 const deleteTask = (index:any)=>{
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  }

  const moveTaskUp = (index:any)=>{
    if(index > 0){
      const updatedProjects = [...projects];
      [updatedProjects[index], updatedProjects[index -1]] =
      [updatedProjects[index -1], updatedProjects[index]]
      setProjects(updatedProjects)
    }
  }

  const moveTaskDown = (index:any)=>{
    if(index >= 0){
      const updatedProjects = [...projects];
      [updatedProjects[index], updatedProjects[index +1]] =
      [updatedProjects[index +1], updatedProjects[index]]
      setProjects(updatedProjects)
    }
    
  }

  const progressDropList = () => {
    setProgressList(!progressList)
    console.log(progressList)

  }

  
  return (
    <>
      <div className="project-list">
        <h1>Project Tracker</h1>
        <input
          ref={projectInputRef}
          type="text"
          placeholder="Enter a task"
          value={newProjects}
          onChange={handleInputChange}/>
        <button className="add-button" 
                onClick={() => addProject()}>
                Add
        </button>
        <ol>
          {projects.map((projects, id) => 
            <li key={id} >
              <span className="text">{projects.name}</span>
              <button className="delete-button" onClick={() => deleteTask(id)}>
                Delete
              </button>
              <button className="move-button" onClick={() => moveTaskUp(id)}>
                👆
              </button>
              <button className="move-button" onClick={() => moveTaskDown(id)}>
                👇
              </button>
              <button className="progress-button" onClick={() => progressDropList()}>Check Progress 💹</button>
            </li>
             
          )}
        </ol>
        <ol>
  {progressList ? (
    <>
      <label className="project-list">What needs to be done?</label>
      <input ref={toDoListInputRef} onChange={handleProgressChange} type="text" placeholder="type in your to-do project list" /><br />
      <button className="add-button" onClick={() => addToDoList()}>Submit To-Do List</button><br />
      <span className="text">{toDoList}</span>
    </>
  ) : null}
</ol>

        
      </div>
    </>  
  );
}

export default App;

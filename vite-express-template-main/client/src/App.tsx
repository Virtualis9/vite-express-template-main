import React, { useEffect, useState, useRef } from "react"
import "./App.css";

interface IProject {
  id: number, 
  name: string,
  state: boolean,
};

function App() {
  //rendering using useState
  const projectInputRef = useRef<any>(null);
  const [projects, setProjects] = useState<IProject[] | null>(null);
  const [newProjects, setNewProjects] = useState("")
  const [progress, setNewProgress] =  useState(false)
  
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

  const progressList = () => {
    setNewProgress(!progress)

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
              <span onClick={() => progressList()} className="text">{projects.name}</span>
             
              <button className="delete-button" onClick={() => deleteTask(id)}>
                Delete
              </button>
              <button className="move-button" onClick={() => moveTaskUp(id)}>
                👆
              </button>
              <button className="move-button" onClick={() => moveTaskDown(id)}>
                👇
              </button>
            </li>
             
          )}
        </ol>
        <span>{progress ? 
              <div className="progress">
                <li>
                  <div className="progress" id="progress">
                  <label className="progress">What needs to be done?</label>
                  <input type="text" placeholder="type in your to-do project list"></input>
                  <button className="progress-button">Submit To-Do List</button>
                  <span id="" className="progress" >{progress}</span>
                  </div>
                </li>
              </div>: null}</span>
      </div>
    </>  
  );
}

export default App;

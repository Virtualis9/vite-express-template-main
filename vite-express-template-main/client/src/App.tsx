import React, { useEffect, useState, useRef } from "react"
import "./App.css";

interface IProject {
  id: number, 
  name: string,
  state: boolean,
};


function App() {
  //rendering using useState
  const tasksInputRef = useRef<any>(null);
  const projectInputRef = useRef<any>(null);
  const [projects, setProjects] = useState<IProject[] | null>(null);
  const [newProjects, setNewProjects] = useState<any>("")
  const [progressListVisible, setProgressListVisible] = useState<boolean>(false);
  const [tasks, setTasks] = useState('');
  const [activities, setActivities] = useState([])

  let nextId = 0;
  
  
  // // api fetching with useEffect
  // useEffect(() => {
  //   console.log('getting tasks');
  //   fetch('api/tasks').then(res => res.json()).then(data => setTasks(data));
  // }, []);
  
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

  const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setTasks(event.target.value)
  }

  const addTasks = () => {
   setActivities([...activities, {id: nextId++, tasks: tasks}]);
   
  };
  
 
 
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
    setProgressListVisible(!progressListVisible)
    console.log(progressListVisible)

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
              <button className="progress-button" onClick={() => progressDropList()}>To Do List 💹</button>
            </li>
             
          )}
        </ol>
        <ol>
  {progressListVisible ? (
    <>
      <div className="toDoList">
        <span className="">Tasks</span>
        <input 
         value={tasks}
         onChange={e => setTasks(e.target.value)} 
         type="text" 
         placeholder="Add Tasks Here" />
        <button className="add-button" onClick={() => addTasks()}>Add</button>
        <ul>
            {activities.map(activity => (
              <li key={activity.id}><input type="checkbox"/>{activity.tasks}</li>
            ))}
        </ul>
        
      </div>
      
    </>
  ) : null}
</ol>

        
      </div>
    </>  
  );
}

export default App;

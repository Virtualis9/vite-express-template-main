import React, { useEffect, useState, useRef } from "react"
import "./App.css";
import InputComponent from "./InputComponant";

interface IProject {
  id: number, 
  name: string,
  state: boolean
};

function App() {
  //rendering using useState
  const [projects, setProjects] = useState<IProject[] | null>(null);

  
  // api fetching with useEffect
  useEffect(() => {
    console.log('getting projects');
    fetch('api/projects').then(res => res.json()).then(data => setProjects(data));
  }, []);

  if(!projects){
    
    return <></>
  }


  function handleClick(projectName:string){
    if(projects == null) return;

    console.log("clicked", projectName);

    setProjects((current) => {
      if(!current) return null;
      const nextId = current.length + 1;
      return [...projects,  {id: nextId, name: projectName, state: false}];
    });
}

  const test = (value:number) :boolean => {
    if(value > 10){
      return true;
    }else {
      return false;
    }
  }

  return (
    <>
      <div>
        <h1 className="title">Project Tracker</h1>
      </div>
      <div>  
        {/* <ul className="nameOrderList">
          {users.map(u => <li key={u.id}>{u.name}</li>)}
        </ul> */}
        
        <ul className="projectsOrderList">
          {/* if p.state is true return <></> else return <li> */}
          {projects.map(p => { if(!p.state){return <li key={p.id}>{p.name} <input checked={p.state} type="checkbox"></input></li>} })}
        </ul>
      </div>
      <div>  
        <InputComponent handleClick={handleClick} />
      </div>
    </>  
  );
}

export default App

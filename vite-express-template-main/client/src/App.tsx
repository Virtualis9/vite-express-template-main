import { useEffect, useState, useRef } from "react"
import "./App.css";
import InputComponent from "./InputComponant";

function App() {
  // api fetching with useState
  const [users, setUsers] = useState<any[] | null>(null);
  const [projects, setProjects] = useState<any[] | null>(null);
  useEffect(() => {
    fetch('api/users').then(res => res.json()).then(data => setUsers(data));
  }, []);
  useEffect(() => {
    fetch('api/projects').then(res => res.json()).then(data => setProjects(data))
  })

  // rendering if not code for api return

  if(!users) {
    return <></>
  }

  else if(!projects){
    return <></>
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
          {projects.map(p => <li key={p.id}>{p.name}<input type="checkbox"></input></li>)}
        </ul>
      </div>
      <div>  
        <InputComponent/>
      </div>
    </>  
  );
}

export default App

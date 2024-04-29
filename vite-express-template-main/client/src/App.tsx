import { useEffect, useState } from "react"
import "./App.css";

function App() {
  const [users, setUsers] = useState<any[] | null>(null);
  const [projects, setProjects] = useState<any[] | null>(null);
  useEffect(() => {
    fetch('api/users').then(res => res.json()).then(data => setUsers(data));
  }, []);
  useEffect(() => {
    fetch('api/projects').then(res => res.json()).then(data => setProjects(data))
  })

  if(!users) {
    return <></>
  }
  else if(!projects){
    return <></>
  }

  return (
    <>
      
      <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Project Tracker</title>
      </head>
      <body>
        <h1 className="title">Project Tracker</h1>
        
      
        {/* <ul className="nameOrderList">
          {users.map(u => <li key={u.id}>{u.name}</li>)}
        </ul> */}
        
        <ul className="projectsOrderList">
          {projects.map(p => <li key={p.id}>{p.name}<input type="checkbox"></input></li>)}
        </ul>
        <input id="projectInput" className="projectInput" type="text" placeholder="Got a new project?"></input>
        <input type="submit" value="submit"></input>
               
      </body>
      </html>
      
      
     
    </>
    
    
  );

}

export default App

 import { useRef, useState } from "react"

 
function InputComponent(){

    //function for onClick and passing values
    const projectInputRef = useRef()
    const [projectList, setProjectList] = useState([])


    function handleNewProject(event){
        setProjectList(...projectList,)

    }
    
    
    
    
    function handleClick(){
        let inputElement = projectInputRef.current;
        console.log(inputElement.value);
        inputElement.value= "";

    }


    return(
        <div>
            <input ref={projectInputRef} onChange={handleNewProject} className="projectInput" type="text" placeholder="Got a new project?"></input>
            <input onClick={handleClick} type="submit" value="submit"></input>   
        </div>
    )
    
        
}

export default InputComponent
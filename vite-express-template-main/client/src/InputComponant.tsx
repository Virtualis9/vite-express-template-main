 import { useRef } from "react"

interface InputComponetProps {
    handleClick: (value:string) => void
}

const InputComponent = (props:InputComponetProps) => {
    //function for onClick and passing values
    const projectInputRef = useRef<any>();

    return(
        <div>
            <input ref={projectInputRef}  className="projectInput"  type="text" placeholder="Got a new project?" ></input>
            <button onClick={() => props.handleClick(projectInputRef.current.value)} >Submit</button>   
        </div>
    )       
}

export default InputComponent
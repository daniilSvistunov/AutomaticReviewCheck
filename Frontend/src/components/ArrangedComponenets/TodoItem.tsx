import MyButton from "@components/SimpleComponents/MyButtonComponent";
import { CheckBox } from "@mui/icons-material";
import { useState } from "react";
import task from "src/interfaces";
import Checkbox from "src/theme/overrides/Checkbox";
  

interface props {
    index: number;
    task: task;
    setItemDelete: (val:task ) => void;
    edit: (edit:number) => void;
    finishDate:string;
  }
  function TodoItem({index,task, setItemDelete, edit, finishDate}:props){
    const [isChecked, setIsChecked] = useState(false);
    function change(){
      if(isChecked){
        return 'line-through';

      }
      return 'none';
    }

    function chooseColor(task:task){
   
        switch (task.importance) {
          
            case 0:
                return"#FF2D00"; 
                
            case 1:
                return  "#ECFF00";
                
            case 2:
                return "rgb(0, 171, 85)"; 
                
            default:
             
                return  "white";
        }
   }
    return (
  <li>

  
      <div className="TodoItem">
        
        <input type="checkbox" className="TodoCheckbox" onClick={()=> (setIsChecked(!isChecked))} />
        <div className="TodoTextContainer" style={{ textDecoration: change()}} >{task.todo}</div>
      
          <div className="block2">
      <div  className="TimeContainer"id="creationTime" >
        <div className="Time" style={{backgroundColor:chooseColor(task)}}>
        {finishDate}
        </div>
      </div>
    </div>
    <div className="block3">
      <MyButton value={"edit"} id={"edit"+index} onClick={() => {edit(index)}} />
      <MyButton value={"delete"} id={"delete"+index} onClick={()=>( setItemDelete(task))}/>
    </div>
    </div>
   
  </li>
  
  
    );
  
  }
  export default TodoItem;
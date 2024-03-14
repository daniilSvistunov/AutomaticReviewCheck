
import { FilterItem } from "@components/advanced-filter";
import DropdownMenu from "@components/advanced-filter/Menu/Dropdown";
import DatePickerMenu from "@components/advanced-filter/Menu/filter-item/DatePickerMenu";
import TextMenu from "@components/advanced-filter/Menu/filter-item/TextMenu";
import { FabButtonAnimate } from "@components/animate";
import DateInput from "@components/SimpleComponents/DateComponents";
import MyButton from "@components/SimpleComponents/MyButtonComponent";
import Select from "@components/SimpleComponents/SelectComponenet";
import { useState } from "react";

interface addingProps{
    addTask: (s:string)=> void;
    id: string | undefined;
    setImportance:()=> void;
    setFinishDate:()=> void;
    selectedDate: string; 
  }
  
  function AddingTasks({addTask, id, setImportance, setFinishDate, selectedDate}:addingProps){
    const [task, setTask] = useState({
      label: "Adding a Todo",
      key: [],
      type: "text",
      value: "",
      unit: undefined,
      placeholder: undefined,
      options: undefined,
      optionsLabel: undefined
  });
      
    function add(){
        if(task.value === "")
        {
            return;
        }
        addTask(task.value);
        task.value = ""; 
    }
 

    
  
 
  
    return(
      <div>
      <div className="addingElement">
          <Select id={"importance"} getSelectedValue={setImportance}  selectOptions={["important", "is okay", "can wait"]}/>
          <DateInput onChange={setFinishDate} selectedDate={selectedDate}/>
          <TextMenu filterItem={task} handleClose={add} saveFilter={setTask}/>
         <FabButtonAnimate>
         <MyButton value="add" onClick={add}/> 
         </FabButtonAnimate>
        </div>
        </div>
    );
  }
 
export default AddingTasks;
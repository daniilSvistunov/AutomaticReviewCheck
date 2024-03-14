import Select from "@components/SimpleComponents/SelectComponenet";
import { useState } from "react";
import task from "src/interfaces";

import TodoItem from "./TodoItem";


interface Props{
  todos: [];
  filter: string;
  setItemDelete: (t:task)=>void;
  edit: (edit:number)=>void;
  finishDate:Date;


}

function TodoListSection({todos, filter, setItemDelete, edit, finishDate }:Props){
  const[importanceFilter, setImportanceFilter] = useState(-1);

    function filterImportance(task:task){
      return importanceFilter === task.importance || importanceFilter === -1;
    }

    return (
      <section className="second_Section">
        <div className="SelectContainer">
        <Select id={"filterImportance"} getSelectedValue={(e:number)=>(setImportanceFilter(e-1))} selectOptions={[ "all Tasks", "important", "is okay", "can wait"]}/>
        </div>
        <ul className="list" id="listId">
          {
          
          todos.map((todo:task, index) =>(
            filterImportance(todo) && todo.todo.includes(filter) && <TodoItem key={index} task={todo} index={index} setItemDelete={setItemDelete} edit ={(edit)} finishDate={todo.Date}/>
          ))}
        </ul>
        </section>
    );
    
    }
  
 
  export default TodoListSection;
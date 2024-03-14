import './App.css'

import InputPopup from '@components/ArrangedComponenets/PopUPComponents';
import { useState } from 'react';

import InteractiveSection from './components/ArrangedComponenets/InteractiveSectionComponenet';
import  TodoListSection from './components/ArrangedComponenets/TodoListSection';
import task from './interfaces';

function App() {
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = (date.getMonth() + 1).toString().padStart(2, '0');
  const currentDay = date.getDate().toString().padStart(2, '0');

  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editIndex , setEditIndex] = useState(-1);
  const[finishDate, setFinishDate] = useState(currentYear+"-"+currentMonth+"-"+currentDay);
  const[importance, setImportance] = useState(0);
 const[isEdited, setIsEdited] = useState(false );

 function editTodo(todo:number){
    if(isEdited){
      todos[editIndex].todo = editValue;
    }else{
      setEditIndex(todo);
      setEditValue(todos[todo].todo);
    }
    
    setIsEdited(!isEdited);
 }
 
 function AddTodo(todo:string) {
    
    const item = { todo:todo,
                    id: todos.length,
                    Date: finishDate,
                    importance:importance
    }
    setTodos((prefTodo:task[]) => [...prefTodo,item]);
 }
 function DeleteTodo(itemDelete:task){
  setTodos(todos.filter((item:task) => item.id !== itemDelete.id))
 }
 function sortTodos(){
   setTodos([...todos].sort((a, b) => a.Date.localeCompare(b.Date))) ;

 }

  return (
    
    <>
  <InputPopup isEdited={editTodo} id={editIndex}showPopup={isEdited} oldValue={editValue} newValue={setEditValue} cancel={() => {setEditValue("");setIsEdited(!isEdited)}}/>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    
  />
   
  <section className="todo">
    <section className='InteractiveSection'>
    <InteractiveSection addTask={AddTodo} id={todos.length} setImportance={setImportance} setfilter={setFilter} setFinishDate={setFinishDate} selectedDate={finishDate} sort={sortTodos}/>
    </section>

    <section>
    <TodoListSection todos={todos} filter={filter} setItemDelete={DeleteTodo} edit={editTodo} finishDate={finishDate}/>
    </section>
    
 
  </section>
  <hr />
 
</>

  );
}
 

export default App
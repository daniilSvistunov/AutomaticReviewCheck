
import Logo from "@components/logo";

import AddingTasks from "./AddingComponent";
import Filter from "./FilterComponent";

interface Props{
  addTask: (s:string)=> void;
  id: string | undefined;
  setImportance:()=> void;
  setfilter:()=> void;
  setFinishDate:()=> void;
  selectedDate: string; 
  sort:()=> void;
}

function InteractiveSection({addTask, id,setImportance,setfilter, setFinishDate, selectedDate, sort}:Props){
  
 
    return( 
      <section className="first_Section">
      <div className="Title">
        <div className="Logo">
          <Logo/> 
        </div>
        <h2> Todo-List</h2>
      </div>
      <AddingTasks addTask={addTask} id={id} setImportance={setImportance} setFinishDate={setFinishDate} selectedDate={selectedDate}/>
      <Filter setFilter={setfilter} sort={sort} />
    </section>
    );
  
  }
  
 

  export default InteractiveSection;
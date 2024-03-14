import MyButton from '@components/SimpleComponents/MyButtonComponent';
import TxTInput from '@components/SimpleComponents/TxTInputComponent';
import { useState } from 'react';
import task from 'src/interfaces';


  interface Props{
    isEdited: (index:number)=>void;
    id: number;
    showPopup: (t:task)=> void;
    oldValue: string;
    newValue: (s:string) => void;
    cancel: ()=> void;
  }

function InputPopup({isEdited, id, showPopup, oldValue, newValue, cancel }:Props){
  const [placehold, setPlacehold] = useState("add a Todo");


  function change(val?:string){
    if(oldValue !== ""){    
    isEdited(id);
    }else{
      setPlacehold("please enter a todo");
    }
  } 
    if (!showPopup) {
      return null;
    }
    return (
    <div className='background'> 
    <div id="myModal" className="modal"  >
    <div className="modal-content"  >
      <div className="addingElement">
        <TxTInput placehold={placehold} id={"change_text"} onEnter={change} onChange={newValue} value={oldValue}/>
        <MyButton value={"change"} onClick={change}/>
        <MyButton value={"cancel"} onClick={cancel}/>
      </div>
    </div>
  </div>
  </div>);
  
  
  }
  export  default InputPopup;

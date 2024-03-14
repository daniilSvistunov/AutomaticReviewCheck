interface props {
    placehold:string;
    id: string | undefined;
    onEnter: (s:string)=> void;
    value: string;
    onChange: (s:string)=> void;

}
function TxTInput({placehold,id, onEnter, value, onChange }:props){
    
    return (
    <div className="TxTInputContainer">
       <input
      type="text"
      placeholder={placehold}
      value={value}
      onKeyDown={(e) =>{
        if(e.key === 'Enter'){
          onEnter((e.target as HTMLInputElement).value);
          //(e.target as HTMLInputElement).value = "";
        }
  
      }}  
      onChange={(e) => {
        onChange((e.target as HTMLInputElement).value)}}

      className="input_text"
      id = {id}
    /> 
    </div>
    );
  }

  export default TxTInput;
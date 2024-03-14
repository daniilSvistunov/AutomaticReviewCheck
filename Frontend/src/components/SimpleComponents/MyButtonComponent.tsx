

 interface props{
    value: string;
    id?: string | undefined;
    onClick: ()=> void;

 }
function MyButton({value, id, onClick}:props){
    return(
    <div className="btnContainer">
      <button className='btn' id={id}  onClick={(onClick)} >{value}</button>
    </div>
    )
  }

  export default MyButton;
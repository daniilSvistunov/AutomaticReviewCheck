interface props{
    id: string | undefined; 
    getSelectedValue: (index:number )=> void;
    selectOptions: string[];

}
function Select({id, getSelectedValue, selectOptions}:props){
    return(
      <div className="SelectContainer"> 
      <select name="select" className="select"  id={id} onChange={(e) => getSelectedValue(e.target.selectedIndex)}>
            {selectOptions.map((option:string,index) => (
             <option  key={option} id={""+index}>{option}</option>
          ))}
    </select>
    </div>
    ); 
  }

export default Select;
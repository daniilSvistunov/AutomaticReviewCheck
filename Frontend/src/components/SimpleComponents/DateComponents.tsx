interface props{
    onChange:(s:string)=> void;
    selectedDate: string;
}
function DateInput({onChange, selectedDate}:props){
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const currentDay = date.getDate().toString().padStart(2, '0');
    return ( 
    <div className="DateInputContainer">
    <input type="date" className="DateInput" name="trip-start" value={selectedDate} min={currentYear+"-"+currentMonth+"-"+currentDay} max="2100-12-31"   onChange={(e) => onChange((e.target as HTMLInputElement).value)}/>
    </div>
    );
  }

  export default DateInput;
import { FilterItem } from "@components/advanced-filter";
import TextMenu from "@components/advanced-filter/Menu/filter-item/TextMenu";
import MyButton from "@components/SimpleComponents/MyButtonComponent";
import TxTInput from "@components/SimpleComponents/TxTInputComponent";
import { useState } from "react";


interface filterprops{
    setFilter: (s:string) => void;
    sort: ()=> void;
  }
  
function Filter({setFilter, sort}:filterprops) {

const [val,setval] = useState({
  label: "search",
  key: [],
  type: "text",
  value: "",
  unit: undefined,
  placeholder: undefined,
  options: undefined,
  optionsLabel: undefined
});
  function valval(item:FilterItem<object>){
    if(item.value=== null){
    item.value = "";
    }
    val.value = item.value;
    setFilter(val.value);
    
  }
  return (
    <div className="filterContainer">
    <div className=" filter">
      <TextMenu filterItem={val} saveFilter={valval}/>
    <MyButton value={"sort"}id={"sortbutton"} onClick={sort}/>
  </div>
  </div>
  
  );
  
  }
  export default Filter;
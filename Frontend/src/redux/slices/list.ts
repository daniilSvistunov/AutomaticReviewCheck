import { getTasks,postTask } from "@api/tasks";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {APITask,Task} from "@models/interfaces";

export type ListeState ={
    importance_filter: number | undefined; 
    string_filter:string ;
    tasks: Task[] ;
    
    state: 'idle' | 'loading' | 'succeeded' | 'failed' | 'already loaded';
};

export const initialState: ListeState ={
    importance_filter: undefined, 
    string_filter: "",
     tasks: [],
     state: 'idle',


}

export type TaskAction  = {
    payload:Task;
    type:string;

}

export type UpdateAction  = {
    payload:{task:Task, index:number};
    type:string;

}

export type FilterAction  = {
    payload:{string_filter:string, importance_filter:number | undefined};
    type:string ;

}
const slice = createSlice({
    name: 'list',
    initialState,
    reducers: {
    
        setStringFilter(state, action:FilterAction ){
            const filter = action.payload;
            if(action.payload.string_filter === undefined){
                state.string_filter = "";
            }
            state.string_filter = filter.string_filter
        
        }, 
        setImportanceFilter(state, action:FilterAction ){
            
            const filter = action.payload;
            state.importance_filter = filter.importance_filter;
        
        }, 

        addTask(state, action:TaskAction){

            try {
                state.tasks?.push(action.payload);
            } catch (error) {
                state.tasks = [action.payload];
            } 
        

        },
        removeTask(state, action:TaskAction){
            try {
                state.tasks?.map((task, index)=>{
                    if(task.id === action.payload.id){
                        state.tasks?.splice(index,1);
                    }
                });
            } catch (error) {
                console.log(error);
            }
            
        }, 
        updateTask(state, action:UpdateAction){
            try {
                state.tasks[action.payload.index] = action.payload.task; 
            } catch (error) {
                console.log(error);
            }
        },
        
        
        
    }, 
    extraReducers(builder){
        builder
            .addCase(fetchTasks.pending, (state, action) =>{
                    state.state ='loading';

            })
            .addCase(fetchTasks.fulfilled, (state, action) =>{
                state.state ='succeeded';
                
                const tasks:Task[] =[];
                action.payload.map((task:Task)  => {
                    const date = new Date(task.Date);
                    tasks.push({
                        Date: date.toLocaleDateString(),
                        id: task.id,
                        importance: task.importance,
                        todo: task.todo,
                        Finished: task.Finished


                });
            })
                state.tasks= state.tasks.concat(tasks);
                
            })
            .addCase(fetchTasks.rejected, (state, action) =>{
                state.state ='failed';
                console.log(action.error.message);

            })
            
            .addCase(postTasks.pending ,(state, action) => {
                state.state = 'loading'
            })
            .addCase(postTasks.fulfilled ,(state, action) => {
                state.state = 'succeeded'
            })
            .addCase(postTasks.rejected ,(state, action) => {
                state.state = 'failed'
            })
            



    }
});
export default slice.reducer;
export const {
    setStringFilter,
    setImportanceFilter,
    addTask,
    removeTask,
    updateTask,
    

} = slice.actions;
export const postTasks = createAsyncThunk('tasks/postTasks', async (item:Task) => {
    
    const response = await postTask(item);
    return response

})
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    
    const response = await getTasks();
    return response.data
    

})

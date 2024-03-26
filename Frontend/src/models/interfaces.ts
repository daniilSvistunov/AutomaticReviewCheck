export interface Task{
    todo:string;
    id: number;
    Date: string;
    importance:number;
    Finished?: boolean
  
  }

export interface APITask {
  id: number,
  todo: string,
  completed: boolean,
  userId: number,
}
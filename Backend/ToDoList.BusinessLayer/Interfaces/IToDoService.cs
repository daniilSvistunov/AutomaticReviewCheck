using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ardalis.Result;
using ToDoList.BusinessLayer.Entities;

namespace ToDoList.BusinessLayer.Interfaces
{
    public interface IToDoService
    {
        Task<Result<IEnumerable<ToDoItem>>> GetAllItemsAsync();
        Task<Result<ToDoItem>> GetItemByIdAsync(long id);
        Task<Result> UpdateItemByIdAsync(long id, ToDoItem newItem);
        Task<Result<ToDoItem>> CreateItemAsync(ToDoItem item, Hashtable urlArgs);
        Task<Result> DeleteItemByIdAsync(long id);
    }
}

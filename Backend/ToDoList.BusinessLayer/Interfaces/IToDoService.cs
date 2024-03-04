using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ardalis.Result;
using ToDoList.BusinessLayer.Dtos;

namespace ToDoList.BusinessLayer.Interfaces
{
    public interface IToDoService
    {
        Task<Result<IEnumerable<ToDoItemDto>>> GetAllItemsAsync(string searchString, string date);
        Task<Result<ToDoItemDto>> GetItemByIdAsync(long id);
        Task<Result> UpdateItemByIdAsync(long id, ToDoItemDto newItem);
        Task<Result<ToDoItemDto>> CreateItemAsync(ToDoItemDto item, Hashtable urlArgs);
        Task<Result> DeleteItemByIdAsync(long id);
    }
}

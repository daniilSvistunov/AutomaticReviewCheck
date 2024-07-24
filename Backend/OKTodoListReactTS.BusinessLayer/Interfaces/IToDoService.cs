using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OKTodoListReactTS.BusinessLayer.Dtos;

namespace OKTodoListReactTS.BusinessLayer.Interfaces
{
    public interface IToDoService
    {
        Task<List<ToDoDto>> GetAllTodosAsync();
        Task<ToDoDto> AddTodoAsync(ToDoDto toDoDto);
        Task DeleteTodoAsync(Guid id/*zu ergänzen*/);
        Task<ToDoDto> UpdateTodoAsync(ToDoDto toDoDto/*zu ergänzen*/);
        Task<ToDoDto> GetTodoByIdAsync(Guid id);
    }
}

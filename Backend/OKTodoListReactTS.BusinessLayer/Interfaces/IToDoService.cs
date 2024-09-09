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
        Task DeleteTodoAsync(Guid id);
        Task<ToDoDto> UpdateTodoAsync(ToDoDto toDoDto);
        Task<ToDoDto> FindTodoByIdAsync(Guid id);
    }
}

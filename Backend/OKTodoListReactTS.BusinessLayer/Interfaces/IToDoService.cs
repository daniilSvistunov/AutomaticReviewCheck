using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OKTemplate.BusinessLayer.Dtos;

namespace OKTemplate.BusinessLayer.Interfaces
{
    public interface IToDoService
    {
        Task<List<ToDoDto>> GetAllTodosAsync();
        Task<ToDoDto> GetTodoByIdAsync(Guid id);
        Task<ToDoDto> AddTodoAsync(ToDoDto toDoDto);
        Task DeleteTodoAsync(Guid id);
        Task<ToDoDto> UpdateTodoAsync(ToDoDto toDoDto);
    }
}

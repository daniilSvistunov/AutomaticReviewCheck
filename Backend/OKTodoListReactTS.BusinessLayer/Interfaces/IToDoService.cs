using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OKTemplate.BusinessLayer.Dtos;

namespace OKTemplate.BusinessLayer.Interfaces
{
    public interface IToDoService
    {
        Task<List<ToDoDto>> GetAllTodosAsync();
        Task<ToDoDto> AddTodoAsync(ToDoDto toDoDto);
        Task DeleteTodoAsync(Guid Id);
        Task<ToDoDto> UpdateTodoAsync(ToDoDto toDoDto);
        Task<ToDoDto> GetTodoByIdAsync(Guid Id);
    }
}

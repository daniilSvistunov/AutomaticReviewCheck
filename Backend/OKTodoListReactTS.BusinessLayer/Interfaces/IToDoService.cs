using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OKTodoListReactTS.BusinessLayer.Dtos;

namespace OKTodoListReactTS.BusinessLayer.Interfaces
{
    public interface IToDoService
    {
        Task<ToDoDto> AddTodoAsync(ToDoDto toDoDto);
        Task DeleteTodoAsync(Guid id);
        Task<List<ToDoDto>> GetAllTodosAsync();
        Task<ToDoDto> UpdateTodoAsync(ToDoDto toDoDto);
    }
}

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ardalis.Result;
using OKTodoListReactTS.BusinessLayer.Dtos;

namespace OKTodoListReactTS.BusinessLayer.Interfaces
{
    public interface IToDoService
    {
        Task<Result<List<ToDoDto>>> GetAllTodosAsync();
        Task<ToDoDto> GetToDoByIdAsync(Guid id);
        Task<ToDoDto> AddTodoAsync(ToDoDto toDoDto);
        Task DeleteTodoAsync(ToDoDto toDoDto);
        Task<ToDoDto> UpdateTodoAsync(ToDoDto toDoDto);
    }
}

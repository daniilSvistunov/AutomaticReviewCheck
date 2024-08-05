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
        Task<Result<ToDoDto>> GetToDoByIdAsync(Guid id);
        Task<Result<ToDoDto>> AddTodoAsync(ToDoDto toDoDto);
        Task<Result> DeleteTodoAsync(ToDoDto toDoDto);
        Task<Result<ToDoDto>> UpdateTodoAsync(ToDoDto toDoDto);
    }
}

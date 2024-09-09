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
        Task<Result<ToDoDto>> AddTodoAsync(ToDoDto toDoDto);
        Task<Result<ToDoDto>> DeleteTodoAsync(Guid id);
        Task<Result<ToDoDto>> UpdateTodoAsync(ToDoDto toDoDto);
        Task<Result<ToDoDto>> FindTodoByIdAsync(Guid id);
    }
}

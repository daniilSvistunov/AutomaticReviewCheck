using System.Collections.Generic;
using System.Threading.Tasks;
using OKTemplate.BusinessLayer.Dtos;

namespace OKTemplate.BusinessLayer.Interfaces
{
    public interface IToDoService
    {
        Task<List<ToDoDto>> GetAllTodosAsync();
        Task<ToDoDto> AddTodoAsync(ToDoDto toDoDto);
        Task DeleteTodoAsync(/*zu ergänzen*/ToDoDto toDoDto);
        Task<ToDoDto> UpdateTodoAsync(/*zu ergänzen*/ToDoDto toDoDto);
    }
}

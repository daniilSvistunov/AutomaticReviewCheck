using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OKTemplate.BusinessLayer.Dtos;
using OKTemplate.BusinessLayer.Interfaces;

namespace OKTemplate.Api.Controllers
{
    /// <summary>
    /// Provides CRUD operations on <see cref="ApplicationDto"/>"
    /// </summary>
    [Route("api/todos")]
    [ApiController]
    public class ToDoController : BaseServiceController<IToDoService>
    {
        public ToDoController(IToDoService toDoService)
            : base(toDoService)
        {
        }

        /// <summary>
        /// Retrieves all ToDo items
        /// </summary>
        /// <returns></returns>
        [HttpGet(Name = nameof(GetAllTodosAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ToDoDto>> GetAllTodosAsync()
        {
            return Ok(await _service.GetAllTodosAsync());
        }

        /// <summary>
        /// Adds a new ToDo item
        /// </summary>
        /// <param name="toDoDto"></param>
        /// <returns></returns>
        [HttpPost(Name = nameof(AddToDoAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ToDoDto>> AddToDoAsync([FromBody] ToDoDto toDoDto)
        {
            return Ok(await _service.AddTodoAsync(toDoDto));
        }

        /// <summary>
        /// Deletes an existing ToDo item
        /// </summary>
        /// <returns></returns>
        [HttpDelete("{Id}", Name = nameof(DeleteToDoAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ToDoDto>> DeleteToDoAsync([FromRoute] Guid Id)
        {
            await _service.DeleteTodoAsync(Id);
            return NoContent();
        }

        /// <summary>
        /// Updates an existing ToDo item
        /// </summary>
        /// <param name="toDoDto"></param>
        /// <returns></returns>
        [HttpPut(Name = nameof(UpdateTodoAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ToDoDto>> UpdateTodoAsync([FromBody] ToDoDto toDoDto)
        {
            return Ok(await _service.UpdateTodoAsync(toDoDto));
        }

        /// <summary>
        /// Gets an ToDo item
        /// </summary>
        /// <returns></returns>
        [HttpGet("{Id}", Name = nameof(GetTodoByIdAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ToDoDto>> GetTodoByIdAsync([FromRoute] Guid Id)
        {
            return Ok(await _service.GetTodoByIdAsync(Id));
        }
    }
}
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
        /// Gets all de la ToDo
        /// </summary>
        /// <returns></returns>
        [HttpGet("getall", Name = nameof(GetAllTodosAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ToDoDto>> GetAllTodosAsync()
        {
            return Ok(await _service.GetAllTodosAsync());
        }

        /// <summary>
        /// Adds la ToDo
        /// </summary>
        /// <param name="toDoDto"></param>
        /// <returns></returns>
        [HttpPost("add", Name = nameof(AddToDoAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ToDoDto>> AddToDoAsync([FromBody] ToDoDto toDoDto)
        {
            return Ok(await _service.AddTodoAsync(toDoDto));
        }

        /// <summary>
        /// Delete de la ToDo
        /// </summary>
        /// <returns></returns>
        [HttpDelete("delete", Name = nameof(DeleteToDoAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ToDoDto>> DeleteToDoAsync(/*zu ergänzen*/[FromBody] ToDoDto toDoDto)
        {
            await _service.DeleteTodoAsync(/*zu ergänzen*/toDoDto);
            return NoContent();
        }

        /// <summary>
        /// Update de la ToDo
        /// </summary>
        /// <param name=""></param>
        /// <returns></returns>
        [HttpPut("update", Name = nameof(UpdateTodoAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ToDoDto>> UpdateTodoAsync(/*zu ergänzen*/[FromBody] ToDoDto toDoDto)
        {
            return Ok(await _service.UpdateTodoAsync(/*zu ergänzen*/toDoDto));
        }
    }
}
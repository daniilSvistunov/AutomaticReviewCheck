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
        /// 
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
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet("{id}", Name = nameof(GetTodoByIdAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ToDoDto>> GetTodoByIdAsync([FromRoute] Guid id)
        {
            return Ok(await _service.GetTodoByIdAsync(id));
        }

        /// <summary>
        /// 
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
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpDelete("{id}", Name = nameof(DeleteToDoAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ToDoDto>> DeleteToDoAsync([FromRoute] Guid id)
        {
            await _service.DeleteTodoAsync(id);
            return NoContent();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name=""></param>
        /// <returns></returns>
        [HttpPut(Name = nameof(UpdateTodoAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ToDoDto>> UpdateTodoAsync([FromBody] ToDoDto toDoDto)
        {
            return Ok(await _service.UpdateTodoAsync(toDoDto));
        }


    }
}
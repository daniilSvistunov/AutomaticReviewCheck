using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OKTodoListReactTS.BusinessLayer.Dtos;
using OKTodoListReactTS.BusinessLayer.Interfaces;

namespace OKTodoListReactTS.Api.Controllers
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
        /// Fügt ein Neues ToDo hinzu
        /// </summary>
        /// <param name="toDoDto"></param>
        /// <returns></returns>
        [HttpPost(Name = nameof(AddToDoAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApplicationDto>> AddToDoAsync([FromBody] ToDoDto toDoDto)
        {
            return Ok(await _service.AddTodoAsync(toDoDto));
        }

        /// <summary>
        /// Entfernt ein bestehendes ToDo
        /// </summary>
        /// <param name="toDoDto"></param>
        /// <returns></returns>
        [HttpDelete(Name = nameof(DeleteToDoAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApplicationDto>> DeleteToDoAsync(ToDoDto toDoDto)
        {
            await _service.DeleteTodoAsync(toDoDto);
            return Ok();
        }

        /// <summary>
        /// Gibt alle ToDos zurück
        /// </summary>
        /// <param name="toDoDto"></param>
        /// <returns></returns>
        [HttpGet(Name = nameof(GetAllTodosAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApplicationDto>> GetAllTodosAsync()
        {
            return Ok(await _service.GetAllTodosAsync());
        }

        /// <summary>
        /// Updated ein bestehendes ToDo
        /// </summary>
        /// <param name="toDoDto"></param>
        /// <returns></returns>
        [HttpPut(Name = nameof(UpdateTodoAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApplicationDto>> UpdateTodoAsync(ToDoDto toDoDto)
        {
            return Ok(await _service.UpdateTodoAsync(toDoDto));
        }

        /// <summary>
        /// Suche nach einem ToDo über die ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}", Name = nameof(SearchTodoWithIdAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApplicationDto>> SearchTodoWithIdAsync([FromRoute] Guid id)
        {
            return Ok(await _service.SearchTodoWithIdAsync(id));
        }
    }
}
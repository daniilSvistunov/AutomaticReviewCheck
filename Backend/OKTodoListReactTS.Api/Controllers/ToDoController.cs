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
        /// Methode zum Mappen der Erstellung eines neuen ToDos
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
        /// Methode zum Mappen der Löschung eines ToDos anhand seiner Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}", Name = nameof(DeleteToDoAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApplicationDto>> DeleteToDoAsync([FromRoute] Guid id)
        {
            await _service.DeleteTodoAsync(id);
            return Ok();
        }

        /// <summary>
        /// Methode zum Mappen der Abfrage aller vorhandenen ToDos
        /// </summary>
        /// <returns></returns>
        [HttpGet(Name = nameof(GetAllTodosAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApplicationDto>> GetAllTodosAsync()
        {
            return Ok(await _service.GetAllTodosAsync());
        }

        /// <summary>
        /// Methode zum Mappen der Suche eines ToDos anhand dessen Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}", Name = nameof(FindTodoByIdAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApplicationDto>> FindTodoByIdAsync([FromRoute] Guid id)
        {
            return Ok(await _service.FindTodoByIdAsync(id));
        }

        /// <summary>
        /// Methode zum verändern eines vorhandenen ToDos
        /// </summary>
        /// <param name="toDoDto"></param>
        /// <returns></returns>
        [HttpPut(Name = nameof(UpdateTodoAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApplicationDto>> UpdateTodoAsync([FromBody] ToDoDto toDoDto)
        {
            return Ok(await _service.UpdateTodoAsync(toDoDto));
        }
    }
}
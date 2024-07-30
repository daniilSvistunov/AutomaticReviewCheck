using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ardalis.Result;
using Ardalis.Result.AspNetCore;
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
    [TranslateResultToActionResult]
    public class ToDoController : BaseServiceController<IToDoService>
    {
        public ToDoController(IToDoService toDoService)
            : base(toDoService)
        {
        }

        /// <summary>
        /// Adds a new ToDo
        /// </summary>
        /// <param name="toDoDto">ToDo to add</param>
        /// <returns>200 OK with ApplicationDto-Object, if operation is successful, 400 otherwise</returns>
        [HttpPost("AddToDoAsync", Name = nameof(AddToDoAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<Result<ToDoDto>> AddToDoAsync([FromBody] ToDoDto toDoDto)
        {
            return await _service.AddTodoAsync(toDoDto);
            // return Ok(await _service.AddTodoAsync(toDoDto));
        }

        /// <summary>
        /// Deletes a ToDo
        /// </summary>
        /// <param name="toDoDto">ToDo to delete</param>
        /// <returns>200 OK with ApplicationDto-Object, if operation is successful, 400 otherwise</returns>
        [HttpDelete("DeleteToDoAsync/{id}", Name = nameof(DeleteToDoAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<Result> DeleteToDoAsync([FromRoute] Guid id/*zu ergänzen*/)
        {
            return await _service.DeleteTodoAsync(id/*zu ergänzen*/);
            // return Ok();
        }

        /// <summary>
        /// Gets all ToDos
        /// </summary>
        /// <returns>200 OK with ApplicationDto-Object, if operation is successful, 400 otherwise</returns>
        [HttpGet("GetAllTodosAsync", Name = nameof(GetAllTodosAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<Result<List<ToDoDto>>> GetAllTodosAsync()
        {
            return await _service.GetAllTodosAsync();
            // return Ok(await _service.GetAllTodosAsync());
        }

        /// <summary>
        /// Updates a ToDo
        /// </summary>
        /// <param name="toDoDto">ToDo to update</param>
        /// <returns>200 OK with ApplicationDto-Object, if operation is successful, 400 otherwise</returns>
        [HttpPost("updateToDoAsync", Name = nameof(UpdateTodoAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<Result<ToDoDto>> UpdateTodoAsync([FromBody] ToDoDto toDoDto/*zu ergänzen*/)
        {
            return await _service.UpdateTodoAsync(toDoDto);
            // return Ok(await _service.UpdateTodoAsync(toDoDto/*zu ergänzen*/));
        }

        /// <summary>
        /// Gets a ToDo by its ID
        /// </summary>
        /// <returns>200 OK with ApplicationDto-Object, if operation is successful, 400 otherwise</returns>
        [HttpGet("getToDoByIdAsync/{id}", Name = nameof(GetToDoByIdAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<Result<ToDoDto>> GetToDoByIdAsync([FromRoute] Guid id)
        {
            return await _service.GetTodoByIdAsync(id);
            //return Ok(await _service.GetTodoByIdAsync(id));
        }
    }
}
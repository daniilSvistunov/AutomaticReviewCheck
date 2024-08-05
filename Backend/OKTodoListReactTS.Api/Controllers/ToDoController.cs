using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Ardalis.Result;
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
        /// Adds a todo entry to the list of todo entries
        /// </summary>
        /// <param name="toDoDto"></param>
        /// <exception cref="ArgumentNullException">Throws as the posted todoDto is null</exception>
        /// <exception cref="NoNullAllowedException">Throws as the posted id of the todoDto is null</exception>
        /// <returns>The posted todo entry</returns>
        [HttpPost(Name = nameof(AddToDoAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<Result<ToDoDto>> AddToDoAsync([FromBody] ToDoDto toDoDto)
        {
            return await _service.AddTodoAsync(toDoDto);
        }

        /// <summary>
        /// Deletes a given todo entry from the list of todo entries
        /// </summary>
        /// <param name="toDoDto"></param>
        /// <returns></returns>
        [HttpDelete(Name = nameof(DeleteToDoAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<Result> DeleteToDoAsync([FromBody] ToDoDto toDoDto)
        {
            return await _service.DeleteTodoAsync(toDoDto);
        }

        /// <summary>
        /// Returns all todo entries
        /// </summary>
        /// <param name="toDoDto"></param>
        /// <exception cref="ArgumentNullException">Throws as the posted todoDto is null</exception>
        /// <exception cref="NoNullAllowedException">Throws as the posted id of the todoDto is null</exception>
        /// <returns>A list of todo entries</returns>
        [HttpGet(Name = nameof(GetAllTodosAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<Result<List<ToDoDto>>> GetAllTodosAsync()
        {
            return await _service.GetAllTodosAsync();
        }

        /// <summary>
        /// Returns a single todo entry by it's id
        /// </summary>
        /// <param name="id"></param>
        /// <exception cref="ArgumentNullException">Throws as the posted id is empty</exception>
        /// <returns>The todo entry</returns>
        [HttpGet("{id}", Name = nameof(GetToDoByIdAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<Result<ToDoDto>> GetToDoByIdAsync([FromRoute] Guid id)
        {
            return await _service.GetToDoByIdAsync(id);
        }

        /// <summary>
        /// Updates a given todo entry
        /// </summary>
        /// <param name="toDoDto"></param>
        /// <exception cref="ArgumentNullException">Throws as the posted todoDto is null</exception>
        /// <exception cref="NoNullAllowedException">Throws as the posted id of the todoDto is null</exception>
        /// <returns>Returns the new state of the todo entry after the update</returns>
        [HttpPut(Name = nameof(UpdateTodoAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<Result<ToDoDto>> UpdateTodoAsync([FromBody] ToDoDto toDoDto)
        {
            return await _service.UpdateTodoAsync(toDoDto);
        }
    }
}
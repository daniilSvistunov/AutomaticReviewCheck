using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Ardalis.Result;
using Ardalis.Result.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToDoList.BusinessLayer.Dtos;
using ToDoList.BusinessLayer.Interfaces;

namespace ToDoList.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ToDoItemsController : ControllerBase
    {
        private readonly IToDoService _toDoService;

        public ToDoItemsController(IToDoService toDoService)
        {
            _toDoService = toDoService;
        }

        /// <summary>
        /// Gets all ToDoItems optionally filtered 
        /// </summary>
        /// <returns>All TodoItems optionally filtered </returns>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /api/ToDoItems
        ///     
        ///
        /// </remarks>
        [HttpGet]
        [TranslateResultToActionResult]
        public async Task<Result<IEnumerable<ToDoItemDto>>> GetToDoItems(string? searchString = null, string? date = null)
        {
            string? searchStringEncoded = null;
            string? dateEncoded = null;

            if (!string.IsNullOrEmpty(searchString))
            {
                searchStringEncoded = HtmlEncoder.Default.Encode(searchString);
            }

            if (!string.IsNullOrEmpty(date))
            {
                dateEncoded = HtmlEncoder.Default.Encode(date);
            }

            return await _toDoService.GetAllItemsAsync(searchStringEncoded, dateEncoded);
        }

        /// <summary>
        /// Gets a specific ToDoItem
        /// </summary>
        /// <param name="id"></param>
        /// <returns>A specific ToDoItem</returns>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /api/ToDoItems/5
        ///
        /// </remarks>
        [HttpGet("{id}")]
        [TranslateResultToActionResult]
        public async Task<Result<ToDoItemDto>> GetToDoItem(long id)
        {
            return await _toDoService.GetItemByIdAsync(id);
        }

        /// <summary>
        /// Updates a ToDoItem with the given content in request body
        /// </summary>
        /// <param name="id"></param>
        /// <returns>The newly created ToDoItem</returns>
        /// <remarks>
        /// Sample request:
        ///
        ///     PUT /api/ToDoItems/5
        ///     {
        ///        "id": 5,
        ///        "task": "string",
        ///        "isComplete": true,
        ///        "dueDate": "2024-02-29T15:24"
        ///     }
        ///
        /// </remarks>
        [HttpPut("{id}")]
        [TranslateResultToActionResult]
        public async Task<Result<ToDoItemDto>> PutToDoItem(long id, ToDoItemDto toDoItem)
        {
            if (!ModelState.IsValid)
            {
                string errorMessages = string.Join("; ", ModelState.Values
                                        .SelectMany(x => x.Errors)
                                        .Select(x => x.ErrorMessage));
                return Result.BadRequest(title: "Validation error", details: errorMessages);
            }

            return await _toDoService.UpdateItemByIdAsync(id, toDoItem);
        }

        /// <summary>
        /// Creates a ToDoItem with the given content in request body
        /// </summary>
        /// <returns>The newly created ToDoItem</returns>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /api/ToDoItems
        ///     {
        ///        [optional] "id": 5,
        ///        "task": "string",
        ///        "isComplete": true,
        ///        "dueDate": "2024-02-29T15:24"
        ///     }
        ///
        /// </remarks>
        [HttpPost]
        [TranslateResultToActionResult]
        public async Task<Result<ToDoItemDto>> PostToDoItem(ToDoItemDto toDoItem)
        {
            if (!ModelState.IsValid)
            {
                string errorMessages = string.Join("; ", ModelState.Values
                                        .SelectMany(x => x.Errors)
                                        .Select(x => x.ErrorMessage));
                return Result.BadRequest(title: "Validation error", details: errorMessages);
            }

            Hashtable urlArgs = new Hashtable();
            urlArgs.Add("protocol", this.Request.Scheme);
            urlArgs.Add("host", this.Request.Host);
            urlArgs.Add("routeValue", this.Request.Path.Value);

            return await _toDoService.CreateItemAsync(toDoItem, urlArgs);
        }

        /// <summary>
        /// Deletes a specific ToDoItem
        /// </summary>
        /// <param name="id"></param>
        /// <returns>No content</returns>
        /// <remarks>
        /// Sample request:
        ///
        ///     DELETE /api/ToDoItems/5
        ///
        /// </remarks>
        [HttpDelete("{id}")]
        [TranslateResultToActionResult]
        public async Task<Result> DeleteToDoItem(long id)
        {
            return await _toDoService.DeleteItemByIdAsync(id);
        }
    }
}

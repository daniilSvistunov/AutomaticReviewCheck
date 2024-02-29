using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ardalis.Result;
using Ardalis.Result.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToDoList.BusinessLayer.Entities;
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

        // GET: api/ToDoItems
        [HttpGet]
        [TranslateResultToActionResult]
        public async Task<Result<IEnumerable<ToDoItem>>> GetToDoItems()
        {
            return await _toDoService.GetAllItemsAsync();
        }

        // GET: api/ToDoItems/5
        [HttpGet("{id}")]
        [TranslateResultToActionResult]
        public async Task<Result<ToDoItem>> GetToDoItem(long id)
        {
            return await _toDoService.GetItemByIdAsync(id);
        }

        // PUT: api/ToDoItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [TranslateResultToActionResult]
        public async Task<Result> PutToDoItem(long id, ToDoItem toDoItem)
        {
            return await _toDoService.UpdateItemByIdAsync(id, toDoItem);
        }

        // POST: api/ToDoItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [TranslateResultToActionResult]
        public async Task<Result<ToDoItem>> PostToDoItem(ToDoItem toDoItem)
        {
            Hashtable urlArgs = new Hashtable();
            urlArgs.Add("protocol", this.Request.Scheme);
            urlArgs.Add("host", this.Request.Host);
            urlArgs.Add("routeValue", this.Request.Path.Value);

            return await _toDoService.CreateItemAsync(toDoItem, urlArgs);
        }

        // DELETE: api/ToDoItems/5
        [HttpDelete("{id}")]
        [TranslateResultToActionResult]
        public async Task<Result> DeleteToDoItem(long id)
        {
            return await _toDoService.DeleteItemByIdAsync(id);
        }
    }
}

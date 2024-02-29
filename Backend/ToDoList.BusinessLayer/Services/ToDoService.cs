using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ardalis.Result;
using Microsoft.EntityFrameworkCore;
using ToDoList.BusinessLayer.Data;
using ToDoList.BusinessLayer.Entities;
using ToDoList.BusinessLayer.Interfaces;

namespace ToDoList.BusinessLayer.Services
{
    public class ToDoService : IToDoService
    {
        private readonly ToDoContext _context;

        public ToDoService(ToDoContext context)
        {
            _context = context;
        }

        public async Task<Result<IEnumerable<ToDoItem>>> GetAllItemsAsync()
        {
            if (_context.ToDoItems == null)
            {
                return Result<IEnumerable<ToDoItem>>.NotFound();
            }

            return Result<IEnumerable<ToDoItem>>.Success(await _context.ToDoItems.ToListAsync());
        }

        public async Task<Result<ToDoItem>> GetItemByIdAsync(long id)
        {
            if (_context.ToDoItems == null)
            {
                return Result<ToDoItem>.NotFound();
            }

            var toDoItem = await _context.ToDoItems.FindAsync(id);

            if (toDoItem == null)
            {
                return Result<ToDoItem>.NotFound();
            }

            return Result<ToDoItem>.Success(toDoItem);
        }

        public async Task<Result> UpdateItemByIdAsync(long id, ToDoItem newItem)
        {
            if (id != newItem.id)
            {
                return Result.BadRequest(title: "ID mismatch", details: "Parameter id and id of request body object have to be equal.");
            }

            _context.Entry(newItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ToDoItemExists(id))
                {
                    return Result.NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Result.NoContent();
        }

        public async Task<Result<ToDoItem>> CreateItemAsync(ToDoItem item, Hashtable urlArgs)
        {
            if (_context.ToDoItems == null)
            {
                return Result.Error("Entity set 'ToDoContext.ToDoItems'  is null.");
            }

            _context.ToDoItems.Add(item);
            await _context.SaveChangesAsync();

            var resourceLocation = urlArgs["protocol"]!.ToString() + "://" + urlArgs["host"]!.ToString() + urlArgs["routeValue"]!.ToString() + "/" + item.id.ToString();

            return Result<ToDoItem>.Created(item, resourceLocation);
        }

        public async Task<Result> DeleteItemByIdAsync(long id)
        {
            if (_context.ToDoItems == null)
            {
                return Result.NotFound();
            }

            var toDoItem = await _context.ToDoItems.FindAsync(id);
            if (toDoItem == null)
            {
                return Result.NotFound();
            }

            _context.ToDoItems.Remove(toDoItem);
            await _context.SaveChangesAsync();

            return Result.NoContent();
        }

        private bool ToDoItemExists(long id)
        {
            return (_context.ToDoItems?.Any(e => e.id == id)).GetValueOrDefault();
        }
    }
}

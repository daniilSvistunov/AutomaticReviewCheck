using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ardalis.Result;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ToDoList.BusinessLayer.Data;
using ToDoList.BusinessLayer.Dtos;
using ToDoList.BusinessLayer.Entities;
using ToDoList.BusinessLayer.Interfaces;

namespace ToDoList.BusinessLayer.Services
{
    public class ToDoService : IToDoService
    {
        private readonly ToDoContext _context;
        private readonly IMapper _mapper;

        public ToDoService(ToDoContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<IEnumerable<ToDoItemDto>>> GetAllItemsAsync()
        {
            if (_context.ToDoItems == null)
            {
                return Result<IEnumerable<ToDoItemDto>>.NotFound();
            }

            var toDoItems = await _context.ToDoItems.ToListAsync();
            IEnumerable<ToDoItemDto> toDoItemDtos = _mapper.Map<List<ToDoItemDto>>(toDoItems);

            return Result<IEnumerable<ToDoItemDto>>.Success(toDoItemDtos);
        }

        public async Task<Result<ToDoItemDto>> GetItemByIdAsync(long id)
        {
            if (_context.ToDoItems == null)
            {
                return Result<ToDoItemDto>.NotFound();
            }

            var toDoItem = await _context.ToDoItems.FindAsync(id);

            if (toDoItem == null)
            {
                return Result<ToDoItemDto>.NotFound();
            }

            var toDoItemDto = _mapper.Map<ToDoItemDto>(toDoItem);

            return Result<ToDoItemDto>.Success(toDoItemDto);
        }

        public async Task<Result> UpdateItemByIdAsync(long id, ToDoItemDto newItem)
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

        public async Task<Result<ToDoItemDto>> CreateItemAsync(ToDoItemDto item, Hashtable urlArgs)
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

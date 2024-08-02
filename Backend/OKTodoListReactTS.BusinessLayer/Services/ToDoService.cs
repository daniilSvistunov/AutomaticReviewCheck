using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using OKTodoListReactTS.BusinessLayer.Dtos;
using OKTodoListReactTS.BusinessLayer.Interfaces;
using OKTodoListReactTS.Common.Logging;
using OKTodoListReactTS.DataLayer;
using OKTodoListReactTS.DataLayer.Entities;

namespace OKTodoListReactTS.BusinessLayer.Services
{
    public class ToDoService : BaseEntityService, IToDoService // Das Interface IToDoService stellt die Definition der Methodenrümpfe bereit, gegen das implementiert wird
    {
        private readonly IMapper _mapper; //Autmoapper wird benötigt um die DTOs in Entities umzuwandeln und umgekehrt (mehr Infos im Wiki)

        public ToDoService(ToDoDbContext dbContext, IMapper mapper, ILoggerManager logger) : base(dbContext, logger)
        {
            _mapper = mapper;
        }

        /*Beispielhafte Task:
         * Hintergrund:
         * Für die ToDo-Liste wird ein Endpunkt benötigt, der alle ToDos von der Datenbank zieht
         * Inhalt:
         * Beim Aufrufen des Endpunkt sollen alle ToDos geholt werden.
         */
        public async Task<List<ToDoDto>> GetAllTodosAsync() //Die Methode hat keinen Wert der übergeben wird, es sollen alle Einträge aus des Datenbank zurückgegeben, eine Filterung ist nicht notwendig.
        {
            var toDoEntries = await _dbContext.ToDo.AsNoTracking().ToListAsync();
            _logger.LogInfo($"ToDoService: GetAll has returned {toDoEntries.Count} entries");

            return _mapper.Map<List<ToDoDto>>(toDoEntries);
        }

        public async Task<ToDoDto> GetToDoByIdAsync(Guid id)
        {
            var entity = await _dbContext.ToDo.FindAsync(id);
            if (entity != null)
            {
                _dbContext.Entry(entity).State = EntityState.Detached;
            }
            else
            {
                throw new KeyNotFoundException($"The given id {id} is not present");
            }

            _logger.LogInfo($"ToDoService: Get by id has returned entry with id {id}");

            return _mapper.Map<ToDoDto>(entity);
        }

        /*
         * Beispielhafte Task:
         * Hintergrund:
         * ein ToDo soll erstellt werden
         * Inhalt:
         * ein ToDo soll in die Datenbank geschrieben werden
         * Gesendet wird ein ToDo 
         * Zurück kommt ein ToDo
         */

        //Diese Methode soll Dir als Beispiel für die Logik hinter den Implementierungen gelten
        public async Task<ToDoDto> AddTodoAsync(ToDoDto toDoDto)
        {
            var idAlredyExsists = await _dbContext.ToDo.AnyAsync(entry => entry.Id == toDoDto.Id);
            if (idAlredyExsists)
            {
                throw new ArgumentException($"Can not store the ToDo entry as the id {toDoDto.Id} already exsists");
            }

            var hasDublicate = await _dbContext.ToDo.AnyAsync(e => e.Title.Equals(toDoDto.Title) && e.TargetDate == toDoDto.DueDate);
            if (hasDublicate)
            {
                throw new ArgumentException($"A entry with the same title and duedate alredy exists.");
            }

            var entry = _mapper.Map<ToDoEntry>(toDoDto);
            await _dbContext.ToDo.AddAsync(entry);
            await _dbContext.SaveChangesAsync();

            _logger.LogInfo($"Added todo entry with the id {toDoDto.Id}");

            return toDoDto;
        }

        /*Beispielhafte Task:
         * Hintergrund:
         * Es soll möglich sein einzelne ToDos auch wieder zu löschen, wenn sie nicht benötigt, werden
         * Inhalt:
         * Es muss die Möglichkeit geben die ToDos auch wieder aus der Datenbank zu löschen
         * Merkmale:
         * Der Endpunkt bekommt eine {????} (Welcher Parameter muss übergeben werden?).
         */
        public async Task DeleteTodoAsync(ToDoDto toDoDto)
        {
            var existingEntity = await _dbContext.ToDo.FindAsync(toDoDto.Id);
            if (existingEntity != null)
            {
                _dbContext.Entry(existingEntity).State = EntityState.Detached;
            }
            else
            {
                throw new ArgumentException($"Can not delete an entry that is not present");
            }

            var entry = _mapper.Map<ToDoEntry>(toDoDto);
            _dbContext.ToDo.Remove(entry);
            await _dbContext.SaveChangesAsync();

            _logger.LogInfo($"Marked todo entry with Id {toDoDto.Id} as deleted.");
        }

        /*Beispielhafte Task:
         * Hintergrund:
         * das updaten des ToDo soll möglich sein
         * Inhalt:
         * Die Werte des ToDo soll aktualisiert werden
         * Merkmale:
         * Ein ToDo wird geschickt
         * Als Antwort kommt ein ToDo zurück                                                
         */
        public async Task<ToDoDto> UpdateTodoAsync(ToDoDto toDoDto)
        {
            var existingEntity = await _dbContext.ToDo.FindAsync(toDoDto.Id);
            if (existingEntity != null)
            {
                _dbContext.Entry(existingEntity).State = EntityState.Detached;
            }
            else
            {
                throw new KeyNotFoundException($"Can not update an entry that is not present");
            }

            var hasDublicate = await _dbContext.ToDo.AsNoTracking()
                .AnyAsync(e => e.Title == toDoDto.Title && e.TargetDate == toDoDto.DueDate && e.Id != toDoDto.Id);
            if (hasDublicate)
            {
                throw new ArgumentException($"A entry with the same title and duedate alredy exists.");
            }

            var entry = _mapper.Map<ToDoEntry>(existingEntity);
            _dbContext.ToDo.Update(entry);
            await _dbContext.SaveChangesAsync();

            _logger.LogInfo($"Updated the todo entry with the Id {toDoDto.Id}.");

            return toDoDto;
        }
    }
}

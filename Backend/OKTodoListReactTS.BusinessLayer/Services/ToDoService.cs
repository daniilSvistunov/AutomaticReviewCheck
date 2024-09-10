using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ardalis.Result;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using OKTodoListReactTS.BusinessLayer.Dtos;
using OKTodoListReactTS.BusinessLayer.Interfaces;
using OKTodoListReactTS.DataLayer;
using OKTodoListReactTS.DataLayer.Entities;
//Welche using-Anweisungen werden hier wieso gebraucht?

namespace OKTodoListReactTS.BusinessLayer.Services
{
    public class ToDoService : IToDoService /*Wieso wird hier das Interface IToDoService geerbt*/

    {
        private readonly ToDoDbContext _dbContext;// Füge hier das benötigte Feld ToDoDbContext ein 
        private readonly IMapper _mapper; //Autmoapper wird benötigt um die DTOs in Entities umzuwandeln und umgekehrt (mehr Infos im Wiki)
        public const string notFoundExceptionText = "Found no todo with given id";
        public const string duplicateExceptionText = "A ToDo Exists with the same Title and DueDate";
        readonly ValidationError duplicateException = new ValidationError("duplicate", duplicateExceptionText, "422", ValidationSeverity.Error);

        public ToDoService(IMapper mapper, ToDoDbContext db)
        {
            _mapper = mapper; /* Initialisiere das IMapper-Feld mit dem übergebenen Parameter */
            _dbContext = db; /* Initialisiere das ToDoDbContext-Feld mit dem übergebenen Parameter */
        }

        /*Beispielhafte Task:
         * Hintergrund:
         * Für die ToDo-Liste wird ein Endpunkt benötigt, der alle ToDos von der Datenbank zieht
         * Inhalt:
         * Beim Aufrufen des Endpunkt sollen alle ToDos geholt werden.
         */

        // Füge die Implementierung für die Methode GetAllTodosAsync hier ein, Warum hat die Methode keinen Wert der übergeben wird? 
        public async Task<Result<List<ToDoDto>>> GetAllTodosAsync() //Die Methode hat keinen Wert der übergeben wird, weil [anhand keines Wertes gesucht werden muss]	
        {

            var toDos = await _dbContext.ToDo.ToListAsync();
            var toDoDtos = _mapper.Map<List<ToDoDto>>(toDos);
            return Result<List<ToDoDto>>.Success(toDoDtos);

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
        public async Task<Result<ToDoDto>> AddTodoAsync(ToDoDto toDoDto)
        {

            var toDoEntry = _mapper.Map<ToDoEntry>(toDoDto);
            var toDoEntries = await _dbContext.ToDo.AnyAsync(x => x.Titel.Equals(toDoDto.Titel) && x.TargetDate.Equals(toDoDto.DueDate));

            if (toDoEntries)
            {
                return Result<ToDoDto>.Invalid(duplicateException);
            }

            await _dbContext.ToDo.AddAsync(toDoEntry);
            await _dbContext.SaveChangesAsync();
            var addedToDo = _mapper.Map<ToDoDto>(toDoEntry);
            return Result<ToDoDto>.Success(addedToDo);

        }

        /*Beispielhafte Task:
         * Hintergrund:
         * Es soll möglich sein einzelne ToDos auch wieder zu löschen, wenn sie nicht benötigt, werden
         * Inhalt:
         * Es muss die Möglichkeit geben die ToDos auch wieder aus der Datenbank zu löschen
         * Merkmale:
         * Der Endpunkt bekommt eine {id} (Welcher Parameter muss übergeben werden?).
         */

        // Füge die Implementierung für die Methode DeleteTodoAsync hier ein
        public async Task<Result> DeleteTodoAsync(Guid id)
        {
            try
            {
                var toDoToDelete = await _dbContext.ToDo.FindAsync(id);
                if (toDoToDelete == null)
                {
                    return Result.NotFound(notFoundExceptionText);
                }

                _dbContext.ToDo.Remove(toDoToDelete);
                await _dbContext.SaveChangesAsync();
                return Result.Success();
            }
            catch (Exception ex)
            {
                return Result.Error(ex.Message);
            }
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

        // Füge die Implementierung für die Methode UpdateTodoAsync hier ein
        public async Task<Result<ToDoDto>> UpdateTodoAsync(ToDoDto toDoDto)
        {
            try
            {
                var entity = await _dbContext.ToDo.FindAsync(toDoDto.Id);
                if (entity == null)
                    return Result<ToDoDto>.NotFound(notFoundExceptionText);

                var toDoEntryUpdate = _mapper.Map(toDoDto, entity);
                var toDoEntries = await _dbContext.ToDo.AnyAsync(x => x.Titel.Equals(toDoDto.Titel) && x.TargetDate.Equals(toDoDto.DueDate));

                if (toDoEntries)
                {
                    return Result<ToDoDto>.Invalid(duplicateException);
                }

                await _dbContext.SaveChangesAsync();
                var updatedDto = _mapper.Map<ToDoDto>(toDoEntryUpdate);
                return Result<ToDoDto>.Success(updatedDto);
            }
            catch (Exception ex)
            {
                return Result<ToDoDto>.Error(ex.Message);
            }
        }

        public async Task<Result<ToDoDto>> FindTodoByIdAsync(Guid id)
        {
            try
            {
                var foundToDo = await _dbContext.ToDo.FindAsync(id);
                if (foundToDo == null)
                    return Result<ToDoDto>.NotFound(notFoundExceptionText);
                return Result<ToDoDto>.Success(_mapper.Map<ToDoDto>(foundToDo));
            }
            catch (Exception ex)
            {
                return Result<ToDoDto>.Error(ex.Message);
            }
        }
    }
}

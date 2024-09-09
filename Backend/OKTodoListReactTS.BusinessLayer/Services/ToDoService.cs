using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using OKTodoListReactTS.BusinessLayer.Dtos;
using OKTodoListReactTS.BusinessLayer.Interfaces;
using OKTodoListReactTS.Common.Exceptions;
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
        public const string duplicateExceptionText = "A ToDo Exists with the same Title and TargetDate";

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
        public async Task<List<ToDoDto>> GetAllTodosAsync() //Die Methode hat keinen Wert der übergeben wird, weil [anhand keines Wertes gesucht werden muss]	
        {
            try
            {
                var toDos = await _dbContext.ToDo.ToListAsync();
                var toDoDtos = _mapper.Map<List<ToDoDto>>(toDos);
                return toDoDtos;

            }
            catch (Exception ex)
            {
                throw new ApiException(ex.Message);
            }
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
            try
            {
                var toDoEntry = _mapper.Map<ToDoEntry>(toDoDto);
                var toDoEntries = await _dbContext.ToDo.ToListAsync();
                //foreach (var entry in toDoEntries)
                //{
                //    if (entry.Titel.Equals(toDoDto.Titel) && entry.TargetDate.Equals(toDoDto.TargetDate))
                //    {
                //        throw new Exception(DuplicateExceptionText);
                //    }
                //}

                var x = from entry in toDoEntries
                        where entry.Titel.Equals(toDoDto.Titel) && entry.TargetDate.Equals(toDoDto.TargetDate)
                        select entry;
                if (x.Count() > 0)
                {
                    throw new Exception(duplicateExceptionText);
                }

                await _dbContext.ToDo.AddAsync(toDoEntry);
                await _dbContext.SaveChangesAsync();
                var addedToDo = _mapper.Map<ToDoDto>(toDoEntry);
                return addedToDo;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
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
        public async Task DeleteTodoAsync(Guid id)
        {
            try
            {
                var toDoToDelete = await _dbContext.ToDo.FindAsync(id) ?? throw new Exception(notFoundExceptionText);
                var toDoEntry = _mapper.Map<ToDoEntry>(toDoToDelete);
                _dbContext.ToDo.Remove(toDoEntry);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
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
        public async Task<ToDoDto> UpdateTodoAsync(ToDoDto toDoDto)
        {
            try
            {
                var entity = await _dbContext.ToDo.FindAsync(toDoDto.Id) ?? throw new Exception(notFoundExceptionText);

                var toDoEntryUpdate = _mapper.Map<ToDoEntry>(toDoDto);
                var toDoEntries = await _dbContext.ToDo.ToListAsync();
                foreach (var entry in toDoEntries)
                {
                    if (entry.Titel.Equals(toDoDto.Titel) && entry.TargetDate.Equals(toDoDto.TargetDate))
                    {
                        throw new Exception(duplicateExceptionText);
                    }
                }

                _dbContext.Entry(entity).State = EntityState.Detached;
                _dbContext.ToDo.Update(toDoEntryUpdate);
                await _dbContext.SaveChangesAsync();
                var updatedDto = _mapper.Map<ToDoDto>(toDoEntryUpdate);
                return updatedDto;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ToDoDto> FindTodoByIdAsync(Guid id)
        {
            try
            {
                var foundToDo = await _dbContext.ToDo.FindAsync(id) ?? throw new Exception(notFoundExceptionText);
                return _mapper.Map<ToDoDto>(foundToDo);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}

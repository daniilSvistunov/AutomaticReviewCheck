using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using OKTemplate.BusinessLayer.Dtos;
using OKTemplate.BusinessLayer.Interfaces;
using OKTemplate.Common.Exceptions;
using OKTemplate.DataLayer;
using OKTemplate.DataLayer.Entities;
//Welche using-Anweisungen werden hier wieso gebraucht?

namespace OKTemplate.BusinessLayer.Services
{
    public class ToDoService : IToDoService /*Wieso wird hier das Interface IToDoService geerbt*/

    {
        private readonly ToDoDbContext _dbContext;
        private readonly IMapper _mapper; //Autmoapper wird benötigt um die DTOs in Entities umzuwandeln und umgekehrt (mehr Infos im Wiki)

        public ToDoService(ToDoDbContext dbContext, IMapper mapper)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        /*Beispielhafte Task:
         * Hintergrund:
         * Für die ToDo-Liste wird ein Endpunkt benötigt, der alle ToDos von der Datenbank zieht
         * Inhalt:
         * Beim Aufrufen des Endpunkt sollen alle ToDos geholt werden.
         */
        public async Task<List<ToDoDto>> GetAllTodosAsync() //Die Methode hat keinen Wert der übergeben wird, weil [...]	
        {
            try
            {
                var toDos = await _dbContext.ToDo.ToListAsync();
                var toDoDtos = _mapper.Map<List<ToDoDto>>(toDos);
                return toDoDtos;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<ToDoDto> GetTodoByIdAsync(Guid id)
        {
            var toDoEntry = await _dbContext.ToDo.FindAsync(id) ?? throw new KeyNotFoundException();
            var toDoDto = _mapper.Map<ToDoDto>(toDoEntry);
            return toDoDto;
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
                var newToDo = _mapper.Map<ToDoEntry>(toDoDto);
                var addedToDo = _dbContext.ToDo.Add(newToDo); // await AddAsync not necessary? (see Wiki)
                await _dbContext.SaveChangesAsync();
                return _mapper.Map<ToDoDto>(newToDo);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        /*Beispielhafte Task:
         * Hintergrund:
         * Es soll möglich sein einzelne ToDos auch wieder zu löschen, wenn sie nicht benötigt, werden
         * Inhalt:
         * Es muss die Möglichkeit geben die ToDos auch wieder aus der Datenbank zu löschen
         * Merkmale:
         * Der Endpunkt bekommt eine {????} (Welcher Parameter muss übergeben werden?).
         */
        public async Task DeleteTodoAsync(Guid id)
        {
            var toDoEntry = await _dbContext.ToDo.FindAsync(id) ?? throw new KeyNotFoundException();
            _dbContext.Remove(toDoEntry);
            await _dbContext.SaveChangesAsync();

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
            var toDoEntry = await _dbContext.ToDo.FindAsync(toDoDto.Id) ?? throw new KeyNotFoundException();
            _mapper.Map(toDoDto, toDoEntry); // map new toDoDto to toDoEntry with corresponding ID -> update
            await _dbContext.SaveChangesAsync();
            return _mapper.Map<ToDoDto>(toDoEntry);
        }
    }
}

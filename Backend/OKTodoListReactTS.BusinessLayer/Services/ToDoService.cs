using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using OKTemplate.BusinessLayer.Dtos;
using OKTemplate.BusinessLayer.Interfaces;
using OKTemplate.DataLayer;
using OKTemplate.DataLayer.Entities;
//Welche using-Anweisungen werden hier wieso gebraucht?

/*  System
 *  System.Collections.Generic
 *  System.Threading.Tasks
 *  AutoMapper
 *  OKTemplate.BusinessLayer.Dtos
 *  OKTemplate.BusinessLayer.Interfaces
 *  OKTemplate.DataLayer
 */

namespace OKTemplate.BusinessLayer.Services
{
    public class ToDoService : IToDoService /*Wieso wird hier das Interface IToDoService geerbt*/

    {
        // Füge hier das benötigte Feld ToDoDbContext ein 
        private readonly ToDoDbContext _dbContext;
        private readonly IMapper _mapper; //Autmoapper wird benötigt um die DTOs in Entities umzuwandeln und umgekehrt (mehr Infos im Wiki)

        public ToDoService(IMapper mapper, ToDoDbContext dbContext)
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

        // Füge die Implementierung für die Methode GetAllTodosAsync hier ein, Warum hat die Methode keinen Wert der übergeben wird? 
        public async Task<List<ToDoDto>> GetAllTodosAsync() //Die Methode hat keinen Wert der übergeben wird, weil [sie alle ToDo-Elemente aus der Datenbank abrufen soll und dafür keine Werte benötigt.]	
        {
            // Implementiere die Logik zum Abrufen aller Todos hier
            var toDoEntities = await _dbContext.ToDo.ToListAsync(); //Diese Zeile ruft alle ToDo-Entitäten aus der Datenbank ab und konvertiert sie in eine Liste
            var toDoDtos = _mapper.Map<List<ToDoDto>>(toDoEntities); //Hier wird AutoMapper verwendet, um die Liste der ToDo-Entitäten in eine Liste von ToDoDto-Objekten umzuwandeln
            return toDoDtos;
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
            var toDoEntity = _mapper.Map<ToDoEntry>(toDoDto); //DTO in Entität umwandeln

            await _dbContext.ToDo.AddAsync(toDoEntity); //Entität zur Datenbank hinzufügen
            await _dbContext.SaveChangesAsync();

            var toDoDtoAdded = _mapper.Map<ToDoDto>(toDoEntity); //Entität zurück in DTO umwandeln

            return toDoDtoAdded;
        }

        /*Beispielhafte Task:
         * Hintergrund:
         * Es soll möglich sein einzelne ToDos auch wieder zu löschen, wenn sie nicht benötigt, werden
         * Inhalt:
         * Es muss die Möglichkeit geben die ToDos auch wieder aus der Datenbank zu löschen
         * Merkmale:
         * Der Endpunkt bekommt eine {????} (Welcher Parameter muss übergeben werden?).
         */

        // Füge die Implementierung für die Methode DeleteTodoAsync hier ein
        public async Task DeleteTodoAsync(Guid Id)
        {
            // Implementiere die Logik zum Löschen eines Todos hier
            var toDoEntity = await _dbContext.ToDo.FindAsync(Id) ?? throw new InvalidOperationException("ID kann nicht gefunden werden."); //Die Methode sucht nach einer ToDo-Entität mit der angegebenen ID in der Datenbank

            _dbContext.Remove(toDoEntity); //Die gefundene ToDo-Entität wird aus dem Datenbankkontext entfernt
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

        // Füge die Implementierung für die Methode UpdateTodoAsync hier ein
        public async Task<ToDoDto> UpdateTodoAsync(ToDoDto toDoDto)
        {

            // Implementiere die Logik zum Aktualisieren eines Todos hier
            var toDoEntity = await _dbContext.ToDo.FindAsync(toDoDto.Id) ?? throw new InvalidOperationException("ID kann nicht gefunden werden."); //Sucht nach der ID vom mitgegeben ToDo

            _mapper.Map(toDoDto, toDoEntity); //Das toDoDto wird auf das vorhandene toDoEntity übertragen

            await _dbContext.SaveChangesAsync();

            var toDoDtoUpdated = _mapper.Map<ToDoDto>(toDoEntity); //Die Entität wird zurück in ein DTO umgewandelt

            return toDoDtoUpdated;
        }

        public async Task<ToDoDto> GetTodoByIdAsync(Guid Id)
        {
            var toDoEntity = await _dbContext.ToDo.FindAsync(Id) ?? throw new InvalidOperationException("ID kann nicht gefunden werden.");

            var toDoDtoById = _mapper.Map<ToDoDto>(toDoEntity);

            return toDoDtoById;
        }
    }
}

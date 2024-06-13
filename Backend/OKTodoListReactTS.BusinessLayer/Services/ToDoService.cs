using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using OKTemplate.BusinessLayer.Dtos;
using OKTemplate.BusinessLayer.Interfaces;

//Welche using-Anweisungen werden hier wieso gebraucht?
using OKTemplate.DataLayer;
using OKTemplate.DataLayer.Entities;

namespace OKTemplate.BusinessLayer.Services
{
    public class ToDoService : IToDoService /*Wieso wird hier das Interface IToDoService geerbt --> man braucht die Interface da es dort "declaration" gemacht wird */

    {
        // Füge hier das benötigte Feld ToDoDbContext ein 
        private readonly IMapper _mapper; //Autmoapper wird benötigt um die DTOs in Entities umzuwandeln und umgekehrt (mehr Infos im Wiki)
        private readonly ToDoDbContext _dbContext;

        public ToDoService(/* Füge die benötigten Parameter hier ein */IMapper mapper, ToDoDbContext dbContext)
        {
            /*_mapper = ??? Initialisiere das IMapper-Feld mit dem übergebenen Parameter */
            _mapper = mapper;
            /*_dbContext = ??? Initialisiere das ToDoDbContext-Feld mit dem übergebenen Parameter */
            _dbContext = dbContext;
        }

        /*Beispielhafte Task:
         * Hintergrund:
         * Für die ToDo-Liste wird ein Endpunkt benötigt, der alle ToDos von der Datenbank zieht
         * Inhalt:
         * Beim Aufrufen des Endpunkt sollen alle ToDos geholt werden.
         */

        // Füge die Implementierung für die Methode GetAllTodosAsync hier ein, Warum hat die Methode keinen Wert der übergeben wird? 
        public async Task<List<ToDoDto>> GetAllTodosAsync() //Die Methode hat keinen Wert der übergeben wird, weil [...]	--> Weil der alle zurückgeben geben soll, nicht nur ein ToDo spezifisch 
        {
            // Implementiere die Logik zum Abrufen aller Todos hier    
            var allToDoEntities = await _dbContext.ToDo.ToListAsync(); //Nimmt alle ToDos von DB und wird es in eine Liste konvertiert 
            var allToDoDtos = _mapper.Map<List<ToDoDto>>(allToDoEntities); // Hier wird diese Liste in eine ToDoDto konvertiert
            return allToDoDtos;
            /* Falls es nicht implementiert wurde dann diesen Command ausführen*/
            //throw new NotImplementedException();
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
            var toEntity = _mapper.Map<ToDoEntry>(toDoDto); // Hier wird der gegebene Dto in eine ToDoEntry konvertiert
            await _dbContext.ToDo.AddAsync(toEntity);
            await _dbContext.SaveChangesAsync();

            var returnedDto = _mapper.Map<ToDoDto>(toEntity);
            return returnedDto;
            /* Falls es nicht implementiert wurde dann diesen Command ausführen*/
            //throw new NotImplementedException();
        }

        /*Beispielhafte Task:
        * Hintergrund:
        * Es soll möglich sein einzelne ToDos auch wieder zu löschen, wenn sie nicht benötigt, werden
        * Inhalt:
        * Es muss die Möglichkeit geben die ToDos auch wieder aus der Datenbank zu löschen
        * Merkmale:
        * Der Endpunkt bekommt eine {????} (Welcher Parameter muss übergeben werden?). --> Man muss nicht zurückgeben. Siehe ToDoController -> "return NoContent()"
        */

        // Füge die Implementierung für die Methode DeleteTodoAsync hier ein        
        public async Task DeleteTodoAsync(Guid Id)
        {
            // Implementiere die Logik zum Löschen eines Todos hier
            // Man sucht die korrekte Entity mit die gegebene Id um es zu löschen.
            var toDoEntity = await _dbContext.ToDo.FindAsync(Id) ?? throw new InvalidOperationException("Error - Id was not found");

            _dbContext.Remove(toDoEntity); //Dann mit diese gefundene ToDo löscht es aus dbContext
            await _dbContext.SaveChangesAsync(); //Save
            //return; //return no content()

            /* Falls es nicht implementiert wurde dann diesen Command ausführen*/
            //throw new NotImplementedException();
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
        public async Task<ToDoDto> UpdateTodoAsync(/*Prüfe was der Methode übergeben werden soll und implementiere dies hier ebenfalls*/ ToDoDto toDoDto)
        {
            // Implementiere die Logik zum Aktualisieren eines Todos hier
            var searchToDoDto = await _dbContext.ToDo.FindAsync(toDoDto.Id) ?? throw new InvalidOperationException("Error - Id was not found");
            _mapper.Map(toDoDto, searchToDoDto); //Es wird die gefundene toDo ersetzt
            await _dbContext.SaveChangesAsync();

            var returnedDto = _mapper.Map<ToDoDto>(searchToDoDto); //Die Entität wird zurück in ein DTO umgewandelt

            return returnedDto;
            /* Falls es nicht implementiert wurde dann diesen Command ausführen*/
            //throw new NotImplementedException();
        }

        public async Task<ToDoDto> GetTodoByIdAsync(Guid Id)
        {
            var toDoEntity = await _dbContext.ToDo.FindAsync(Id) ?? throw new InvalidOperationException("Error - Id was not found");

            var toDoDtoById = _mapper.Map<ToDoDto>(toDoEntity);

            return toDoDtoById;
        }
    }
}

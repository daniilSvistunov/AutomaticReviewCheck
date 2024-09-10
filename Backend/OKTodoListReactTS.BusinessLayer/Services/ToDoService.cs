using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using OKTodoListReactTS.BusinessLayer.Dtos;
using OKTodoListReactTS.BusinessLayer.Interfaces;
using OKTodoListReactTS.DataLayer;
using OKTodoListReactTS.DataLayer.Entities;

//Welche using-Anweisungen werden hier wieso gebraucht?
//wird benötgt um zugriff auf deren Methoden zu bekommen wie z.B. Consolenausgaben
//Wird benötig um Listen verwenden zu können
//wird benötig um Task erstellen zu können
//wird benötig um AutoMapper nutzen zu können
//wird benötigt um auf die eigenen Data Transfer Objekte zu zugreifen
//wird benötigt um auf die selbst erstellten Interfaces zu zugreifen

namespace OKTodoListReactTS.BusinessLayer.Services
{
    public class ToDoService : IToDoService /*Wieso wird hier das Interface IToDoService geerbt*/
    //Damit ToDoService als IToDoService definiert es und so bestimmte kriterien erfüllen muss
    {
        // Füge hier das benötigte Feld ToDoDbContext ein 
        private readonly ToDoDbContext _dbContext;

        private readonly IMapper _mapper; //Autmoapper wird benötigt um die DTOs in Entities umzuwandeln und umgekehrt (mehr Infos im Wiki)

        public ToDoService(IMapper mapper, ToDoDbContext dbContext)
        {
            if (mapper == null || dbContext == null)
            {
                throw new Exception("Parameter sind null");
            }
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
        public async Task<List<ToDoDto>> GetAllTodosAsync()
        {
            // Überprüfe, ob die Datenbank-Logik implementiert wurde (falls das nicht der Fall ist)
            if (_dbContext == null)
            {
                throw new NotImplementedException("Datenbankzugriff ist nicht implementiert.");
            }

            // Implementiere die Logik zum Abrufen aller Todos hier
            var result = await _dbContext.ToDo.ToListAsync();

            // Rückgabe der gemappten Liste
            return _mapper.Map<List<ToDoDto>>(result);
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
            // Überprüfe, ob das ToDoDto null ist
            if (toDoDto == null)
            {
                throw new ArgumentNullException(nameof(toDoDto), "ToDoDto kann nicht null sein.");
            }

            // Überprüfe, ob der Text leer oder null ist
            if (string.IsNullOrWhiteSpace(toDoDto.Text))
            {
                throw new ArgumentException("ToDo text kann nicht leer sein.");
            }

            if (string.IsNullOrWhiteSpace(toDoDto.Title))
            {
                throw new ArgumentException("ToDo title kann nicht leer sein.");
            }

            // Überprüfe, ob ein ToDo mit der gleichen Id bereits existiert
            var existingId = await _dbContext.ToDo.FindAsync(toDoDto.Id);
            if (existingId != null)
            {
                throw new Exception("Ein ToDo mit der selben ID existiert bereits!");
            }

            // Überprüfen ob ToDo mit dem gleichen Titel bereits existiert
            var existingTitle = await _dbContext.ToDo.AnyAsync(t => t.Title == toDoDto.Title);
            if (existingTitle)
            {
                throw new Exception("Ein ToDo mit diesem Titel existiert bereits!");
            }

            // Überprüfe ob ToDo mit dem gleichen DueDate existiert
            var existingDueDate = await _dbContext.ToDo.AnyAsync(t => t.TargetDate == toDoDto.DueDate);
            if (existingDueDate)
            {
                throw new Exception("Ein ToDo mit diesem Datum existiert bereits!");
            }

            // Mappe das DTO zu einer Datenbank-Entity
            var entity = _mapper.Map<ToDoEntry>(toDoDto);

            // Füge das neue ToDo zur Datenbank hinzu
            await _dbContext.ToDo.AddAsync(entity);

            // Speichere die Änderungen in der Datenbank
            await _dbContext.SaveChangesAsync();

            // Rückgabe des hinzugefügten ToDo als DTO
            return _mapper.Map<ToDoDto>(entity);
        }

        /*Beispielhafte Task:
         * Hintergrund:
         * Es soll möglich sein einzelne ToDos auch wieder zu löschen, wenn sie nicht benötigt, werden
         * Inhalt:
         * Es muss die Möglichkeit geben die ToDos auch wieder aus der Datenbank zu löschen
         * Merkmale:
         * Der Endpunkt bekommt eine {ToDo} (Welcher Parameter muss übergeben werden?).
         */

        // Füge die Implementierung für die Methode DeleteTodoAsync hier ein
        public async Task DeleteTodoAsync(ToDoDto toDoDto)
        {
            if (toDoDto == null)
            {
                throw new ArgumentNullException(nameof(toDoDto), "ToDoDto kann nicht null sein.");
            }

            // Überprüfe, ob der Datenbank-Kontext implementiert wurde
            if (_dbContext == null)
            {
                throw new NotImplementedException("Datenbankzugriff ist nicht implementiert.");
            }

            // Suche das ToDo in der Datenbank basierend auf der ID
            var findingToDo = await _dbContext.ToDo.FindAsync(toDoDto.Id);
            if (findingToDo == null)
            {
                throw new Exception("ToDo nicht gefunden.");
            }

            // Entferne das gefundene ToDo aus der Datenbank
            _dbContext.ToDo.Remove(findingToDo);

            // Speichere die Änderungen in der Datenbank
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
            if (toDoDto == null)
            {
                throw new ArgumentNullException(nameof(toDoDto), "ToDoDto kann nicht null sein.");
            }

            if (_dbContext == null || _mapper == null)
            {
                throw new NotImplementedException("Datenbank oder Mapper ist nicht implementiert.");
            }

            // Suche das ToDo in der Datenbank basierend auf der ID
            var findingToDo = await _dbContext.ToDo.FindAsync(toDoDto.Id);
            if (findingToDo == null)
            {
                throw new Exception("ToDo nicht gefunden.");
            }

            // Überprüfen ob ein anderer ToDo mit dem gleichen Titel existiert
            var existingTitle = await _dbContext.ToDo
                .AnyAsync(t => t.Title == toDoDto.Title && t.Id != toDoDto.Id);
            if (existingTitle)
            {
                throw new Exception("Ein ToDo mit diesem Titel existiert bereits!");
            }

            // Überprüfe ob ein anderer ToDo mit dem gleichen DueDate existiert
            var existingDueDate = await _dbContext.ToDo
                .AnyAsync(t => t.TargetDate == toDoDto.DueDate && t.Id != toDoDto.Id);
            if (existingDueDate)
            {
                throw new Exception("Ein ToDo mit diesem Datum existiert bereits!");
            }

            // Aktualisiere die Eigenschaften des gefundenen ToDoEntry mit den neuen Werten
            // Über Mapper aktualisieren

            findingToDo.Title = toDoDto.Title;
            findingToDo.Text = toDoDto.Text;
            findingToDo.TargetDate = toDoDto.DueDate;
            findingToDo.Completed = toDoDto.Completed;


            // Wirft ein Equal fehler beim Date
            //_mapper.Map(toDoDto, findingToDo);

            // Speichere die Änderungen in der Datenbank
            await _dbContext.SaveChangesAsync();

            // Rückgabe des aktualisierten ToDo als DTO
            return _mapper.Map<ToDoDto>(findingToDo);
        }

        // Methode SearchTodoWithIdAsync
        public async Task<ToDoDto> SearchTodoWithIdAsync(Guid id)
        {
            if (_dbContext == null || _mapper == null)
            {
                throw new NotImplementedException("Datenbank oder Mapper ist nicht implementiert.");
            }

            var toDoEntry = await _dbContext.ToDo.FindAsync(id);
            if (toDoEntry == null)
            {
                return null; // Rückgabe null, wenn das ToDo nicht gefunden wurde
            }

            // Mappe die Entity zu einem DTO und gib es zurück
            return _mapper.Map<ToDoDto>(toDoEntry);
        }
    }
}

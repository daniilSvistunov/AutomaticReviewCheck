using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using OKTodoListReactTS.BusinessLayer.Dtos;
using OKTodoListReactTS.BusinessLayer.Interfaces;
using OKTodoListReactTS.DataLayer;
//Welche using-Anweisungen werden hier wieso gebraucht?

namespace OKTodoListReactTS.BusinessLayer.Services
{
    public class ToDoService : IToDoService /*Wieso wird hier das Interface IToDoService geerbt*/

    {
        // Füge hier das benötigte Feld ToDoDbContext ein 
        private readonly ToDoDbContext _dbContext;
        private readonly IMapper _mapper; //Autmoapper wird benötigt um die DTOs in Entities umzuwandeln und umgekehrt (mehr Infos im Wiki)

        public ToDoService(IMapper mapper, ToDoDbContext dbContext)
        {
            /*_mapper = ??? Initialisiere das IMapper-Feld mit dem übergebenen Parameter */
            /*_dbContext = ??? Initialisiere das ToDoDbContext-Feld mit dem übergebenen Parameter */

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
        public async Task<List<ToDoDto>> GetAllTodosAsync() //Die Methode hat keinen Wert der übergeben wird, weil [Eine Liste von allen Entitäten zurückgeben wird]	
        {
            // Implementiere die Logik zum Abrufen aller Todos hier
            /* Falls es nicht implementiert wurde dann diesen Command ausführen*/
            try
            {
                var todos = await _dbContext.ToDo.ToListAsync();
                var todoDtos = _mapper.Map<List<ToDoDto>>(todos);
                return todoDtos;
            }
            catch (Exception ex)
            {
                // Log the exception (if logging is configured) and return a 500 status with more details
                throw new Exception("An error occurred while retrieving todos", ex);
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
            /* Falls es nicht implementiert wurde dann diesen Command ausführen*/

            throw new NotImplementedException();
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
        public async Task DeleteTodoAsync(/*Prüfe was der Methode übergeben werden soll und implementiere dies hier ebenfalls*/)
        {
            // Implementiere die Logik zum Löschen eines Todos hier
            /* Falls es nicht implementiert wurde dann diesen Command ausführen*/
            throw new NotImplementedException();
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
        public async Task<ToDoDto> UpdateTodoAsync(/*Prüfe was der Methode übergeben werden soll und implementiere dies hier ebenfalls*/)
        {
            // Implementiere die Logik zum Aktualisieren eines Todos hier
            /* Falls es nicht implementiert wurde dann diesen Command ausführen*/
            throw new NotImplementedException();
        }
    }
}

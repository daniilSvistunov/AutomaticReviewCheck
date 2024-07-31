﻿using System;
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
        private const string NoToDoFound = "No ToDo with such ID was found.";
        private const string TodoAlreadyExists = "ToDo with such ID already exists.";
        // Füge hier das benötigte Feld ToDoDbContext ein
        private readonly ToDoDbContext _context;
        private readonly IMapper _mapper; //Autmoapper wird benötigt um die DTOs in Entities umzuwandeln und umgekehrt (mehr Infos im Wiki)

        public ToDoService(/* Füge die benötigten Parameter hier ein */IMapper mapper, ToDoDbContext context)
        {
            _mapper = mapper; /*Initialisiere das IMapper-Feld mit dem übergebenen Parameter */
            _context = context; /* Initialisiere das ToDoDbContext-Feld mit dem übergebenen Parameter */
        }

        /*Beispielhafte Task:
         * Hintergrund:
         * Für die ToDo-Liste wird ein Endpunkt benötigt, der alle ToDos von der Datenbank zieht
         * Inhalt:
         * Beim Aufrufen des Endpunkt sollen alle ToDos geholt werden.
         */

        // Füge die Implementierung für die Methode GetAllTodosAsync hier ein, Warum hat die Methode keinen Wert der übergeben wird? 
        public async Task<Result<List<ToDoDto>>> GetAllTodosAsync() //Die Methode hat keinen Wert der übergeben wird, weil [...]	
        {
            var toDoEntries = await _context.ToDo.ToListAsync();
            var toDoDtos = _mapper.Map<List<ToDoDto>>(toDoEntries);
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
            var title = toDoDto.Title;
            var dueDate = toDoDto.DueDate;
            List<ToDoEntry> existingToDoEntries = await _context.ToDo.ToListAsync();
            foreach (var entry in existingToDoEntries)
            {
                if (entry.Title == title && DateTime.Equals(entry.TargetDate, dueDate))
                {
                    return Result<ToDoDto>.Error(TodoAlreadyExists);
                }
            }

            var toDoEntry = _mapper.Map<ToDoEntry>(toDoDto);
            await _context.AddAsync(toDoEntry);
            await _context.SaveChangesAsync();
            return Result<ToDoDto>.Success(toDoDto);
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
        public async Task<Result> DeleteTodoAsync(Guid id/*Prüfe was der Methode übergeben werden soll und implementiere dies hier ebenfalls*/)
        {
            var toDoEntry = await _context.ToDo.FindAsync(id);
            if (toDoEntry == null)
            {
                return Result.NotFound(NoToDoFound);
            }

            _context.Remove(toDoEntry);
            await _context.SaveChangesAsync();
            return Result.Success();
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
        public async Task<Result<ToDoDto>> UpdateTodoAsync(ToDoDto updatedToDoDto/*Prüfe was der Methode übergeben werden soll und implementiere dies hier ebenfalls*/)
        {
            var title = updatedToDoDto.Title;
            var dueDate = updatedToDoDto.DueDate;
            var id = updatedToDoDto.Id;
            var existingToDoEntry = await _context.ToDo.FindAsync(id);

            if (existingToDoEntry == null)
            {
                return Result<ToDoDto>.NotFound(NoToDoFound);
            }

            List<ToDoEntry> existingToDoEntries = await _context.ToDo.ToListAsync();
            foreach (var entry in existingToDoEntries)
            {
                if (entry.Title == title && DateTime.Equals(entry.TargetDate, dueDate))
                {
                    return Result<ToDoDto>.Error(TodoAlreadyExists);
                }
            }

            existingToDoEntry.Text = updatedToDoDto.Text;
            existingToDoEntry.Completed = updatedToDoDto.Completed;
            existingToDoEntry.TargetDate = updatedToDoDto.DueDate;
            existingToDoEntry.Title = updatedToDoDto.Title;

            await _context.SaveChangesAsync();

            return Result<ToDoDto>.Success(updatedToDoDto);
        }

        /*Beispielhafte Task:
         * Hintergrund:
         * Für die ToDo-Planung wird ein Endpunkt benötigt, der eine ToDo von der Datenbank zieht
         * Inhalt:
         * Über einen Endpunkt die ToDo Id mitschickt soll die ToDo-Aufgabe geholt werden.
         * Merkmale:
         * Die ID des ToDos wird übergeben
         * Als Antwort kommt ein ToDo zurück
         */
        public async Task<Result<ToDoDto>> GetTodoByIdAsync(Guid id)
        {
            var toDoEntry = await _context.ToDo.FindAsync(id);
            if (toDoEntry == null)
            {
                return Result<ToDoDto>.NotFound(NoToDoFound);
            }

            ToDoDto toDoDto = _mapper.Map<ToDoDto>(toDoEntry);
            return Result<ToDoDto>.Success(toDoDto);
        }
    }
}

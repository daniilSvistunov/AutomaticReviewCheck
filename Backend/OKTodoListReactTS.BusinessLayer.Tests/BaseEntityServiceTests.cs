using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using OKTemplate.DataLayer;
using OKTemplate.DataLayer.Entities;

namespace OKTemplate.BusinessLayer.Tests
{
    public class BaseEntityServiceTests
    {
        protected ToDoDbContext CreateTestDbContext()
        {
            // Konfiguriere In-Memory-Datenbank mit dem gleichen Namen wie in Ihrer Startup-Klasse
            // Wir nutzen für Tests eine InMemory-Database, damit wir keine echte Datenbank benötigen
            var contextOptions = new DbContextOptionsBuilder<ToDoDbContext>()
                .UseInMemoryDatabase("InMemoryDatabase" + Guid.NewGuid())
                .ConfigureWarnings(b => b.Ignore(InMemoryEventId.TransactionIgnoredWarning))
                .Options;

            var context = new ToDoDbContext(contextOptions);

            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            SeedData(context);

            return context;
        }

        // Seed-Methode für die InMemory-Datenbank
        // Hier werden die Daten für die Tests angelegt
        private void SeedData(ToDoDbContext dbContext)
        {
            dbContext.Database.EnsureDeleted();
            dbContext.Database.EnsureCreated();

            var toDoEntries = new List<ToDoEntry>
            {
                new ToDoEntry
                {
                    Id = Guid.NewGuid(),
                    Text = "ToDo 1",
                    TargetDate = DateTime.UtcNow.AddDays(1),
                    CreatedOn = DateTime.UtcNow,
                    UpdatedOn = DateTime.UtcNow
                },
                new ToDoEntry
                {
                    Id = Guid.NewGuid(),
                    Text = "ToDo 2",
                    TargetDate = DateTime.UtcNow.AddDays(2),
                    CreatedOn = DateTime.UtcNow,
                    UpdatedOn = DateTime.UtcNow
                },
                new ToDoEntry
                {
                    Id = Guid.NewGuid(),
                    Text = "ToDo 3",
                    TargetDate = DateTime.UtcNow.AddDays(3),
                    CreatedOn = DateTime.UtcNow,
                    UpdatedOn = DateTime.UtcNow
                }
            };

            dbContext.ToDo.AddRange(toDoEntries);
            dbContext.SaveChanges();
        }
    }
}

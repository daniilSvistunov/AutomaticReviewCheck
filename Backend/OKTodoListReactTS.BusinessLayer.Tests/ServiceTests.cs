using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using OKTodoListReactTS.BusinessLayer.Mapping;
using OKTodoListReactTS.DataLayer;
using OKTodoListReactTS.DataLayer.Entities;
using Xunit;

namespace OKTemplate.BusinessLayer.Tests
{
    public class ServiceTests : IAsyncLifetime
    {
        protected ToDoDbContext Context { get; private set; } = null!;
        protected IMapper Mapper { get; private set; } = null!;

        public Task DisposeAsync()
        {
            return Task.CompletedTask;
        }

        public async Task InitializeAsync()
        {
            CreateContext();
            CreateMapper();
        }

        private void CreateContext()
        {
            // Use in-memory database for tests
            var databaseGuid = Guid.NewGuid();

            var options = new DbContextOptionsBuilder<ToDoDbContext>()
                .UseInMemoryDatabase(databaseGuid.ToString())
                .EnableSensitiveDataLogging()
                .EnableDetailedErrors()
                .ConfigureWarnings(x => x.Ignore(InMemoryEventId.TransactionIgnoredWarning))
                .Options;

            Context = new ToDoDbContext(options);
            Context.ChangeTracker.Clear();

            Context.Database.EnsureDeleted();
            Context.Database.EnsureCreated();

            SeedData(Context);
        }

        private void CreateMapper()
        {
            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });
            Mapper = mapperConfig.CreateMapper();
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
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using OKTodoListReactTS.DataLayer;

namespace OKTodoListReactTS.BusinessLayer.Tests
{
    public class BaseEntityServiceTests
    {
        protected ToDoDbContext CreateTestDbContext()
        {
            var contextOptions = new DbContextOptionsBuilder<ToDoDbContext>()
                .UseInMemoryDatabase("ServiceTests" + Guid.NewGuid())
                .ConfigureWarnings(b => b.Ignore(InMemoryEventId.TransactionIgnoredWarning))
            .Options;

            var context = new ToDoDbContext(contextOptions);

            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            context.SaveChanges();

            return context;
        }
    }
}
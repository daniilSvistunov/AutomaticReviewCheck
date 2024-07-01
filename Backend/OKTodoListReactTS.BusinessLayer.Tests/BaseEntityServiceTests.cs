using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using OKTodoListReactTS.DataLayer;

namespace OKTodoListReactTS.BusinessLayer.Tests
{
    public class BaseEntityServiceTests
    {
        protected TemplateDbContext CreateTestDbContext()
        {
            var contextOptions = new DbContextOptionsBuilder<TemplateDbContext>()
                .UseInMemoryDatabase("ServiceTests" + Guid.NewGuid())
                .ConfigureWarnings(b => b.Ignore(InMemoryEventId.TransactionIgnoredWarning))
            .Options;

            var context = new TemplateDbContext(contextOptions);

            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            context.SaveChanges();

            return context;
        }
    }
}
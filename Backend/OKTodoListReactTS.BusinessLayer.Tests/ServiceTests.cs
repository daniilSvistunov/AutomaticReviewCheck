using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using OKTemplate.Api.Mapping;
using OKTemplate.DataLayer;
using Xunit;

namespace OKTemplate.BusinessLayer.Tests
{
    public class ServiceTests : IAsyncLifetime
    {
        protected ToDoDbContext Context = null!;

        public Task DisposeAsync()
        {
            return Task.CompletedTask;
        }

        public async Task InitializeAsync()
        {
            CreateContext();

        }

        private void CreateContext()
        {
            // Use in-memory database for tests
            var databaseGuid = Guid.NewGuid();

            var options = new DbContextOptionsBuilder<ToDoDbContext>()
                .UseInMemoryDatabase(databaseGuid.ToString())
                .EnableSensitiveDataLogging()
                .EnableDetailedErrors()
                .ConfigureWarnings(x => x.Ignore(InMemoryEventId.TransactionIgnoredWarning)).Options;

            Context = new ToDoDbContext(options);
            Context.ChangeTracker.Clear();
        }

        protected static IMapper GetMapper()
        {
            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });
            return mapperConfig.CreateMapper();
        }
    }
}
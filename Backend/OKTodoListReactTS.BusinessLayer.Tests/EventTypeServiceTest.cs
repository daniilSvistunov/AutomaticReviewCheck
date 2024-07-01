using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Moq;
using OKTodoListReactTS.BusinessLayer.Services;
using OKTodoListReactTS.Common.Logging;
using OKTodoListReactTS.DataLayer.Entities;
using Xunit;

namespace OKTodoListReactTS.BusinessLayer.Tests
{
    /// <summary>
    /// Runs tests on <see cref="EventTypeService"/>
    /// </summary>
    public class EventTypeServiceTests : BaseEntityServiceTests
    {
        private readonly Mock<ILoggerManager> _mockLogger = new();

        public EventTypeServiceTests()
        {
            // nop
        }

        [Fact]
        public async Task GetEventTypesAsync_ReturnsObject()
        {
            // Arrange 
            var dbContext = CreateTestDbContext();
            Application application = new() { Id = Guid.NewGuid(), AppName = "Test" };
            dbContext.Add(application);
            EventType expectation = new() { EventTypeName = "Test", ApplicationId = application.Id };
            dbContext.Add(expectation);
            dbContext.SaveChanges();
            var eventTypeService = new EventTypeService(dbContext, _mockLogger.Object);

            // Act
            var serviceResult = await eventTypeService.GetEventTypesAsync();

            // Assert
            Assert.IsType<List<EventType>>(serviceResult);
            Assert.Single(serviceResult);
        }

        [Fact]
        public async Task GetEventTypesByApplicationIdAsync_ReturnsObject()
        {
            // Arrange 
            var dbContext = CreateTestDbContext();
            var applicationID = Guid.NewGuid();
            Application application = new() { Id = applicationID, AppName = "Test" };
            dbContext.Add(application);
            EventType expectation = new() { ApplicationId = applicationID, EventTypeName = "Test" };
            dbContext.Add(expectation);
            dbContext.SaveChanges();
            var eventTypeService = new EventTypeService(dbContext, _mockLogger.Object);

            // Act
            var serviceResult = await eventTypeService.GetEventTypesByApplicationIdAsync(applicationID);

            // Assert
            Assert.IsType<List<EventType>>(serviceResult);
            Assert.Single(serviceResult);
            Assert.Equal(applicationID, serviceResult.Single().ApplicationId);
        }
    }
}

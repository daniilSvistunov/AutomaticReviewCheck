using System;
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
    /// Runs tests on <see cref="ApplicationService"/>
    /// </summary>
    public class ApplicationServiceTests : BaseEntityServiceTests
    {
        private readonly Mock<ILoggerManager> _mockLogger = new();

        public ApplicationServiceTests()
        {
            // nop
        }

        [Fact]
        public async Task GetApplicationByIdAsync_ReturnsApplication()
        {
            // Arrange 
            var applicationID = Guid.NewGuid();
            var expectation = new Application { Id = applicationID, AppName = "Test" };
            var dbContext = CreateTestDbContext();
            dbContext.Add(expectation);
            dbContext.SaveChanges();
            var applicationService = new ApplicationService(dbContext, _mockLogger.Object);

            // Act
            var serviceResult = await applicationService.GetApplicationByIdAsync(applicationID);

            // Assert
            Assert.IsType<Application>(serviceResult);
            Assert.Equal(serviceResult.Id, expectation.Id);
        }

        [Fact]
        public async Task AddApplicationAsync_ReturnsNewApplication()
        {
            // Arrange 
            var expectation = new Application { Id = Guid.NewGuid(), AppName = "Test" };
            var dbContext = CreateTestDbContext();
            var applicationService = new ApplicationService(dbContext, _mockLogger.Object);
            var currentApplicationCount = dbContext.Application.Count();

            // Act
            var serviceResultId = await applicationService.AddApplicationAsync(expectation);

            // Assert
            Assert.IsType<Application>(serviceResultId);
            Assert.Equal(dbContext.Application.Count(), currentApplicationCount + 1);
        }
    }
}
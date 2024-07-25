using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Moq;
using OKTodoListReactTS.BusinessLayer.Dtos;
using OKTodoListReactTS.BusinessLayer.Interfaces;
using OKTodoListReactTS.BusinessLayer.Services;
using OKTodoListReactTS.DataLayer;
using OKTodoListReactTS.DataLayer.Entities;
using Xunit;

namespace OKTemplate.BusinessLayer.Tests
{
    public class ToDoServiceTests : ServiceTests
    {
        private const string NoToDoFound = "No ToDo with such ID was found";
        private IToDoService? _toDoService;
        private readonly Mock<IMapper> _mockMapper = new();
        private Mock<ToDoDbContext> _mockContext = new();
        private Mock<DbSet<ToDoEntry>> _mockDbSet = new();


        private ToDoService CreateToDoService()
        {
            _mockContext = CreateTestToDoDbContext();
            return new ToDoService(_mockMapper.Object, _mockContext.Object/*welche Parameter braucht man hier?*/);
        }

        private Mock<ToDoDbContext> CreateTestToDoDbContext()
        {
            var options = new DbContextOptionsBuilder<ToDoDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;
            _mockContext = new Mock<ToDoDbContext>(options);

            var toDoEntries = new List<ToDoEntry>().AsQueryable();
            _mockDbSet = new Mock<DbSet<ToDoEntry>>();
            _mockDbSet.As<IQueryable<ToDoEntry>>().Setup(m => m.Provider).Returns(toDoEntries.Provider);
            _mockDbSet.As<IQueryable<ToDoEntry>>().Setup(m => m.Expression).Returns(toDoEntries.Expression);
            _mockDbSet.As<IQueryable<ToDoEntry>>().Setup(m => m.ElementType).Returns(toDoEntries.ElementType);
            _mockDbSet.As<IQueryable<ToDoEntry>>().Setup(m => m.GetEnumerator()).Returns(toDoEntries.GetEnumerator());

            _mockContext.Setup(c => c.ToDo).Returns(_mockDbSet.Object);

            Mock<ToDoDbContext> mockTestContext = new Mock<ToDoDbContext>(options);
            return mockTestContext;
        }

        //Der erste Test ist schon für Dich implementiert
        [Fact]
        public async Task GetAllTodosAsync()
        {
            // Arrange
            _toDoService = CreateToDoService();

            // Act
            var result = await _toDoService.GetAllTodosAsync();

            // Assert
            Assert.NotNull(result);
        }

        //Die weiteren Tests musst Du selbst implementieren
        [Fact]
        public async Task AddTodoAsync()
        {
            // Arrange
            _toDoService = CreateToDoService();
            var dateTime = new DateTime(1998, 04, 30);
            var text = "Test";
            ToDoDto expectedToDoDto = new ToDoDto()
            {
                Text = text,
                DueDate = dateTime,
                Completed = true,
            };
            var expectedToDoDto = _mockMapper.Object.Map<ToDoDto>(toDoEntry);

            // Act
            var actualToDoDto = await _toDoService.AddTodoAsync(expectedToDoDto);

            // Assert
            Assert.NotNull(expectedToDoDto); // both null -> last asser works
            Assert.NotNull(actualToDoDto);
            Assert.NotNull(expectedToDoDto);
            Assert.Equal(expectedToDoDto.Text, actualToDoDto.Text);
            Assert.Equal(expectedToDoDto.DueDate, actualToDoDto.DueDate);
            Assert.Equal(expectedToDoDto.Completed, actualToDoDto.Completed);
            // Assert.Equal(expectedToDoDto, actualToDoDto);
        }

        [Fact]
        public async Task DeleteTodoAsync_Success()
        {

        }

        [Fact]
        public async Task DeleteTodoAsync_ReturnsNotFound()
        {
            // Arrange
            _toDoService = CreateToDoService();
            Guid id = Guid.NewGuid();
            _mockContext.Setup(x => x.ToDo.FindAsync(id)).ReturnsAsync(() => null);

            // Act
            var exception = await Assert.ThrowsAsync<Exception>(() => _toDoService.DeleteTodoAsync(id));

            // Assert
            Assert.Equal(NoToDoFound, exception.Message);
        }

        [Fact]
        public async Task UpdateTodoAsync_Success()
        {
            // Arrange
            _toDoService = CreateToDoService();
            var dateTime = new DateTime(1998, 04, 30);
            var text = "Test";
            Guid id = Guid.NewGuid();
            var updatedText = "Updated";
            var updatedDateTime = dateTime.AddDays(1);
            ToDoDto initialToDoDto = new ToDoDto()
            {
                Id = id,
                Text = text,
                DueDate = dateTime,
                Completed = true,
            };
            ToDoEntry initialToDoEntry = new ToDoEntry()
            {
                Text = text,
                TargetDate = dateTime,
                Completed = true,
            };
            _mockContext.Setup(x => x.ToDo.FindAsync(id)).ReturnsAsync(() => initialToDoEntry); 
            _mockContext.Setup(x => x.ToDo.Add(initialToDoEntry)).Returns(() => null);

            await _toDoService.AddTodoAsync(initialToDoDto);

            ToDoDto expectedToDoDto = new ToDoDto()
            {
                Id = id,
                Text = updatedText,
                DueDate = updatedDateTime,
                Completed = false,
            };
            _mockContext.Setup(x => x.ToDo.Update(initialToDoEntry)).Returns(() => _mockContext.Object.Entry(initialToDoEntry));

            // Act
            ToDoDto actualToDoDto = await _toDoService.UpdateTodoAsync(expectedToDoDto);

            // Assert
            Assert.NotNull(actualToDoDto);
            Assert.NotNull(expectedToDoDto);
            Assert.Equal(expectedToDoDto.Id, actualToDoDto.Id);
            Assert.Equal(expectedToDoDto.Text, actualToDoDto.Text);
            Assert.Equal(expectedToDoDto.DueDate, actualToDoDto.DueDate);
            Assert.Equal(expectedToDoDto.Completed, actualToDoDto.Completed);
        }

        [Fact]
        public async Task UpdateTodoAsync_ReturnsNotFound()
        {
            // Arrange
            _toDoService = CreateToDoService();
            Guid id = Guid.NewGuid();
            var updatedText = "Updated";
            var updatedDateTime = new DateTime(1998, 04, 30);

            ToDoDto expectedToDoDto = new ToDoDto()
            {
                Id = id,
                Text = updatedText,
                DueDate = updatedDateTime,
                Completed = false,
            };
            _mockContext.Setup(x => x.ToDo.FindAsync(id)).ReturnsAsync(() => null);

            // Act
            var exception = await Assert.ThrowsAsync<Exception>(() => _toDoService.UpdateTodoAsync(expectedToDoDto));

            // Assert
            Assert.Equal(NoToDoFound, exception.Message);
        }
    }
}

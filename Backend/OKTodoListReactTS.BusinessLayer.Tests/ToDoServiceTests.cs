using System;
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
        private IToDoService? _toDoService;
        private readonly Mock<IMapper> _mockMapper = new();
        private Mock<ToDoDbContext> _mockContext = new();


        private ToDoService CreateToDoService()
        {
            var options = new DbContextOptionsBuilder<ToDoDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;
            _mockContext = new Mock<ToDoDbContext>(options);

            return new ToDoService(_mockMapper.Object, _mockContext.Object/*welche Parameter braucht man hier?*/);
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
            ToDoEntry toDoEntry = new ToDoEntry()
            {
                Text = "Test",
                TargetDate = dateTime,
                Completed = true,
            };
            var expectedToDoDto = _mockMapper.Object.Map<ToDoDto>(toDoEntry);

            // Act
            var actualToDoDto = await _toDoService.AddTodoAsync(expectedToDoDto);

            // Assert
            Assert.NotNull(expectedToDoDto); // both null -> last asser works
            Assert.NotNull(actualToDoDto);
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

        }

        [Fact]
        public async Task UpdateTodoAsync_Success()
        {

        }

        [Fact]
        public async Task UpdateTodoAsync_ReturnsNotFound()
        {

        }
    }
}

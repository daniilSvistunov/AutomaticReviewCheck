using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using OKTemplate.Api.Mapping;
using OKTemplate.BusinessLayer.Dtos;
using OKTemplate.BusinessLayer.Interfaces;
using OKTemplate.BusinessLayer.Services;
using OKTemplate.DataLayer;
using Xunit;

namespace OKTemplate.BusinessLayer.Tests
{
    public class ToDoServiceTests : ServiceTests
    {
        private IToDoService? _toDoService;
        private readonly IMapper _mapper;
        private readonly ToDoDbContext _dbContext;

        public ToDoServiceTests()
        {
            var config = new MapperConfiguration(cfg => cfg.AddProfile(new MappingProfile()));
            _mapper = config.CreateMapper();

            var options = new DbContextOptionsBuilder<ToDoDbContext>()
              .UseInMemoryDatabase(databaseName: "TestDb")
              .Options;
            _dbContext = new ToDoDbContext(options);
        }

        private ToDoService CreateToDoService()
        {
            return new ToDoService(_mapper, _dbContext);
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

            ToDoDto toDoDto = new ToDoDto
            {
                Id = Guid.NewGuid(),
                Text = "Test",
                DueDate = DateTime.UtcNow,
                Completed = false,
            };

            // Act
            var result = await _toDoService.AddTodoAsync(toDoDto);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(toDoDto.Id, result.Id);
            Assert.Equal(toDoDto.Text, result.Text);
            Assert.Equal(toDoDto.DueDate, result.DueDate);
            Assert.Equal(toDoDto.Completed, result.Completed);
        }

        [Fact]
        public async Task DeleteTodoAsync_Success()
        {
            // Arrange
            _toDoService = CreateToDoService();

            ToDoDto toDoDto = new ToDoDto
            {
                Id = Guid.NewGuid(),
                Text = "Test",
                DueDate = DateTime.UtcNow,
                Completed = false,
            };

            // Act
            var addedToDo = await _toDoService.AddTodoAsync(toDoDto);
            await _toDoService.DeleteTodoAsync(addedToDo.Id);
            var result = await _dbContext.ToDo.FindAsync(toDoDto.Id);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task DeleteTodoAsync_ReturnsNotFound()
        {
            // Arrange
            _toDoService = CreateToDoService();
            var nonExistentId = Guid.NewGuid();

            // Act & Assert
            var exception = await Assert.ThrowsAsync<InvalidOperationException>(() => _toDoService.DeleteTodoAsync(nonExistentId));

            // Assert
            Assert.Equal("ID kann nicht gefunden werden.", exception.Message);
        }

        [Fact]
        public async Task UpdateTodoAsync_Success()
        {
            // Arrange
            _toDoService = CreateToDoService();

            ToDoDto toDoDto = new ToDoDto
            {
                Id = Guid.NewGuid(),
                Text = "Test",
                DueDate = DateTime.UtcNow,
                Completed = false,
            };

            var addedToDo = await _toDoService.AddTodoAsync(toDoDto);

            ToDoDto updatedToDoDto = new ToDoDto
            {
                Id = addedToDo.Id,
                Text = "New Test",
                DueDate = DateTime.UtcNow,
                Completed = false,
            };

            // Act
            var result = await _toDoService.UpdateTodoAsync(updatedToDoDto);

            // Arrange
            Assert.NotNull(result);
            Assert.Equal(updatedToDoDto.Id, result.Id);
            Assert.Equal(updatedToDoDto.Text, result.Text);
            Assert.Equal(updatedToDoDto.DueDate, result.DueDate);
            Assert.Equal(updatedToDoDto.Completed, result.Completed);
        }

        [Fact]
        public async Task UpdateTodoAsync_ReturnsNotFound()
        {
            // Arrange
            _toDoService = CreateToDoService();

            ToDoDto toDoDto = new ToDoDto
            {
                Id = Guid.NewGuid(),
                Text = "Old Test",
                DueDate = DateTime.UtcNow,
                Completed = false,
            };

            // Act & Assert
            var exception = await Assert.ThrowsAsync<InvalidOperationException>(() => _toDoService.UpdateTodoAsync(toDoDto));

            // Assert
            Assert.Equal("ID kann nicht gefunden werden.", exception.Message);
        }

        [Fact]
        public async Task GetTodoByIdAsync_Success()
        {
            // Arrange
            _toDoService = CreateToDoService();

            ToDoDto toDoDto = new ToDoDto
            {
                Id = Guid.NewGuid(),
                Text = "Test",
                DueDate = DateTime.UtcNow,
                Completed = false,
            };

            await _toDoService.AddTodoAsync(toDoDto);

            // Act
            var result = await _toDoService.GetTodoByIdAsync(toDoDto.Id);

            // Arrange
            Assert.NotNull(result);
            Assert.Equal(toDoDto.Id, result.Id);
            Assert.Equal(toDoDto.Text, result.Text);
            Assert.Equal(toDoDto.DueDate, result.DueDate);
            Assert.Equal(toDoDto.Completed, result.Completed);
        }

        [Fact]
        public async Task GetTodoByIdAsync_ReturnsNotFound()
        {
            // Arrange
            _toDoService = CreateToDoService();
            var nonExistentId = Guid.NewGuid();

            // Act
            var exception = await Assert.ThrowsAsync<InvalidOperationException>(() => _toDoService.GetTodoByIdAsync(nonExistentId));

            // Arrange
            Assert.Equal("ID kann nicht gefunden werden.", exception.Message);
        }
    }
}

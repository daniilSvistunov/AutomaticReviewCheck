using System;
using System.Collections.Generic;
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
                .EnableSensitiveDataLogging()
                .UseInMemoryDatabase(databaseName: "ToDoTestDatabase")
                .Options;
            _dbContext = new ToDoDbContext(options);
        }

        private ToDoService CreateToDoService()
        {
            return new ToDoService(_dbContext, _mapper);
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

        [Fact]
        public async Task GetToDoByIdAsync_Success()
        {
            // Arrange
            _toDoService = CreateToDoService();
            ToDoDto toDoDto = new ToDoDto
            {
                Id = Guid.NewGuid(),
                Text = "Test ToDo 1",
                DueDate = System.DateTime.Now,
                Completed = true
            };
            await _toDoService.AddTodoAsync(toDoDto);

            // Act
            var result = await _toDoService.GetTodoByIdAsync(toDoDto.Id);

            // Assert
            Assert.Equal(toDoDto.Id, result.Id);
            Assert.Equal(toDoDto.Text, result.Text);
            Assert.Equal(toDoDto.Completed, result.Completed);
            Assert.Equal(toDoDto.DueDate, result.DueDate);
        }

        [Fact]
        public async Task GetToDoByIdAsync_ReturnsNotFound()
        {
            // Arrange
            _toDoService = CreateToDoService();

            // Act
            // Assert
            await Assert.ThrowsAsync<KeyNotFoundException>(() => _toDoService.GetTodoByIdAsync(Guid.NewGuid()));
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
                Text = "Test ToDo 1",
                DueDate = System.DateTime.Now,
                Completed = true
            };

            // Act
            var result = await _toDoService.AddTodoAsync(toDoDto);

            // Assert
            Assert.Equal(toDoDto.Id, result.Id);
            Assert.Equal(toDoDto.Text, result.Text);
            Assert.Equal(toDoDto.Completed, result.Completed);
            Assert.Equal(toDoDto.DueDate, result.DueDate);

        }

        [Fact]
        public async Task DeleteTodoAsync_Success()
        {
            // Arrange
            _toDoService = CreateToDoService();
            ToDoDto toDoDto = new ToDoDto
            {
                Id = Guid.NewGuid(),
                Text = "Test ToDo 1",
                DueDate = System.DateTime.Now,
                Completed = true
            };
            await _toDoService.AddTodoAsync(toDoDto);

            // Act
            await _toDoService.DeleteTodoAsync(toDoDto.Id);

            // Assert
            var entry = await _dbContext.ToDo.FindAsync(toDoDto.Id);
            Assert.Null(entry);
        }

        [Fact]
        public async Task DeleteTodoAsync_ReturnsNotFound()
        {
            // Arrange
            _toDoService = CreateToDoService();

            // Act
            // Assert
            await Assert.ThrowsAsync<KeyNotFoundException>(() => _toDoService.DeleteTodoAsync(Guid.NewGuid()));
        }

        [Fact]
        public async Task UpdateTodoAsync_Success()
        {
            // Arrange
            _toDoService = CreateToDoService();
            var newTime = System.DateTime.Now;
            ToDoDto toDoDto = new ToDoDto
            {
                Id = Guid.NewGuid(),
                Text = "Test ToDo 1",
                DueDate = newTime,
                Completed = true
            };
            await _toDoService.AddTodoAsync(toDoDto);
            toDoDto.Completed = false;

            // Act
            var result = await _toDoService.UpdateTodoAsync(toDoDto);

            // Assert
            Assert.False(result.Completed);
            Assert.Equal(result.Id, toDoDto.Id);
            Assert.Equal(result.Text, toDoDto.Text);
            Assert.Equal(result.DueDate, newTime);
        }

        [Fact]
        public async Task UpdateTodoAsync_ReturnsNotFound()
        {
            // Arrange
            _toDoService = CreateToDoService();
            ToDoDto toDoDto = new ToDoDto
            {
                Id = Guid.NewGuid(),
                Text = "Test ToDo 1",
                DueDate = System.DateTime.Now,
                Completed = true
            };

            // Act
            // Assert
            await Assert.ThrowsAsync<KeyNotFoundException>(() => _toDoService.UpdateTodoAsync(toDoDto));
        }
    }
}

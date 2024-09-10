using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
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
        private readonly IMapper _mapper;
        private readonly ToDoDbContext _dbContext;

        public ToDoServiceTests()
        {
            // 1. Mapper Setup
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<ToDoDto, ToDoEntry>();
                cfg.CreateMap<ToDoEntry, ToDoDto>();
            });
            _mapper = config.CreateMapper();

            // 2. In-Memory DbContext Setup
            var options = new DbContextOptionsBuilder<ToDoDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()) // Erstelle für jeden Test eine neue Datenbank
                .Options;

            // 3. HttpContextAccessor Mock (für die Benutzung im DbContext)
            var httpContextAccessorMock = new Mock<IHttpContextAccessor>();
            httpContextAccessorMock.Setup(x => x.HttpContext.User.Identity.Name).Returns("TestUser");

            _dbContext = new ToDoDbContext(options, httpContextAccessorMock.Object);

            // 4. ToDoService initialisieren
            _toDoService = new ToDoService(_mapper, _dbContext);
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
            var guid = Guid.NewGuid();
            var toDo = new ToDoDto
            {
                Id = guid,
                Title = "Tester",
                Text = "test",
                DueDate = DateTime.Now,
                Completed = false,
            };
            _toDoService = CreateToDoService();

            // Act
            var result = await _toDoService.AddTodoAsync(toDo);

            // Assert
            Assert.NotNull(result);
        }

        [Fact]
        public async Task DeleteTodoAsync_Success()
        {
            // Arrange
            var guid = Guid.NewGuid();
            var toDo = new ToDoDto
            {
                Id = guid,
                Title = "Tester",
                Text = "test",
                DueDate = DateTime.Now,
                Completed = false,
            };
            _dbContext.Add(_mapper.Map<ToDoEntry>(toDo));
            await _dbContext.SaveChangesAsync();
            _toDoService = CreateToDoService();

            // Act
            await _toDoService.DeleteTodoAsync(toDo);

            // Assert
            var deletedToDo = await _dbContext.ToDo.FindAsync(toDo.Id);
            Assert.Null(deletedToDo);
        }

        [Fact]
        public async Task DeleteTodoAsync_ReturnsNotFound()
        {
            // Arrange
            var guid = Guid.NewGuid();
            var toDo = new ToDoDto
            {
                Id = guid,
                Title = "Tester",
                Text = "test",
                DueDate = DateTime.Now,
                Completed = false,
            };
            _toDoService = CreateToDoService();

            // Act
            var exception = await Record.ExceptionAsync(() => _toDoService.DeleteTodoAsync(toDo));

            // Assert
            Assert.NotNull(exception);
            Assert.IsType<Exception>(exception);
        }

        [Fact]
        public async Task UpdateTodoAsync_Success()
        {
            // Arrange
            var guid = Guid.NewGuid();

            // Erstelle das ursprüngliche ToDo
            var toDo = new ToDoDto
            {
                Id = guid,
                Title = "Tester",
                Text = "test",
                DueDate = DateTime.Now,
                Completed = false,
            };

            // Speichere das ursprüngliche ToDo in der Datenbank
            _dbContext.Add(_mapper.Map<ToDoEntry>(toDo));
            await _dbContext.SaveChangesAsync();
            _toDoService = CreateToDoService();

            // Definiere das aktualisierte ToDo
            var updatedToDo = new ToDoDto
            {
                Id = guid,
                Title = "Tester", // Titel bleibt gleich, um keinen Konflikt zu verursachen
                Text = "Updated",
                DueDate = DateTime.Now,
                Completed = true,
            };

            // Act
            var result = await _toDoService.UpdateTodoAsync(updatedToDo);

            // Assert
            var dbToDo = await _dbContext.ToDo.FindAsync(updatedToDo.Id);
            Assert.NotNull(dbToDo);
            Assert.Equal(updatedToDo.Title, dbToDo.Title);
            Assert.Equal("Updated", dbToDo.Text);
            Assert.True(dbToDo.Completed);
            Assert.Equal(updatedToDo.DueDate, dbToDo.TargetDate);
        }

        [Fact]
        public async Task UpdateTodoAsync_ReturnsNotFound()
        {
            // Arrange
            var guid = Guid.NewGuid();
            _toDoService = CreateToDoService();
            var updatedToDo = new ToDoDto
            {
                Id = guid,
                Title = "Tester",
                Text = "Updated",
                DueDate = DateTime.Now,
                Completed = true,
            };

            // Act
            var exception = await Record.ExceptionAsync(() => _toDoService.UpdateTodoAsync(updatedToDo));

            // Assert
            Assert.NotNull(exception);
            Assert.IsType<Exception>(exception);
        }
        // Neue Tests:

        [Fact]
        public async Task AddTodoAsync_ValidationFails()
        {
            // Arrange
            var toDo = new ToDoDto
            {
                Id = Guid.NewGuid(),
                Title = "Tester",
                Text = "",
                DueDate = DateTime.Now,
                Completed = false,
            };
            _toDoService = CreateToDoService();

            // Act
            var exception = await Record.ExceptionAsync(() => _toDoService.AddTodoAsync(toDo));

            // Assert
            Assert.NotNull(exception);
            Assert.IsType<ArgumentException>(exception);
        }

        //In zwei Test umwandeln für title und text

        [Fact]
        public async Task AddTodoAsync_DuplicateIdThrowsException()
        {
            // Arrange
            var guid = Guid.NewGuid();
            var toDo = new ToDoEntry
            {
                Id = guid,
                Title = "Tester",
                Text = "test",
                TargetDate = DateTime.Today,
                Completed = false,
            };
            _dbContext.Add(_mapper.Map<ToDoEntry>(toDo));
            _dbContext.SaveChanges();

            var duplicateToDo = new ToDoDto
            {
                Id = guid,
                Title = "Tester 2",
                Text = "duplicate test",
                DueDate = DateTime.Today,
                Completed = false,
            };
            _toDoService = CreateToDoService();

            // Act
            var exception = await Record.ExceptionAsync(() => _toDoService.AddTodoAsync(duplicateToDo));

            // Assert
            Assert.NotNull(exception);
            Assert.IsType<Exception>(exception);
            // Assert für Exception Message
        }

        [Fact]
        //Test für SearchTodoWithIdAsync
        public async Task SearchTodoWithIdAsync_Success()
        {
            // Arrange
            var guid = Guid.NewGuid();
            var toDo = new ToDoEntry
            {
                Id = guid,
                Title = "Tester",
                Text = "test",
                TargetDate = DateTime.Now,
                Completed = false,
            };
            _dbContext.Add(toDo);
            _dbContext.SaveChanges();
            _toDoService = CreateToDoService();

            // Act
            var result = await _toDoService.SearchTodoWithIdAsync(guid);

            // Assert
            Assert.NotNull(result);
            Assert.IsType<ToDoDto>(result);
            // Equal
        }

        // Duplikationserkennung Tests
        [Fact]
        // Add Test
        public async Task AddTodoAsync_DublicateProperties()
        {
            // Arrage
            var guid = Guid.NewGuid();
            var toDo = new ToDoEntry
            {
                Id = guid,
                Title = "test",
                Text = "test",
                TargetDate = DateTime.MinValue,
                Completed = false,
            };
            _dbContext.Add(toDo);
            _dbContext.SaveChanges();
            _toDoService = CreateToDoService();

            var newGuid = Guid.NewGuid();
            var newToDo = new ToDoDto
            {
                Id = newGuid,
                Title = "test",
                Text = "test",
                DueDate = DateTime.MinValue,
                Completed = false,
            };

            // Act
            var exception = await Record.ExceptionAsync(() => _toDoService.AddTodoAsync(newToDo));

            // Assert
            Assert.NotNull(exception);
            Assert.IsType<Exception>(exception);
            Assert.Equal("Ein ToDo mit diesem Titel existiert bereits!", exception.Message);
        }

        [Fact]
        // Update
        public async Task UpdateTodoAsync_DublicateProperties()
        {
            // Arrange
            var guid1 = Guid.NewGuid();
            var guid2 = Guid.NewGuid();

            var existingToDo = new ToDoEntry
            {
                Id = guid1,
                Title = "test",
                Text = "test",
                TargetDate = DateTime.MinValue,
                Completed = false,
            };

            var conflictingToDo = new ToDoEntry
            {
                Id = guid2,
                Title = "conflict",
                Text = "test",
                TargetDate = DateTime.MinValue,
                Completed = false,
            };

            _dbContext.Add(existingToDo);
            _dbContext.Add(conflictingToDo);
            await _dbContext.SaveChangesAsync();
            _toDoService = CreateToDoService();

            var updatedToDo = new ToDoDto
            {
                Id = guid1,
                Title = "conflict",
                Text = "Updated",
                DueDate = DateTime.MinValue,
                Completed = true,
            };

            // Act
            var exception = await Record.ExceptionAsync(() => _toDoService.UpdateTodoAsync(updatedToDo));

            // Assert
            Assert.NotNull(exception);
            Assert.IsType<Exception>(exception);
            Assert.Equal("Ein ToDo mit diesem Titel existiert bereits!", exception.Message);
        }
    }
}

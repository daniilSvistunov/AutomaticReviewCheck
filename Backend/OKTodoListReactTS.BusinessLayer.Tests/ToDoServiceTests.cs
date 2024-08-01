using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OKTodoListReactTS.BusinessLayer.Dtos;
using OKTodoListReactTS.BusinessLayer.Interfaces;
using OKTodoListReactTS.BusinessLayer.Services;
using OKTodoListReactTS.DataLayer.Entities;
using Xunit;

namespace OKTemplate.BusinessLayer.Tests
{
    public class ToDoServiceTests : ServiceTests
    {
        private IToDoService? _toDoService;

        private ToDoService CreateToDoService()
        {
            return new ToDoService(Context, Mapper, LoggerMock.Object);
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
            var toDoDto = new ToDoDto
            {
                Id = Guid.NewGuid(),
                Text = "ToDo 4",
                DueDate = DateTime.UtcNow.AddDays(1),
                Completed = false,
            };
            _toDoService = CreateToDoService();

            // Act
            var before = await _toDoService.GetAllTodosAsync();
            var todo = await _toDoService.AddTodoAsync(toDoDto);
            var after = await _toDoService.GetAllTodosAsync();

            // Assert
            Assert.NotNull(before);
            Assert.NotNull(todo);
            Assert.NotNull(after);
            Assert.Equal(before.Count + 1, after.Count);
        }

        [Fact]
        public async Task AddTodoAsync_SameId_Throws()
        {
            // Arrange
            var toDoDto = new ToDoDto
            {
                Id = Guid.NewGuid(),
                Text = "ToDo 4",
                DueDate = DateTime.UtcNow.AddDays(1),
                Completed = false,
            };
            _toDoService = CreateToDoService();

            // Act
            var toDo = await _toDoService.AddTodoAsync(toDoDto);

            // Act / Assert
            await Assert.ThrowsAsync<ArgumentException>(async () => await _toDoService.AddTodoAsync(toDoDto));

            // Assert
            Assert.NotNull(toDo);
        }

        [Fact]
        public async Task DeleteTodoAsync_Success()
        {
            // Arrange
            _toDoService = CreateToDoService();
            var toDoDto = new ToDoDto
            {
                Id = Guid.NewGuid(),
                Text = "ToDo 4",
                DueDate = DateTime.UtcNow.AddDays(1),
                Completed = false,
            };

            // Act
            var before = await _toDoService.GetAllTodosAsync();
            await _toDoService.DeleteTodoAsync(before[0]);
            var after = await _toDoService.GetAllTodosAsync();

            // Assert
            Assert.NotNull(before);
            Assert.NotNull(after);
            Assert.Equal(before.Count - 1, after.Count);
        }

        [Fact]
        public async Task DeleteTodoAsync_ReturnsNotFound()
        {
            // Arrange
            var toDoDto = new ToDoDto
            {
                Id = Guid.NewGuid(),
                Text = "ToDo 4",
                DueDate = DateTime.UtcNow.AddDays(1),
                Completed = false,
            };
            _toDoService = CreateToDoService();

            // Act / Assert
            await Assert.ThrowsAsync<ArgumentException>(async () => await _toDoService.DeleteTodoAsync(toDoDto));
        }

        [Fact]
        public async Task UpdateTodoAsync_Success()
        {
            // Arrange
            _toDoService = CreateToDoService();

            Guid id = Guid.NewGuid();
            var text = "Test";
            var dateTime = new DateTime(2024, 04, 30, 14, 20, 00, DateTimeKind.Utc);
            var updatedText = "Updated";
            var updatedDateTime = dateTime.AddDays(5);

            ToDoEntry initialToDoEntry = new ToDoEntry()
            {
                Id = id,
                Text = text,
                TargetDate = dateTime,
                Completed = false,
            };

            await Context.ToDo.AddAsync(initialToDoEntry);
            await Context.SaveChangesAsync();

            ToDoDto expectedToDoDto = new ToDoDto()
            {
                Id = id,
                Text = updatedText,
                DueDate = updatedDateTime,
                Completed = true,
            };

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
            var toDoDto = new ToDoDto
            {
                Id = Guid.NewGuid(),
                Text = "ToDo 4",
                DueDate = DateTime.UtcNow.AddDays(1),
                Completed = false,
            };

            // Act
            var todoBefore = await _toDoService.AddTodoAsync(toDoDto);
            toDoDto.Id = Guid.NewGuid();

            // Assert
            Assert.NotNull(todoBefore);

            // Act / Assert
            await Assert.ThrowsAsync<KeyNotFoundException>(async () => await _toDoService.UpdateTodoAsync(toDoDto));
        }

        [Fact]
        public async Task GetTodoByIdAsync_Success()
        {
            // Arrange
            _toDoService = CreateToDoService();

            var id = Guid.NewGuid();
            var dateTime = new DateTime(2024, 05, 29, 14, 35, 00, DateTimeKind.Utc);
            var text = "Test";
            ToDoEntry toDoEntry = new ToDoEntry()
            {
                Id = id,
                Text = text,
                TargetDate = dateTime,
                Completed = false,
            };

            ToDoDto expectedToDoDto = Mapper.Map<ToDoDto>(toDoEntry);
            await Context.ToDo.AddAsync(toDoEntry);

            // Act
            ToDoDto actualToDoDto = await _toDoService.GetToDoByIdAsync(id);

            // Assert
            Assert.NotNull(actualToDoDto);
            Assert.NotNull(expectedToDoDto);
            Assert.Equal(expectedToDoDto.Id, actualToDoDto.Id);
            Assert.Equal(expectedToDoDto.Text, actualToDoDto.Text);
            Assert.Equal(expectedToDoDto.DueDate, actualToDoDto.DueDate);
            Assert.Equal(expectedToDoDto.Completed, actualToDoDto.Completed);
        }

        [Fact]
        public async Task GetTodoByIdAsync_ReturnsNotFound()
        {
            // Arrange
            var id = Guid.NewGuid();
            _toDoService = CreateToDoService();

            // Act / Assert
            await Assert.ThrowsAsync<KeyNotFoundException>(async () => await _toDoService.GetToDoByIdAsync(id));
        }
    }
}

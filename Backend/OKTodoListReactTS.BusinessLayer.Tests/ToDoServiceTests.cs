using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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
                Title = "Test Title",
                Text = "ToDo 4",
                DueDate = DateTime.UtcNow.AddDays(1),
                Completed = false,
            };
            _toDoService = CreateToDoService();
            var before = await Context.ToDo.ToListAsync();

            // Act
            var todo = await _toDoService.AddTodoAsync(toDoDto);

            // Assert
            var after = await Context.ToDo.ToListAsync();
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
                Title = "Test Title",
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
            var before = await Context.ToDo.ToListAsync();
            var toDoDto = Mapper.Map<ToDoDto>(before[0]);

            // Act
            await _toDoService.DeleteTodoAsync(toDoDto);
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
            var title = "Test title";
            var dateTime = new DateTime(2024, 04, 30, 14, 20, 00, DateTimeKind.Utc);
            var updatedText = "Updated";
            var updatedDateTime = dateTime.AddDays(5);

            ToDoEntry initialToDoEntry = new ToDoEntry()
            {
                Id = id,
                Title = title,
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
            Assert.Equal(expectedToDoDto.Title, actualToDoDto.Title);
            Assert.Equal(expectedToDoDto.Text, actualToDoDto.Text);
            Assert.Equal(expectedToDoDto.DueDate, actualToDoDto.DueDate);
            Assert.Equal(expectedToDoDto.Completed, actualToDoDto.Completed);
        }

        [Fact]
        public async Task UpdateTodoAsync_ReturnsNotFound()
        {
            // Arrange
            var toDoDto = new ToDoDto
            {
                Id = Guid.NewGuid(),
                Title = "Test title 2",
                Text = "ToDo 4 test",
                DueDate = DateTime.UtcNow.AddDays(5),
                Completed = true,
            };
            _toDoService = CreateToDoService();

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
            var title = "Test title";
            var text = "Test";
            ToDoEntry toDoEntry = new ToDoEntry()
            {
                Id = id,
                Title = title,
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
            Assert.Equal(expectedToDoDto.Title, actualToDoDto.Title);
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

        [Fact]
        public async Task AddToDoAsync_DuplicateDetection_Thrown()
        {
            // Arrange
            var title = "Title";
            var dueDate = DateTime.Now;
            var firstToDoDto = new ToDoDto
            {
                Id = Guid.NewGuid(),
                Title = title,
                Text = "ToDo 4",
                DueDate = dueDate,
                Completed = false,
            };

            var secondToDoDto = new ToDoDto
            {
                Id = Guid.NewGuid(),
                Title = title,
                Text = "ToDo 5",
                DueDate = dueDate,
                Completed = true,
            };

            _toDoService = CreateToDoService();

            // Act
            var before = await _toDoService.GetAllTodosAsync();
            var todo = await _toDoService.AddTodoAsync(firstToDoDto);

            // Act / Assert
            await Assert.ThrowsAsync<ArgumentException>(async () => await _toDoService.AddTodoAsync(secondToDoDto));

            // Assert
            Assert.NotNull(before);
            Assert.NotNull(todo);
        }

        [Fact]
        public async Task UpdateToDoAsync_DuplicateDetection_Success()
        {
            // Arrange
            var id = Guid.NewGuid();
            var title = "Title";
            var dueDate = DateTime.Now;
            ToDoEntry toDoEntry = new ToDoEntry()
            {
                Id = id,
                Title = title,
                Text = "ToDo 4",
                TargetDate = dueDate,
                Completed = false,
            };

            var updatedToDoDto = new ToDoDto
            {
                Id = id,
                Title = title,
                Text = "ToDo 5",
                DueDate = dueDate,
                Completed = true,
            };

            _toDoService = CreateToDoService();
            Context.Add(toDoEntry);
            await Context.SaveChangesAsync();

            // Act
            var updatedTodo = await _toDoService.UpdateTodoAsync(updatedToDoDto);

            // Assert
            Assert.NotNull(updatedTodo);
            Assert.Equal(id, updatedTodo.Id);
            Assert.Equal(title, updatedTodo.Title);
            Assert.Equal(dueDate, updatedTodo.DueDate);
        }

        [Fact]
        public async Task UpdateToDoAsync_DuplicateDetection_Thrown()
        {
            // Arrange
            var title = "Title";
            var dueDate = DateTime.Now;
            var firstToDoDto = new ToDoDto
            {
                Id = Guid.NewGuid(),
                Title = title,
                Text = "ToDo 4",
                DueDate = dueDate,
                Completed = false,
            };

            var secondToDoDto = new ToDoDto
            {
                Id = Guid.NewGuid(),
                Title = title,
                Text = "ToDo 5",
                DueDate = dueDate,
                Completed = true,
            };

            _toDoService = CreateToDoService();

            // Act
            var todo = await _toDoService.AddTodoAsync(firstToDoDto);

            // Act / Assert
            await Assert.ThrowsAsync<ArgumentException>(async () => await _toDoService.UpdateTodoAsync(secondToDoDto));

            // Assert
            Assert.NotNull(todo);
        }
    }
}

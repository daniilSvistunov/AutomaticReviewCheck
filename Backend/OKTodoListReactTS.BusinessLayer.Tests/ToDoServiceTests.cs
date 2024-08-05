using System;
using System.Threading.Tasks;
using Ardalis.Result;
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
        public async Task AddToDoAsync_SameId_Invalid()
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
            var firstResultToDo = await _toDoService.AddTodoAsync(toDoDto);
            var secondResultToDo = await _toDoService.AddTodoAsync(toDoDto);

            // Assert
            Assert.NotNull(firstResultToDo);
            Assert.True(firstResultToDo.IsSuccess);
            Assert.NotNull(secondResultToDo);
            Assert.False(secondResultToDo.IsSuccess);
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
            Assert.Equal(before.Count - 1, after.Value.Count);
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

            // Act
            var resultToDo = await _toDoService.DeleteTodoAsync(toDoDto);

            // Act / Assert
            Assert.NotNull(resultToDo);
            Assert.False(resultToDo.IsSuccess);
            Assert.True(resultToDo.IsNotFound());
            Assert.Equal(ResultStatus.NotFound, resultToDo.Status);
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
            var resultToDo = await _toDoService.UpdateTodoAsync(toDoDto);

            // Assert
            Assert.NotNull(resultToDo);
            Assert.False(resultToDo.IsSuccess);
            Assert.True(resultToDo.IsNotFound());
            Assert.Equal(ResultStatus.NotFound, resultToDo.Status);
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

            // Act
            var resultToDo = await _toDoService.GetToDoByIdAsync(id);

            // Act / Assert
            Assert.NotNull(resultToDo);
            Assert.False(resultToDo.IsSuccess);
            Assert.True(resultToDo.IsNotFound());
            Assert.Equal(ResultStatus.NotFound, resultToDo.Status);
        }

        [Fact]
        public async Task AddToDoAsync_DuplicateDetection_Invalid()
        {
            // Arrange
            var title = "Title";
            var dueDate = DateTime.Now;

            ToDoEntry toDoEntry = new ToDoEntry()
            {
                Id = Guid.NewGuid(),
                Title = title,
                Text = "ToDo 4",
                TargetDate = dueDate,
                Completed = false,
            };

            var toDoDto = new ToDoDto
            {
                Id = Guid.NewGuid(),
                Title = title,
                Text = "ToDo 5",
                DueDate = dueDate,
                Completed = true,
            };

            _toDoService = CreateToDoService();
            Context.Add(toDoEntry);
            await Context.SaveChangesAsync();

            // Act
            var reslutToDo = await _toDoService.AddTodoAsync(toDoDto);

            // Assert
            Assert.NotNull(reslutToDo);
            Assert.False(reslutToDo.IsSuccess);
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
            Assert.True(updatedTodo.IsSuccess);
            Assert.True(updatedTodo.IsOk());
            var value = updatedTodo.Value;
            Assert.Equal(id, value.Id);
            Assert.Equal(title, value.Title);
            Assert.Equal(dueDate, value.DueDate);
        }

        [Fact]
        public async Task UpdateToDoAsync_DuplicateDetection_Invalid()
        {
            // Arrange
            var title = "Title";
            var dueDate = DateTime.Now;
            ToDoEntry toDoEntry = new ToDoEntry()
            {
                Id = Guid.NewGuid(),
                Title = title,
                Text = "ToDo 4",
                TargetDate = dueDate,
                Completed = false,
            };

            var toDoDto = new ToDoDto
            {
                Id = Guid.NewGuid(),
                Title = title,
                Text = "ToDo 5",
                DueDate = dueDate,
                Completed = true,
            };

            _toDoService = CreateToDoService();
            Context.Add(toDoEntry);
            await Context.SaveChangesAsync();

            // Act
            var resultToDo = await _toDoService.UpdateTodoAsync(toDoDto);

            // Assert
            Assert.NotNull(resultToDo);
            Assert.False(resultToDo.IsSuccess);
            Assert.True(resultToDo.IsConflict());
            Assert.Equal(ResultStatus.Conflict, resultToDo.Status);
        }
    }
}

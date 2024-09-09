using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OKTodoListReactTS.BusinessLayer.Dtos;
using OKTodoListReactTS.BusinessLayer.Interfaces;
using OKTodoListReactTS.BusinessLayer.Services;
using Xunit;

namespace OKTemplate.BusinessLayer.Tests
{
    public class ToDoServiceTests : ServiceTests
    {
        private IToDoService? _toDoService;

        private ToDoService CreateToDoService()
        {
            return new ToDoService(Mapper, Context);
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
            //Arrange
            _toDoService = CreateToDoService();
            ToDoDto todoDto = new()
            {
                Id = Guid.NewGuid(),
                Text = "Test ToDo",
                Titel = "Todo Titel",
                TargetDate = DateTime.UtcNow.AddDays(1),
                Completed = true

            };

            //Act
            var result = await _toDoService.AddTodoAsync(todoDto);
            var after = await Context.ToDo.ToListAsync();

            //Assert
            Assert.NotNull(result);
            Assert.Contains(after, a => a.Id == todoDto.Id);

        }

        [Fact]
        public async Task AddToDoAsync_DuplicateError()
        {
            //Arrange
            _toDoService = CreateToDoService();
            ToDoDto todoDto = new()
            {
                Id = Guid.NewGuid(),
                Text = "Test ToDo",
                Titel = "Todo Titel",
                TargetDate = DateTime.Today,
                Completed = true

            };
            ToDoDto todoDto2 = new()
            {
                Id = Guid.NewGuid(),
                Text = "Test ToDo",
                Titel = "Todo Titel",
                TargetDate = DateTime.Today,
                Completed = true

            };

            //Act
            await _toDoService.AddTodoAsync(todoDto);

            //Assert
            var exception = await Assert.ThrowsAsync<Exception>(async () => await _toDoService.AddTodoAsync(todoDto2));

            Assert.True(exception.Message.Equals("A ToDo Exists with the same Title and TargetDate"));
        }

        [Fact]
        public async Task DeleteTodoAsync_Success()
        {
            //Arrange
            _toDoService = CreateToDoService();
            ToDoDto todoDto = new()
            {
                Id = Guid.NewGuid(),
                Text = "Test ToDo",
                Titel = "Todo Titel",
                TargetDate = DateTime.UtcNow.AddDays(1),
                Completed = true

            };

            //Act
            await _toDoService.AddTodoAsync(todoDto);
            var before = await Context.ToDo.ToListAsync();
            await _toDoService.DeleteTodoAsync(todoDto.Id);
            var after = await Context.ToDo.ToListAsync();

            //Assert
            Assert.Contains(before, b => b.Id == todoDto.Id);
            Assert.DoesNotContain(after, a => a.Id == todoDto.Id);
        }

        [Fact]
        public async Task DeleteTodoAsync_ReturnsNotFound()
        {
            //Arrange
            _toDoService = CreateToDoService();
            var Id = Guid.NewGuid();

            //Assert
            var exception = await Assert.ThrowsAsync<Exception>(async () => await _toDoService.DeleteTodoAsync(Id));
            Assert.True(exception.Message.Equals("Found no todo with given id"));
        }

        [Fact]
        public async Task UpdateTodoAsync_Success()
        {
            //Arrange
            _toDoService = CreateToDoService();
            ToDoDto todoDto = new()
            {
                Id = Guid.NewGuid(),
                Text = "Test ToDo",
                Titel = "Todo Titel Updated",
                TargetDate = DateTime.UtcNow.AddDays(1),
                Completed = true

            };
            await _toDoService.AddTodoAsync(todoDto);

            ToDoDto todoDtoUpdate = new()
            {
                Id = todoDto.Id,
                Text = "Updated",
                Titel = "Todo Titel",
                TargetDate = DateTime.UtcNow.AddDays(3),
                Completed = false

            };

            //Act

            var result = await _toDoService.UpdateTodoAsync(todoDtoUpdate);

            //Assert
            Assert.NotNull(result);
            Assert.Equal(result.Text, todoDtoUpdate.Text);
            Assert.Equal(result.Completed, todoDtoUpdate.Completed);
        }

        [Fact]
        public async Task UpdateTodoAsync_ReturnsNotFound()
        {
            //Arrange
            _toDoService = CreateToDoService();

            ToDoDto todoDtoUpdate = new()
            {
                Id = Guid.NewGuid(),
                Text = "Updated",
                Titel = "Todo Titel",
                TargetDate = DateTime.UtcNow.AddDays(3),
                Completed = false

            };

            //Act

            //Assert
            var exception = await Assert.ThrowsAsync<Exception>(async () => await _toDoService.UpdateTodoAsync(todoDtoUpdate));
            Assert.True(exception.Message.Equals("Found no todo with given id"));
        }
        [Fact]
        public async Task UpdateToDoAsync_DuplicateError()
        {
            //Arrange
            _toDoService = CreateToDoService();
            ToDoDto todoDto = new()
            {
                Id = Guid.NewGuid(),
                Text = "Test ToDo",
                Titel = "Todo Titel",
                TargetDate = DateTime.Today,
                Completed = true

            };
            ToDoDto todoDto2 = new()
            {
                Id = todoDto.Id,
                Text = "Test ToDo",
                Titel = "Todo Titel",
                TargetDate = DateTime.Today,
                Completed = true

            };

            //Act
            await _toDoService.AddTodoAsync(todoDto);

            //Assert
            var exception = await Assert.ThrowsAsync<Exception>(async () => await _toDoService.UpdateTodoAsync(todoDto2));

            Assert.True(exception.Message.Equals("A ToDo Exists with the same Title and TargetDate"));
        }

        [Fact]
        public async Task FindAsyncById_Success()
        {
            //Arrange
            _toDoService = CreateToDoService();
            ToDoDto toDoDto = new()
            {
                Id = Guid.NewGuid(),
                Text = "AddedToDo",
                Titel = "Todo Titel",
                TargetDate = DateTime.Today.AddDays(3),
                Completed = true

            };
            await _toDoService.AddTodoAsync(toDoDto);

            //Act
            var result = await _toDoService.FindTodoByIdAsync(toDoDto.Id);

            //Assert
            Assert.NotNull(result);
            Assert.True(result.Completed);
            Assert.Equal(result.Text, toDoDto.Text);
            Assert.Equal(result.Id, toDoDto.Id);
            Assert.Equal(result.TargetDate, toDoDto.TargetDate);
        }

        [Fact]
        public async Task FindAsyncById_ReturnsNotFound()
        {
            //Arrange
            _toDoService = CreateToDoService();

            Guid id = Guid.NewGuid();

            //Act

            //Assert
            await Assert.ThrowsAsync<Exception>(async () => await _toDoService.FindTodoByIdAsync(id));
        }
    }
}

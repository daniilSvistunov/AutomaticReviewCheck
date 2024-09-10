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
            Assert.True(result.Value.Count == 3);
        }

        //Die weiteren Tests musst Du selbst implementieren
        [Fact]
        public async Task AddTodoAsync()
        {
            //Arrange
            _toDoService = CreateToDoService();
            ToDoDto toDoDto = new()
            {
                Id = Guid.NewGuid(),
                Text = "Test ToDo",
                Titel = "Todo Titel",
                DueDate = DateTime.UtcNow.AddDays(1),
                Completed = true

            };

            //Act
            var result = await _toDoService.AddTodoAsync(toDoDto);
            var after = await Context.ToDo.ToListAsync();

            //Assert
            Assert.NotNull(result);
            Assert.Contains(after, a => a.Id == toDoDto.Id);

        }

        [Fact]
        public async Task AddToDoAsync_DuplicateError()
        {
            //Arrange
            _toDoService = CreateToDoService();
            ToDoDto toDoDto = new()
            {
                Id = Guid.NewGuid(),
                Text = "Test ToDo",
                Titel = "Todo Titel",
                DueDate = DateTime.Today,
                Completed = true

            };
            ToDoDto toDoDto2 = new()
            {
                Id = Guid.NewGuid(),
                Text = "Test ToDo",
                Titel = "Todo Titel",
                DueDate = DateTime.Today,
                Completed = true

            };

            //Act
            await Context.AddAsync(Mapper.Map<ToDoEntry>(toDoDto));
            await Context.SaveChangesAsync();
            var result = await _toDoService.AddTodoAsync(toDoDto2);
            //Assert
            Assert.NotNull(result);
            Assert.True(result.ValidationErrors[0].ErrorMessage.Equals(ToDoService.duplicateExceptionText));

        }

        [Fact]
        public async Task DeleteTodoAsync_Success()
        {
            //Arrange
            _toDoService = CreateToDoService();
            ToDoDto toDoDto = new()
            {
                Id = Guid.NewGuid(),
                Text = "Test ToDo",
                Titel = "Todo Titel",
                DueDate = DateTime.UtcNow.AddDays(1),
                Completed = true

            };

            //Act
            await Context.AddAsync(Mapper.Map<ToDoEntry>(toDoDto));
            await Context.SaveChangesAsync();
            var before = await Context.ToDo.ToListAsync();
            await _toDoService.DeleteTodoAsync(toDoDto.Id);
            var after = await Context.ToDo.ToListAsync();

            //Assert
            Assert.Contains(before, b => b.Id == toDoDto.Id);
            Assert.DoesNotContain(after, a => a.Id == toDoDto.Id);
        }

        [Fact]
        public async Task DeleteTodoAsync_ReturnsNotFound()
        {
            //Arrange
            _toDoService = CreateToDoService();
            var Id = Guid.NewGuid();

            //Act
            var result = await _toDoService.DeleteTodoAsync(Id);
            //Assert
            Assert.NotNull(result);
            Assert.Equal(ResultStatus.NotFound, result.Status);
            Assert.True(result.Errors[0].Equals(ToDoService.notFoundExceptionText));

        }

        [Fact]
        public async Task UpdateTodoAsync_Success()
        {
            //Arrange
            _toDoService = CreateToDoService();
            ToDoDto toDoDto = new()
            {
                Id = Guid.NewGuid(),
                Text = "Test ToDo",
                Titel = "Todo Titel Updated",
                DueDate = DateTime.UtcNow.AddDays(1),
                Completed = true

            };

            ToDoDto toDoDtoUpdate = new()
            {
                Id = toDoDto.Id,
                Text = "Updated",
                Titel = "Todo Titel",
                DueDate = DateTime.UtcNow.AddDays(3),
                Completed = false

            };

            //Act
            await Context.AddAsync(Mapper.Map<ToDoEntry>(toDoDto));
            await Context.SaveChangesAsync();

            var result = await _toDoService.UpdateTodoAsync(toDoDtoUpdate);

            //Assert
            Assert.NotNull(result);
            Assert.Equal(result.Value.Text, toDoDtoUpdate.Text);
            Assert.Equal(result.Value.Completed, toDoDtoUpdate.Completed);
        }

        [Fact]
        public async Task UpdateTodoAsync_ReturnsNotFound()
        {
            //Arrange
            _toDoService = CreateToDoService();

            ToDoDto toDoDtoUpdate = new()
            {
                Id = Guid.NewGuid(),
                Text = "Updated",
                Titel = "Todo Titel",
                DueDate = DateTime.UtcNow.AddDays(3),
                Completed = false

            };

            //Act
            var result = await _toDoService.UpdateTodoAsync(toDoDtoUpdate);

            //Assert
            Assert.NotNull(result);
            Assert.Equal(ResultStatus.NotFound, result.Status);
            Assert.True(result.Errors[0].Equals(ToDoService.notFoundExceptionText));

        }
        [Fact]
        public async Task UpdateToDoAsync_DuplicateError()
        {
            //Arrange
            _toDoService = CreateToDoService();
            ToDoDto toDoDto = new()
            {
                Id = Guid.NewGuid(),
                Text = "Test ToDo",
                Titel = "Todo Titel",
                DueDate = DateTime.Today,
                Completed = true

            };
            ToDoDto toDoDto2 = new()
            {
                Id = toDoDto.Id,
                Text = "Test ToDo",
                Titel = "Todo Titel",
                DueDate = DateTime.Today,
                Completed = true

            };

            //Act
            await Context.AddAsync(Mapper.Map<ToDoEntry>(toDoDto));
            await Context.SaveChangesAsync();

            var result = await _toDoService.UpdateTodoAsync(toDoDto2);

            //Assert
            Assert.NotNull(result);
            Assert.True(result.ValidationErrors[0].ErrorMessage.Equals(ToDoService.duplicateExceptionText));

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
                DueDate = DateTime.Today.AddDays(3),
                Completed = true

            };

            //Act
            await Context.AddAsync(Mapper.Map<ToDoEntry>(toDoDto));
            await Context.SaveChangesAsync();
            var result = await _toDoService.FindTodoByIdAsync(toDoDto.Id);

            //Assert
            Assert.NotNull(result);
            Assert.True(result.Value.Completed);
            Assert.Equal(result.Value.Text, toDoDto.Text);
            Assert.Equal(result.Value.Id, toDoDto.Id);
            Assert.Equal(result.Value.DueDate, toDoDto.DueDate);
        }

        [Fact]
        public async Task FindAsyncById_ReturnsNotFound()
        {
            //Arrange
            _toDoService = CreateToDoService();
            Guid id = Guid.NewGuid();

            //Act
            var result = await _toDoService.FindTodoByIdAsync(id);

            //Assert
            Assert.NotNull(result);
            Assert.Equal(ResultStatus.NotFound, result.Status);
            Assert.True(result.Errors[0].Equals(ToDoService.notFoundExceptionText));
        }
    }
}

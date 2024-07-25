using System;
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
        private const string NoTodoFound = "No ToDo with such ID was found";
        private IToDoService? _toDoService;

        private ToDoService CreateToDoService()
        {
            return new ToDoService(base.Mapper, base.Context/*welche Parameter braucht man hier?*/);
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

            // Act
            var actualToDoDto = await _toDoService.AddTodoAsync(expectedToDoDto);

            // Assert
            Assert.NotNull(actualToDoDto);
            Assert.NotNull(expectedToDoDto);
            Assert.Equal(expectedToDoDto.Text, actualToDoDto.Text);
            Assert.Equal(expectedToDoDto.DueDate, actualToDoDto.DueDate);
            Assert.Equal(expectedToDoDto.Completed, actualToDoDto.Completed);
        }

        [Fact]
        public async Task DeleteTodoAsync_Success()
        {
            // Arrange
            _toDoService = CreateToDoService();

            var dateTime = new DateTime(1998, 04, 30);
            var text = "Test";
            Guid id = Guid.NewGuid();
            ToDoEntry toDoEntry = new ToDoEntry()
            {
                Id = id,
                Text = text,
                TargetDate = dateTime,
                Completed = true,
            };

            await base.Context.ToDo.AddAsync(toDoEntry);

            // Act
            await _toDoService.DeleteTodoAsync(id);

            // Assert
            var deletedToDoEntry = await base.Context.ToDo.FindAsync(id);
            Assert.Null(deletedToDoEntry);
        }

        [Fact]
        public async Task DeleteTodoAsync_ReturnsNotFound()
        {
            // Arrange
            _toDoService = CreateToDoService();
            Guid id = Guid.NewGuid();

            // Act
            var exception = await Assert.ThrowsAsync<Exception>(() => _toDoService.DeleteTodoAsync(id));

            // Assert
            Assert.Equal(NoTodoFound, exception.Message);
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

            ToDoEntry initialToDoEntry = new ToDoEntry()
            {
                Id = id,
                Text = text,
                TargetDate = dateTime,
                Completed = true,
            };

            await base.Context.ToDo.AddAsync(initialToDoEntry);

            ToDoDto expectedToDoDto = new ToDoDto()
            {
                Id = id,
                Text = updatedText,
                DueDate = updatedDateTime,
                Completed = false,
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

            // Act
            var exception = await Assert.ThrowsAsync<Exception>(() => _toDoService.UpdateTodoAsync(expectedToDoDto));

            // Assert
            Assert.Equal(NoTodoFound, exception.Message);
        }

        [Fact]
        public async Task GetTodoByIdAsync_Success()
        {
            // Arrange
            _toDoService = CreateToDoService();

            var dateTime = new DateTime(1998, 04, 30);
            var text = "Test";
            Guid id = Guid.NewGuid();

            ToDoEntry toDoEntry = new ToDoEntry()
            {
                Id = id,
                Text = text,
                TargetDate = dateTime,
                Completed = true,
            };
            ToDoDto expectedToDoDto = base.Mapper.Map<ToDoDto>(toDoEntry);
            await base.Context.ToDo.AddAsync(toDoEntry);

            // Act
            ToDoDto actualToDoDto = await _toDoService.GetTodoByIdAsync(id);

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
            //Arrange
            _toDoService = CreateToDoService();

            Guid id = Guid.NewGuid();

            // Act
            var exception = await Assert.ThrowsAsync<Exception>(() => _toDoService.GetTodoByIdAsync(id));

            // Assert
            Assert.Equal(NoTodoFound, exception.Message);
        }
    }
}

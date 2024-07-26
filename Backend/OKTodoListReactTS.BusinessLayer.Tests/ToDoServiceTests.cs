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
        private const string NoTodoFound = "No ToDo with such ID was found.";
        private const string TodoAlreadyExists = "ToDo with such ID already exists.";
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
        public async Task AddTodoAsync_Success()
        {
            // Arrange
            _toDoService = CreateToDoService();
            var dateTime = new DateTime(1998, 04, 30);
            var text = "Test";
            var title = "Test title";
            ToDoDto expectedToDoDto = new ToDoDto()
            {
                Title = title,
                Text = text,
                DueDate = dateTime,
                Completed = true,
            };

            // Act
            var actualToDoDto = await _toDoService.AddTodoAsync(expectedToDoDto);

            // Assert
            Assert.NotNull(actualToDoDto);
            Assert.NotNull(expectedToDoDto);
            Assert.Equal(expectedToDoDto.Title, actualToDoDto.Title);
            Assert.Equal(expectedToDoDto.Text, actualToDoDto.Text);
            Assert.Equal(expectedToDoDto.DueDate, actualToDoDto.DueDate);
            Assert.Equal(expectedToDoDto.Completed, actualToDoDto.Completed);
        }

        [Fact]
        public async Task AddTodoAsync_ReturnsDuplicateDetected() // Titel und Fälligkeitsdatum gleich
        {
            // Arrange
            _toDoService = CreateToDoService();
            var targetDate = new DateTime(1998, 04, 30);
            var text1 = "Test1";
            var text2 = "Test2";
            var title = "Test title";
            ToDoEntry alreadyAddedToDoEntry = new ToDoEntry()
            {
                Title = title,
                Text = text1,
                TargetDate = targetDate,
                Completed = true,
            };
            ToDoDto toBeAddedToDoDto = new ToDoDto()
            {
                Title = title,
                DueDate = targetDate,
                Text = text2,
                Completed = false,
            };

            await base.Context.ToDo.AddAsync(alreadyAddedToDoEntry);

            // Act
            var exception = await Assert.ThrowsAsync<Exception>(() => _toDoService.AddTodoAsync(toBeAddedToDoDto));

            // Assert
            Assert.Equal(TodoAlreadyExists, exception.Message);
        }

        [Fact]
        public async Task DeleteTodoAsync_Success()
        {
            // Arrange
            _toDoService = CreateToDoService();

            var title = "Test title";
            var dateTime = new DateTime(1998, 04, 30);
            var text = "Test";
            Guid id = Guid.NewGuid();
            ToDoEntry toDoEntry = new ToDoEntry()
            {
                Id = id,
                Title = title,
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

            var title = "Test title";
            var dateTime = new DateTime(1998, 04, 30);
            var text = "Test";
            Guid id = Guid.NewGuid();
            var updatedText = "Updated";
            var updatedDateTime = dateTime.AddDays(1);

            ToDoEntry initialToDoEntry = new ToDoEntry()
            {
                Id = id,
                Title = title,
                Text = text,
                TargetDate = dateTime,
                Completed = true,
            };

            await base.Context.ToDo.AddAsync(initialToDoEntry);

            ToDoDto expectedToDoDto = new ToDoDto()
            {
                Id = id,
                Title = title,
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
            Assert.Equal(expectedToDoDto.Title, actualToDoDto.Title);
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
            var title = "Test title";

            ToDoDto expectedToDoDto = new ToDoDto()
            {
                Id = id,
                Title = title,
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
        public async Task UpdateTodoAsync_ReturnsDuplicateDetected() // Titel und Fälligkeitsdatum gleich
        {
            // Arrange
            _toDoService = CreateToDoService();
            Guid id = Guid.NewGuid();
            var targetDate1 = new DateTime(1998, 04, 30);
            var targetDate2 = targetDate1.AddDays(1);
            var text1 = "Test1";
            var text2 = "Test2";
            var title1 = "Test title 1";
            var title2 = "Test title 2";
            ToDoEntry alreadyAddedToDoEntry1 = new ToDoEntry()
            {
                Title = title1,
                Text = text1,
                TargetDate = targetDate1,
                Completed = true,
            };
            ToDoEntry alreadyAddedToDoEntry2 = new ToDoEntry()
            {
                Id = id,
                Title = title2,
                Text = text2,
                TargetDate = targetDate2,
                Completed = true,
            };

            await base.Context.ToDo.AddAsync(alreadyAddedToDoEntry1);
            await base.Context.ToDo.AddAsync(alreadyAddedToDoEntry2);

            ToDoDto toBeUpdatedToDoDto = new ToDoDto()
            {
                Id = id,
                Title = title1,
                DueDate = targetDate1,
                Text = text2,
                Completed = false,
            };

            // Act
            var exception = await Assert.ThrowsAsync<Exception>(() => _toDoService.UpdateTodoAsync(toBeUpdatedToDoDto));

            // Assert
            Assert.Equal(TodoAlreadyExists, exception.Message);
        }

        [Fact]
        public async Task GetTodoByIdAsync_Success()
        {
            // Arrange
            _toDoService = CreateToDoService();

            var title = "Test title";
            var dateTime = new DateTime(1998, 04, 30);
            var text = "Test";
            Guid id = Guid.NewGuid();

            ToDoEntry toDoEntry = new ToDoEntry()
            {
                Id = id,
                Title = title,
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
            Assert.Equal(expectedToDoDto.Title, actualToDoDto.Title);
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

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using OKTodoListReactTS.Api.Controllers;
using OKTodoListReactTS.BusinessLayer.Dtos;
using OKTodoListReactTS.BusinessLayer.Interfaces;
using Xunit;

namespace OKTodoListReactTS.Api.Tests
{
    public class ToDoControllerTests
    {
        private readonly Mock<IToDoService> _toDoServiceMock = new();
        private ToDoController _toDoController;

        [Fact]
        public async Task AddToDoAsync_ReturnsStatusCodeOk()
        {
            // Arrange
            var toDoDto = new ToDoDto
            {
                Id = Guid.NewGuid(),
                Title = "New Task",
                Text = "Description",
                DueDate = DateTime.Now,
                Completed = false
            };

            // Mock-Setup: Es wird erwartet, dass die Methode AddTodoAsync mit einem ToDoDto aufgerufen wird
            // und dieses ToDoDto als Rückgabewert liefert.
            _toDoServiceMock.Setup(service => service.AddTodoAsync(toDoDto)).ReturnsAsync(toDoDto);

            _toDoController = new ToDoController(_toDoServiceMock.Object);

            // Act
            var result = await _toDoController.AddToDoAsync(toDoDto);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result); // Verifiziere den Statuscode
            Assert.Equal(200, okResult.StatusCode); // Prüft, ob der Statuscode 200 OK ist
            _toDoServiceMock.Verify(service => service.AddTodoAsync(It.IsAny<ToDoDto>()), Times.Once); // Verifiziere, dass AddTodoAsync einmal aufgerufen wurde
        }

        [Fact]
        public async Task AddToDoAsync_ReturnsValidObject()
        {
            // Arrange
            var toDoDto = new ToDoDto
            {
                Id = Guid.NewGuid(),
                Title = "New Task",
                Text = "Description",
                DueDate = DateTime.Now,
                Completed = false
            };

            // Mock-Setup: Rückgabe des übergebenen ToDoDto.
            _toDoServiceMock.Setup(service => service.AddTodoAsync(toDoDto))
                            .ReturnsAsync(toDoDto);

            _toDoController = new ToDoController(_toDoServiceMock.Object);

            // Act
            var result = await _toDoController.AddToDoAsync(toDoDto);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnedToDo = Assert.IsType<ToDoDto>(okResult.Value); // Verifiziere den zurückgegebenen ToDoDto
            Assert.Equal(toDoDto, returnedToDo); // Überprüfen, ob das zurückgegebene Objekt dem ursprünglichen entspricht
            _toDoServiceMock.Verify(service => service.AddTodoAsync(It.IsAny<ToDoDto>()), Times.Once); // Verifiziere den Aufruf
        }

        [Fact]
        public async Task DeleteToDoAsync_ReturnsStatusCodeOk()
        {
            // Arrange
            var toDoDto = new ToDoDto
            {
                Id = Guid.NewGuid(),
                Title = "Task to Delete",
                Text = "Task Description",
                DueDate = DateTime.Now,
                Completed = false
            };

            // Mock-Setup
            _toDoServiceMock.Setup(service => service.DeleteTodoAsync(toDoDto))
                            .Returns(Task.CompletedTask);

            // Initialisierung des Controllers
            _toDoController = new ToDoController(_toDoServiceMock.Object);

            // Act
            var result = await _toDoController.DeleteToDoAsync(toDoDto);

            // Assert
            var okResult = Assert.IsType<OkResult>(result.Result);
            Assert.Equal(200, okResult.StatusCode);
            _toDoServiceMock.Verify(service => service.DeleteTodoAsync(It.IsAny<ToDoDto>()), Times.Once);
        }

        [Fact]
        public async Task GetAllTodosAsync_ReturnsStatusCodeOkAndTodoList()
        {
            // Arrange
            var todos = new List<ToDoDto>
    {
        new ToDoDto { Id = Guid.NewGuid(), Title = "Task 1", Text = "Description 1", DueDate = DateTime.Now, Completed = false },
        new ToDoDto { Id = Guid.NewGuid(), Title = "Task 2", Text = "Description 2", DueDate = DateTime.Now.AddDays(1), Completed = true }
    };

            // Mock-Setup
            _toDoServiceMock.Setup(service => service.GetAllTodosAsync())
                            .ReturnsAsync(todos);

            // Initialisierung des Controllers
            _toDoController = new ToDoController(_toDoServiceMock.Object);

            // Act
            var result = await _toDoController.GetAllTodosAsync();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnedTodos = Assert.IsType<List<ToDoDto>>(okResult.Value);
            Assert.Equal(2, returnedTodos.Count);
            Assert.Equal(todos, returnedTodos);
            _toDoServiceMock.Verify(service => service.GetAllTodosAsync(), Times.Once);
        }

        [Fact]
        public async Task UpdateTodoAsync_ReturnsStatusCodeOkAndUpdatedObject()
        {
            // Arrange
            var toDoDto = new ToDoDto
            {
                Id = Guid.NewGuid(),
                Title = "Updated Task",
                Text = "Updated Description",
                DueDate = DateTime.Now.AddDays(2),
                Completed = true
            };

            // Mock-Setup
            _toDoServiceMock.Setup(service => service.UpdateTodoAsync(toDoDto))
                            .ReturnsAsync(toDoDto);

            // Initialisierung des Controllers
            _toDoController = new ToDoController(_toDoServiceMock.Object);

            // Act
            var result = await _toDoController.UpdateTodoAsync(toDoDto);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnedToDo = Assert.IsType<ToDoDto>(okResult.Value);
            Assert.Equal(toDoDto, returnedToDo);
            _toDoServiceMock.Verify(service => service.UpdateTodoAsync(It.IsAny<ToDoDto>()), Times.Once);
        }

        [Fact]
        public async Task SearchTodoWithIdAsync_ReturnsStatusCodeOkAndTodo()
        {
            // Arrange
            var toDoId = Guid.NewGuid();
            var toDoDto = new ToDoDto
            {
                Id = toDoId,
                Title = "Searched Task",
                Text = "Task to be found",
                DueDate = DateTime.Now.AddDays(1),
                Completed = false
            };

            // Mock-Setup
            _toDoServiceMock.Setup(service => service.SearchTodoWithIdAsync(toDoId))
                            .ReturnsAsync(toDoDto);

            // Initialisierung des Controllers
            _toDoController = new ToDoController(_toDoServiceMock.Object);

            // Act
            var result = await _toDoController.SearchTodoWithIdAsync(toDoId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnedToDo = Assert.IsType<ToDoDto>(okResult.Value);
            Assert.Equal(toDoDto, returnedToDo);
            _toDoServiceMock.Verify(service => service.SearchTodoWithIdAsync(It.IsAny<Guid>()), Times.Once);
        }

        [Fact]
        public async Task SearchTodoWithIdAsync_ReturnsNotFoundWhenTodoDoesNotExist()
        {
            // Arrange
            var toDoId = Guid.NewGuid();

            // Mock-Setup: Rückgabe von null, wenn das ToDo nicht gefunden wird
            _toDoServiceMock.Setup(service => service.SearchTodoWithIdAsync(toDoId))
                            .ReturnsAsync((ToDoDto)null);

            // Initialisierung des Controllers
            _toDoController = new ToDoController(_toDoServiceMock.Object);

            // Act
            var result = await _toDoController.SearchTodoWithIdAsync(toDoId);

            // Assert
            var notFoundResult = Assert.IsType<NotFoundResult>(result.Result);
            Assert.Equal(404, notFoundResult.StatusCode);
            _toDoServiceMock.Verify(service => service.SearchTodoWithIdAsync(It.IsAny<Guid>()), Times.Once);
        }
    }
}

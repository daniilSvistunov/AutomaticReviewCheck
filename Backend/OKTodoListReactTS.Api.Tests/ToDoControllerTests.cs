using System;
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
            //_toDoServiceMock.Setup(x => x.AddTodoAsync(toDoDto)).ReturnsAsync(toDoDto);
            _toDoController = new ToDoController(_toDoServiceMock.Object);

            var id = Guid.NewGuid();
            var title = "Test";
            var text = "Test";
            var dueDate = DateTime.Now;
            ToDoDto toDoDto = new ToDoDto()
            {
                Id = id,
                Title = title,
                Text = text,
                DueDate = dueDate,
                Completed = false
            };

            // Act
            var result = await _toDoController.AddToDoAsync(toDoDto);

            // Assert
            var okObjectResult = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(200, okObjectResult.StatusCode);
        }

        [Fact]
        public async Task AddToDoAsync_ReturnsValidObject()
        {
            // Arrange
            //_toDoServiceMock.Setup(x => x.AddTodoAsync(toDoDto)).ReturnsAsync(toDoDto);
            _toDoController = new ToDoController(_toDoServiceMock.Object);

            var id = Guid.NewGuid();
            var title = "Test";
            var text = "Test";
            var dueDate = DateTime.Now;
            ToDoDto toDoDto = new ToDoDto()
            {
                Id = id,
                Title = title,
                Text = text,
                DueDate = dueDate,
                Completed = false
            };

            // Act
            var result = await _toDoController.AddToDoAsync(toDoDto);

            // Assert
            Assert.NotNull(result);
            Assert.IsType<ActionResult<ApplicationDto>>(result);
        }

        // TODO: weitere Tests implementieren

        [Fact]
        public async Task DeleteToDoAsync_ReturnsResultStatusOkAndReturnsApplicationDto()
        {
            // Arrange
            var id = Guid.Parse("d50d4e5d-40a8-4c8b-a2aa-745f77c8b9d7");
            _toDoController = new ToDoController(_toDoServiceMock.Object);

            // Act
            var result = await _toDoController.DeleteToDoAsync(id);

            // Assert
            Assert.NotNull(result);
            Assert.IsType<ActionResult<ApplicationDto>>(result);
            var okResult = Assert.IsType<OkResult>(result.Result);
            Assert.Equal(200, okResult.StatusCode);
        }

        [Fact]
        public async Task UpdateToDoAsync_ReturnsResultStatusOkAndReturnsApplicationDto()
        {
            // Arrange
            var id = Guid.Parse("d50d4e5d-40a8-4c8b-a2aa-745f77c8b9d7");
            var title = "Test";
            var text = "Test";
            var dueDate = DateTime.Now;
            ToDoDto toDoDto = new ToDoDto()
            {
                Id = id,
                Title = title,
                Text = text,
                DueDate = dueDate,
                Completed = false
            };

            //_toDoServiceMock.Setup(x => x.UpdateTodoAsync(toDoDto)).ReturnsAsync(toDoDto);
            _toDoController = new ToDoController(_toDoServiceMock.Object);

            // Act
            var result = await _toDoController.UpdateTodoAsync(toDoDto);

            // Assert
            Assert.NotNull(result);
            Assert.IsType<ActionResult<ApplicationDto>>(result);
            var okObjectResult = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(200, okObjectResult.StatusCode);
        }

        [Fact]
        public async Task GetAllToDosAsync_ReturnsResultStatusOkAndReturnsApplicationDto()
        {
            // Arrange
            //_toDoServiceMock.Setup(x => x.GetAllTodosAsync()).ReturnsAsync();
            _toDoController = new ToDoController(_toDoServiceMock.Object);

            // Act
            var result = await _toDoController.GetAllTodosAsync();

            // Assert
            Assert.NotNull(result);
            Assert.IsType<ActionResult<ApplicationDto>>(result);
            var okObjectResult = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(200, okObjectResult.StatusCode);
        }

        [Fact]
        public async Task GetToDoByIdAsync_ReturnsResultStatusOkAndReturnsApplicationDto()
        {
            // Arrange
            var id = Guid.Parse("d50d4e5d-40a8-4c8b-a2aa-745f77c8b9d7");
            _toDoController = new ToDoController(_toDoServiceMock.Object);

            // Act
            var result = await _toDoController.GetToDoByIdAsync(id);

            // Assert
            Assert.NotNull(result);
            Assert.IsType<ActionResult<ApplicationDto>>(result);
            var okObjectResult = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(200, okObjectResult.StatusCode);
        }
    }
}

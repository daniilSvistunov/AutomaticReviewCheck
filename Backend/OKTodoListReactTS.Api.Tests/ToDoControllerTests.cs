using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ardalis.Result;
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
        public async Task AddToDoAsync_ReturnsStatusCodeOkAndReturnsValidObject()
        {
            // Arrange
            _toDoController = new ToDoController(_toDoServiceMock.Object);
            ToDoDto toDoDto = new ToDoDto();
            _toDoServiceMock.Setup(x => x.AddTodoAsync(toDoDto)).ReturnsAsync(toDoDto);

            // Act
            var result = await _toDoController.AddToDoAsync(toDoDto);

            // Assert     
            Assert.NotNull(result);
            Assert.Equal(ResultStatus.Ok, result.Status);
            Assert.Equal(toDoDto, result.Value);

            _toDoServiceMock.Verify(s => s.AddTodoAsync(toDoDto), Times.Exactly(1));
        }

        // TODO: weitere Tests implementieren

        [Fact]
        public async Task DeleteToDoAsync_ReturnsResultStatusOkAndReturnsValidObject()
        {
            // Arrange
            var id = Guid.Parse("d50d4e5d-40a8-4c8b-a2aa-745f77c8b9d7");
            var expectedResult = Result.Success();
            _toDoController = new ToDoController(_toDoServiceMock.Object);
            _toDoServiceMock.Setup(s => s.DeleteTodoAsync(id)).ReturnsAsync(expectedResult);

            // Act
            var result = await _toDoController.DeleteToDoAsync(id);

            // Assert
            Assert.Equal(expectedResult, result);
            Assert.IsType<Result>(result);
            Assert.Equal(ResultStatus.Ok, result.Status);

            _toDoServiceMock.Verify(s => s.DeleteTodoAsync(id), Times.Exactly(1));
        }

        [Fact]
        public async Task UpdateToDoAsync_ReturnsResultStatusOkAndReturnsValidObject()
        {
            // Arrange
            ToDoDto toDoDto = new ToDoDto();

            _toDoServiceMock.Setup(x => x.UpdateTodoAsync(toDoDto)).ReturnsAsync(toDoDto);
            _toDoController = new ToDoController(_toDoServiceMock.Object);

            // Act
            var result = await _toDoController.UpdateTodoAsync(toDoDto);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(ResultStatus.Ok, result.Status);
            Assert.Equal(toDoDto, result.Value);

            _toDoServiceMock.Verify(s => s.UpdateTodoAsync(toDoDto), Times.Exactly(1));
        }

        [Fact]
        public async Task GetAllToDosAsync_ReturnsResultStatusOkAndReturnsValidObject()
        {
            // Arrange
            List<ToDoDto> toDoDtos = new List<ToDoDto>()
            {
                new(),
                new()
            };
            _toDoServiceMock.Setup(x => x.GetAllTodosAsync()).ReturnsAsync(toDoDtos);
            _toDoController = new ToDoController(_toDoServiceMock.Object);

            // Act
            var result = await _toDoController.GetAllTodosAsync();

            // Assert
            Assert.NotNull(result);
            Assert.Equal(ResultStatus.Ok, result.Status);
            Assert.Equal(toDoDtos, result.Value);

            _toDoServiceMock.Verify(s => s.GetAllTodosAsync(), Times.Exactly(1));
        }

        [Fact]
        public async Task GetToDoByIdAsync_ReturnsResultStatusOkAndReturnsValidObject()
        {
            // Arrange
            var id = Guid.Parse("d50d4e5d-40a8-4c8b-a2aa-745f77c8b9d7");
            var toDoDto = new ToDoDto();
            _toDoServiceMock.Setup(s => s.GetTodoByIdAsync(id)).ReturnsAsync(toDoDto);
            _toDoController = new ToDoController(_toDoServiceMock.Object);

            // Act
            var result = await _toDoController.GetToDoByIdAsync(id);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(ResultStatus.Ok, result.Status);
            Assert.Equal(toDoDto, result.Value);

            _toDoServiceMock.Verify(s => s.GetTodoByIdAsync(id), Times.Exactly(1));
        }
    }
}

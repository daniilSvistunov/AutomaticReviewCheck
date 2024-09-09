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
            var _toDoDto = new ToDoDto()
            {
                Id = Guid.NewGuid(),
                Text = "Test ToDo",
                Titel = "Todo Titel",
                TargetDate = DateTime.UtcNow.AddDays(1),
                Completed = true

            };
            _toDoServiceMock.Setup(service => service.AddTodoAsync(_toDoDto)).ReturnsAsync(_toDoDto);

            _toDoController = new ToDoController(_toDoServiceMock.Object);

            // Act
            var result = await _toDoController.AddToDoAsync(_toDoDto);
            OkObjectResult okObject = (OkObjectResult)result.Result;

            // Assert
            Assert.NotNull(okObject);
            Assert.Equal(200, okObject.StatusCode);
            _toDoServiceMock.Verify(mock => mock.AddTodoAsync(_toDoDto), Times.Once());
        }

        [Fact]
        public async Task AddToDoAsync_ReturnsValidObject()
        {
            // Arrange
            var _toDoDto = new ToDoDto()
            {
                Id = Guid.NewGuid(),
                Text = "Test ToDo",
                Titel = "Todo Titel",
                TargetDate = DateTime.UtcNow.AddDays(1),
                Completed = true

            };
            _toDoServiceMock.Setup(service => service.AddTodoAsync(_toDoDto)).ReturnsAsync(_toDoDto);

            _toDoController = new ToDoController(_toDoServiceMock.Object);

            // Act
            var result = await _toDoController.AddToDoAsync(_toDoDto);

            // Assert
            Assert.NotNull(result);
            Assert.IsType<OkObjectResult>(result.Result);
            _toDoServiceMock.Verify(mock => mock.AddTodoAsync(_toDoDto), Times.Once());
        }
        [Fact]
        public async Task DeleteToDoAsync_ReturnsValidObject()
        {
            // Arrange
            var _toDoDto = new ToDoDto()
            {
                Id = Guid.NewGuid(),
                Text = "Test ToDo",
                Titel = "Todo Titel",
                TargetDate = DateTime.UtcNow.AddDays(1),
                Completed = true

            };
            _toDoController = new ToDoController(_toDoServiceMock.Object);

            // Act
            var result = await _toDoController.DeleteToDoAsync(_toDoDto.Id);

            // Assert
            Assert.NotNull(result);
            Assert.IsType<OkResult>(result.Result);
            _toDoServiceMock.Verify(mock => mock.DeleteTodoAsync(_toDoDto.Id), Times.Once());
        }
        [Fact]
        public async Task DeleteToDoAsync_ReturnsStatusCodeOk()
        {
            // Arrange
            var _toDoDto = new ToDoDto()
            {
                Id = Guid.NewGuid(),
                Text = "Test ToDo",
                Titel = "Todo Titel",
                TargetDate = DateTime.UtcNow.AddDays(1),
                Completed = true

            };

            _toDoController = new ToDoController(_toDoServiceMock.Object);

            // Act
            var result = await _toDoController.DeleteToDoAsync(_toDoDto.Id);
            OkResult okObject = (OkResult)result.Result;

            // Assert
            Assert.NotNull(result);
            Assert.Equal(200, okObject.StatusCode);
            _toDoServiceMock.Verify(mock => mock.DeleteTodoAsync(_toDoDto.Id), Times.Once());
        }

        [Fact]
        public async Task GetAllToDosAsync_ReturnsStatusCodeOk_IsCorrectObject()
        {
            // Arrange
            var toDoList = new List<ToDoDto>()
            {
                new ToDoDto{
                    Id = Guid.NewGuid(),
                    Text = "Text1",
                    Titel = "Titel1",
                    TargetDate= DateTime.UtcNow.AddDays(1),
                    Completed = false
                },
                new ToDoDto{
                    Id = Guid.NewGuid(),
                    Text = "Text2",
                    Titel = "Titel2",
                    TargetDate= DateTime.UtcNow.AddDays(2),
                    Completed = false
                }
            };

            _toDoServiceMock.Setup(service => service.GetAllTodosAsync()).ReturnsAsync(toDoList);
            _toDoController = new ToDoController(_toDoServiceMock.Object);

            // Act
            var result = await _toDoController.GetAllTodosAsync();

            // Assert
            Assert.NotNull(result);
            var okObject = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(200, okObject.StatusCode);
            _toDoServiceMock.Verify(mock => mock.GetAllTodosAsync(), Times.Once());
        }

        [Fact]
        public async Task FindByIdAsync_ReturnsStatusCodeOk_IsCorrectObject()
        {
            // Arrange
            var toDoDto = new ToDoDto
            {
                Id = Guid.NewGuid(),
                Text = "Text1",
                Titel = "Titel1",
                TargetDate = DateTime.UtcNow.AddDays(1),
                Completed = false
            };

            _toDoServiceMock.Setup(service => service.FindTodoByIdAsync(toDoDto.Id)).ReturnsAsync(toDoDto);
            _toDoController = new ToDoController(_toDoServiceMock.Object);

            // Act
            var result = await _toDoController.FindTodoByIdAsync(toDoDto.Id);

            // Assert
            Assert.NotNull(result);
            var okObject = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(200, okObject.StatusCode);
            _toDoServiceMock.Verify(mock => mock.FindTodoByIdAsync(toDoDto.Id), Times.Once());
        }

        [Fact]
        public async Task UpdateToDo_ReturnsStatusCodeOk_IsCorrectObject()
        {
            // Arrange
            var toDoDto1 = new ToDoDto
            {
                Id = Guid.NewGuid(),
                Text = "Text1",
                Titel = "Titel1",
                TargetDate = DateTime.UtcNow.AddDays(1),
                Completed = false
            };

            _toDoServiceMock.Setup(service => service.UpdateTodoAsync(toDoDto1)).ReturnsAsync(toDoDto1);
            _toDoController = new ToDoController(_toDoServiceMock.Object);

            // Act
            var result = await _toDoController.UpdateTodoAsync(toDoDto1);

            // Assert
            Assert.NotNull(result);
            var okObject = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(200, okObject.StatusCode);
            _toDoServiceMock.Verify(mock => mock.UpdateTodoAsync(toDoDto1), Times.Once());
        }
    }
}

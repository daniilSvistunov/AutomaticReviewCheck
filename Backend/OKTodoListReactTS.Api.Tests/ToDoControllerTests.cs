using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ardalis.Result;
using Moq;
using OKTodoListReactTS.Api.Controllers;
using OKTodoListReactTS.BusinessLayer.Dtos;
using OKTodoListReactTS.BusinessLayer.Interfaces;
using Xunit;

namespace OKTodoListReactTS.Api.Tests
{
    /// <summary>
    /// Runs tests on <see cref="ToDoController"/>.
    /// </summary>
    public class ToDoControllerTests
    {
        private static readonly Random _random = new();
        private readonly Mock<IToDoService> _serviceMock = new();
        private readonly ToDoController _controller;

        private readonly List<ToDoDto> _elements = Enumerable
            .Range(1, _random.Next(10, 20))
            .Select(num => new ToDoDto()
            {
                Id = Guid.NewGuid(),
                Title = $"Title {num}",
            }).ToList();

        public ToDoControllerTests()
        {
            _controller = new ToDoController(_serviceMock.Object);
        }

        [Fact]
        public async Task GetAllToDosAsync_ReturnsStatusCodeOk()
        {
            // Arrange
            _serviceMock.Setup(s => s.GetAllTodosAsync()).ReturnsAsync(_elements);

            // Act
            var result = await _controller.GetAllTodosAsync();

            // Assert
            Assert.NotNull(result);

            Assert.True(result.IsSuccess);

            var value = result.Value;
            var status = result.Status;
            Assert.NotNull(value);
            Assert.Equal(ResultStatus.Ok, status);

            _serviceMock.Verify(s => s.GetAllTodosAsync(), Times.Once);
        }

        [Fact]
        public async Task AddToDoAsync_ReturnsStatusCodeOk_ReturnsValidObject()
        {
            // Arrange
            var id = Guid.NewGuid();
            var title = "Title";
            var text = "Text";
            var dueDate = DateTime.Now;
            var toDoDto = new ToDoDto
            {
                Id = id,
                Title = title,
                DueDate = dueDate,
                Text = text,
            };
            _serviceMock.Setup(x => x.AddTodoAsync(It.IsAny<ToDoDto>())).ReturnsAsync(toDoDto);

            // Act
            var result = await _controller.AddToDoAsync(toDoDto);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(ResultStatus.Ok, result.Status);
            Assert.Equal(toDoDto, result.Value);
            Assert.Equal(id, result.Value.Id);
            Assert.Equal(title, result.Value.Title);
            Assert.Equal(text, result.Value.Text);
            Assert.Equal(dueDate, result.Value.DueDate);

            _serviceMock.Verify(s => s.AddTodoAsync(toDoDto), Times.Once);
        }

        [Fact]
        public async Task DeleteToDoAsync_ReturnsResultStatusOkAndReturnsValidObject()
        {
            // Arrange
            int next = _random.Next(_elements.Count);
            var element = _elements.GetRange(next, 1)[0];
            var expectedResult = Result.Success();
            var expectedResultStaus = ResultStatus.Ok;
            _serviceMock.Setup(s => s.DeleteTodoAsync(It.IsAny<ToDoDto>())).ReturnsAsync(expectedResult);

            // Act
            var result = await _controller.DeleteToDoAsync(element);

            // Assert
            Assert.Equal(expectedResult, result);
            Assert.IsType<Result>(result);
            Assert.Equal(expectedResultStaus, result.Status);

            _serviceMock.Verify(s => s.DeleteTodoAsync(It.IsAny<ToDoDto>()), Times.Once);
        }

        [Fact]
        public async Task UpdateToDoAsync_ReturnsResultStatusOkAndReturnsValidObject()
        {
            // Arrange
            int next = _random.Next(_elements.Count);
            var element = _elements.GetRange(next, 1)[0];
            _serviceMock.Setup(x => x.UpdateTodoAsync(It.IsAny<ToDoDto>())).ReturnsAsync(element);

            // Act
            var result = await _controller.UpdateTodoAsync(element);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(ResultStatus.Ok, result.Status);
            Assert.Equal(element, result.Value);

            _serviceMock.Verify(s => s.UpdateTodoAsync(It.IsAny<ToDoDto>()), Times.Once);
        }

        [Fact]
        public async Task GetAllToDosAsync_ReturnsResultStatusOkAndReturnsValidObject()
        {
            // Arrange
            _serviceMock.Setup(x => x.GetAllTodosAsync()).ReturnsAsync(_elements);

            // Act
            var result = await _controller.GetAllTodosAsync();

            // Assert
            Assert.NotNull(result);
            Assert.Equal(ResultStatus.Ok, result.Status);
            Assert.Equal(_elements, result.Value);

            _serviceMock.Verify(s => s.GetAllTodosAsync(), Times.Once);
        }

        [Fact]
        public async Task GetToDoByIdAsync_ReturnsResultStatusOkAndReturnsValidObject()
        {
            // Arrange
            int next = _random.Next(_elements.Count);
            var element = _elements.GetRange(next, 1)[0];
            _serviceMock.Setup(s => s.GetToDoByIdAsync(element.Id)).ReturnsAsync(element);

            // Act
            var result = await _controller.GetToDoByIdAsync(element.Id);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(ResultStatus.Ok, result.Status);
            Assert.Equal(element, result.Value);

            _serviceMock.Verify(s => s.GetToDoByIdAsync(It.IsAny<Guid>()), Times.Once);
        }
    }
}

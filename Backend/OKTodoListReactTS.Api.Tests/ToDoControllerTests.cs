using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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

            var payload = result.Result;
            Assert.IsType<OkObjectResult>(payload);

            var value = (payload as OkObjectResult)?.Value;
            var statusCode = (payload as OkObjectResult)?.StatusCode;
            Assert.NotNull(value);
            Assert.NotNull(statusCode);
            Assert.Equal(200, statusCode);

            _serviceMock.Verify(s => s.GetAllTodosAsync(), Times.Once);
        }

        [Fact]
        public async Task AddToDoAsync_ReturnsStatusCodeOk()
        {
            // Arrange
            // TODO: Setup

            // Act
            var result = await _controller.AddToDoAsync(null/* TODO */);

            // Assert
            // TODO: add assertion
        }

        [Fact]
        public async Task AddToDoAsync_ReturnsValidObject()
        {
            // TODO
        }

        // TODO: weitere Tests implementieren
    }
}

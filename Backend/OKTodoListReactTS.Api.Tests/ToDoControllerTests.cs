using System.Threading.Tasks;
using Moq;
using OKTodoListReactTS.Api.Controllers;
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
            // TODO: Setup

            _toDoController = new ToDoController(_toDoServiceMock.Object);

            // Act
            var result = await _toDoController.AddToDoAsync(null/* TODO */);

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

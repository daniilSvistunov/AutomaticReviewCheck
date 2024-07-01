using System.Threading.Tasks;
using OKTodoListReactTS.BusinessLayer.Interfaces;
using OKTodoListReactTS.BusinessLayer.Services;
using Xunit;

namespace OKTemplate.BusinessLayer.Tests
{
    public class ToDoServiceTests : ServiceTests
    {
        private IToDoService? _toDoService;

        private ToDoService CreateToDoService()
        {
            return new ToDoService(/*welche Parameter braucht man hier?*/);
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

        }

        [Fact]
        public async Task DeleteTodoAsync_Success()
        {

        }

        [Fact]
        public async Task DeleteTodoAsync_ReturnsNotFound()
        {

        }

        [Fact]
        public async Task UpdateTodoAsync_Success()
        {

        }

        [Fact]
        public async Task UpdateTodoAsync_ReturnsNotFound()
        {

        }
    }
}

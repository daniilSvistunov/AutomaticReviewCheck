using OKTodoListReactTS.BusinessLayer.Interfaces;
using OKTodoListReactTS.BusinessLayer.Services;

namespace OKTodoListReactTS.BusinessLayer.Tests
{
    public class ToDoServiceTests
    {
        private readonly IToDoService _toDoService;

        public ToDoServiceTests()
        {
            _toDoService = new ToDoService();
        }
    }
}

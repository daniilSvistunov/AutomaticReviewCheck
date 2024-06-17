using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using OKTemplate.Api.Mapping;
using OKTemplate.BusinessLayer.Dtos;
using OKTemplate.BusinessLayer.Interfaces;
using OKTemplate.BusinessLayer.Services;
using OKTemplate.DataLayer;
using Xunit;

namespace OKTemplate.BusinessLayer.Tests
{
    public class ToDoServiceTests : ServiceTests
    {
        private IToDoService? _toDoService;
        private readonly IMapper _mapper;
        private readonly ToDoDbContext _dbContext;

        public ToDoServiceTests()
        {
            var config = new MapperConfiguration(cfg => cfg.AddProfile(new MappingProfile()));
            _mapper = config.CreateMapper();

            var options = new DbContextOptionsBuilder<ToDoDbContext>()
              .UseInMemoryDatabase(databaseName: "TestDb")
              .Options;
            _dbContext = new ToDoDbContext(options);
        }

        private ToDoService CreateToDoService()
        {
            return new ToDoService(/*welche Parameter braucht man hier?*/ _mapper, _dbContext);
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
            _toDoService = CreateToDoService();
            ToDoDto addtoDo = new ToDoDto()
            {
                Id = Guid.NewGuid(),
                Text = "Add ToDo test",
                DueDate = DateTime.Now,
                Completed = false,
            };
            //Act
            var result = await _toDoService.AddTodoAsync(addtoDo);

            //Assert.NotNull(result);
            Assert.Equal(addtoDo.Id, result.Id);
            Assert.Equal(addtoDo.Text, result.Text);
            Assert.Equal(addtoDo.DueDate, result.DueDate);
            Assert.Equal(addtoDo.Completed, result.Completed);
        }

        [Fact]
        public async Task DeleteTodoAsync_Success()
        {
            _toDoService = CreateToDoService();
            ToDoDto addtoDo = new ToDoDto()
            {
                Id = Guid.NewGuid(),
                Text = "delete ToDo test",
                DueDate = DateTime.Now,
                Completed = false,
            };

            //Act
            var add = await _toDoService.AddTodoAsync(addtoDo); // first add a toDo
            await _toDoService.DeleteTodoAsync(add.Id); // then we delete it for the test

            //Assert
            Assert.Null(await _dbContext.ToDo.FindAsync(addtoDo.Id));
        }

        [Fact]
        public async Task DeleteTodoAsync_ReturnsNotFound()
        {
            // Arrange
            _toDoService = CreateToDoService(); // Erstens stelle ich ein ToDo um die danach zu suchen
            ToDoDto addtoDo = new ToDoDto()
            {
                Id = Guid.NewGuid(),
                Text = "delete ToDo not found test",
                DueDate = DateTime.Now,
                Completed = false,
            };

            //Act
            var errorMessage = await Assert.ThrowsAsync<InvalidOperationException>(() => _toDoService.DeleteTodoAsync(addtoDo.Id)); // Dann suche ich die toDo

            //Assert
            Assert.Equal("Error - Id was not found", errorMessage.Message); //jetzt gucke ich dass der error Message stimmt mit was ich bekommen habe
        }

        [Fact]
        public async Task UpdateTodoAsync_Success()
        {
            // Arrange
            _toDoService = CreateToDoService(); // Erstens stelle ich ein ToDo um danach zu updaten
            ToDoDto addtoDo = new ToDoDto()
            {
                Id = Guid.NewGuid(),
                Text = "Update ToDo test",
                DueDate = DateTime.Now,
                Completed = false,
            };

            var add = await _toDoService.AddTodoAsync(addtoDo); // jetzt mache ich add

            _toDoService = CreateToDoService(); // jetzt stelle ich ein neues toDo um update zu machen
            ToDoDto updatedDto = new ToDoDto()
            {
                Id = add.Id,
                Text = "now we updated the Dto",
                DueDate = DateTime.Now,
                Completed = true,
            };

            //Act
            var result = await _toDoService.UpdateTodoAsync(updatedDto); // hier rufe ich die Funktion update an

            //Assert
            Assert.Equal(updatedDto.Id, result.Id);
            Assert.Equal(updatedDto.Text, result.Text);
            Assert.Equal(updatedDto.DueDate, result.DueDate);
            Assert.Equal(updatedDto.Completed, result.Completed);
        }

        [Fact]
        public async Task UpdateTodoAsync_ReturnsNotFound()
        {
            // Arrange
            _toDoService = CreateToDoService(); // Erstens stelle ich ein ToDo um danach zu suchen
            ToDoDto addtoDo = new ToDoDto()
            {
                Id = Guid.NewGuid(),
                Text = "Update ToDo test - returns not found",
                DueDate = DateTime.Now,
                Completed = false,
            };

            //Ähnlich wie beim delete not found -  suche ich die toDo
            //Act
            var errorMessage = await Assert.ThrowsAsync<InvalidOperationException>(() => _toDoService.UpdateTodoAsync(addtoDo)); // Dann suche ich die toDo und es sollte es nicht finden

            //Assert
            Assert.Equal("Error - Id was not found", errorMessage.Message); //jetzt gucke ich dass der error Message stimmt mit was ich bekommen habe

        }

        [Fact]
        public async Task GetTodoByIdAsync()
        {
            // Arrange
            _toDoService = CreateToDoService(); // hier stelle ich ein neuen toDo

            ToDoDto toDoDto = new ToDoDto
            {
                Id = Guid.NewGuid(),
                Text = "Create ToDo and search by Id test",
                DueDate = DateTime.Now,
                Completed = false,
            };

            await _toDoService.AddTodoAsync(toDoDto); // add

            // Act
            var result = await _toDoService.GetTodoByIdAsync(toDoDto.Id); // probiere ich die Funktion

            //Assert
            Assert.Equal(toDoDto.Id, result.Id);
            Assert.Equal(toDoDto.Text, result.Text);
            Assert.Equal(toDoDto.DueDate, result.DueDate);
            Assert.Equal(toDoDto.Completed, result.Completed);
        }
    }
}

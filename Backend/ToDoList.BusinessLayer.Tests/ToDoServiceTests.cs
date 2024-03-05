using System.Collections.Generic;
using System.Threading.Tasks;
using Ardalis.Result;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Moq;
using ToDoList.BusinessLayer.Data;
using ToDoList.BusinessLayer.Dtos;
using ToDoList.BusinessLayer.Entities;
using ToDoList.BusinessLayer.Mapping;
using ToDoList.BusinessLayer.Services;
using Xunit;

namespace ToDoList.BusinessLayer.Tests
{
    /// <summary>
    /// Runs tests on <see cref="ToDoService"/>
    /// </summary>
    public class ToDoServiceTests
    {
        private ToDoService _toDoService;

        private static readonly MapperConfiguration mapperConfig = new MapperConfiguration(mc =>
        {
            mc.AddProfile(new MappingProfile());
        });

        private readonly IMapper _mapper = mapperConfig.CreateMapper();

        [Fact]
        public async Task GetAllItemsAsync_NotInstantiatedDbReturnsNotFound()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ToDoContext>().UseInMemoryDatabase("ToDoList").Options;
            var mockSet = new Mock<DbSet<ToDoItem>>();
            var mockContext = new Mock<ToDoContext>(options);
            mockContext.Setup(db => db.ToDoItems).Returns((DbSet<ToDoItem>)null);
            _toDoService = new ToDoService(mockContext.Object, _mapper);

            // Act
            var result = await _toDoService.GetAllItemsAsync(null, null);

            // Assert: Check return status
            Assert.Equal(ResultStatus.NotFound, result.Status);
        }

        [Fact]
        public async Task GetAllItemsAsync_ReturnAllItems()
        {
            // Arrange
            /*            var mockSet = new Mock<DbSet<ToDoItem>>();
                        mockSet.As<IDbAsyncEnumerable<ToDoItem>>()
                            .Setup(m => m.GetAsyncEnumerator())
                            .Returns(new TestDbAsyncEnumerator<ToDoItem>(GetTestData().GetEnumerator()));

                        mockSet.As<IQueryable<ToDoItem>>()
                            .Setup(m => m.Provider)
                            .Returns(new TestDbAsyncQueryProvider<ToDoItem>(GetTestData().Provider));

                        mockSet.As<IQueryable<ToDoItem>>().Setup(m => m.Expression).Returns(GetTestData().Expression);
                        mockSet.As<IQueryable<ToDoItem>>().Setup(m => m.ElementType).Returns(GetTestData().ElementType);
                        mockSet.As<IQueryable<ToDoItem>>().Setup(m => m.GetEnumerator()).Returns(() => GetTestData().GetEnumerator());

                        var options = new DbContextOptionsBuilder<ToDoContext>().UseInMemoryDatabase("ToDoList").Options;
                        var mockContext = new Mock<ToDoContext>(options);
                        mockContext.SetupGet(x => x.ToDoItems).Returns(mockSet.Object);*/

            var options = new DbContextOptionsBuilder<ToDoContext>().UseInMemoryDatabase("ToDoList").Options;
            var _context = new ToDoContext(options);

            _context.AddRange(GetTestData());
            _context.SaveChanges();

            _toDoService = new ToDoService(_context, _mapper);

            var _testDataDtos = _mapper.Map<IEnumerable<ToDoItemDto>>(GetTestData());

            // Act
            var result = await _toDoService.GetAllItemsAsync(null, null);

            // Assert: Check return status
            Assert.Equal(ResultStatus.Ok, result.Status);

            //Assert: Check return type
            var toDoItems = Assert.IsAssignableFrom<IEnumerable<ToDoItemDto>>(result.GetValue());

            //Assert: Check returned Values

            Assert.Equal(, toDoItems.);

        }

        /*        [Fact]
                public async Task GetAllItemsAsync_ReturnSearchStringItems()
                {
                    //Arrange
                    var options = new DbContextOptionsBuilder<ToDoContext>().UseInMemoryDatabase("ToDoList").Options;
                    var _context = new ToDoContext(options);

                    _context.AddRange(GetTestData());

                    _toDoService = new ToDoService(_context, _mapper);

                    // Act
                    var result = await _toDoService.GetAllItemsAsync("Apfel", null);

                    // Assert: Check return status
                    Assert.Equal(ResultStatus.Ok, result.Status);

                    //Assert: Check return type
                    var toDoItems = Assert.IsAssignableFrom<IEnumerable<ToDoItemDto>>(result.GetValue());

                    //Assert: Check returned Values
                    Assert.Equal(_mapper.Map<IEnumerable<ToDoItemDto>>(toDoItems), toDoItems);

                }*/

        private IEnumerable<ToDoItem> GetTestData()
        {
            var toDoItems = new List<ToDoItem>();
            toDoItems.Add(new ToDoItem()
            {
                id = 1,
                task = "Apfel",
                isComplete = true,
                dueDate = "2024-02-29T15:24",
            });
            toDoItems.Add(new ToDoItem()
            {
                id = 2,
                task = "Apfelsine",
                isComplete = true,
                dueDate = "2024-02-30T15:24",
            });
            toDoItems.Add(new ToDoItem()
            {
                id = 3,
                task = "Kiwi",
                isComplete = true,
                dueDate = "2024-02-30T15:24",
            });
            toDoItems.Add(new ToDoItem()
            {
                id = 4,
                task = "Birne",
                isComplete = true,
                dueDate = "2024-02-29T15:24",
            });
            return toDoItems;
        }
    }
}

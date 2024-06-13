using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ardalis.Result;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Moq;
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

            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();

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

            //Assert: Check returned values
            Assert.Equal(_testDataDtos.ToString(), toDoItems.ToString());

        }

        [Fact]
        public async Task GetAllItemsAsync_ReturnSearchStringItems()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ToDoContext>().UseInMemoryDatabase("ToDoList").Options;
            var _context = new ToDoContext(options);

            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();

            _context.AddRange(GetTestData());
            _context.SaveChanges();

            _toDoService = new ToDoService(_context, _mapper);

            var _testDataDtos = _mapper.Map<IEnumerable<ToDoItemDto>>(GetTestDataApfel());

            // Act
            var result = await _toDoService.GetAllItemsAsync("Apfel", null);

            // Assert: Check return status
            Assert.Equal(ResultStatus.Ok, result.Status);

            //Assert: Check return type
            var toDoItems = Assert.IsAssignableFrom<IEnumerable<ToDoItemDto>>(result.GetValue());

            //Assert: Check returned values
            Assert.Equal(_testDataDtos.ToString(), toDoItems.ToString());

        }

        [Fact]
        public async Task GetAllItemsAsync_PassingWrongDateFormatReturnsBadRequest()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ToDoContext>().UseInMemoryDatabase("ToDoList").Options;
            var _context = new ToDoContext(options);

            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();

            _context.AddRange(GetTestData());
            _context.SaveChanges();

            _toDoService = new ToDoService(_context, _mapper);

            var _testDataDtos = _mapper.Map<IEnumerable<ToDoItemDto>>(GetTestData29());

            // Act
            var result = await _toDoService.GetAllItemsAsync(null, "2024.02.29");

            // Assert: Check return status
            Assert.Equal(ResultStatus.BadRequest, result.Status);

        }

        [Fact]
        public async Task GetAllItemsAsync_ReturnDateItems()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ToDoContext>().UseInMemoryDatabase("ToDoList").Options;
            var _context = new ToDoContext(options);

            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();

            _context.AddRange(GetTestData());
            _context.SaveChanges();

            _toDoService = new ToDoService(_context, _mapper);

            var _testDataDtos = _mapper.Map<IEnumerable<ToDoItemDto>>(GetTestData29());

            // Act
            var result = await _toDoService.GetAllItemsAsync(null, "2024-02-29");

            // Assert: Check return status
            Assert.Equal(ResultStatus.Ok, result.Status);

            //Assert: Check return type
            var toDoItems = Assert.IsAssignableFrom<IEnumerable<ToDoItemDto>>(result.GetValue());

            //Assert: Check returned values
            Assert.Equal(_testDataDtos.ToString(), toDoItems.ToString());

        }

        [Fact]
        public async Task GetAllItemsAsync_ReturnSearchStringDateItems()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ToDoContext>().UseInMemoryDatabase("ToDoList").Options;
            var _context = new ToDoContext(options);

            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();

            _context.AddRange(GetTestData());
            _context.SaveChanges();

            _toDoService = new ToDoService(_context, _mapper);

            var _testDataDtos = _mapper.Map<IEnumerable<ToDoItemDto>>(GetTestDataApfel30());

            // Act
            var result = await _toDoService.GetAllItemsAsync("Apfel", "2024-02-29");

            // Assert: Check return status
            Assert.Equal(ResultStatus.Ok, result.Status);

            //Assert: Check return type
            var toDoItems = Assert.IsAssignableFrom<IEnumerable<ToDoItemDto>>(result.GetValue());

            //Assert: Check returned values
            Assert.Equal(_testDataDtos.ToString(), toDoItems.ToString());

        }

        [Fact]
        public async Task GetItemByIdAsync_NotInstantiatedDbReturnsNotFound()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ToDoContext>().UseInMemoryDatabase("ToDoList").Options;
            var mockSet = new Mock<DbSet<ToDoItem>>();
            var mockContext = new Mock<ToDoContext>(options);
            mockContext.Setup(db => db.ToDoItems).Returns((DbSet<ToDoItem>)null);
            _toDoService = new ToDoService(mockContext.Object, _mapper);

            // Act
            var result = await _toDoService.GetItemByIdAsync(2);

            // Assert: Check return status
            Assert.Equal(ResultStatus.NotFound, result.Status);
        }

        [Fact]
        public async Task GetItemByIdAsync_RequestingNotAssignedIdReturnsNotFound()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ToDoContext>().UseInMemoryDatabase("ToDoList").Options;
            var _context = new ToDoContext(options);

            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();

            _context.AddRange(GetTestData());
            _context.SaveChanges();

            _toDoService = new ToDoService(_context, _mapper);

            // Act
            var result = await _toDoService.GetItemByIdAsync(5);

            // Assert: Check return status
            Assert.Equal(ResultStatus.NotFound, result.Status);

        }

        [Fact]
        public async Task GetItemByIdAsync_ReturnItemProperly()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ToDoContext>().UseInMemoryDatabase("ToDoList").Options;
            var _context = new ToDoContext(options);

            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();

            _context.AddRange(GetTestData());
            _context.SaveChanges();

            _toDoService = new ToDoService(_context, _mapper);

            var _testDataDto = _mapper.Map<ToDoItemDto>(new ToDoItem()
            {
                id = 2,
                task = "Apfelsine",
                isComplete = true,
                dueDate = "2024-02-30T15:24",
            });

            // Act
            var result = await _toDoService.GetItemByIdAsync(2);

            // Assert: Check return status
            Assert.Equal(ResultStatus.Ok, result.Status);

            //Assert: Check return type
            var toDoItem = Assert.IsType<ToDoItemDto>(result.GetValue());

            //Assert: Check returned values
            Assert.Equal(_testDataDto.ToString(), toDoItem.ToString());

        }

        [Fact]
        public async Task UpdateItemByIdAsync_PassingDifferentIdsReturnsBadRequest()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ToDoContext>().UseInMemoryDatabase("ToDoList").Options;
            var _context = new ToDoContext(options);

            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();

            _context.AddRange(GetTestData());
            _context.SaveChanges();

            _context.ChangeTracker.Clear();

            _toDoService = new ToDoService(_context, _mapper);

            var _testDataDto = _mapper.Map<ToDoItemDto>(new ToDoItem()
            {
                id = 2,
                task = "Apfelsine",
                isComplete = true,
                dueDate = "2024-02-30T15:24",
            });

            // Act
            var result = await _toDoService.UpdateItemByIdAsync(1, _testDataDto);

            // Assert: Check return status
            Assert.Equal(ResultStatus.BadRequest, result.Status);

        }

        [Fact]
        public async Task UpdateItemByIdAsync_PassingNotAssignedIdReturnsNotFound()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ToDoContext>().UseInMemoryDatabase("ToDoList").Options;
            var _context = new ToDoContext(options);

            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();

            _context.AddRange(GetTestData());
            _context.SaveChanges();

            _context.ChangeTracker.Clear();

            _toDoService = new ToDoService(_context, _mapper);

            var _testDataDto = _mapper.Map<ToDoItemDto>(new ToDoItem()
            {
                id = 5,
                task = "Banane",
                isComplete = true,
                dueDate = "2024-02-30T15:24",
            });

            // Act
            var result = await _toDoService.UpdateItemByIdAsync(5, _testDataDto);

            // Assert: Check return status
            Assert.Equal(ResultStatus.NotFound, result.Status);

        }

        [Fact]
        public async Task UpdateItemByIdAsync_ReturnItemProperly()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ToDoContext>().UseInMemoryDatabase("ToDoList").Options;
            var _context = new ToDoContext(options);

            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();

            _context.AddRange(GetTestData());
            _context.SaveChanges();

            _context.ChangeTracker.Clear();

            _toDoService = new ToDoService(_context, _mapper);

            var _testDataDto = _mapper.Map<ToDoItemDto>(new ToDoItem()
            {
                id = 2,
                task = "Banane",
                isComplete = false,
                dueDate = "2024-02-30T15:24",
            });

            // Act
            var result = await _toDoService.UpdateItemByIdAsync(2, _testDataDto);

            // Assert: Check return status
            Assert.Equal(ResultStatus.Created, result.Status);

            //Assert: Check return type
            var toDoItem = Assert.IsType<ToDoItemDto>(result.GetValue());

            //Assert: Check returned values
            Assert.Equal(_testDataDto.ToString(), toDoItem.ToString());

        }

        [Fact]
        public async Task CreateItemsAsync_NotInstantiatedDbReturnsError()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ToDoContext>().UseInMemoryDatabase("ToDoList").Options;
            var mockSet = new Mock<DbSet<ToDoItem>>();
            var mockContext = new Mock<ToDoContext>(options);
            mockContext.Setup(db => db.ToDoItems).Returns((DbSet<ToDoItem>)null);

            _toDoService = new ToDoService(mockContext.Object, _mapper);

            // Act
            var result = await _toDoService.CreateItemAsync(null, null);

            // Assert: Check return status
            Assert.Equal(ResultStatus.Error, result.Status);
        }

        [Fact]
        public async Task CreateItemsAsync_IdOverloadingReturnsBadRequest()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ToDoContext>().UseInMemoryDatabase("ToDoList").Options;
            var _context = new ToDoContext(options);

            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();

            _context.AddRange(GetTestData());
            _context.SaveChanges();

            _toDoService = new ToDoService(_context, _mapper);

            var _testDataDto = _mapper.Map<ToDoItemDto>(new ToDoItem()
            {
                id = 2,
                task = "Banane",
                isComplete = true,
                dueDate = "2024-02-30T15:24",
            });

            // Act
            var result = await _toDoService.CreateItemAsync(_testDataDto, GetTestHashTable());

            // Assert: Check return status
            Assert.Equal(ResultStatus.BadRequest, result.Status);

        }

        [Fact]
        public async Task CreateItemsAsync_CreateItemProperly()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ToDoContext>().UseInMemoryDatabase("ToDoList").Options;
            var _context = new ToDoContext(options);

            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();

            _context.AddRange();
            _context.SaveChanges();

            _toDoService = new ToDoService(_context, _mapper);

            var _testDataDto = _mapper.Map<ToDoItemDto>(new ToDoItem()
            {
                id = 2,
                task = "Banane",
                isComplete = false,
                dueDate = "2024-02-30T15:24",
            });

            // Act
            var result = await _toDoService.CreateItemAsync(_testDataDto, GetTestHashTable());

            // Assert: Check return status
            Assert.Equal(ResultStatus.Created, result.Status);

            //Assert: Check return type
            var toDoItem = Assert.IsType<ToDoItemDto>(result.GetValue());

            //Assert: Check returned values
            Assert.Equal(_testDataDto.ToString(), toDoItem.ToString());

            //Assert: Check returned resource location
            Assert.Equal($"https://xUnit:0000/api/ToDoItems/{_testDataDto.id}", result.ResourceLocation);

        }

        [Fact]
        public async Task DeleteItemByIdAsync_NotInstantiatedDbReturnsNotFound()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ToDoContext>().UseInMemoryDatabase("ToDoList").Options;
            var mockSet = new Mock<DbSet<ToDoItem>>();
            var mockContext = new Mock<ToDoContext>(options);
            mockContext.Setup(db => db.ToDoItems).Returns((DbSet<ToDoItem>)null);
            _toDoService = new ToDoService(mockContext.Object, _mapper);

            // Act
            var result = await _toDoService.DeleteItemByIdAsync(2);

            // Assert: Check return status
            Assert.Equal(ResultStatus.NotFound, result.Status);
        }

        [Fact]
        public async Task DeleteItemByIdAsync_PassingNotAssignedIdReturnsNotFound()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ToDoContext>().UseInMemoryDatabase("ToDoList").Options;
            var _context = new ToDoContext(options);

            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();

            _context.AddRange(GetTestData());
            _context.SaveChanges();

            _toDoService = new ToDoService(_context, _mapper);

            // Act
            var result = await _toDoService.DeleteItemByIdAsync(5);

            // Assert: Check return status
            Assert.Equal(ResultStatus.NotFound, result.Status);

        }

        [Fact]
        public async Task DeleteItemByIdAsync_ReturnsProperResultStatus()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ToDoContext>().UseInMemoryDatabase("ToDoList").Options;
            var _context = new ToDoContext(options);

            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();

            _context.AddRange(GetTestData());
            _context.SaveChanges();

            _toDoService = new ToDoService(_context, _mapper);

            // Act
            var result = await _toDoService.DeleteItemByIdAsync(2);

            // Assert: Check return status
            Assert.Equal(ResultStatus.NoContent, result.Status);

        }

        private IEnumerable<ToDoItem> GetTestData()
        {
            var toDoItems = new List<ToDoItem>();
            toDoItems.Add(new ToDoItem()
            {
                task = "Apfel",
                isComplete = true,
                dueDate = "2024-02-29T15:24",
            });
            toDoItems.Add(new ToDoItem()
            {
                task = "Apfelsine",
                isComplete = true,
                dueDate = "2024-02-30T15:24",
            });
            toDoItems.Add(new ToDoItem()
            {
                task = "Kiwi",
                isComplete = true,
                dueDate = "2024-02-30T15:24",
            });
            toDoItems.Add(new ToDoItem()
            {
                task = "Birne",
                isComplete = true,
                dueDate = "2024-02-29T15:24",
            });
            return toDoItems;
        }

        private IEnumerable<ToDoItem> GetTestDataApfel()
        {
            var toDoItems = new List<ToDoItem>();
            toDoItems.Add(new ToDoItem()
            {
                task = "Apfel",
                isComplete = true,
                dueDate = "2024-02-29T15:24",
            });
            toDoItems.Add(new ToDoItem()
            {
                task = "Apfelsine",
                isComplete = true,
                dueDate = "2024-02-30T15:24",
            });
            return toDoItems;
        }

        private IEnumerable<ToDoItem> GetTestData29()
        {
            var toDoItems = new List<ToDoItem>();
            toDoItems.Add(new ToDoItem()
            {

                task = "Apfel",
                isComplete = true,
                dueDate = "2024-02-29T15:24",
            });
            toDoItems.Add(new ToDoItem()
            {

                task = "Birne",
                isComplete = true,
                dueDate = "2024-02-29T15:24",
            });
            return toDoItems;
        }

        private IEnumerable<ToDoItem> GetTestDataApfel30()
        {
            var toDoItems = new List<ToDoItem>();
            toDoItems.Add(new ToDoItem()
            {

                task = "Apfelsine",
                isComplete = true,
                dueDate = "2024-02-30T15:24",
            });
            return toDoItems;
        }

        private Hashtable GetTestHashTable()
        {
            var mockrequest = new Mock<HttpRequest>();
            mockrequest.Setup(c => c.Host).Returns(new HostString("xUnit:0000"));
            mockrequest.Setup(c => c.Scheme).Returns("https");
            mockrequest.Setup(c => c.Path).Returns("/api/ToDoItems");

            var _request = mockrequest.Object;

            Hashtable urlArgs = new Hashtable();
            urlArgs.Add("protocol", _request.Scheme);
            urlArgs.Add("host", _request.Host);
            urlArgs.Add("routeValue", _request.Path);

            return urlArgs;
        }
    }
}

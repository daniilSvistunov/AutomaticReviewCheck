using AutoMapper;
using OKTodoListReactTS.BusinessLayer.Interfaces;
using OKTodoListReactTS.BusinessLayer.Mapping;
using OKTodoListReactTS.BusinessLayer.Services;
using OKTodoListReactTS.DataLayer;

namespace OKTodoListReactTS.BusinessLayer.Tests
{
    public class ToDoServiceTests : BaseEntityServiceTests
    {
        private IToDoService _toDoService;
        private readonly IMapper _mapper;
        private readonly ToDoDbContext _dbContext;

        public ToDoServiceTests()
        {
            var config = new MapperConfiguration(cfg => cfg.AddProfile(new MappingProfile()));
            _mapper = config.CreateMapper();

            _dbContext = CreateTestDbContext();

            _toDoService = new ToDoService(_mapper, _dbContext);
        }        
    }
}

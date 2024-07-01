using OKTodoListReactTS.Common.Logging;
using OKTodoListReactTS.DataLayer;

namespace OKTodoListReactTS.BusinessLayer.Services
{
    public abstract class BaseEntityService
    {
        protected readonly ToDoDbContext _dbContext;
        protected readonly ILoggerManager _logger;

        protected BaseEntityService(ToDoDbContext dbContext, ILoggerManager logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }
    }
}

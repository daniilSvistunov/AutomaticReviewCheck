using OKTodoListReactTS.Common.Logging;
using OKTodoListReactTS.DataLayer;

namespace OKTodoListReactTS.BusinessLayer.Services
{
    public abstract class BaseEntityService
    {
        protected readonly TemplateDbContext _dbContext;
        protected readonly ILoggerManager _logger;

        protected BaseEntityService(TemplateDbContext dbContext, ILoggerManager logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }
    }
}

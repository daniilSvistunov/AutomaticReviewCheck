using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OKTodoListReactTS.BusinessLayer.Interfaces;
using OKTodoListReactTS.Common.Exceptions;
using OKTodoListReactTS.Common.Logging;
using OKTodoListReactTS.DataLayer;
using OKTodoListReactTS.DataLayer.Entities;

namespace OKTodoListReactTS.BusinessLayer.Services
{
    /// <inheritdoc cref="ITeamProjectService" />
    public class ApplicationService : BaseEntityService, IApplicationService
    {
        public ApplicationService(TemplateDbContext dbContext, ILoggerManager logger)
            : base(dbContext, logger)
        {
            // nop
        }

        public async Task<Application> AddApplicationAsync(Application application)
        {
            var addedApplication = _dbContext.Application.Add(application);
            await _dbContext.SaveChangesAsync();

            return addedApplication.Entity;
        }

        public async Task<Application> GetApplicationByIdAsync(Guid id)
        {
            var application = await _dbContext.Application
                .AsNoTracking()
                .FirstOrDefaultAsync(t => t.Id == id);

            if (application == null)
            {
                _logger.LogWarning(ErrorCode.TeamProjectNotFound, "User has tried to get application by id which doesn't exist");

                throw new TemplateException(HttpStatusCode.BadRequest, ErrorCode.TeamProjectNotFound);
            }

            return application;
        }

        public async Task<Application> GetOrAddApplicationByNameAsync(string applicationName)
        {
            var application = await _dbContext.Application.Where(app => app.AppName == applicationName).FirstOrDefaultAsync();
            if (application == null)
            {
                application = await AddApplicationAsync(new Application
                {
                    AppName = applicationName,
                });
            }

            return application;
        }
    }
}
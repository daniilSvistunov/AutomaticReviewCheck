using System;
using System.Collections.Generic;
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
    public class EventTypeService : BaseEntityService, IEventTypeService
    {
        public EventTypeService(ToDoDbContext dbContext, ILoggerManager logger) : base(dbContext, logger)
        {
            // nop
        }

        public async Task<IEnumerable<EventType>> GetEventTypesAsync()
        {
            return await _dbContext.EventType
                .AsNoTracking()
                .Include(et => et.Application)
                .ToListAsync();
        }

        public async Task<IEnumerable<EventType>> GetEventTypesByApplicationIdAsync(Guid applicationId)
        {
            var applicationExists = await _dbContext.Application
                .AsNoTracking()
                .AnyAsync(t => t.Id == applicationId);

            if (!applicationExists)
            {
                _logger.LogWarning(ErrorCode.ApplicationNotFound,
                    $"User has tried to get EventTypes for an application which doesn't exist for applicationId '{applicationId}'");

                throw new ApiException(HttpStatusCode.BadRequest, ErrorCode.ApplicationNotFound);
            }

            return await _dbContext.EventType.AsNoTracking()
                .Where(e => e.ApplicationId == applicationId)
                .Include(et => et.Application)
                .OrderByDescending(t => t.CreatedOn)
                .ToListAsync();
        }

        public async Task<EventType> AddEventTypeAsync(EventType eventType)
        {
            var application = await _dbContext.Application
                .AsNoTracking()
                .FirstOrDefaultAsync(t => t.Id == eventType.ApplicationId);

            if (application == null)
            {
                _logger.LogWarning(ErrorCode.ApplicationNotFound,
                   $"User tried to add an EventType for an application which doesn't exist for applicationId '{eventType.ApplicationId}'");

                throw new ApiException(HttpStatusCode.BadRequest, ErrorCode.ApplicationNotFound);
            }

            var addedEventType = _dbContext.EventType.Add(eventType);
            await _dbContext.SaveChangesAsync();

            return addedEventType.Entity;
        }

        public async Task<EventType> GetOrAddEventTypeByNameAsync(Guid applicationId, string eventTypeName)
        {
            var eventType = await _dbContext.EventType
                .Where(et => et.ApplicationId == applicationId)
                .Where(et => et.EventTypeName == eventTypeName)
                .FirstOrDefaultAsync();

            if (eventType == null)
            {
                eventType = await AddEventTypeAsync(new EventType
                {
                    ApplicationId = applicationId,
                    EventTypeName = eventTypeName,
                });
            }

            return eventType;
        }
    }
}

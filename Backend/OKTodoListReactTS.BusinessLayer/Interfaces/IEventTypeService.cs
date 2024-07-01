using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OKTodoListReactTS.DataLayer.Entities;

namespace OKTodoListReactTS.BusinessLayer.Interfaces
{
    public interface IEventTypeService
    {
        Task<IEnumerable<EventType>> GetEventTypesAsync();

        Task<IEnumerable<EventType>> GetEventTypesByApplicationIdAsync(Guid applicationId);

        Task<EventType> AddEventTypeAsync(EventType eventType);

        Task<EventType> GetOrAddEventTypeByNameAsync(Guid applicationId, string eventTypeName);
    }
}

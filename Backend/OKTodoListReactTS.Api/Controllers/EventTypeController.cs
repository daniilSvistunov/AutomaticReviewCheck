using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OKTodoListReactTS.BusinessLayer.Dtos;
using OKTodoListReactTS.BusinessLayer.Interfaces;
using OKTodoListReactTS.DataLayer.Entities;

namespace OKTodoListReactTS.Api.Controllers
{
    /// <summary>
    /// Provides CRUD operations on <see cref="EventTypeDto"/>"
    /// </summary>
    [Route("api/eventTypes")]
    [ApiController]
    public class EventTypeController : BaseServiceController<IEventTypeService>
    {
        private readonly IMapper _mapper;

        public EventTypeController(IEventTypeService eventTypeService, IMapper mapper) : base(eventTypeService)
        {
            _mapper = mapper;
        }

        /// <summary>
        /// Gets all <see cref="EventTypeDto"/>s from the service
        /// </summary>
        /// <returns> List of objects of <see cref="EventTypeDto"/></returns>
        [HttpGet(Name = nameof(GetEventTypesAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<EventTypeDto>>> GetEventTypesAsync()
        {
            var eventTypes = await _service.GetEventTypesAsync();
            var eventTypeDtos = _mapper.Map<List<EventTypeDto>>(eventTypes);
            return Ok(eventTypeDtos);
        }

        /// <summary>
        /// Gets all <see cref="EventTypeDto"/>s from the service matching to a given id
        /// </summary>
        /// <param name="applicationId">The unique id of the <see cref="ApplicationDto"/> whose <see cref="EventTypeDto"/>s are requested</param>
        /// <returns>All <see cref="EventTypeDto"/>s belonging to the <see cref="ApplicationDto"/> that match the path</returns>
        [HttpGet("app", Name = nameof(GetEventTypesByApplicationIdAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<EventTypeDto>>> GetEventTypesByApplicationIdAsync([FromQuery] Guid applicationId)
        {
            var eventTypes = await _service.GetEventTypesByApplicationIdAsync(applicationId);
            var eventTypeDtos = _mapper.Map<List<EventTypeDto>>(eventTypes);
            return Ok(eventTypeDtos);
        }

        /// <summary>
        /// Adds a <see cref="EventTypeDto"/> to the service
        /// </summary>
        /// <param name="eventType">The <see cref="EventTypeDto"/> to add to the service</param>
        /// <returns>The created <see cref="EventTypeDto"/></returns>
        [HttpPost(Name = nameof(AddEventTypeAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<EventTypeDto>> AddEventTypeAsync([FromBody] EventType eventType)
        {
            eventType = await _service.AddEventTypeAsync(eventType);
            var eventTypeDto = _mapper.Map<EventTypeDto>(eventType);
            return Ok(eventTypeDto);
        }
    }
}

using System;
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
    /// Provides CRUD operations on <see cref="ApplicationDto"/>"
    /// </summary>
    [Route("api/applications")]
    [ApiController]
    public class ApplicationController : BaseServiceController<IApplicationService>
    {
        private readonly IMapper _mapper;

        public ApplicationController(IApplicationService applicationService, IMapper mapper) : base(applicationService)
        {
            _mapper = mapper;
        }

        /// <summary>
        /// Adds a <see cref="ApplicationDto"/> to the service
        /// </summary>
        /// <param name="applicationDto">The <see cref="ApplicationDto"/> to add to the service</param>
        /// <returns>The created <see cref="ApplicationDto"/></returns>
        [HttpPost(Name = nameof(AddApplicationByAppNameAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApplicationDto>> AddApplicationByAppNameAsync([FromBody] ApplicationDto applicationDto)
        {
            var application = _mapper.Map<Application>(applicationDto);
            application = await _service.AddApplicationAsync(application);
            applicationDto = _mapper.Map<ApplicationDto>(application);
            return Ok(applicationDto);
        }

        /// <summary>
        /// Gets a <see cref="ApplicationDto"/>s from the service matching to a given id
        /// </summary>
        /// <param name="Id">The unique id of the <see cref="ApplicationDto"/> that is requested requested</param> 
        /// <returns>A <see cref="ApplicationDto"/> that match the Id"/></returns>
        [HttpGet(Name = nameof(GetApplicationByIdAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApplicationDto>> GetApplicationByIdAsync([FromQuery] Guid Id)
        {
            var application = await _service.GetApplicationByIdAsync(Id);
            var applicationDto = _mapper.Map<ApplicationDto>(application);
            return Ok(applicationDto);
        }
    }
}
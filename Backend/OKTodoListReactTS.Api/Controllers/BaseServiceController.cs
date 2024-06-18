using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace OKTemplate.Api.Controllers
{
    public abstract class BaseServiceController<TService> : ControllerBase
    {
        protected readonly TService _service;

        protected BaseServiceController(TService service)
        {
            _service = service;
        }

        protected async Task<ActionResult<TDto>> CallWithMappingAsync<TDto, TEntity>(TDto dto, Func<TEntity, Task<TEntity>> function)
        {
            IMapper mapper = null!;
            var entity = mapper.Map<TEntity>(dto);
            entity = await function(entity);
            dto = mapper.Map<TDto>(entity);
            return Ok(dto);
        }
    }
}

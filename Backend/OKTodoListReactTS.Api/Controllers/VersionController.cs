using System.Reflection;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace OKTodoListReactTS.Api.Controllers
{
    /// <summary>
    /// Provides an endpoint to get the backend version
    /// </summary>
    [Route("api/version")]
    [ApiController]
    [Authorize]
    public class VersionController : ControllerBase
    {
        /// <summary>
        /// Gets the current version of the project   
        /// </summary>
        /// <returns>The current version of the project</returns>
        [HttpGet(Name = nameof(GetVersionAsync))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public string GetVersionAsync()
        {
            return Assembly.GetEntryAssembly()!.GetCustomAttribute<AssemblyInformationalVersionAttribute>()!.InformationalVersion;
        }
    }
}
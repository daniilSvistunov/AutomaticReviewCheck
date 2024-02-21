using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Graph;
using Microsoft.Identity.Web;
using Newtonsoft.Json;
using ToDoList.BusinessLayer.Interfaces;
using ToDoList.Common.Exceptions;
using ToDoList.Common.Logging;

namespace ToDoList.BusinessLayer.Services
{
    /// <inheritdoc cref="IGraphApi"/>
    public class GraphApiService : IGraphApiService
    {
        internal const string ServiceName = "GraphApi";

        private readonly IDownstreamWebApi _downstreamWebApi;

        private readonly ILoggerManager _logger;

        public GraphApiService(IDownstreamWebApi downstreamWebApi, ILoggerManager logger)
        {
            _downstreamWebApi = downstreamWebApi;
            _logger = logger;
        }

        public async Task<List<Group>?> GetGroupsUserBelongsToAsync()
        {
            try
            {
                var response = await _downstreamWebApi.CallWebApiForUserAsync(ServiceName, GetDownstreamWebApiOptions);

                var json = await response.Content.ReadAsStringAsync();

                var dictionary = JsonConvert.DeserializeObject<IDictionary<string, object>>(json);
                List<Group>? groups = JsonConvert.DeserializeObject<List<Group>>(dictionary?["value"]?.ToString());

                return groups;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex);

                throw new ApiException(System.Net.HttpStatusCode.BadRequest, ErrorCode.InvalidGraphCall);
            }

            static void GetDownstreamWebApiOptions(DownstreamWebApiOptions options) => options.RelativePath = $"me/MemberOf/microsoft.graph.group?$count=true&$select=id";
        }

        public async Task<User?> GetUserAsync()
        {
            try
            {
                var response = await _downstreamWebApi.CallWebApiForUserAsync(ServiceName, GetDownstreamWebApiOptions);

                var json = await response.Content.ReadAsStringAsync();

                User? user = JsonConvert.DeserializeObject<User>(json);

                return user;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex);

                throw new ApiException(System.Net.HttpStatusCode.BadRequest, ErrorCode.InvalidGraphCall);
            }

            static void GetDownstreamWebApiOptions(DownstreamWebApiOptions options) => options.RelativePath = $"me/";
        }

        /// <inheritdoc/>
        public async Task<User?> GetUserByIdAsync(string id)
        {
            try
            {
                var response = await _downstreamWebApi.CallWebApiForUserAsync(ServiceName, GetDownstreamWebApiOptions);

                var json = await response.Content.ReadAsStringAsync();

                User? user = JsonConvert.DeserializeObject<User>(json);

                return user;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex);

                throw new ApiException(System.Net.HttpStatusCode.BadRequest, ErrorCode.InvalidGraphCall);
            }

            void GetDownstreamWebApiOptions(DownstreamWebApiOptions options) => options.RelativePath = $"users/" + id;
        }
    }
}
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Identity.Web;
using ToDoList.BusinessLayer.Interfaces;

namespace ToDoList.BusinessLayer.Services
{
    public class ExternalApiService<T> : IExternalApiService<T>
    {
        public IConfiguration? Configuration { get; }
        public ITokenAcquisition? TokenAcquisition { get; }
        public IHttpContextAccessor HttpContextAccessor { get; }

        public ExternalApiService(IConfiguration? configuration, ITokenAcquisition? tokenAcquisition, IHttpContextAccessor httpContextAccessor)
        {
            Configuration = configuration;
            TokenAcquisition = tokenAcquisition;
            HttpContextAccessor = httpContextAccessor;
        }

        private T? _instance;

        public T Client
        {
            get
            {
                if (_instance == null)
                {
                    var base_url_key = $"{typeof(T).Name}:BaseUrl";
                    var httpClient = CreateHttpClientAsync().GetAwaiter().GetResult();
                    _instance = (T)Activator.CreateInstance(typeof(T), new object[] { Configuration![base_url_key], httpClient, HttpContextAccessor })!;
                }

                return _instance;
            }
        }

        private async Task<HttpClient> CreateHttpClientAsync()
        {
            var scopes = new string[] { Configuration![$"{typeof(T).Name}:Scopes"] };
            var authenticationResult = await TokenAcquisition!.GetAuthenticationResultForUserAsync(scopes);
            var client = new HttpClient();

            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", authenticationResult.AccessToken);

            return client;
        }
    }
}

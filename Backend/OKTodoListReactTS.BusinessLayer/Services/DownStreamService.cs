using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Identity.Web;
using OKTemplate.BusinessLayer.Interfaces;

namespace OKTemplate.BusinessLayer.Services
{
    /// <inheritdoc cref="ITeamProjectService" />
    public class DownStreamService : IDownStreamService
    {
        private ITokenAcquisition TokenAcquisition { get; }
        protected IHttpContextAccessor HttpContextAccessor { get; }

        public DownStreamService(ITokenAcquisition tokenAcquisition, IHttpContextAccessor httpContextAccessor)
        {
            TokenAcquisition = tokenAcquisition;
            HttpContextAccessor = httpContextAccessor;
        }

        private async Task<HttpClient> GetClient(string[] scopes, string baseUrl)
        {
            var authenticationResult = await TokenAcquisition.GetAuthenticationResultForUserAsync(scopes);

            var client = new HttpClient { BaseAddress = new Uri(baseUrl) };

            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", authenticationResult.AccessToken);

            return client;
        }

        /// <inheritdoc />
        public async Task<string> GetAsync(string path, string[] scopes, string baseUrl)
        {
            var client = await GetClient(scopes, baseUrl);

            return await client.GetStringAsync(path);
        }

        /// <inheritdoc />
        public async Task<string> PostAsync(string path, string body, string[] scopes, string baseUrl)
        {
            var client = await GetClient(scopes, baseUrl);

            var response = await client.PostAsync(path, new StringContent(body, System.Text.Encoding.UTF8, "application/json"));
            response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();

            return responseBody;
        }

        /// <inheritdoc />
        public async Task UpdateAsync(string path, string body, string[] scopes, string baseUrl)
        {
            var client = await GetClient(scopes, baseUrl);

            var response = await client.PatchAsync(path, new StringContent(body, System.Text.Encoding.UTF8, "application/json"));
            response.EnsureSuccessStatusCode();
        }

        /// <inheritdoc />
        public async Task DeleteAsync(string path, string[] scopes, string baseUrl)
        {
            var client = await GetClient(scopes, baseUrl);

            var response = await client.DeleteAsync(path);
            response.EnsureSuccessStatusCode();
        }
    }
}